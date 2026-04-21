import AdminLayout from "./AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

const messages = [
  { id: 1, name: "Alice W.", email: "alice@email.com", subject: "Catering inquiry", date: "2026-04-08", read: false },
  { id: 2, name: "Bob J.", email: "bob@email.com", subject: "Private event booking", date: "2026-04-07", read: true },
  { id: 3, name: "Clara S.", email: "clara@email.com", subject: "Menu allergy question", date: "2026-04-06", read: false },
  { id: 4, name: "David L.", email: "david@email.com", subject: "Great experience!", date: "2026-04-05", read: true },
];

export default function AdminMessages() {
  return (
    <AdminLayout>
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">From</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Subject</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr></thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m.id} className={`border-b border-border/50 ${!m.read ? "bg-accent/10" : ""}`}>
                    <td className="py-3 px-4 font-medium text-foreground">{!m.read && <span className="inline-block h-2 w-2 rounded-full bg-accent mr-2" />}{m.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{m.email}</td>
                    <td className="py-3 px-4 text-foreground">{m.subject}</td>
                    <td className="py-3 px-4 text-muted-foreground">{m.date}</td>
                    <td className="py-3 px-4 text-right">
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Eye className="h-3.5 w-3.5" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
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
