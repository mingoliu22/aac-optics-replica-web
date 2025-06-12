
-- 创建存储桶用于新闻附件
INSERT INTO storage.buckets (id, name, public) 
VALUES ('news-attachments', 'news-attachments', true);

-- 为存储桶设置访问策略
CREATE POLICY "Anyone can view news attachments" ON storage.objects
FOR SELECT USING (bucket_id = 'news-attachments');

CREATE POLICY "Authenticated users can upload news attachments" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'news-attachments' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own uploads" ON storage.objects
FOR UPDATE USING (bucket_id = 'news-attachments' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own uploads" ON storage.objects
FOR DELETE USING (bucket_id = 'news-attachments' AND auth.role() = 'authenticated');

-- 创建新闻附件表
CREATE TABLE public.news_attachments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  news_id UUID NOT NULL REFERENCES public.news(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 为新闻附件表启用RLS
ALTER TABLE public.news_attachments ENABLE ROW LEVEL SECURITY;

-- 允许所有人查看已发布新闻的附件
CREATE POLICY "Anyone can view published news attachments" ON public.news_attachments
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.news 
    WHERE id = news_attachments.news_id 
    AND published = true
  )
);

-- 管理员可以管理所有附件
CREATE POLICY "Admins can manage all attachments" ON public.news_attachments
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);
