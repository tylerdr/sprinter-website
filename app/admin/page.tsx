"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  Users, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Upload,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { CMSImages } from "@/components/admin/cms-images";
import { CMSContent } from "@/components/admin/cms-content";
import { CMSArticles } from "@/components/admin/cms-articles";
import { CMSSettings } from "@/components/admin/cms-settings";
import { AgentChat } from "@/components/ai/agent-chat";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    articles: 0,
    images: 0,
    content_blocks: 0,
    users: 0
  });
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuth();
    loadStats();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/admin/login");
        return;
      }

      const { data: profile } = await supabase
        .from("admin_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile || !profile.is_active) {
        await supabase.auth.signOut();
        router.push("/admin/login");
        return;
      }

      setUser(user);
      setProfile(profile);
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin/login");
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const [articles, images, content, users] = await Promise.all([
        supabase.from("articles").select("id", { count: "exact", head: true }),
        supabase.from("images").select("id", { count: "exact", head: true }),
        supabase.from("content_blocks").select("id", { count: "exact", head: true }),
        supabase.from("admin_profiles").select("id", { count: "exact", head: true })
      ]);

      setStats({
        articles: articles.count || 0,
        images: images.count || 0,
        content_blocks: content.count || 0,
        users: users.count || 0
      });
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    toast.success("Logged out successfully");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-start" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-6 h-6 text-brand-start" />
                <h1 className="text-xl font-bold">Sprinter Admin</h1>
              </div>
              {profile && (
                <Badge variant={profile.role === "super_admin" ? "default" : "secondary"}>
                  {profile.role.replace("_", " ").toUpperCase()}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {profile?.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.articles}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.images}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Content Blocks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.content_blocks}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Admin Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users}</div>
            </CardContent>
          </Card>
        </div>

        {/* CMS Tabs */}
        <Tabs defaultValue="articles" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="articles" className="gap-2">
              <FileText className="w-4 h-4" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="images" className="gap-2">
              <ImageIcon className="w-4 h-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <Edit className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <CMSArticles profile={profile} onUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="images">
            <CMSImages profile={profile} onUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="content">
            <CMSContent profile={profile} onUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="settings">
            <CMSSettings profile={profile} />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* AI Agent Chat for Admin */}
      <AgentChat 
        isAdmin={true}
        pageContext={{
          url: window.location.href,
          title: 'Admin Dashboard',
          section: 'admin'
        }}
        userProfile={{
          email: profile?.email,
          role: profile?.role
        }}
      />
    </div>
  );
}