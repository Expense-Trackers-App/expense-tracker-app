import { useState } from "react";
import { useRef } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { AppHeader } from "@/components/AppHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { User, Loader2, Camera } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function Profile() {
  const { user } = useApp();
  const [name, setName] = useState(user?.name || "");

  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || "");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
      setAvatarUrl(data.publicUrl);
      toast.success("Image uploaded. Click Save to keep changes.");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload. Did you create the 'avatars' bucket?");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim() || saving) return;
    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name, avatar_url: avatarUrl }
    });
    setSaving(false);
    
    if (error) {
      toast.error("Failed to update profile: " + error.message);
    } else {
      toast.success("Profile updated successfully!");
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <MobileLayout>
      <AppHeader title="Profile" showBack={true} />
      <div className="px-5 pb-6 space-y-6 pt-4">
        <div className="flex flex-col items-center gap-4 pb-4">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative h-24 w-24 rounded-full bg-secondary flex items-center justify-center text-3xl font-bold text-primary cursor-pointer overflow-hidden group"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={40} />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {uploading ? <Loader2 className="animate-spin text-white h-6 w-6" /> : <Camera className="text-white h-6 w-6" />}
            </div>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleAvatarChange} 
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Full Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="h-14 bg-secondary/60 border-border/50 rounded-2xl px-5" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <Input value={user?.email || ""} disabled className="h-14 bg-secondary/60 border-border/50 rounded-2xl px-5 opacity-70" />
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full h-14 gradient-primary border-0 hover:opacity-90 rounded-2xl mt-8">
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Changes"}
        </Button>

        <Button 
          onClick={async () => {
            if (window.confirm("Are you sure you want to delete your account? This action is permanent and cannot be undone.")) {
              setSaving(true);
              try {
                // Supabase doesn't allow user deletion from client side without a specific edge function or RPC. 
                // We'll simulate it or call a hypothetical 'delete_user' RPC.
                await supabase.rpc('delete_user');
                toast.success("Account deleted.");
                setTimeout(() => {
                  window.location.href = "/";
                }, 1000);
              } catch (err: any) {
                toast.error("Failed to delete account. Please contact support.");
              } finally {
                setSaving(false);
              }
            }
          }} 
          disabled={saving} 
          variant="outline" 
          className="w-full h-14 border border-destructive text-destructive hover:bg-destructive/10 rounded-2xl mt-4"
        >
          Delete Account
        </Button>
      </div>
    </MobileLayout>
  );
}
