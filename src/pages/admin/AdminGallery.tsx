import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import heroImg from "@/assets/hero-cafe.jpg";
import coffeeImg from "@/assets/menu-coffee.jpg";
import pastryImg from "@/assets/menu-pastry.jpg";
import foodImg from "@/assets/menu-food.jpg";

const images = [heroImg, coffeeImg, pastryImg, foodImg, heroImg, coffeeImg];

export default function AdminGallery() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground text-sm">{images.length} images</p>
          <Button className="bg-primary text-primary-foreground"><Plus className="h-4 w-4 mr-1" /> Upload Image</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden border border-border">
              <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button size="icon" variant="destructive" className="h-10 w-10"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
