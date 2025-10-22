-- Create ai_tool_events table for tracking tool usage
CREATE TABLE IF NOT EXISTS public.ai_tool_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_slug VARCHAR(255) NOT NULL,
  tool_id UUID,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  input JSONB,
  output JSONB,
  error TEXT,
  duration_ms INTEGER,
  metadata JSONB DEFAULT '{}',
  chat_id UUID,
  message_id UUID,
  tool_call_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_tool_events_user_id ON public.ai_tool_events(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_tool_events_tool_slug ON public.ai_tool_events(tool_slug);
CREATE INDEX IF NOT EXISTS idx_ai_tool_events_created_at ON public.ai_tool_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_tool_events_chat_id ON public.ai_tool_events(chat_id);
CREATE INDEX IF NOT EXISTS idx_ai_tool_events_user_created ON public.ai_tool_events(user_id, created_at DESC);

-- Enable RLS
ALTER TABLE public.ai_tool_events ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own tool events
CREATE POLICY "Users can view own tool events" ON public.ai_tool_events
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own tool events
CREATE POLICY "Users can insert own tool events" ON public.ai_tool_events
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own tool events
CREATE POLICY "Users can update own tool events" ON public.ai_tool_events
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Service role can do everything
CREATE POLICY "Service role full access" ON public.ai_tool_events
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE pg_roles.rolname = current_user
      AND pg_roles.rolsuper = true
    )
    OR current_setting('request.jwt.claim.role', true) = 'service_role'
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_ai_tool_events_updated_at
  BEFORE UPDATE ON public.ai_tool_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add table and column comments for documentation
COMMENT ON TABLE public.ai_tool_events IS 'Stores execution history and analytics for AI tools';
COMMENT ON COLUMN public.ai_tool_events.tool_slug IS 'Unique identifier slug for the tool';
COMMENT ON COLUMN public.ai_tool_events.tool_id IS 'Optional UUID reference to tool definition';
COMMENT ON COLUMN public.ai_tool_events.user_id IS 'User who executed the tool';
COMMENT ON COLUMN public.ai_tool_events.input IS 'JSON input parameters sent to the tool';
COMMENT ON COLUMN public.ai_tool_events.output IS 'JSON output returned by the tool';
COMMENT ON COLUMN public.ai_tool_events.error IS 'Error message if tool execution failed';
COMMENT ON COLUMN public.ai_tool_events.duration_ms IS 'Execution time in milliseconds';
COMMENT ON COLUMN public.ai_tool_events.metadata IS 'Additional metadata about the execution';
COMMENT ON COLUMN public.ai_tool_events.chat_id IS 'Optional reference to chat session';
COMMENT ON COLUMN public.ai_tool_events.message_id IS 'Optional reference to chat message';
COMMENT ON COLUMN public.ai_tool_events.tool_call_id IS 'Optional unique identifier for this tool call';
COMMENT ON COLUMN public.ai_tool_events.created_at IS 'When the tool was executed';
COMMENT ON COLUMN public.ai_tool_events.updated_at IS 'Last update timestamp';