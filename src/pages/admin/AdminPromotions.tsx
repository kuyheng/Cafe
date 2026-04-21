import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";

const promos = [
  { id: 1, title: "Happy Hour", desc: "20% off specialty drinks 3-5 PM weekdays", status: "Active", discount: "20%" },
  { id: 2, title: "Weekend Brunch", desc: "Free coffee with any brunch order", status: "Active", discount: "Free Item" },
  { id: 3, title: "Student Discount", desc: "15% off with valid student ID", status: "Paused", discount: "15%" },
];

export default function AdminPromotions() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button className="bg-primary text-primary-foreground"><Plus className="h-4 w-4 mr-1" /> Add Promotion</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {promos.map((p) => (
            <Card key={p.id} className="bg-card border-border">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-accent" />
                  <CardTitle className="text-base">{p.title}</CardTitle>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === "Active" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>{p.status}</span>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                <p className="text-lg font-bold text-accent mb-3">{p.discount}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-border"><Pencil className="h-3 w-3 mr-1" /> Edit</Button>
                  <Button size="sm" variant="outline" className="border-border text-destructive hover:text-destructive"><Trash2 className="h-3 w-3 mr-1" /> Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
