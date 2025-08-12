
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import NewsManager from '@/components/admin/NewsManager';
import ContactMessagesManager from '@/components/admin/ContactMessagesManager';
import { LogOut, Plus, FileText, MessageSquare } from 'lucide-react';

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('news');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);

      // 检查用户是否为管理员
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profile?.role === 'admin') {
        setIsAdmin(true);
      } else {
        toast({
          title: "权限不足",
          description: "您没有管理员权限",
          variant: "destructive",
        });
        navigate('/');
      }
      
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">权限不足</h2>
              <p className="text-gray-600 mb-4">您需要管理员权限才能访问此页面</p>
              <Button onClick={() => navigate('/')}>返回首页</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold text-corporate-blue">管理后台</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                欢迎，{user?.email}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>管理菜单</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('news')}
                    className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 transition-colors ${
                      activeTab === 'news' 
                        ? 'bg-corporate-blue text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    新闻管理
                  </button>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 transition-colors ${
                      activeTab === 'contact' 
                        ? 'bg-corporate-blue text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    联系消息
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'news' && <NewsManager />}
            {activeTab === 'contact' && <ContactMessagesManager />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
