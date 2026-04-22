import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getMenuItems, type ApiMenuItem } from "@/lib/api";

function formatPrice(price: string | number) {
  const parsed = Number(price);
  if (Number.isFinite(parsed)) {
    return `$${parsed.toFixed(2)}`;
  }
  return String(price);
}

function toLabel(value: string) {
  if (!value) {
    return value;
  }
  return value[0].toUpperCase() + value.slice(1);
}

export default function AdminMenu() {
  const [items, setItems] = useState<ApiMenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadMenu = async () => {
      try {
        const rows = await getMenuItems();
        if (active) {
          setItems(rows);
        }
      } catch {
        if (active) {
          toast.error("Failed to load menu items from database.");
        }
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground text-sm">{items.length} items total</p>
          <Button className="bg-primary text-primary-foreground"><Plus className="h-4 w-4 mr-1" /> Add Item</Button>
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr></thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={5} className="py-6 px-4 text-center text-muted-foreground">Loading menu items from PostgreSQL...</td>
                    </tr>
                  )}
                  {!loading && items.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 px-4 text-center text-muted-foreground">No menu items found.</td>
                    </tr>
                  )}
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium text-foreground">{item.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{toLabel(item.category)}</td>
                      <td className="py-3 px-4 text-foreground">{formatPrice(item.price)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.is_active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                          {item.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button size="icon" variant="ghost" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
