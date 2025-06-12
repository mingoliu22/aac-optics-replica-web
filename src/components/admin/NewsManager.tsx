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
import { Plus, Edit, Trash2, Paperclip } from 'lucide-react';
import FileUpload from './FileUpload';
import AttachmentList from './AttachmentList';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface Attachment {
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
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
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

  const fetchAttachments = async (newsId: string) => {
    try {
      const { data, error } = await supabase
        .from('news_attachments')
        .select('*')
        .eq('news_id', newsId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAttachments(data || []);
    } catch (error) {
      console.error('获取附件失败:', error);
      setAttachments([]);
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
    if (!confirm('确定要删除这条新闻吗？相关附件也会被删除。')) return;

    try {
      // 先删除相关附件
      const { data: attachmentsData } = await supabase
        .from('news_attachments')
        .select('file_path')
        .eq('news_id', id);

      if (attachmentsData && attachmentsData.length > 0) {
        const filePaths = attachmentsData.map(att => att.file_path);
        await supabase.storage
          .from('news-attachments')
          .remove(filePaths);
      }

      // 删除新闻（附件记录会因为外键约束自动删除）
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
      content: '',
      summary: '',
      image_url: '',
      published: false
    });
    setEditingNews(null);
    setAttachments([]);
  };

  const openEditDialog = async (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      summary: newsItem.summary || '',
      image_url: newsItem.image_url || '',
      published: newsItem.published
    });
    await fetchAttachments(newsItem.id);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleFileUploaded = (file: any) => {
    setAttachments(prev => [file, ...prev]);
  };

  const handleAttachmentDeleted = (attachmentId: string) => {
    setAttachments(prev => prev.filter(att => att.id !== attachmentId));
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
                  <TabsTrigger value="attachments" disabled={!editingNews}>
                    附件管理 ({attachments.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="content">
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                      <label className="block text-sm font-medium mb-2">图片URL</label>
                      <Input
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="https://..."
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
                
                <TabsContent value="attachments" className="space-y-4">
                  {editingNews && (
                    <>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">附件管理</h3>
                        <FileUpload
                          newsId={editingNews.id}
                          onFileUploaded={handleFileUploaded}
                        />
                      </div>
                      <AttachmentList
                        newsId={editingNews.id}
                        attachments={attachments}
                        onAttachmentDeleted={handleAttachmentDeleted}
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
              <TableHead>附件</TableHead>
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
                  <AttachmentCount newsId={item.id} />
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

// 附件数量显示组件
const AttachmentCount = ({ newsId }: { newsId: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from('news_attachments')
        .select('*', { count: 'exact', head: true })
        .eq('news_id', newsId);
      setCount(count || 0);
    };
    fetchCount();
  }, [newsId]);

  if (count === 0) return <span className="text-gray-400">-</span>;

  return (
    <div className="flex items-center gap-1 text-sm">
      <Paperclip className="w-3 h-3" />
      <span>{count}</span>
    </div>
  );
};

export default NewsManager;
