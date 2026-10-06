import fs from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma";
import {
  CategoryItem,
  ServiceItem,
  GalleryItemRecord,
  TestimonialItem,
  SiteSettingsData,
  OrderItemRecord,
  DashboardMetrics,
  OrderStatus,
  GalleryStatus,
  TestimonialStatus,
  ServiceStatus,
} from "@/types";
import {
  initialCategories,
  initialServices,
  initialGalleries,
  initialTestimonials,
  initialSiteSettings,
  initialOrders,
} from "@/data/initial-data";

interface LocalStore {
  categories: CategoryItem[];
  services: ServiceItem[];
  galleries: GalleryItemRecord[];
  testimonials: TestimonialItem[];
  siteSettings: SiteSettingsData;
  orders: OrderItemRecord[];
}

const STORE_PATH = path.join(process.cwd(), "data", "store.json");

// Helper to check if Prisma DB is connected and working
let isDbConnected: boolean | null = null;

async function checkPrismaConnection(): Promise<boolean> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl.includes("npg_xxxx") || dbUrl.includes("localhost:5432")) {
    return false;
  }
  if (isDbConnected !== null) return isDbConnected;
  try {
    await prisma.$queryRaw`SELECT 1`;
    isDbConnected = true;
    return true;
  } catch {
    isDbConnected = false;
    return false;
  }
}

// Local store helpers
async function readStore(): Promise<LocalStore> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    const defaultStore: LocalStore = {
      categories: initialCategories,
      services: initialServices,
      galleries: initialGalleries,
      testimonials: initialTestimonials,
      siteSettings: initialSiteSettings,
      orders: initialOrders,
    };
    await writeStore(defaultStore);
    return defaultStore;
  }
}

async function writeStore(store: LocalStore): Promise<void> {
  try {
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to store.json:", err);
  }
}

// ==========================================
// CATEGORIES
// ==========================================

export async function getCategories(): Promise<CategoryItem[]> {
  const useDb = await checkPrismaConnection();
  if (useDb) {
    try {
      const cats = await prisma.category.findMany({
        orderBy: { name: "asc" },
        include: {
          _count: {
            select: { services: true, galleries: true },
          },
        },
      });
      return cats.map((c) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
      }));
    } catch {
      // fallback
    }
  }

  const store = await readStore();
  return store.categories.map((c) => ({
    ...c,
    _count: {
      services: store.services.filter((s) => s.categoryId === c.id).length,
      galleries: store.galleries.filter((g) => g.categoryId === c.id).length,
    },
  }));
}

export async function getCategoryBySlug(slug: string): Promise<CategoryItem | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function createCategory(data: { name: string; slug: string; description?: string }): Promise<CategoryItem> {
  const useDb = await checkPrismaConnection();
  if (useDb) {
    try {
      const cat = await prisma.category.create({
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description || null,
        },
      });
      return {
        ...cat,
        createdAt: cat.createdAt.toISOString(),
        updatedAt: cat.updatedAt.toISOString(),
      };
    } catch (err) {
      console.warn("Prisma error createCategory, falling back:", err);
    }
  }

  const store = await readStore();
  const newCat: CategoryItem = {
    id: `cat-${Date.now()}`,
    name: data.name,
    slug: data.slug,
    description: data.description || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.categories.push(newCat);
  await writeStore(store);
  return newCat;
}

export async function updateCategory(
  id: string,
  data: { name?: string; slug?: string; description?: string }
): Promise<CategoryItem | null> {
  const useDb = await checkPrismaConnection();
  if (useDb) {
    try {
      const updated = await prisma.category.update({
        where: { id },
        data,
      });
      return {
        ...updated,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      };
    } catch {
      // fallback
    }
  }

  const store = await readStore();
  const idx = store.categories.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  store.categories[idx] = {
    ...store.categories[idx],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  await writeStore(store);
  return store.categories[idx];
}

export async function deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
  const store = await readStore();
  // Safe delete check: do not delete if it has services
  const hasServices = store.services.some((s) => s.categoryId === id);
  if (hasServices) {
    return {
      success: false,
      error: "Kategori tidak dapat dihapus karena masih digunakan oleh beberapa layanan.",
    };
  }

  const useDb = await checkPrismaConnection();
  if (useDb) {
    try {
      await prisma.category.delete({ where: { id } });
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus kategori";
      return { success: false, error: msg };
    }
  }

  store.categories = store.categories.filter((c) => c.id !== id);
  await writeStore(store);
  return { success: true };
}

// ==========================================
// SERVICES
// ==========================================

export async function getServices(filter?: {
  categorySlug?: string;
  search?: string;
  status?: ServiceStatus | "ALL";
  sort?: "price-asc" | "price-desc" | "newest";
}): Promise<ServiceItem[]> {
  const store = await readStore();
  let services = [...store.services];

  if (filter?.status && filter.status !== "ALL") {
    services = services.filter((s) => s.status === filter.status);
  }

  if (filter?.categorySlug && filter.categorySlug !== "all") {
    const category = store.categories.find((c) => c.slug === filter.categorySlug);
    if (category) {
      services = services.filter((s) => s.categoryId === category.id);
    }
  }

  if (filter?.search) {
    const query = filter.search.toLowerCase().trim();
    services = services.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        (s.facilities && s.facilities.toLowerCase().includes(query))
    );
  }

  if (filter?.sort) {
    if (filter.sort === "price-asc") {
      services.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (filter.sort === "price-desc") {
      services.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (filter.sort === "newest") {
      services.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }

  // Populate category
  return services.map((s) => ({
    ...s,
    category: store.categories.find((c) => c.id === s.categoryId),
  }));
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const services = await getServices({ status: "ALL" });
  return services.find((s) => s.slug === slug) || null;
}

export async function getServiceById(id: string): Promise<ServiceItem | null> {
  const services = await getServices({ status: "ALL" });
  return services.find((s) => s.id === id) || null;
}

export async function createService(data: {
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  price: number;
  facilities?: string;
  status?: ServiceStatus;
  images?: { fileName: string; driveUrl: string; driveFileId?: string; isPrimary?: boolean }[];
}): Promise<ServiceItem> {
  const store = await readStore();
  const serviceId = `srv-${Date.now()}`;
  const now = new Date().toISOString();

  const newService: ServiceItem = {
    id: serviceId,
    name: data.name,
    slug: data.slug,
    categoryId: data.categoryId,
    category: store.categories.find((c) => c.id === data.categoryId),
    description: data.description,
    price: data.price,
    facilities: data.facilities || null,
    status: data.status || "ACTIVE",
    images: (data.images || []).map((img, idx) => ({
      id: `img-${Date.now()}-${idx}`,
      serviceId,
      fileName: img.fileName,
      driveFileId: img.driveFileId || null,
      driveUrl: img.driveUrl,
      isPrimary: img.isPrimary ?? idx === 0,
      createdAt: now,
    })),
    createdAt: now,
    updatedAt: now,
  };

  store.services.unshift(newService);
  await writeStore(store);
  return newService;
}

export async function updateService(
  id: string,
  data: Partial<ServiceItem> & {
    newImages?: { fileName: string; driveUrl: string; driveFileId?: string; isPrimary?: boolean }[];
  }
): Promise<ServiceItem | null> {
  const store = await readStore();
  const idx = store.services.findIndex((s) => s.id === id);
  if (idx === -1) return null;

  const current = store.services[idx];
  let images = data.images !== undefined ? data.images : current.images;

  if (data.newImages && data.newImages.length > 0) {
    const additional = data.newImages.map((img, i) => ({
      id: `img-${Date.now()}-${i}`,
      serviceId: id,
      fileName: img.fileName,
      driveFileId: img.driveFileId || null,
      driveUrl: img.driveUrl,
      isPrimary: images.length === 0 && i === 0,
      createdAt: new Date().toISOString(),
    }));
    images = [...images, ...additional];
  }

  const updated: ServiceItem = {
    ...current,
    ...data,
    images,
    updatedAt: new Date().toISOString(),
    category: store.categories.find((c) => c.id === (data.categoryId || current.categoryId)),
  };

  store.services[idx] = updated;
  await writeStore(store);
  return updated;
}

export async function deleteService(id: string): Promise<boolean> {
  const store = await readStore();
  store.services = store.services.filter((s) => s.id !== id);
  await writeStore(store);
  return true;
}

export async function toggleServiceStatus(id: string): Promise<ServiceItem | null> {
  const service = await getServiceById(id);
  if (!service) return null;
  const newStatus = service.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  return updateService(id, { status: newStatus });
}

// ==========================================
// GALLERIES
// ==========================================

export async function getGalleries(filter?: {
  categoryId?: string;
  categorySlug?: string;
  status?: GalleryStatus | "ALL";
}): Promise<GalleryItemRecord[]> {
  const store = await readStore();
  let galleries = [...store.galleries];

  if (filter?.status && filter.status !== "ALL") {
    galleries = galleries.filter((g) => g.status === filter.status);
  }

  if (filter?.categoryId && filter.categoryId !== "all") {
    galleries = galleries.filter((g) => g.categoryId === filter.categoryId);
  }

  if (filter?.categorySlug && filter.categorySlug !== "all") {
    const cat = store.categories.find((c) => c.slug === filter.categorySlug);
    if (cat) {
      galleries = galleries.filter((g) => g.categoryId === cat.id);
    }
  }

  return galleries.map((g) => ({
    ...g,
    category: store.categories.find((c) => c.id === g.categoryId) || null,
  }));
}

export async function createGallery(data: {
  title: string;
  description?: string;
  categoryId?: string;
  driveUrl: string;
  driveFileId?: string;
  status?: GalleryStatus;
}): Promise<GalleryItemRecord> {
  const store = await readStore();
  const newGal: GalleryItemRecord = {
    id: `gal-${Date.now()}`,
    title: data.title,
    description: data.description || null,
    categoryId: data.categoryId || null,
    driveUrl: data.driveUrl,
    driveFileId: data.driveFileId || null,
    status: data.status || "PUBLISHED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: store.categories.find((c) => c.id === data.categoryId) || null,
  };

  store.galleries.unshift(newGal);
  await writeStore(store);
  return newGal;
}

export async function deleteGallery(id: string): Promise<boolean> {
  const store = await readStore();
  store.galleries = store.galleries.filter((g) => g.id !== id);
  await writeStore(store);
  return true;
}

export async function toggleGalleryStatus(id: string): Promise<GalleryItemRecord | null> {
  const store = await readStore();
  const idx = store.galleries.findIndex((g) => g.id === id);
  if (idx === -1) return null;

  store.galleries[idx].status = store.galleries[idx].status === "PUBLISHED" ? "HIDDEN" : "PUBLISHED";
  store.galleries[idx].updatedAt = new Date().toISOString();
  await writeStore(store);
  return store.galleries[idx];
}

// ==========================================
// ORDERS
// ==========================================

export async function getOrders(filter?: {
  status?: OrderStatus | "ALL";
  search?: string;
}): Promise<OrderItemRecord[]> {
  const store = await readStore();
  let orders = [...store.orders];

  if (filter?.status && filter.status !== "ALL") {
    orders = orders.filter((o) => o.status === filter.status);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase().trim();
    orders = orders.filter(
      (o) =>
        o.orderCode.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        o.eventLocation.toLowerCase().includes(q)
    );
  }

  orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return orders;
}

export async function getOrderByCode(orderCode: string): Promise<OrderItemRecord | null> {
  const store = await readStore();
  return store.orders.find((o) => o.orderCode.toUpperCase() === orderCode.toUpperCase()) || null;
}

export async function getOrderById(id: string): Promise<OrderItemRecord | null> {
  const store = await readStore();
  return store.orders.find((o) => o.id === id) || null;
}

export async function createOrder(data: {
  orderCode: string;
  customerName: string;
  phone: string;
  email?: string;
  eventDate: string;
  eventLocation: string;
  notes?: string;
  serviceId: string;
}): Promise<OrderItemRecord> {
  const store = await readStore();
  const service = store.services.find((s) => s.id === data.serviceId);
  const serviceName = service ? service.name : "Custom Decoration";
  const price = service ? Number(service.price) : 0;
  const orderId = `ord-${Date.now()}`;
  const now = new Date().toISOString();

  const newOrder: OrderItemRecord = {
    id: orderId,
    orderCode: data.orderCode,
    customerName: data.customerName,
    phone: data.phone,
    email: data.email || null,
    eventDate: data.eventDate,
    eventLocation: data.eventLocation,
    notes: data.notes || null,
    totalPrice: price,
    status: "PENDING",
    items: [
      {
        id: `oi-${Date.now()}`,
        orderId,
        serviceId: data.serviceId,
        serviceName,
        quantity: 1,
        price,
        subtotal: price,
        service: service || null,
      },
    ],
    createdAt: now,
    updatedAt: now,
  };

  store.orders.unshift(newOrder);
  await writeStore(store);
  return newOrder;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<OrderItemRecord | null> {
  const store = await readStore();
  const idx = store.orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;

  store.orders[idx].status = status;
  store.orders[idx].updatedAt = new Date().toISOString();
  await writeStore(store);
  return store.orders[idx];
}

// ==========================================
// TESTIMONIALS
// ==========================================

export async function getTestimonials(filter?: {
  status?: TestimonialStatus | "ALL";
}): Promise<TestimonialItem[]> {
  const store = await readStore();
  let testimonials = [...store.testimonials];
  if (filter?.status && filter.status !== "ALL") {
    testimonials = testimonials.filter((t) => t.status === filter.status);
  }
  return testimonials;
}

export async function createTestimonial(data: {
  customerName: string;
  rating: number;
  message: string;
  eventType?: string;
  image?: string;
  status?: TestimonialStatus;
}): Promise<TestimonialItem> {
  const store = await readStore();
  const newT: TestimonialItem = {
    id: `test-${Date.now()}`,
    customerName: data.customerName,
    rating: data.rating,
    message: data.message,
    eventType: data.eventType || null,
    image: data.image || null,
    status: data.status || "PUBLISHED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.testimonials.unshift(newT);
  await writeStore(store);
  return newT;
}

export async function updateTestimonialStatus(
  id: string,
  status: TestimonialStatus
): Promise<TestimonialItem | null> {
  const store = await readStore();
  const idx = store.testimonials.findIndex((t) => t.id === id);
  if (idx === -1) return null;

  store.testimonials[idx].status = status;
  store.testimonials[idx].updatedAt = new Date().toISOString();
  await writeStore(store);
  return store.testimonials[idx];
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const store = await readStore();
  store.testimonials = store.testimonials.filter((t) => t.id !== id);
  await writeStore(store);
  return true;
}

// ==========================================
// SITE SETTINGS
// ==========================================

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const store = await readStore();
  return store.siteSettings;
}

export async function updateSiteSettings(data: Partial<SiteSettingsData>): Promise<SiteSettingsData> {
  const store = await readStore();
  store.siteSettings = {
    ...store.siteSettings,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  await writeStore(store);
  return store.siteSettings;
}

// ==========================================
// DASHBOARD METRICS
// ==========================================

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const store = await readStore();
  const totalServices = store.services.length;
  const totalOrders = store.orders.length;
  const pendingOrders = store.orders.filter((o) => o.status === "PENDING").length;
  const completedOrders = store.orders.filter((o) => o.status === "COMPLETED").length;

  const totalRevenue = store.orders
    .filter((o) => o.status === "COMPLETED" || o.status === "CONFIRMED")
    .reduce((acc, curr) => acc + Number(curr.totalPrice), 0);

  const recentOrders = [...store.orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const popularServices = store.services.slice(0, 4).map((s) => ({
    name: s.name,
    orderCount: store.orders.filter((o) => o.items.some((i) => i.serviceId === s.id)).length + 1,
    price: s.price,
  }));

  return {
    totalServices,
    totalOrders,
    pendingOrders,
    completedOrders,
    totalRevenue,
    recentOrders,
    popularServices,
  };
}
