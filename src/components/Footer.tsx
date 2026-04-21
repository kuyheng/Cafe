import { Coffee, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="cafe-gradient text-cafe-latte">
      <div className="container mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="h-6 w-6 text-cafe-gold" />
              <span className="font-heading text-xl font-bold text-cafe-cream">Kuyheng Cafe</span>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              Where every cup tells a story. Crafted with passion, served with love.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold text-cafe-cream mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              {["/", "/menu", "/about", "/gallery", "/contact"].map((p) => (
                <Link key={p} to={p} className="opacity-80 hover:text-cafe-gold transition-colors">
                  {p === "/" ? "Home" : p.slice(1).charAt(0).toUpperCase() + p.slice(2)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold text-cafe-cream mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2 opacity-80"><MapPin className="h-4 w-4 text-cafe-gold" /> 123 Cafe Street, NY 10001</div>
              <div className="flex items-center gap-2 opacity-80"><Phone className="h-4 w-4 text-cafe-gold" /> (555) 123-4567</div>
              <div className="flex items-center gap-2 opacity-80"><Mail className="h-4 w-4 text-cafe-gold" /> kuyheng503@gmail.com</div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold text-cafe-cream mb-4">Hours</h4>
            <div className="flex flex-col gap-2 text-sm opacity-80">
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-cafe-gold" /> Mon–Fri: 7am–9pm</div>
              <div className="pl-6">Sat–Sun: 8am–10pm</div>
            </div>
          </div>
        </div>

        <div className="border-t border-cafe-mocha mt-10 pt-6 text-center text-sm opacity-60">
          © {new Date().getFullYear()} Kuyheng Cafe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
