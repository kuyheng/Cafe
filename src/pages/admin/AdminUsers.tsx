import AdminLayout from "./AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const users = [
  { id: 1, name: "Sarah M.", email: "sarah@email.com", role: "User", joined: "2026-01-15" },
  { id: 2, name: "James K.", email: "james@email.com", role: "User", joined: "2026-02-20" },
  { id: 3, name: "Admin User", email: "kuyheng503@gmail.com", role: "Admin", joined: "2025-12-01" },
  { id: 4, name: "Lily R.", email: "lily@email.com", role: "User", joined: "2026-03-10" },
];

export default function AdminUsers() {
  return (
    <AdminLayout>
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Joined</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">{u.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{u.email}</td>
                    <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${u.role === "Admin" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"}`}>{u.role}</span></td>
                    <td className="py-3 px-4 text-muted-foreground">{u.joined}</td>
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
    </AdminLayout>
  );
}
