import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coffee, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success(isRegister ? "Account created! Please check your email." : "Welcome back!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Coffee className="h-8 w-8 text-accent" />
            <span className="font-heading text-2xl font-bold text-foreground">Kuyheng Cafe</span>
          </Link>
          <h1 className="font-heading text-3xl font-bold text-foreground">{isRegister ? "Create Account" : "Welcome Back"}</h1>
          <p className="text-muted-foreground text-sm mt-1">{isRegister ? "Join the Kuyheng Cafe community" : "Sign in to your account"}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl border border-border flex flex-col gap-4">
          {isRegister && (
            <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background border-border" />
          )}
          <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-background border-border" />
          <div className="relative">
            <Input placeholder="Password" type={showPw ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="bg-background border-border pr-10" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
            {isRegister ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsRegister(!isRegister)} className="text-accent font-medium hover:underline">
            {isRegister ? "Sign In" : "Register"}
          </button>
        </p>
        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-accent">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
