import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteMessage, getMessages, markMessageRead, type ApiMessage } from "@/lib/api";

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toISOString().slice(0, 10);
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ApiMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    const loadMessages = async () => {
      try {
        const rows = await getMessages();
        if (active) {
          setMessages(rows);
        }
      } catch {
        if (active) {
          toast.error("Failed to load messages from database.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadMessages();
    return () => {
      active = false;
    };
  }, []);

  const onMarkRead = async (id: number) => {
    try {
      setBusyId(id);
      const updated = await markMessageRead(id);
      setMessages((prev) => prev.map((msg) => (msg.id === id ? updated : msg)));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update message.";
      toast.error(message);
    } finally {
      setBusyId(null);
    }
  };

  const onDelete = async (id: number) => {
    try {
      setBusyId(id);
      await deleteMessage(id);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      toast.success("Message deleted.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete message.";
      toast.error(message);
    } finally {
      setBusyId(null);
    }
  };

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
                {loading && (
                  <tr>
                    <td colSpan={5} className="py-6 px-4 text-center text-muted-foreground">Loading messages from PostgreSQL...</td>
                  </tr>
                )}
                {!loading && messages.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 px-4 text-center text-muted-foreground">No messages yet.</td>
                  </tr>
                )}
                {messages.map((m) => (
                  <tr key={m.id} className={`border-b border-border/50 ${!m.is_read ? "bg-accent/10" : ""}`}>
                    <td className="py-3 px-4 font-medium text-foreground">{!m.is_read && <span className="inline-block h-2 w-2 rounded-full bg-accent mr-2" />}{m.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{m.email}</td>
                    <td className="py-3 px-4 text-foreground">{m.subject || "(No subject)"}</td>
                    <td className="py-3 px-4 text-muted-foreground">{formatDate(m.created_at)}</td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        disabled={busyId === m.id || m.is_read}
                        onClick={() => onMarkRead(m.id)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive"
                        disabled={busyId === m.id}
                        onClick={() => onDelete(m.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
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
