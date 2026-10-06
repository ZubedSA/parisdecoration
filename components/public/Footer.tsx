import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SiteSettingsData } from "@/types";

export const Footer: React.FC<{ settings?: Partial<SiteSettingsData> | null }> = ({ settings }) => {
  const currentYear = new Date().getFullYear();
  const siteName = settings?.siteName || "Paris Decoration";
  const description =
    settings?.footerDescription ||
    "Paris Decoration melayani dekorasi pernikahan, lamaran, ulang tahun, dan berbagai perayaan spesial dengan sentuhan estetika elegan dan pelayanan profesional.";
  const phone = settings?.phone || "085943610397";
  const whatsapp = settings?.whatsapp || "6285943610397";
  const email = settings?.email || "contact@parisdecoration.com";
  const instagram = settings?.instagram || "@parisdecoration";
  const address = settings?.address || "Jl. Trunojoyo No. 45, Sumenep, Madura, Jawa Timur";

  const cleanWa = whatsapp.replace(/[^0-9]/g, "");

  return (
    <footer className="bg-paris-dark-900 text-paris-warm-100 border-t border-paris-dark-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-paris-dark-700/60">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <BrandLogo variant="dark" siteName={siteName} />
            </Link>
            <p className="text-sm text-paris-warm-300 leading-relaxed">{description}</p>
          </div>

          {/* Nav Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-paris-gold-400">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-paris-warm-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="text-paris-warm-300 hover:text-white transition-colors">
                  Katalog Layanan
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="text-paris-warm-300 hover:text-white transition-colors">
                  Galeri Foto Dekorasi
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-paris-warm-300 hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-paris-warm-300 hover:text-white transition-colors">
                  Kontak & Lokasi
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-paris-gold-400 font-semibold hover:text-paris-gold-300 transition-colors">
                  Pemesanan Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan Populer */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-paris-gold-400">
              Kategori Dekorasi
            </h4>
            <ul className="space-y-2.5 text-sm text-paris-warm-300">
              <li>Pernikahan (Wedding) Modern & Klasik</li>
              <li>Lamaran & Pertunangan (Engagement)</li>
              <li>Ulang Tahun (Birthday & Sweet 17)</li>
              <li>Tasyakuran Aqiqah & Tasmiyah</li>
              <li>Walimatul Khitan</li>
              <li>Corporate Gathering & Gala Dinner</li>
            </ul>
          </div>

          {/* Kontak Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-paris-gold-400">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-sm text-paris-warm-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-paris-gold-500 shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-paris-gold-500 shrink-0" />
                <a
                  href={`https://wa.me/${cleanWa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-paris-gold-400 transition-colors"
                >
                  {phone} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <InstagramIcon className="w-4 h-4 text-paris-gold-500 shrink-0" />
                <a
                  href={`https://instagram.com/${instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-paris-gold-400 transition-colors"
                >
                  {instagram}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-paris-gold-500 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-paris-gold-400 transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and admin shortcut */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-paris-warm-400 gap-4">
          <p>© {currentYear} {siteName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Dibuat dengan cinta untuk setiap momen istimewa.</span>
            <Link href="/admin/login" className="text-paris-warm-500 hover:text-paris-gold-400 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
