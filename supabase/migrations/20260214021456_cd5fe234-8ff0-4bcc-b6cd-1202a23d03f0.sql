
CREATE TABLE public.gift_picks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gift TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gift_picks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (no auth required)
CREATE POLICY "Anyone can insert picks" ON public.gift_picks FOR INSERT WITH CHECK (true);

-- Allow anyone to read picks (admin page, no auth)
CREATE POLICY "Anyone can read picks" ON public.gift_picks FOR SELECT USING (true);
