import Layout from "@/components/Layout";
import heroImg from "@/assets/hero-cafe.jpg";
import aboutImg from "@/assets/about-cafe.jpg";
import coffeeImg from "@/assets/menu-coffee.jpg";
import pastryImg from "@/assets/menu-pastry.jpg";
import foodImg from "@/assets/menu-food.jpg";

const images = [
  { src: heroImg, alt: "Cafe interior with warm lighting" },
  { src: coffeeImg, alt: "Signature latte art" },
  { src: pastryImg, alt: "Fresh butter croissant" },
  { src: aboutImg, alt: "Coffee and pastry spread" },
  { src: foodImg, alt: "Brunch plate" },
  { src: heroImg, alt: "Evening ambiance" },
];

export default function GalleryPage() {
  return (
    <Layout>
      <section className="section-padding bg-background min-h-screen">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Visual Stories</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Our Gallery</h1>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {images.map((img, i) => (
              <div key={i} className="break-inside-avoid rounded-xl overflow-hidden group">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
