
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Download, FileText, Image, ExternalLink } from 'lucide-react';

interface Attachment {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

interface AttachmentListProps {
  newsId: string;
  attachments: Attachment[];
  onAttachmentDeleted: (attachmentId: string) => void;
  editable?: boolean;
}

const AttachmentList = ({ newsId, attachments, onAttachmentDeleted, editable = true }: AttachmentListProps) => {
  const { toast } = useToast();

  const handleDelete = async (attachment: Attachment) => {
    if (!confirm(`确定要删除附件 "${attachment.file_name}" 吗？`)) return;

    try {
      // 从存储桶删除文件
      const { error: storageError } = await supabase.storage
        .from('news-attachments')
        .remove([attachment.file_path]);

      if (storageError) throw storageError;

      // 从数据库删除记录
      const { error: dbError } = await supabase
        .from('news_attachments')
        .delete()
        .eq('id', attachment.id);

      if (dbError) throw dbError;

      toast({
        title: "附件删除成功",
        description: `${attachment.file_name} 已删除`,
      });

      onAttachmentDeleted(attachment.id);
    } catch (error) {
      console.error('删除附件失败:', error);
      toast({
        title: "删除失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (attachment: Attachment) => {
    try {
      const { data, error } = await supabase.storage
        .from('news-attachments')
        .download(attachment.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = attachment.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('下载失败:', error);
      toast({
        title: "下载失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="w-4 h-4" />;
    } else if (fileType === 'application/pdf') {
      return <FileText className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getPublicUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('news-attachments')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  if (attachments.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        暂无附件
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {attachments.map((attachment) => (
        <Card key={attachment.id} className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {getFileIcon(attachment.file_type)}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {attachment.file_name}
                </div>
                <div className="text-xs text-gray-500">
                  {formatFileSize(attachment.file_size)} • {new Date(attachment.created_at).toLocaleDateString('zh-CN')}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(getPublicUrl(attachment.file_path), '_blank')}
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(attachment)}
              >
                <Download className="w-3 h-3" />
              </Button>
              {editable && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(attachment)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AttachmentList;
