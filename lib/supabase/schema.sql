-- Supabase Schema for Sprinter AI CMS
-- Run this in the Supabase SQL editor to create the necessary tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Images table for managing all website images
CREATE TABLE IF NOT EXISTS images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(255) UNIQUE NOT NULL, -- Unique identifier for where image is used (e.g., 'hero-background', 'about-team')
  url TEXT NOT NULL, -- URL of the image (can be Supabase storage URL or external)
  alt_text TEXT, -- Alt text for accessibility
  title VARCHAR(255), -- Optional title
  description TEXT, -- Optional description
  section VARCHAR(100), -- Website section (e.g., 'home', 'about', 'solutions')
  page VARCHAR(100), -- Specific page if applicable
  width INTEGER, -- Image width in pixels
  height INTEGER, -- Image height in pixels
  mime_type VARCHAR(50), -- MIME type (e.g., 'image/jpeg', 'image/png')
  size_bytes INTEGER, -- File size in bytes
  metadata JSONB, -- Additional metadata as JSON
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Content blocks table for managing text content
CREATE TABLE IF NOT EXISTS content_blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(255) UNIQUE NOT NULL, -- Unique identifier (e.g., 'hero-title', 'about-description')
  content TEXT NOT NULL, -- The actual content (can be markdown)
  content_type VARCHAR(50) DEFAULT 'text', -- 'text', 'markdown', 'html', 'json'
  section VARCHAR(100), -- Website section
  page VARCHAR(100), -- Specific page
  language VARCHAR(10) DEFAULT 'en', -- Language code for i18n
  metadata JSONB, -- Additional metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Articles table for blog/insights content
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL, -- URL slug
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  content TEXT NOT NULL, -- Markdown content
  excerpt TEXT, -- Short excerpt for listings
  category VARCHAR(100) NOT NULL, -- 'ai-models', 'trends', 'how-to-win', etc.
  tags TEXT[], -- Array of tags
  author_name VARCHAR(255),
  author_email VARCHAR(255),
  author_avatar TEXT,
  featured_image TEXT, -- URL to featured image
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'published', 'archived'
  published_at TIMESTAMPTZ,
  reading_time INTEGER, -- Estimated reading time in minutes
  view_count INTEGER DEFAULT 0,
  metadata JSONB, -- SEO metadata, custom fields, etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Site configuration table
CREATE TABLE IF NOT EXISTS site_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  category VARCHAR(100), -- 'general', 'seo', 'theme', 'features'
  is_public BOOLEAN DEFAULT false, -- Whether this config is publicly accessible
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Navigation items table
CREATE TABLE IF NOT EXISTS navigation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label VARCHAR(255) NOT NULL,
  href VARCHAR(255) NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES navigation_items(id) ON DELETE CASCADE,
  position INTEGER DEFAULT 0, -- For ordering
  section VARCHAR(50) NOT NULL, -- 'header', 'footer', 'sidebar'
  is_active BOOLEAN DEFAULT true,
  icon VARCHAR(50), -- Icon identifier
  badge_text VARCHAR(50), -- Optional badge (e.g., 'New', 'Beta')
  badge_color VARCHAR(50), -- Badge color
  target VARCHAR(20) DEFAULT '_self', -- '_self', '_blank'
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media library table for all uploaded files
CREATE TABLE IF NOT EXISTS media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255),
  file_path TEXT NOT NULL, -- Path in storage bucket
  url TEXT NOT NULL, -- Public URL
  mime_type VARCHAR(100),
  size_bytes BIGINT,
  width INTEGER, -- For images
  height INTEGER, -- For images
  duration INTEGER, -- For videos/audio in seconds
  folder VARCHAR(255), -- Virtual folder organization
  tags TEXT[],
  metadata JSONB,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES auth.users(id)
);

-- Admin users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  role VARCHAR(50) DEFAULT 'editor', -- 'super_admin', 'admin', 'editor', 'viewer'
  permissions JSONB, -- Granular permissions as JSON
  last_login TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit log table for tracking changes
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name VARCHAR(100) NOT NULL,
  record_id UUID NOT NULL,
  action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete'
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  user_email VARCHAR(255),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_images_key ON images(key);
CREATE INDEX idx_images_section ON images(section);
CREATE INDEX idx_content_blocks_key ON content_blocks(key);
CREATE INDEX idx_content_blocks_section ON content_blocks(section);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_navigation_items_section ON navigation_items(section);
CREATE INDEX idx_navigation_items_position ON navigation_items(position);
CREATE INDEX idx_media_library_folder ON media_library(folder);
CREATE INDEX idx_audit_logs_table_record ON audit_logs(table_name, record_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- Row Level Security (RLS) Policies
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view published articles" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view active navigation" ON navigation_items
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view images" ON images
  FOR SELECT USING (true);

CREATE POLICY "Public can view content blocks" ON content_blocks
  FOR SELECT USING (true);

CREATE POLICY "Public can view public site config" ON site_config
  FOR SELECT USING (is_public = true);

-- Admin policies (users with admin role can do everything)
CREATE POLICY "Admins can manage images" ON images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role IN ('super_admin', 'admin', 'editor')
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "Admins can manage content" ON content_blocks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role IN ('super_admin', 'admin', 'editor')
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "Admins can manage articles" ON articles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role IN ('super_admin', 'admin', 'editor')
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "Admins can manage site config" ON site_config
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role IN ('super_admin', 'admin')
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "Admins can manage navigation" ON navigation_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role IN ('super_admin', 'admin')
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "Admins can manage media" ON media_library
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role IN ('super_admin', 'admin', 'editor')
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "Users can view own profile" ON admin_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Super admins can manage profiles" ON admin_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role = 'super_admin'
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "Admins can view audit logs" ON audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.role IN ('super_admin', 'admin')
      AND admin_profiles.is_active = true
    )
  );

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_images_updated_at BEFORE UPDATE ON images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_blocks_updated_at BEFORE UPDATE ON content_blocks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_config_updated_at BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_navigation_items_updated_at BEFORE UPDATE ON navigation_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_profiles_updated_at BEFORE UPDATE ON admin_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (table_name, record_id, action, new_data, user_id, user_email)
    VALUES (TG_TABLE_NAME, NEW.id, 'create', to_jsonb(NEW), auth.uid(), current_setting('request.jwt.claims', true)::json->>'email');
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_logs (table_name, record_id, action, old_data, new_data, user_id, user_email)
    VALUES (TG_TABLE_NAME, NEW.id, 'update', to_jsonb(OLD), to_jsonb(NEW), auth.uid(), current_setting('request.jwt.claims', true)::json->>'email');
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (table_name, record_id, action, old_data, user_id, user_email)
    VALUES (TG_TABLE_NAME, OLD.id, 'delete', to_jsonb(OLD), auth.uid(), current_setting('request.jwt.claims', true)::json->>'email');
    RETURN OLD;
  END IF;
END;
$$ language 'plpgsql';

-- Apply audit triggers to important tables
CREATE TRIGGER audit_images AFTER INSERT OR UPDATE OR DELETE ON images
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_content_blocks AFTER INSERT OR UPDATE OR DELETE ON content_blocks
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_articles AFTER INSERT OR UPDATE OR DELETE ON articles
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_site_config AFTER INSERT OR UPDATE OR DELETE ON site_config
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_navigation_items AFTER INSERT OR UPDATE OR DELETE ON navigation_items
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();