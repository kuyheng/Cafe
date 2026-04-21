import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossed, Users, CalendarDays, MessageSquare, TrendingUp, DollarSign } from "lucide-react";

const stats = [
  { label: "Total Menu Items", value: "48", icon: UtensilsCrossed, change: "+3 this week" },
  { label: "Active Users", value: "1,234", icon: Users, change: "+12% this month" },
  { label: "Reservations", value: "89", icon: CalendarDays, change: "23 pending" },
  { label: "Messages", value: "34", icon: MessageSquare, change: "5 unread" },
  { label: "Revenue", value: "$12,450", icon: DollarSign, change: "+8% vs last week" },
  { label: "Growth", value: "15%", icon: TrendingUp, change: "Steady increase" },
];

const recentOrders = [
  { id: "#1234", customer: "Sarah M.", items: "Latte, Croissant", total: "$9.50", status: "Completed" },
  { id: "#1235", customer: "James K.", items: "Eggs Benedict", total: "$12.00", status: "In Progress" },
  { id: "#1236", customer: "Lily R.", items: "Cold Brew, Muffin", total: "$7.50", status: "Pending" },
  { id: "#1237", customer: "Mark T.", items: "Cappuccino x2", total: "$9.00", status: "Completed" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Welcome back, Admin!</h1>
          <p className="text-muted-foreground text-sm">Here's what's happening at Kuyheng Cafe today.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                <s.icon className="h-5 w-5 text-accent" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Order</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Customer</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Items</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Total</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-b border-border/50">
                      <td className="py-3 px-2 font-medium text-foreground">{o.id}</td>
                      <td className="py-3 px-2 text-foreground">{o.customer}</td>
                      <td className="py-3 px-2 text-muted-foreground">{o.items}</td>
                      <td className="py-3 px-2 text-foreground">{o.total}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          o.status === "Completed" ? "bg-green-100 text-green-700" :
                          o.status === "In Progress" ? "bg-yellow-100 text-yellow-700" :
                          "bg-muted text-muted-foreground"
                        }`}>{o.status}</span>
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
