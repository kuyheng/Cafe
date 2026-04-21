import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const initialCategories = [
  { id: 1, name: "Coffee", itemCount: 8 },
  { id: 2, name: "Pastries", itemCount: 6 },
  { id: 3, name: "Food", itemCount: 5 },
  { id: 4, name: "Drinks", itemCount: 4 },
];

export default function AdminCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [newCat, setNewCat] = useState("");

  const addCategory = () => {
    if (!newCat.trim()) return;
    setCategories([...categories, { id: Date.now(), name: newCat.trim(), itemCount: 0 }]);
    setNewCat("");
    toast.success("Category added");
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast.success("Category deleted");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Input placeholder="New category name..." value={newCat} onChange={(e) => setNewCat(e.target.value)} className="max-w-xs bg-card border-border" />
          <Button onClick={addCategory} className="bg-primary text-primary-foreground"><Plus className="h-4 w-4 mr-1" /> Add</Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <Card key={c.id} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold">{c.name}</CardTitle>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteCategory(c.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{c.itemCount} items</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
