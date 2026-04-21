import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, UtensilsCrossed, FolderOpen, Image, Tag, CalendarDays, MessageSquare, Users, Settings, Coffee, LogOut } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Categories", path: "/admin/categories", icon: FolderOpen },
  { label: "Menu Items", path: "/admin/menu", icon: UtensilsCrossed },
  { label: "Gallery", path: "/admin/gallery", icon: Image },
  { label: "Promotions", path: "/admin/promotions", icon: Tag },
  { label: "Reservations", path: "/admin/reservations", icon: CalendarDays },
  { label: "Messages", path: "/admin/messages", icon: MessageSquare },
  { label: "Users", path: "/admin/users", icon: Users },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 cafe-gradient flex flex-col shrink-0 hidden lg:flex">
        <div className="p-6 border-b border-cafe-mocha">
          <Link to="/admin" className="flex items-center gap-2">
            <Coffee className="h-7 w-7 text-cafe-gold" />
            <span className="font-heading text-xl font-bold text-cafe-cream">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.path
                  ? "bg-sidebar-accent text-cafe-gold"
                  : "text-cafe-latte hover:bg-sidebar-accent/50 hover:text-cafe-cream"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-cafe-mocha">
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 text-cafe-latte hover:text-cafe-cream text-sm">
            <LogOut className="h-4 w-4" /> Back to Site
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between shrink-0">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {navItems.find((n) => n.path === pathname)?.label || "Admin"}
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">A</div>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
