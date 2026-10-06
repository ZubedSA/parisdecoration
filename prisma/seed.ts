import { PrismaClient, Role, ServiceStatus, GalleryStatus, TestimonialStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Paris Decoration database...");

  // 1. Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "admin@parisdecoration.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "AdminParisDeco2026!#";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      name: process.env.ADMIN_NAME || "Admin Paris Decoration",
      email: adminEmail,
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });
  console.log(`Admin user created/verified: ${admin.email}`);

  // 2. Site Settings
  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "Paris Decoration",
      tagline: "Create Beautiful Moments",
      description: "Jasa dekorasi profesional untuk pernikahan, lamaran, ulang tahun, aqiqah, dan berbagai momen istimewa. Hadir dengan sentuhan elegan, estetis, dan penuh kemewahan.",
      phone: "085943610397",
      whatsapp: "6285943610397",
      email: "contact@parisdecoration.com",
      instagram: "@parisdecoration",
      address: "Jl. Trunojoyo No. 45, Sumenep, Madura, Jawa Timur",
      heroTitle: "Create Beautiful Moments",
      heroDescription: "Jadikan setiap perayaan tak terlupakan dengan sentuhan dekorasi berkelas, estetika memukau, dan pelayanan terpercaya.",
      heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
      footerDescription: "Paris Decoration melayani dekorasi pernikahan, lamaran, ulang tahun, dan event spesial di Sumenep & Madura sekitarnya. Kami menghadirkan kemewahan dan kehangatan dalam setiap detail.",
    },
  });
  console.log("Site settings seeded.");

  // 3. Categories
  const categoriesData = [
    {
      name: "Wedding",
      slug: "wedding",
      description: "Dekorasi pelaminan pernikahan mewah, modern, klasik, dan adat dengan sentuhan elegan.",
    },
    {
      name: "Engagement",
      slug: "engagement",
      description: "Dekorasi lamaran, pertunangan, dan sangjit yang romantis, intim, dan fotogenik.",
    },
    {
      name: "Birthday",
      slug: "birthday",
      description: "Dekorasi perayaan ulang tahun tematik, Sweet 17, hingga anniversary elegan.",
    },
    {
      name: "Aqiqah",
      slug: "aqiqah",
      description: "Dekorasi tasyakuran kelahiran dan aqiqah buah hati dengan nuansa hangat penuh berkah.",
    },
    {
      name: "Khitan",
      slug: "khitan",
      description: "Dekorasi walimatul khitan meriah dengan konsep modern maupun karakter favorit.",
    },
    {
      name: "Event & Gathering",
      slug: "event-gathering",
      description: "Dekorasi panggung seminar, peresmian, gala dinner, corporate event, dan pesta privat.",
    },
  ];

  const createdCategories: Record<string, string> = {};

  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: cat,
    });
    createdCategories[cat.slug] = created.id;
  }
  console.log("Categories seeded.");

  // 4. Services
  const servicesData = [
    {
      name: "Dekorasi Wedding Royal Elegance",
      slug: "dekorasi-wedding-royal-elegance",
      categoryId: createdCategories["wedding"],
      description: "Paket dekorasi pernikahan megah dengan perpaduan backdrop ukiran klasik modern, rangkaian fresh flowers melimpah, dan tata pencahayaan mewah yang menciptakan atmosfer istana megah.",
      price: 8500000,
      facilities: "Pelaminan megah 6-8 meter\nRangkaian bunga segar & artificial premium\nKarpet merah jalan & 6 standing flower\nLighting panggung warm white & fairy lights\nMini garden depan pelaminan\nSet kursi pengantin & orang tua (ukir gold)\nKotak angpau eksklusif & buku tamu\nKonsultasi konsep 3D gratis",
      status: ServiceStatus.ACTIVE,
      images: [
        {
          fileName: "wedding-royal-1.jpg",
          driveUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
          isPrimary: true,
        },
        {
          fileName: "wedding-royal-2.jpg",
          driveUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
          isPrimary: false,
        },
      ],
    },
    {
      name: "Dekorasi Wedding Modern Minimalist",
      slug: "dekorasi-wedding-modern-minimalist",
      categoryId: createdCategories["wedding"],
      description: "Konsep pernikahan kontemporer dengan clean lines, palet warna champagne & nude beige, arch dekoratif anggun, serta komposisi dried and fresh flowers yang sedang tren.",
      price: 5500000,
      facilities: "Pelaminan kontemporer 4-6 meter\nBackdrop arch asimetris aesthetic\nMix premium artificial & dried flowers\nWarm spotlighting & ambient strip light\nKarpet permadani krem\n4 standing flowers minimalis\nSet kursi modern pengantin\nWelcome sign akrilik personal",
      status: ServiceStatus.ACTIVE,
      images: [
        {
          fileName: "wedding-modern-1.jpg",
          driveUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
          isPrimary: true,
        },
      ],
    },
    {
      name: "Dekorasi Engagement Romantic Gold",
      slug: "dekorasi-engagement-romantic-gold",
      categoryId: createdCategories["engagement"],
      description: "Paket lamaran eksklusif dengan backdrop lingkaran/lengkung elegan berhias bunga rimbun, karpet bulu empuk, dan welcome sign akrilik nama pasangan.",
      price: 2800000,
      facilities: "Backdrop frame lingkaran / double arch 3 meter\nRangkaian bunga lebat warna request\nWelcome sign akrilik + standing easel kayu\nLighting warm white 2 titik\nKarpet bulu premium / permadani\n2 unit Kursi Crossback / Tiffany kayu\nStanding box hantaran/cincin",
      status: ServiceStatus.ACTIVE,
      images: [
        {
          fileName: "engagement-gold-1.jpg",
          driveUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
          isPrimary: true,
        },
      ],
    },
    {
      name: "Dekorasi Sweet 17 Glamour Night",
      slug: "dekorasi-sweet-17-glamour-night",
      categoryId: createdCategories["birthday"],
      description: "Pesta ulang tahun ke-17 yang berkilau dengan backdrop shimmer wall atau velvet, balon garland organik mewah, marquee light angka 17, dan custom neon sign.",
      price: 2200000,
      facilities: "Backdrop shimmer wall / panel warna custom lebar 3m\nOrganic balloon garland kombinasi metallic\nMarquee number light '17' menyala\nCustom neon flex text nama\nMeja cake silinder silang 2-3 unit\nSpotlight sorot lantai & karpet glitter",
      status: ServiceStatus.ACTIVE,
      images: [
        {
          fileName: "sweet17-glam-1.jpg",
          driveUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
          isPrimary: true,
        },
      ],
    },
    {
      name: "Dekorasi Aqiqah & Tasmiyah Sweet Angel",
      slug: "dekorasi-aqiqah-sweet-angel",
      categoryId: createdCategories["aqiqah"],
      description: "Dekorasi syukuran aqiqah manis dan suci bernuansa pastel lembut dengan ayunan/boks bayi berhias selendang tulle dan bunga indah.",
      price: 1800000,
      facilities: "Backdrop tenda panel pastel 2.5 - 3 meter\nBoks bayi rotan/kayu berhias kain tulle & bunga\nCustom papan nama akrilik buah hati\nKarpet empuk & boneka hiasan pendukung\nLighting sorot lembut foto bayi\nBaki cukur rambut & perlengkapan tata letak",
      status: ServiceStatus.ACTIVE,
      images: [
        {
          fileName: "aqiqah-angel-1.jpg",
          driveUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
          isPrimary: true,
        },
      ],
    },
    {
      name: "Dekorasi Intimate Gathering & Dinner",
      slug: "dekorasi-intimate-gathering-dinner",
      categoryId: createdCategories["event-gathering"],
      description: "Dekorasi meja perjamuan makan malam (table setting) dan panggung mini untuk acara reuni, gathering keluarga besar, atau acara kantor berkelas.",
      price: 3200000,
      facilities: "Table runner kain linen & centerpiece bunga panjang\nFairy lights canopy gantung romantis\nPhoto booth backdrop 3x2.5 meter + standing signage\nCustom printed place cards & menu card layout\nLilin elektrik aroma & dekorasi vas kaca",
      status: ServiceStatus.ACTIVE,
      images: [
        {
          fileName: "gathering-dinner-1.jpg",
          driveUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
          isPrimary: true,
        },
      ],
    },
  ];

  for (const s of servicesData) {
    const existing = await prisma.service.findUnique({ where: { slug: s.slug } });
    if (!existing) {
      await prisma.service.create({
        data: {
          name: s.name,
          slug: s.slug,
          categoryId: s.categoryId,
          description: s.description,
          price: s.price,
          facilities: s.facilities,
          status: s.status,
          images: {
            create: s.images.map((img) => ({
              fileName: img.fileName,
              driveUrl: img.driveUrl,
              isPrimary: img.isPrimary,
            })),
          },
        },
      });
    }
  }
  console.log("Services seeded.");

  // 5. Gallery Items
  const galleriesData = [
    {
      title: "The Grand Royal Wedding - Gedung KORPRI Sumenep",
      description: "Pelaminan 8 meter dengan perpaduan tema adat Jawa modern dan gold lighting megah.",
      categoryId: createdCategories["wedding"],
      driveUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      status: GalleryStatus.PUBLISHED,
    },
    {
      title: "Romantic Garden Engagement - Kediaman Dita & Rizky",
      description: "Dekorasi pertunangan konsep semi-outdoor dengan arch bunga mawar putih dan pampas grass.",
      categoryId: createdCategories["engagement"],
      driveUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
      status: GalleryStatus.PUBLISHED,
    },
    {
      title: "Modern Champagne Wedding - Graha Adi",
      description: "Nuansa champagne gold hangat yang memancarkan kemewahan nan bersahaja.",
      categoryId: createdCategories["wedding"],
      driveUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      status: GalleryStatus.PUBLISHED,
    },
    {
      title: "Sweet 17 Purple Holographic - Hotel Utami",
      description: "Ulang tahun meriah bertabur balon chrome, marquee light 17, dan shimmer wall ungu.",
      categoryId: createdCategories["birthday"],
      driveUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
      status: GalleryStatus.PUBLISHED,
    },
    {
      title: "Aqiqah Baby Althaf - Nuansa Biru Pastel & Awan",
      description: "Boks bayi beralaskan selendang halus dan rangkaian bunga krisan putih harum.",
      categoryId: createdCategories["aqiqah"],
      driveUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
      status: GalleryStatus.PUBLISHED,
    },
    {
      title: "Year-End Corporate Dinner - Ballroom Wijaya",
      description: "Dekorasi panggung formal dan table centerpiece berkelas untuk 150 tamu undangan.",
      categoryId: createdCategories["event-gathering"],
      driveUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      status: GalleryStatus.PUBLISHED,
    },
  ];

  for (const g of galleriesData) {
    const existing = await prisma.gallery.findFirst({ where: { title: g.title } });
    if (!existing) {
      await prisma.gallery.create({ data: g });
    }
  }
  console.log("Galleries seeded.");

  // 6. Testimonials
  const testimonialsData = [
    {
      customerName: "dr. Amanda & Farhan, S.T.",
      rating: 5,
      message: "Dekorasi wedding dari Paris Decoration benar-benar melebihi ekspektasi kami! Tamu-tamu banyak yang memuji pelaminannya sangat mewah dan bunganya harum segar seharian. Timnya gercep dan ramah banget!",
      eventType: "Pernikahan Gedung",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      status: TestimonialStatus.PUBLISHED,
    },
    {
      customerName: "Nabila Putri",
      rating: 5,
      message: "Buat acara lamaran di rumah, Paris Decoration bisa sulap ruang tamu biasa jadi mirip venue bintang lima. Hasil fotonya cantik banget di kamera. Makasih banyak Paris Decoration!",
      eventType: "Lamaran / Engagement",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      status: TestimonialStatus.PUBLISHED,
    },
    {
      customerName: "Ibu Ratna Dewi",
      rating: 5,
      message: "Puas sekali pesan dekorasi aqiqah cucu pertama di Paris Decoration. Desainnya rapi, bersih, tepat waktu pengerjaannya, dan harganya sangat bersahabat dibanding kualitas yang didapat.",
      eventType: "Tasyakuran Aqiqah",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      status: TestimonialStatus.PUBLISHED,
    },
  ];

  for (const t of testimonialsData) {
    const existing = await prisma.testimonial.findFirst({ where: { customerName: t.customerName } });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log("Testimonials seeded.");

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
