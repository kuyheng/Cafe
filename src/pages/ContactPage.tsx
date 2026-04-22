import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { createMessage, createReservation } from "@/lib/api";

type MessageForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ReservationForm = {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
};

export default function ContactPage() {
  const [messageForm, setMessageForm] = useState<MessageForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [reservationForm, setReservationForm] = useState<ReservationForm>({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });
  const [messageLoading, setMessageLoading] = useState(false);
  const [reservationLoading, setReservationLoading] = useState(false);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageForm.name || !messageForm.email || !messageForm.message) {
      toast.error("Please fill in all required message fields.");
      return;
    }

    try {
      setMessageLoading(true);
      await createMessage({
        name: messageForm.name,
        email: messageForm.email,
        subject: messageForm.subject,
        message: messageForm.message,
      });
      toast.success("Message sent and saved to database.");
      setMessageForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send message.";
      toast.error(message);
    } finally {
      setMessageLoading(false);
    }
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const guests = Number(reservationForm.guests);
    if (!reservationForm.name || !reservationForm.date || !reservationForm.time || !Number.isFinite(guests) || guests < 1) {
      toast.error("Please complete reservation name, date, time, and guests.");
      return;
    }

    try {
      setReservationLoading(true);
      await createReservation({
        name: reservationForm.name,
        email: reservationForm.email,
        date: reservationForm.date,
        time: reservationForm.time,
        guests,
        notes: reservationForm.notes,
      });
      toast.success("Reservation created in database.");
      setReservationForm({ name: "", email: "", date: "", time: "", guests: "2", notes: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create reservation.";
      toast.error(message);
    } finally {
      setReservationLoading(false);
    }
  };

  return (
    <Layout>
      <section className="section-padding bg-background min-h-screen">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Get In Touch</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Contact Us</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Visit Us</h2>
              <div className="flex flex-col gap-5 mb-8">
                <div className="flex items-start gap-4"><MapPin className="h-5 w-5 text-accent mt-0.5" /><div><p className="font-semibold text-foreground">Address</p><p className="text-muted-foreground text-sm">123 Cafe Street, New York, NY 10001</p></div></div>
                <div className="flex items-start gap-4"><Phone className="h-5 w-5 text-accent mt-0.5" /><div><p className="font-semibold text-foreground">Phone</p><p className="text-muted-foreground text-sm">(555) 123-4567</p></div></div>
                <div className="flex items-start gap-4"><Mail className="h-5 w-5 text-accent mt-0.5" /><div><p className="font-semibold text-foreground">Email</p><p className="text-muted-foreground text-sm">kuyheng503@gmail.com</p></div></div>
                <div className="flex items-start gap-4"><Clock className="h-5 w-5 text-accent mt-0.5" /><div><p className="font-semibold text-foreground">Opening Hours</p><p className="text-muted-foreground text-sm">Mon-Fri: 7:00 AM - 9:00 PM</p><p className="text-muted-foreground text-sm">Sat-Sun: 8:00 AM - 10:00 PM</p></div></div>
              </div>

              <div className="rounded-xl overflow-hidden border border-border h-56 bg-muted flex items-center justify-center">
                <iframe
                  title="Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1234567890"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Send a Message</h2>
              <form onSubmit={handleMessageSubmit} className="flex flex-col gap-4">
                <Input placeholder="Your Name *" value={messageForm.name} onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })} className="bg-card border-border" />
                <Input placeholder="Your Email *" type="email" value={messageForm.email} onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })} className="bg-card border-border" />
                <Input placeholder="Subject" value={messageForm.subject} onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })} className="bg-card border-border" />
                <Textarea placeholder="Your Message *" rows={5} value={messageForm.message} onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })} className="bg-card border-border" />
                <Button type="submit" disabled={messageLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {messageLoading ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                </Button>
              </form>

              <form onSubmit={handleReservationSubmit} className="mt-8 p-6 bg-card rounded-xl border border-border space-y-3">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Make a Reservation</h3>
                <p className="text-muted-foreground text-sm mb-4">Book your table for a special occasion or just a cozy evening.</p>
                <Input placeholder="Your Name *" value={reservationForm.name} onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })} className="bg-background border-border" />
                <Input placeholder="Your Email" type="email" value={reservationForm.email} onChange={(e) => setReservationForm({ ...reservationForm, email: e.target.value })} className="bg-background border-border" />
                <div className="grid grid-cols-2 gap-3">
                  <Input type="date" value={reservationForm.date} onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })} className="bg-background border-border" />
                  <Input type="time" value={reservationForm.time} onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })} className="bg-background border-border" />
                </div>
                <Input
                  placeholder="Number of guests *"
                  type="number"
                  min={1}
                  value={reservationForm.guests}
                  onChange={(e) => setReservationForm({ ...reservationForm, guests: e.target.value })}
                  className="bg-background border-border"
                />
                <Textarea
                  rows={3}
                  placeholder="Notes (optional)"
                  value={reservationForm.notes}
                  onChange={(e) => setReservationForm({ ...reservationForm, notes: e.target.value })}
                  className="bg-background border-border"
                />
                <Button type="submit" disabled={reservationLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  {reservationLoading ? "Saving..." : "Reserve Table"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
