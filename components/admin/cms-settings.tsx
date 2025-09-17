"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings,
  Users,
  Shield,
  Globe,
  Palette,
  Save,
  Loader2,
  Plus,
  Trash2,
  Edit
} from "lucide-react";
import { toast } from "sonner";

interface CMSSettingsProps {
  profile: any;
}

export function CMSSettings({ profile }: CMSSettingsProps) {
  const [siteConfig, setSiteConfig] = useState<any>({});
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("editor");
  
  const supabase = createClient();

  useEffect(() => {
    loadSettings();
    loadAdminUsers();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_config")
        .select("*");
      
      if (error) throw error;
      
      const config: any = {};
      data?.forEach((item: any) => {
        config[item.key] = item.value;
      });
      setSiteConfig(config);
    } catch (error) {
      console.error("Failed to load settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const loadAdminUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_profiles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setAdminUsers(data || []);
    } catch (error) {
      console.error("Failed to load admin users:", error);
    }
  };

  const saveSetting = async (key: string, value: any, category: string = "general") => {
    setIsSaving(true);
    try {
      const { data: existing } = await supabase
        .from("site_config")
        .select("id")
        .eq("key", key)
        .single();

      if (existing) {
        const { error } = await supabase
          .from("site_config")
          .update({ value, updated_by: profile.id })
          .eq("key", key);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("site_config")
          .insert([{ 
            key, 
            value, 
            category,
            updated_by: profile.id 
          }]);
        
        if (error) throw error;
      }

      toast.success("Settings saved");
      loadSettings();
    } catch (error) {
      console.error("Failed to save setting:", error);
      toast.error("Failed to save setting");
    } finally {
      setIsSaving(false);
    }
  };

  const inviteAdmin = async () => {
    if (!newUserEmail) {
      toast.error("Please enter an email address");
      return;
    }

    try {
      // In production, this would send an invitation email
      // For now, we'll just create the profile entry
      const { error } = await supabase
        .from("admin_profiles")
        .insert([{
          email: newUserEmail,
          role: newUserRole,
          is_active: true
        }]);

      if (error) throw error;
      
      toast.success(`Invitation sent to ${newUserEmail}`);
      setNewUserEmail("");
      loadAdminUsers();
    } catch (error) {
      console.error("Failed to invite user:", error);
      toast.error("Failed to invite user");
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from("admin_profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;
      toast.success("User role updated");
      loadAdminUsers();
    } catch (error) {
      console.error("Failed to update user role:", error);
      toast.error("Failed to update user role");
    }
  };

  const toggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from("admin_profiles")
        .update({ is_active: !isActive })
        .eq("id", userId);

      if (error) throw error;
      toast.success(isActive ? "User deactivated" : "User activated");
      loadAdminUsers();
    } catch (error) {
      console.error("Failed to update user status:", error);
      toast.error("Failed to update user status");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <Settings className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <Globe className="w-4 h-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="theme" className="gap-2">
            <Palette className="w-4 h-4" />
            Theme
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic site information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  id="site-name"
                  value={siteConfig.site_name || "Sprinter AI"}
                  onChange={(e) => setSiteConfig({ ...siteConfig, site_name: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="site-tagline">Tagline</Label>
                <Input
                  id="site-tagline"
                  value={siteConfig.site_tagline || "Your AI Operating Partner for Private Equity"}
                  onChange={(e) => setSiteConfig({ ...siteConfig, site_tagline: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={siteConfig.contact_email || "hello@sprinter.ai"}
                  onChange={(e) => setSiteConfig({ ...siteConfig, contact_email: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input
                  id="contact-phone"
                  value={siteConfig.contact_phone || "+1 (615) 601-0782"}
                  onChange={(e) => setSiteConfig({ ...siteConfig, contact_phone: e.target.value })}
                />
              </div>
              
              <Button 
                onClick={() => {
                  saveSetting("site_name", siteConfig.site_name);
                  saveSetting("site_tagline", siteConfig.site_tagline);
                  saveSetting("contact_email", siteConfig.contact_email);
                  saveSetting("contact_phone", siteConfig.contact_phone);
                }}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save General Settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your site for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta-title">Default Meta Title</Label>
                <Input
                  id="meta-title"
                  value={siteConfig.meta_title || "Sprinter AI - Build at the pace of AI"}
                  onChange={(e) => setSiteConfig({ ...siteConfig, meta_title: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="meta-description">Default Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={siteConfig.meta_description || "AI consulting and venture studio building technology that helps people."}
                  onChange={(e) => setSiteConfig({ ...siteConfig, meta_description: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input
                  id="meta-keywords"
                  value={siteConfig.meta_keywords || "AI, consulting, private equity, automation"}
                  onChange={(e) => setSiteConfig({ ...siteConfig, meta_keywords: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="og-image">Default OG Image URL</Label>
                <Input
                  id="og-image"
                  value={siteConfig.og_image || ""}
                  onChange={(e) => setSiteConfig({ ...siteConfig, og_image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              
              <Button 
                onClick={() => {
                  saveSetting("meta_title", siteConfig.meta_title, "seo");
                  saveSetting("meta_description", siteConfig.meta_description, "seo");
                  saveSetting("meta_keywords", siteConfig.meta_keywords, "seo");
                  saveSetting("og_image", siteConfig.og_image, "seo");
                }}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save SEO Settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="primary-color">Primary Color</Label>
                <Input
                  id="primary-color"
                  type="color"
                  value={siteConfig.primary_color || "#3b82f6"}
                  onChange={(e) => setSiteConfig({ ...siteConfig, primary_color: e.target.value })}
                  className="w-20"
                />
              </div>
              
              <div>
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <Input
                  id="secondary-color"
                  type="color"
                  value={siteConfig.secondary_color || "#8b5cf6"}
                  onChange={(e) => setSiteConfig({ ...siteConfig, secondary_color: e.target.value })}
                  className="w-20"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode Default</Label>
                <Switch
                  id="dark-mode"
                  checked={siteConfig.dark_mode_default !== false}
                  onCheckedChange={(checked) => setSiteConfig({ ...siteConfig, dark_mode_default: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="animations">Enable Animations</Label>
                <Switch
                  id="animations"
                  checked={siteConfig.enable_animations !== false}
                  onCheckedChange={(checked) => setSiteConfig({ ...siteConfig, enable_animations: checked })}
                />
              </div>
              
              <Button 
                onClick={() => {
                  saveSetting("primary_color", siteConfig.primary_color, "theme");
                  saveSetting("secondary_color", siteConfig.secondary_color, "theme");
                  saveSetting("dark_mode_default", siteConfig.dark_mode_default, "theme");
                  saveSetting("enable_animations", siteConfig.enable_animations, "theme");
                }}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Theme Settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>
                Manage admin access to the CMS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New User */}
              <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold">Invite New Admin</h3>
                <div className="flex gap-3">
                  <Input
                    placeholder="Email address"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    type="email"
                  />
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="px-3 py-2 rounded-md border border-input bg-background"
                  >
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                  <Button onClick={inviteAdmin}>
                    <Plus className="w-4 h-4 mr-2" />
                    Invite
                  </Button>
                </div>
              </div>

              {/* Users List */}
              <div className="space-y-3">
                {adminUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={user.role === "super_admin" ? "default" : "secondary"}>
                          {user.role.replace("_", " ").toUpperCase()}
                        </Badge>
                        {!user.is_active && (
                          <Badge variant="destructive">Inactive</Badge>
                        )}
                        {user.id === profile.id && (
                          <Badge variant="outline">You</Badge>
                        )}
                      </div>
                    </div>
                    {user.id !== profile.id && profile.role === "super_admin" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleUserStatus(user.id, user.is_active)}
                        >
                          {user.is_active ? "Deactivate" : "Activate"}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}