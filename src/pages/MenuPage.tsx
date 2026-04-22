import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Search, Coffee, Cake, UtensilsCrossed, GlassWater } from "lucide-react";
import coffeeImg from "@/assets/menu-coffee.jpg";
import pastryImg from "@/assets/menu-pastry.jpg";
import foodImg from "@/assets/menu-food.jpg";
import { getMenuItems, type ApiMenuItem } from "@/lib/api";

const categories = [
  { id: "all", label: "All", icon: null },
  { id: "coffee", label: "Coffee", icon: Coffee },
  { id: "pastries", label: "Pastries", icon: Cake },
  { id: "food", label: "Food", icon: UtensilsCrossed },
  { id: "drinks", label: "Drinks", icon: GlassWater },
];

type MenuCardItem = {
  id: string;
  name: string;
  category: string;
  price: string;
  desc: string;
  img: string;
};

const staticMenuItems: MenuCardItem[] = [
  { id: "local-espresso", name: "Espresso", category: "coffee", price: "$3.50", desc: "Bold, concentrated coffee shot", img: coffeeImg },
  { id: "local-cappuccino", name: "Cappuccino", category: "coffee", price: "$4.50", desc: "Espresso with steamed milk foam", img: coffeeImg },
  { id: "local-caramel-latte", name: "Caramel Latte", category: "coffee", price: "$5.50", desc: "Signature house-made caramel latte", img: coffeeImg },
  { id: "local-mocha", name: "Mocha", category: "coffee", price: "$5.00", desc: "Chocolate meets espresso perfection", img: coffeeImg },
  { id: "local-cold-brew", name: "Cold Brew", category: "coffee", price: "$4.00", desc: "Smooth, slow-steeped cold coffee", img: coffeeImg },
  { id: "local-croissant", name: "Butter Croissant", category: "pastries", price: "$4.00", desc: "Flaky French pastry", img: pastryImg },
  { id: "local-muffin", name: "Chocolate Muffin", category: "pastries", price: "$3.50", desc: "Rich double-chocolate muffin", img: pastryImg },
  { id: "local-cinnamon-roll", name: "Cinnamon Roll", category: "pastries", price: "$4.50", desc: "Warm, gooey cinnamon swirl", img: pastryImg },
  { id: "local-eggs-benedict", name: "Eggs Benedict", category: "food", price: "$12.00", desc: "Poached eggs with hollandaise", img: foodImg },
  { id: "local-avocado-toast", name: "Avocado Toast", category: "food", price: "$10.00", desc: "Smashed avo on sourdough", img: foodImg },
  { id: "local-club-sandwich", name: "Club Sandwich", category: "food", price: "$11.00", desc: "Triple-decker classic", img: foodImg },
  { id: "local-fresh-juice", name: "Fresh Juice", category: "drinks", price: "$5.00", desc: "Seasonal fresh-pressed juice", img: coffeeImg },
  { id: "local-iced-tea", name: "Iced Tea", category: "drinks", price: "$3.50", desc: "House-brewed peach iced tea", img: coffeeImg },
  { id: "local-smoothie-bowl", name: "Smoothie Bowl", category: "drinks", price: "$8.00", desc: "Acai berry with granola topping", img: coffeeImg },
];

const imageMap: Record<string, string> = {
  coffee: coffeeImg,
  pastry: pastryImg,
  pastries: pastryImg,
  food: foodImg,
  drinks: coffeeImg,
};

function formatPrice(price: string | number) {
  const numericValue = Number(price);
  if (Number.isFinite(numericValue)) {
    return `$${numericValue.toFixed(2)}`;
  }
  return String(price);
}

function mapApiItem(item: ApiMenuItem): MenuCardItem {
  const category = String(item.category || "drinks").toLowerCase();
  const imageKey = String(item.image_key || category).toLowerCase();

  return {
    id: String(item.id),
    name: item.name,
    category,
    price: formatPrice(item.price),
    desc: item.description || "Freshly prepared in our kitchen.",
    img: imageMap[imageKey] || imageMap[category] || coffeeImg,
  };
}

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [menuItems, setMenuItems] = useState<MenuCardItem[]>(staticMenuItems);
  const [loading, setLoading] = useState(true);
  const [fallbackMode, setFallbackMode] = useState(false);

  useEffect(() => {
    let active = true;

    const loadMenu = async () => {
      try {
        const dbItems = await getMenuItems();
        if (!active) {
          return;
        }

        const mappedItems = dbItems.filter((item) => item.is_active).map(mapApiItem);
        if (mappedItems.length > 0) {
          setMenuItems(mappedItems);
          setFallbackMode(false);
        } else {
          setMenuItems(staticMenuItems);
          setFallbackMode(true);
        }
      } catch {
        if (!active) {
          return;
        }
        setMenuItems(staticMenuItems);
        setFallbackMode(true);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadMenu();

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCat = cat === "all" || item.category === cat;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, cat, menuItems]);

  return (
    <Layout>
      <section className="section-padding bg-background min-h-screen">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Our Selection</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">The Menu</h1>
            {loading && <p className="text-muted-foreground text-sm mt-3">Loading menu from PostgreSQL...</p>}
            {!loading && fallbackMode && (
              <p className="text-muted-foreground text-sm mt-3">Database is unavailable right now. Showing local menu preview.</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mb-10 max-w-2xl mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search menu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    cat === c.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground border border-border hover:bg-secondary"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <div key={item.id} className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all">
                <div className="h-44 overflow-hidden">
                  <img src={item.img} alt={item.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-heading text-lg font-semibold text-foreground">{item.name}</h3>
                    <span className="text-accent font-bold text-sm">{item.price}</span>
                  </div>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-10">No items found. Try a different search.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
