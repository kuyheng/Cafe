import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminSettings() {
  const [profile, setProfile] = useState({ name: "Admin User", email: "kuyheng503@gmail.com" });

  return (
    <AdminLayout>
      <div className="max-w-2xl space-y-6">
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="font-heading text-lg">Profile Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
              <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="bg-background border-border" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="bg-background border-border" />
            </div>
            <Button onClick={() => toast.success("Profile updated!")} className="bg-primary text-primary-foreground">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="font-heading text-lg">Change Password</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input type="password" placeholder="Current password" className="bg-background border-border" />
            <Input type="password" placeholder="New password" className="bg-background border-border" />
            <Input type="password" placeholder="Confirm new password" className="bg-background border-border" />
            <Button onClick={() => toast.success("Password updated!")} className="bg-primary text-primary-foreground">Update Password</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
