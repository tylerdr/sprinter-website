# Authentication & Proposal System Setup

## Overview

The Sprinter website includes a comprehensive authentication and proposal management system built with:
- **Next.js 15** App Router for routing and SSR
- **Supabase** for authentication and database
- **Middleware** for route protection
- **Server/Client separation** for secure data handling

## Architecture

### Route Structure

```
/                       # Public marketing site
├── /auth              # Authentication pages
│   ├── /signin        # Sign in page
│   ├── /signup        # Sign up page
│   └── /callback      # OAuth callback handler
├── /admin             # Protected admin area
│   └── /proposals     # Proposal management
│       ├── /          # List all proposals
│       └── /create    # Create new proposal
└── /proposals/[id]    # Public proposal viewer (with access control)
```

### Authentication Flow

1. **Public Routes**: Marketing pages, labs, use-cases - accessible to everyone
2. **Protected Routes**: `/admin/*` routes require authentication
3. **Hybrid Routes**: `/proposals/[id]` supports multiple access types:
   - Public access (no authentication required)
   - Magic link access (token-based)
   - Password protected
   - Authenticated user access

## Environment Configuration

### Required Environment Variables

Create a `.env.local` file with:

```bash
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Email Service (Required for proposals)
RESEND_API_KEY=your_resend_api_key

# OpenAI (Required for AI features)
OPENAI_API_KEY=your_openai_api_key

# Optional: For server-side operations
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Getting Supabase Credentials

1. Create a project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy the Project URL and anon/public key
4. (Optional) Copy the service role key for server operations

## Database Setup

### Required Tables

Run these SQL commands in your Supabase SQL editor:

```sql
-- Proposals table
CREATE TABLE proposals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  owner_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  client_name TEXT,
  client_email TEXT,
  status TEXT DEFAULT 'draft',
  type TEXT DEFAULT 'proposal',
  access_type TEXT DEFAULT 'private',
  password_hash TEXT,
  magic_token TEXT,
  content JSONB,
  settings JSONB,
  metadata JSONB
);

-- Proposal views tracking
CREATE TABLE proposal_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  viewer_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  duration INTEGER,
  metadata JSONB
);

-- Proposal events tracking
CREATE TABLE proposal_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  event_type TEXT NOT NULL,
  event_data JSONB,
  metadata JSONB
);

-- Proposal chat messages
CREATE TABLE proposal_chats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB
);

-- File uploads for proposals
CREATE TABLE proposal_uploads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES auth.users(id),
  file_name TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  file_url TEXT NOT NULL,
  metadata JSONB
);

-- Create indexes for better performance
CREATE INDEX idx_proposals_owner ON proposals(owner_id);
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposal_views_proposal ON proposal_views(proposal_id);
CREATE INDEX idx_proposal_events_proposal ON proposal_events(proposal_id);
CREATE INDEX idx_proposal_chats_proposal ON proposal_chats(proposal_id);
```

### Row Level Security (RLS)

Enable RLS and add policies:

```sql
-- Enable RLS
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_uploads ENABLE ROW LEVEL SECURITY;

-- Proposals policies
CREATE POLICY "Users can view their own proposals" ON proposals
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can create proposals" ON proposals
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own proposals" ON proposals
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Public proposals are viewable by all" ON proposals
  FOR SELECT USING (access_type = 'public');

-- Views tracking (insert only)
CREATE POLICY "Anyone can track views" ON proposal_views
  FOR INSERT WITH CHECK (true);

-- Events tracking
CREATE POLICY "Users can track events on their proposals" ON proposal_events
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM proposals 
      WHERE proposals.id = proposal_events.proposal_id 
      AND proposals.owner_id = auth.uid()
    )
  );

-- Chat messages
CREATE POLICY "Anyone can create chat messages" ON proposal_chats
  FOR INSERT WITH CHECK (true);

CREATE POLICY "View chats for accessible proposals" ON proposal_chats
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM proposals 
      WHERE proposals.id = proposal_chats.proposal_id 
      AND (
        proposals.owner_id = auth.uid() OR
        proposals.access_type = 'public'
      )
    )
  );
```

## Deployment Configuration

### Vercel Deployment

1. **Remove Static Export**: Ensure `next.config.ts` does NOT have:
   ```js
   output: 'export'  // Remove this line
   ```

2. **Add Environment Variables** in Vercel Dashboard:
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env.local`
   - Redeploy after adding variables

3. **Build Command**: Use default `next build`

4. **Output Directory**: Use default `.next`

### Middleware Configuration

The middleware (`/middleware.ts`) handles:
- Authentication checks for protected routes
- User session management
- Redirects for unauthenticated users
- API route protection

Key features:
- Skips auth if Supabase not configured (for development)
- Redirects authenticated users away from auth pages
- Protects `/admin/*` routes
- Allows public API endpoints

## Testing the System

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env.local`

3. Run development server:
   ```bash
   npm run dev
   ```

4. Access:
   - Marketing site: `http://localhost:3000`
   - Sign in: `http://localhost:3000/auth/signin`
   - Sign up: `http://localhost:3000/auth/signup`
   - Admin: `http://localhost:3000/admin/proposals` (requires auth)

### Production Testing

1. Deploy to Vercel
2. Set environment variables in Vercel dashboard
3. Test authentication flow:
   - Create account at `/auth/signup`
   - Check email for verification
   - Sign in at `/auth/signin`
   - Access admin dashboard

## Common Issues & Solutions

### Issue: 404 on auth routes
**Solution**: Ensure the app is not using static export. Check `next.config.ts`.

### Issue: Supabase connection errors
**Solution**: Verify environment variables are set correctly in production.

### Issue: OAuth redirect fails
**Solution**: Add your domain to Supabase Auth settings > Redirect URLs.

### Issue: Middleware not working
**Solution**: Ensure middleware.ts is in the root directory, not in `/app`.

## Security Considerations

1. **API Keys**: Never commit `.env.local` to git
2. **Service Role Key**: Only use on server-side, never expose to client
3. **RLS Policies**: Always enable and configure Row Level Security
4. **Password Hashing**: Use Supabase Auth for password management
5. **Magic Links**: Generate secure random tokens, expire after use

## Next Steps

1. **Email Templates**: Configure Supabase Auth email templates
2. **OAuth Providers**: Set up GitHub/Google OAuth in Supabase
3. **Custom Domain**: Configure custom auth domain if needed
4. **Monitoring**: Set up error tracking and analytics
5. **Backup**: Configure database backups in Supabase