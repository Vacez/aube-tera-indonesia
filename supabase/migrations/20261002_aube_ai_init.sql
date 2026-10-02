-- ====================================================================
-- PT. AUBE TERA INDONESIA - DATABASE MIGRATION FOR AUBE AI INTEGRATION
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    short_desc TEXT NOT NULL,
    full_desc TEXT NOT NULL,
    icon VARCHAR(100) NOT NULL,
    tag VARCHAR(50) NOT NULL,
    items JSONB DEFAULT '[]'::jsonb,
    tech_used JSONB DEFAULT '[]'::jsonb,
    benefits JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PORTFOLIO PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    category_label VARCHAR(100) NOT NULL,
    image TEXT NOT NULL,
    badge VARCHAR(50) NOT NULL,
    short_desc TEXT NOT NULL,
    overview TEXT NOT NULL,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    results JSONB DEFAULT '[]'::jsonb,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    live_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. LEADS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    business_type VARCHAR(255),
    project_type VARCHAR(255),
    budget_range VARCHAR(100),
    timeline VARCHAR(100),
    project_description TEXT,
    ai_summary TEXT,
    recommended_solution TEXT,
    project_complexity VARCHAR(50) DEFAULT 'Medium',
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. AI CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.ai_conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    user_id UUID,
    title VARCHAR(255) DEFAULT 'Konsultasi Proyek AUBE AI',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. AI MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.ai_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id UUID REFERENCES public.ai_conversations(id) ON DELETE CASCADE NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. AI PROJECT BRIEFS TABLE
CREATE TABLE IF NOT EXISTS public.ai_project_briefs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id UUID REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    project_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(255) NOT NULL,
    objective TEXT NOT NULL,
    target_users TEXT NOT NULL,
    platform VARCHAR(255) NOT NULL,
    user_roles JSONB DEFAULT '[]'::jsonb,
    core_features JSONB DEFAULT '[]'::jsonb,
    admin_features JSONB DEFAULT '[]'::jsonb,
    integrations JSONB DEFAULT '[]'::jsonb,
    technical_recommendation TEXT,
    complexity VARCHAR(50) DEFAULT 'Medium',
    timeline_estimate VARCHAR(100),
    budget_range VARCHAR(100),
    open_questions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. INDEXES FOR HIGH PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_session ON public.ai_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_ai_messages_conversation ON public.ai_messages(conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_ai_briefs_conversation ON public.ai_project_briefs(conversation_id);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_project_briefs ENABLE ROW LEVEL SECURITY;

-- Public can read active services & portfolio
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read portfolio_projects" ON public.portfolio_projects FOR SELECT USING (true);

-- Public can insert leads & conversations (for website visitors)
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert ai_conversations" ON public.ai_conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read ai_conversations by session" ON public.ai_conversations FOR SELECT USING (true);
CREATE POLICY "Public insert ai_messages" ON public.ai_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read ai_messages" ON public.ai_messages FOR SELECT USING (true);
CREATE POLICY "Public insert ai_project_briefs" ON public.ai_project_briefs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read ai_project_briefs" ON public.ai_project_briefs FOR SELECT USING (true);

-- Admin full access policy (authenticated admin users)
CREATE POLICY "Admin full leads" ON public.leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full ai_conversations" ON public.ai_conversations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full ai_messages" ON public.ai_messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full ai_project_briefs" ON public.ai_project_briefs FOR ALL USING (auth.role() = 'authenticated');
