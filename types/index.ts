export type ServiceStatus = "ACTIVE" | "INACTIVE";
export type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "COMPLETED" | "CANCELLED";
export type GalleryStatus = "PUBLISHED" | "HIDDEN";
export type TestimonialStatus = "PENDING" | "PUBLISHED" | "HIDDEN";
export type UserRole = "ADMIN";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  _count?: {
    services?: number;
    galleries?: number;
  };
}

export interface ServiceImageItem {
  id: string;
  serviceId: string;
  fileName: string;
  driveFileId: string | null;
  driveUrl: string;
  isPrimary: boolean;
  createdAt: Date | string;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  name: string;
  slug: string;
  description: string;
  price: number | string;
  facilities: string | null;
  status: ServiceStatus;
  images: ServiceImageItem[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface OrderItemDetail {
  id: string;
  orderId: string;
  serviceId: string | null;
  serviceName: string;
  quantity: number;
  price: number | string;
  subtotal: number | string;
  service?: {
    id: string;
    name: string;
    slug: string;
    images?: ServiceImageItem[];
  } | null;
}

export interface OrderItemRecord {
  id: string;
  orderCode: string;
  customerName: string;
  phone: string;
  email: string | null;
  eventDate: Date | string;
  eventLocation: string;
  notes: string | null;
  totalPrice: number | string;
  status: OrderStatus;
  items: OrderItemDetail[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface GalleryItemRecord {
  id: string;
  title: string;
  description: string | null;
  categoryId: string | null;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  driveFileId: string | null;
  driveUrl: string;
  status: GalleryStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TestimonialItem {
  id: string;
  customerName: string;
  rating: number;
  message: string;
  eventType: string | null;
  image: string | null;
  status: TestimonialStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface SiteSettingsData {
  id: string;
  siteName: string;
  tagline: string | null;
  description: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  instagram: string | null;
  address: string | null;
  logo: string | null;
  heroTitle: string | null;
  heroDescription: string | null;
  heroImage: string | null;
  footerDescription: string | null;
  updatedAt: Date | string;
}

export interface OrderSubmissionInput {
  customerName: string;
  phone: string;
  email?: string;
  serviceId: string;
  eventDate: string;
  eventLocation: string;
  notes?: string;
}

export interface DashboardMetrics {
  totalServices: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  recentOrders: OrderItemRecord[];
  popularServices: {
    name: string;
    orderCount: number;
    price: number | string;
  }[];
}
