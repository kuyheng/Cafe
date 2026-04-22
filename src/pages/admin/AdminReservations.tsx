import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { getReservations, updateReservationStatus, type ApiReservation } from "@/lib/api";

function formatTime(value: string) {
  const [h, m] = value.split(":");
  const hour = Number(h);
  const minute = Number(m);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) {
    return value;
  }
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState<ApiReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    const loadReservations = async () => {
      try {
        const rows = await getReservations();
        if (active) {
          setReservations(rows);
        }
      } catch {
        if (active) {
          toast.error("Failed to load reservations from database.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadReservations();
    return () => {
      active = false;
    };
  }, []);

  const setStatus = async (id: number, status: ApiReservation["status"]) => {
    try {
      setUpdatingId(id);
      const updated = await updateReservationStatus(id, status);
      setReservations((prev) => prev.map((r) => (r.id === id ? updated : r)));
      toast.success(`Reservation marked as ${status}.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update reservation.";
      toast.error(message);
    } finally {
      setUpdatingId(null);
    }
  };

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
                {loading && (
                  <tr>
                    <td colSpan={6} className="py-6 px-4 text-center text-muted-foreground">Loading reservations from PostgreSQL...</td>
                  </tr>
                )}
                {!loading && reservations.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 px-4 text-center text-muted-foreground">No reservations found yet.</td>
                  </tr>
                )}
                {reservations.map((r) => (
                  <tr key={r.id} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">{r.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{r.reservation_date}</td>
                    <td className="py-3 px-4 text-muted-foreground">{formatTime(r.reservation_time)}</td>
                    <td className="py-3 px-4 text-foreground">{r.guests}</td>
                    <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${r.status === "Confirmed" ? "bg-green-100 text-green-700" : r.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{r.status}</span></td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-green-600"
                        disabled={updatingId === r.id}
                        onClick={() => setStatus(r.id, "Confirmed")}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive"
                        disabled={updatingId === r.id}
                        onClick={() => setStatus(r.id, "Cancelled")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
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
