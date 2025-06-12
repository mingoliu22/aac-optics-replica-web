
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, FileText, Image } from 'lucide-react';

interface FileUploadProps {
  newsId: string;
  onFileUploaded: (file: any) => void;
  disabled?: boolean;
}

const FileUpload = ({ newsId, onFileUploaded, disabled }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "文件类型不支持",
        description: "请上传图片文件（JPEG, PNG, GIF, WebP）或PDF文档",
        variant: "destructive",
      });
      return;
    }

    // 检查文件大小（限制为10MB）
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "文件过大",
        description: "文件大小不能超过10MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // 生成唯一文件名
      const fileExt = file.name.split('.').pop();
      const fileName = `${newsId}/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;

      // 上传文件到存储桶
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('news-attachments')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 保存文件信息到数据库
      const { data, error } = await supabase
        .from('news_attachments')
        .insert([{
          news_id: newsId,
          file_name: file.name,
          file_path: uploadData.path,
          file_type: file.type,
          file_size: file.size
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "文件上传成功",
        description: `${file.name} 已成功上传`,
      });

      onFileUploaded(data);
    } catch (error) {
      console.error('文件上传失败:', error);
      toast({
        title: "上传失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // 清空input
      event.target.value = '';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileUpload}
        disabled={disabled || uploading}
        className="hidden"
        id={`file-upload-${newsId}`}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled || uploading}
        onClick={() => document.getElementById(`file-upload-${newsId}`)?.click()}
      >
        <Upload className="w-4 h-4 mr-2" />
        {uploading ? '上传中...' : '上传附件'}
      </Button>
    </div>
  );
};

export default FileUpload;
