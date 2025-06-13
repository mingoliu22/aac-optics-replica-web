
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Download, ZoomIn } from 'lucide-react';

interface ImageAttachment {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

interface ImageGalleryProps {
  newsId: string;
  images: ImageAttachment[];
  onImageDeleted: (imageId: string) => void;
  editable?: boolean;
}

const ImageGallery = ({ newsId, images, onImageDeleted, editable = true }: ImageGalleryProps) => {
  const { toast } = useToast();

  const handleDelete = async (image: ImageAttachment) => {
    if (!confirm(`确定要删除图片 "${image.file_name}" 吗？`)) return;

    try {
      // 从存储桶删除文件
      const { error: storageError } = await supabase.storage
        .from('news-attachments')
        .remove([image.file_path]);

      if (storageError) throw storageError;

      // 从数据库删除记录
      const { error: dbError } = await supabase
        .from('news_attachments')
        .delete()
        .eq('id', image.id);

      if (dbError) throw dbError;

      toast({
        title: "图片删除成功",
        description: `${image.file_name} 已删除`,
      });

      onImageDeleted(image.id);
    } catch (error) {
      console.error('删除图片失败:', error);
      toast({
        title: "删除失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (image: ImageAttachment) => {
    try {
      const { data, error } = await supabase.storage
        .from('news-attachments')
        .download(image.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = image.file_name;
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

  if (images.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p>暂无图片</p>
          <p className="text-xs">点击上方按钮上传图片</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden">
          <div className="relative aspect-square">
            <img
              src={getPublicUrl(image.file_path)}
              alt={image.file_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="sm">
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                    <div className="flex items-center justify-center">
                      <img
                        src={getPublicUrl(image.file_path)}
                        alt={image.file_name}
                        className="max-w-full max-h-[80vh] object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDownload(image)}
                >
                  <Download className="w-4 h-4" />
                </Button>
                {editable && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(image)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <CardContent className="p-3">
            <p className="text-sm font-medium truncate" title={image.file_name}>
              {image.file_name}
            </p>
            <p className="text-xs text-gray-500">
              {formatFileSize(image.file_size)}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(image.created_at).toLocaleDateString('zh-CN')}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ImageGallery;
