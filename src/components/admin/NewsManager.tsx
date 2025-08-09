import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Paperclip, Image } from 'lucide-react';
import ImageUpload from './ImageUpload';
import ImageGallery from './ImageGallery';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  title_en?: string | null;
  content_en?: string | null;
  summary_en?: string | null;
}

interface ImageAttachment {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

const NewsManager = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [images, setImages] = useState<ImageAttachment[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    title_en: '',
    content: '',
    content_en: '',
    summary: '',
    summary_en: '',
    image_url: '',
    published: false
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      toast({
        title: "获取新闻失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchImages = async (newsId: string) => {
    try {
      const { data, error } = await supabase
        .from('news_attachments')
        .select('*')
        .eq('news_id', newsId)
        .or('file_type.eq.image/jpeg,file_type.eq.image/png,file_type.eq.image/gif,file_type.eq.image/webp')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('获取图片失败:', error);
      setImages([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingNews) {
        const { error } = await supabase
          .from('news')
          .update(formData)
          .eq('id', editingNews.id);

        if (error) throw error;
        toast({ title: "新闻更新成功" });
      } else {
        const { error } = await supabase
          .from('news')
          .insert([formData]);

        if (error) throw error;
        toast({ title: "新闻创建成功" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchNews();
    } catch (error) {
      toast({
        title: "操作失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这条新闻吗？相关图片也会被删除。')) return;

    try {
      // 先删除相关图片
      const { data: imagesData } = await supabase
        .from('news_attachments')
        .select('file_path')
        .eq('news_id', id);

      if (imagesData && imagesData.length > 0) {
        const filePaths = imagesData.map(img => img.file_path);
        await supabase.storage
          .from('news-attachments')
          .remove(filePaths);
      }

      // 删除新闻（图片记录会因为外键约束自动删除）
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "新闻删除成功" });
      fetchNews();
    } catch (error) {
      toast({
        title: "删除失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      title_en: '',
      content: '',
      content_en: '',
      summary: '',
      summary_en: '',
      image_url: '',
      published: false
    });
    setEditingNews(null);
    setImages([]);
  };

  const openEditDialog = async (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      title_en: newsItem.title_en || '',
      content: newsItem.content,
      content_en: newsItem.content_en || '',
      summary: newsItem.summary || '',
      summary_en: newsItem.summary_en || '',
      image_url: newsItem.image_url || '',
      published: newsItem.published
    });
    await fetchImages(newsItem.id);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleImageUploaded = (file: any) => {
    setImages(prev => [file, ...prev]);
  };

  const handleImageDeleted = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  if (loading && news.length === 0) {
    return <div className="text-center py-8">加载中...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>新闻管理</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                添加新闻
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingNews ? '编辑新闻' : '添加新闻'}
                </DialogTitle>
              </DialogHeader>
              
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content">内容信息</TabsTrigger>
                  <TabsTrigger value="images" disabled={!editingNews}>
                    图片管理 ({images.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="content">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Tabs defaultValue="zh" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="zh">中文内容</TabsTrigger>
                        <TabsTrigger value="en">English Content</TabsTrigger>
                      </TabsList>

                      <TabsContent value="zh" className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">标题</label>
                          <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">摘要</label>
                          <Textarea
                            value={formData.summary}
                            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">内容</label>
                          <Textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows={10}
                            required
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="en" className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Title (EN)</label>
                          <Input
                            value={formData.title_en}
                            onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Summary (EN)</label>
                          <Textarea
                            value={formData.summary_en}
                            onChange={(e) => setFormData({ ...formData, summary_en: e.target.value })}
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Content (EN)</label>
                          <Textarea
                            value={formData.content_en}
                            onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                            rows={10}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div>
                      <label className="block text-sm font-medium mb-2">图片URL</label>
                      <Input
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={formData.published}
                        onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                      />
                      <label className="text-sm font-medium">发布</label>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        取消
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? '保存中...' : '保存'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="images" className="space-y-4">
                  {editingNews && (
                    <>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">图片管理</h3>
                        <ImageUpload
                          newsId={editingNews.id}
                          onImageUploaded={handleImageUploaded}
                        />
                      </div>
                      <ImageGallery
                        newsId={editingNews.id}
                        images={images}
                        onImageDeleted={handleImageDeleted}
                      />
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标题</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>图片</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.published ? '已发布' : '草稿'}
                  </span>
                </TableCell>
                <TableCell>
                  <ImageCount newsId={item.id} />
                </TableCell>
                <TableCell>
                  {new Date(item.created_at).toLocaleDateString('zh-CN')}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {news.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            暂无新闻，点击上方按钮添加第一条新闻
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// 图片数量显示组件
const ImageCount = ({ newsId }: { newsId: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from('news_attachments')
        .select('*', { count: 'exact', head: true })
        .eq('news_id', newsId)
        .or('file_type.eq.image/jpeg,file_type.eq.image/png,file_type.eq.image/gif,file_type.eq.image/webp');
      setCount(count || 0);
    };
    fetchCount();
  }, [newsId]);

  if (count === 0) return <span className="text-gray-400">-</span>;

  return (
    <div className="flex items-center gap-1 text-sm">
      <Image className="w-3 h-3" />
      <span>{count}</span>
    </div>
  );
};

export default NewsManager;
