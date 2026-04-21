import AdminLayout from "./AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const reservations = [
  { id: 1, name: "Sarah M.", date: "2026-04-12", time: "7:00 PM", guests: 4, status: "Pending" },
  { id: 2, name: "James K.", date: "2026-04-13", time: "12:30 PM", guests: 2, status: "Confirmed" },
  { id: 3, name: "Lily R.", date: "2026-04-14", time: "6:00 PM", guests: 6, status: "Pending" },
  { id: 4, name: "Mark T.", date: "2026-04-15", time: "8:00 PM", guests: 3, status: "Confirmed" },
];

export default function AdminReservations() {
  return (
    <AdminLayout>
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Time</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Guests</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr></thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">{r.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{r.date}</td>
                    <td className="py-3 px-4 text-muted-foreground">{r.time}</td>
                    <td className="py-3 px-4 text-foreground">{r.guests}</td>
                    <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${r.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{r.status}</span></td>
                    <td className="py-3 px-4 text-right">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600"><Check className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><X className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
