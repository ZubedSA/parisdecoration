import React from "react";

const FEATURES = [
  {
    number: "01",
    title: "Dekorasi Elegan & Berkelas",
    description: "Desain yang memikat mata dengan perpaduan warna harmonis, pencahayaan dramatis, dan ornamen berkualitas tinggi.",
  },
  {
    number: "02",
    title: "Konsep Custom Sesuai Impian",
    description: "Kami mendengarkan setiap detail preferensi Anda, mulai dari palet warna, jenis bunga, hingga tema adat maupun modern.",
  },
  {
    number: "03",
    title: "Tim Disiplin & Tepat Waktu",
    description: "Proses bongkar pasang terorganisir rapi dan selesai sebelum acara dimulai demi ketenangan Anda sekeluarga.",
  },
  {
    number: "04",
    title: "Harga Jelas & Transparan",
    description: "Tanpa biaya tersembunyi. Setiap rincian fasilitas dan spesifikasi dicantumkan secara gamblang dalam kesepakatan.",
  },
  {
    number: "05",
    title: "Material & Bunga Pilihan",
    description: "Kombinasi bunga segar berkualitas, kain pilihan terbaik, dan konstruksi pelaminan yang kokoh dan aman.",
  },
  {
    number: "06",
    title: "Pelayanan Hangat & Solutif",
    description: "Konsultasi santai dan solutif demi memberikan hasil dekorasi terbaik yang sesuai dengan anggaran Anda.",
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-paris-warm-50/70 border-y border-paris-warm-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div data-reveal="fade" className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-paris-gold-700 bg-paris-gold-100/60 px-3.5 py-1.5 rounded-full border border-paris-gold-200">
            Nilai & Standar Paris Decoration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-paris-dark-900 tracking-tight">
            Keunggulan yang Menjadikan Momen Anda Sempurna
          </h2>
          <p className="text-base text-paris-dark-600 font-light leading-relaxed">
            Dedikasi penuh dan keahlian artistik untuk menciptakan suasana pesta yang tak terlupakan bagi Anda dan para tamu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feat, idx) => (
            <div
              key={feat.number}
              data-reveal
              data-delay={(idx % 3) * 150}
              className="bg-white p-8 rounded-3xl border border-paris-warm-200/80 shadow-soft hover:shadow-card transition-all duration-300 group hover:-translate-y-1 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-paris-warm-100">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-paris-gold-600 tracking-wider">
                    {feat.number}
                  </span>
                  <div className="w-8 h-[1px] bg-paris-gold-300 group-hover:w-12 transition-all duration-300" />
                </div>
                <h3 className="font-serif text-xl font-bold text-paris-dark-900 mb-2.5">
                  {feat.title}
                </h3>
                <p className="text-sm text-paris-warm-600 leading-relaxed font-light">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
