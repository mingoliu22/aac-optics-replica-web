import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Eye, Mail, Phone, Building } from 'lucide-react';
import { format } from 'date-fns';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  created_at: string;
}

const ContactMessagesManager = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "加载失败",
        description: "无法加载联系消息",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">加载中...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>联系消息管理</CardTitle>
        <p className="text-sm text-muted-foreground">
          查看和管理用户提交的联系表单消息
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>提交时间</TableHead>
                <TableHead>姓名</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>主题</TableHead>
                <TableHead>公司</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    暂无联系消息
                  </TableCell>
                </TableRow>
              ) : (
                messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>
                      {format(new Date(message.created_at), 'yyyy-MM-dd HH:mm')}
                    </TableCell>
                    <TableCell className="font-medium">{message.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {message.email}
                      </div>
                    </TableCell>
                    <TableCell>{message.subject}</TableCell>
                    <TableCell>
                      {message.company ? (
                        <div className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {message.company}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedMessage(message)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            查看详情
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>联系消息详情</DialogTitle>
                          </DialogHeader>
                          {selectedMessage && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">姓名</label>
                                  <p className="text-sm text-muted-foreground">{selectedMessage.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">邮箱</label>
                                  <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">电话</label>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedMessage.phone || '-'}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">公司</label>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedMessage.company || '-'}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium">主题</label>
                                <p className="text-sm text-muted-foreground">{selectedMessage.subject}</p>
                              </div>

                              <div>
                                <label className="text-sm font-medium">消息内容</label>
                                <div className="mt-1 p-3 bg-muted rounded-md">
                                  <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium">提交时间</label>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(selectedMessage.created_at), 'yyyy年MM月dd日 HH:mm:ss')}
                                </p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactMessagesManager;