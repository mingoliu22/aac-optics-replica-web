import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

const News = () => {
  const { t, language } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      toast({
        title: t('news.fetchError'),
        description: t('news.tryAgain'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTitle = (item: NewsItem) => {
    return language === 'en' ? (item.title_en || item.title) : item.title;
  };

  const getSummary = (item: NewsItem, len: number) => {
    if (language === 'en') {
      const src = item.summary_en || item.content_en || '';
      if (src) return src.length > len ? src.substring(0, len) + '...' : src;
      const zhSrc = item.summary || item.content || '';
      return zhSrc.length > len ? zhSrc.substring(0, len) + '...' : zhSrc;
    }
    const src = item.summary || item.content || '';
    return src.length > len ? src.substring(0, len) + '...' : src;
  };

  // 如果没有新闻数据，显示默认内容
  const defaultNews = [
    {
      id: 'default-1',
      title: 'AAC Optics获得新一轮光学技术专利',
      date: '2024-03-15',
      category: '公司新闻',
      excerpt: '我们在激光光学器件领域取得重大技术突破，获得多项国家发明专利认证。',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      featured: true
    },
    {
      id: 'default-2',
      title: '参展第十五届中国国际光电博览会',
      date: '2024-03-10',
      category: '展会活动',
      excerpt: '我们将携最新光学产品亮相CIOE 2024，展位号A123，欢迎莅临参观。',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 'default-3',
      title: '新厂房投产，产能提升30%',
      date: '2024-03-05',
      category: '公司新闻',
      excerpt: '位于深圳光明的新生产基地正式投产，将大幅提升我们的产品交付能力。',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 'default-4',
      title: '与知名大学建立产学研合作',
      date: '2024-02-28',
      category: '合作伙伴',
      excerpt: '与清华大学光电系签署合作协议，共同推进光学技术的创新发展。',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 'default-5',
      title: '荣获"国家高新技术企业"认定',
      date: '2024-02-20',
      category: '荣誉资质',
      excerpt: '经过严格评审，我公司正式获得国家高新技术企业认定，有效期三年。',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 'default-6',
      title: '推出新一代激光测距系统',
      date: '2024-02-15',
      category: '产品发布',
      excerpt: '全新LR-3000系列激光测距系统正式发布，测量精度和稳定性显著提升。',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
      featured: false
    }
  ];

  const displayNews = news.length > 0 ? news : defaultNews;
  const featuredNews = news.length > 0 ? news.slice(0, 1) : defaultNews.filter(item => item.featured);
  const regularNews = news.length > 0 ? news.slice(1) : defaultNews.filter(item => !item.featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">{t('news.loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-corporate-blue mb-4">
            {t('news.title')}
          </h1>
          <div className="w-24 h-1 bg-corporate-blue-light mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('news.subtitle')}
          </p>
        </div>

        {/* Featured News */}
        {featuredNews.map((item) => (
          <Card key={item.id} className="mb-12 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto overflow-hidden">
                <img 
                  src={item.image_url || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop'} 
                  alt={getTitle(item)}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="bg-corporate-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                    {t('news.featured')}
                  </span>
                  <span className="text-gray-500 ml-4">{formatDate(item.created_at)}</span>
                </div>
                <h2 className="text-2xl font-bold text-corporate-blue mb-4">{getTitle(item)}</h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {getSummary(item, 200)}
                </p>
                <Button className="w-fit">
                  {t('news.readMore')}
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularNews.map((item, index) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300 animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={item.image_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop'} 
                  alt={getTitle(item)}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                    {t('news.companyNews')}
                  </span>
                  <span className="text-gray-500 text-sm">{formatDate(item.created_at)}</span>
                </div>
                <CardTitle className="text-corporate-blue line-clamp-2">{getTitle(item)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {getSummary(item, 150)}
                </p>
                <Button variant="outline" className="w-full">
                  {t('news.readMore')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {news.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">{t('news.noNews')}</p>
            <p className="text-sm text-gray-400">{t('news.adminNote')}</p>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-corporate-blue rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">{t('news.newsletter.title')}</h3>
          <p className="text-blue-100 mb-6">
            {t('news.newsletter.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder={t('news.newsletter.placeholder')}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button className="bg-white text-corporate-blue hover:bg-blue-50">
              {t('news.newsletter.subscribe')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
