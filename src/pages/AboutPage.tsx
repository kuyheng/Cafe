import Layout from "@/components/Layout";
import aboutImg from "@/assets/about-cafe.jpg";
import { Award, Heart, Leaf, Users } from "lucide-react";

const values = [
  { icon: Heart, title: "Passion", desc: "Every cup is crafted with love and dedication to quality." },
  { icon: Leaf, title: "Sustainability", desc: "Ethically sourced beans and eco-friendly practices." },
  { icon: Users, title: "Community", desc: "A warm gathering place for neighbors and friends." },
  { icon: Award, title: "Excellence", desc: "Award-winning blends and recipes, perfected over years." },
];

export default function AboutPage() {
  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Our Story</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">About Kuyheng Cafe</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="rounded-xl overflow-hidden">
              <img src={aboutImg} alt="About our cafe" loading="lazy" className="w-full h-full object-cover" width={1280} height={854} />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">A Journey Started with a Single Bean</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2018, Kuyheng Cafe began as a small dream in a corner of downtown New York. What started as a passion project between two coffee-loving friends has grown into the city's most beloved neighborhood café.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We source our beans from small farms across Colombia, Ethiopia, and Guatemala, roasting them in-house to bring out their unique character. Every pastry is baked fresh each morning by our head pastry chef.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                More than just a café, we're a community hub — a place for first dates, business meetings, quiet reading afternoons, and everything in between.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6 bg-card rounded-xl border border-border">
                <v.icon className="h-10 w-10 text-accent mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
