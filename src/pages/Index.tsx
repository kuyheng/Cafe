import Layout from "@/components/Layout";
import heroImg from "@/assets/hero-cafe.jpg";
import coffeeImg from "@/assets/menu-coffee.jpg";
import pastryImg from "@/assets/menu-pastry.jpg";
import foodImg from "@/assets/menu-food.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Coffee, UtensilsCrossed, Cake, ArrowRight } from "lucide-react";

const featured = [
  { name: "Signature Latte", desc: "Rich espresso with velvety steamed milk and house-made caramel", price: "$5.50", img: coffeeImg, icon: Coffee },
  { name: "Butter Croissant", desc: "Flaky, golden layers of French pastry perfection", price: "$4.00", img: pastryImg, icon: Cake },
  { name: "Eggs Benedict", desc: "Poached eggs on artisan bread with hollandaise", price: "$12.00", img: foodImg, icon: UtensilsCrossed },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Kuyheng Cafe interior" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-cafe-espresso/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl animate-fade-up">
          <p className="text-cafe-gold font-medium tracking-widest uppercase text-sm mb-4">Welcome to Kuyheng Cafe</p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-cafe-cream leading-tight mb-6">
            Where Every Sip <br />
            <span className="text-gradient">Tells a Story</span>
          </h1>
          <p className="text-cafe-latte text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Handcrafted coffee, artisan pastries, and a cozy atmosphere that feels like home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button size="lg" className="gold-gradient text-cafe-espresso font-semibold hover:opacity-90 px-8">
                Explore Menu <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-cafe-cream text-cafe-cream hover:bg-cafe-cream/10 px-8">
                Reserve a Table
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Our Favorites</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Featured Items</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featured.map((item) => (
              <div key={item.name} className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.img} alt={item.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full">{item.price}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="h-5 w-5 text-accent" />
                    <h3 className="font-heading text-xl font-semibold text-foreground">{item.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion */}
      <section className="cafe-gradient section-padding">
        <div className="container mx-auto text-center">
          <Star className="h-10 w-10 text-cafe-gold mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-cafe-cream mb-4">Happy Hour Special</h2>
          <p className="text-cafe-latte text-lg max-w-xl mx-auto mb-6">
            Every weekday from 3–5 PM, enjoy 20% off all specialty drinks. Bring a friend and both get a free pastry!
          </p>
          <Link to="/menu">
            <Button size="lg" className="gold-gradient text-cafe-espresso font-semibold hover:opacity-90">
              View Full Menu
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto text-center">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">What People Say</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10">Loved by Our Guests</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sarah M.", text: "The best coffee in town! The atmosphere is so cozy and the staff are incredibly warm." },
              { name: "James K.", text: "Their croissants are to die for. I come here every morning before work." },
              { name: "Lily R.", text: "Perfect spot for a working lunch. Great WiFi, amazing food, and wonderful vibes." },
            ].map((t) => (
              <div key={t.name} className="bg-card p-6 rounded-xl border border-border">
                <div className="flex gap-1 mb-3 justify-center">
                  {Array(5).fill(0).map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
                </div>
                <p className="text-muted-foreground text-sm italic mb-4">"{t.text}"</p>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
