
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Sitemap = () => {
  const { t } = useLanguage();

  const siteStructure = [
    {
      title: t('nav.home'),
      path: '/',
      description: '网站首页，了解公司概况和核心业务'
    },
    {
      title: t('nav.products'),
      path: '/products',
      description: '产品展示页面，浏览我们的光学产品系列',
      subPages: [
        { title: '光学器件', path: '/products?category=optics' },
        { title: '光学系统', path: '/products?category=systems' },
        { title: '光学组件', path: '/products?category=components' }
      ]
    },
    {
      title: t('nav.about'),
      path: '/about',
      description: '关于我们，了解公司历史、文化和团队'
    },
    {
      title: t('nav.news'),
      path: '/news',
      description: '新闻中心，获取最新的公司动态和行业资讯'
    },
    {
      title: t('nav.contact'),
      path: '/contact',
      description: '联系我们，获取联系方式和在线咨询'
    },
    {
      title: t('nav.sitemap'),
      path: '/sitemap',
      description: '网站地图，快速导航到所有页面'
    }
  ];

  const quickLinks = [
    { title: '产品目录下载', path: '#', description: 'PDF格式的完整产品目录' },
    { title: '技术支持', path: '#', description: '获取技术文档和支持服务' },
    { title: '质量认证', path: '#', description: '查看我们的质量认证证书' },
    { title: '招聘信息', path: '#', description: '加入我们的团队' },
    { title: '合作伙伴', path: '#', description: '查看我们的合作伙伴信息' },
    { title: '隐私政策', path: '#', description: '了解我们的隐私保护政策' }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-corporate-blue mb-4">
            {t('nav.sitemap')}
          </h1>
          <div className="w-24 h-1 bg-corporate-blue-light mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            快速导航到网站的所有页面，找到您需要的信息
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Navigation */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-corporate-blue">主要页面</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {siteStructure.map((page, index) => (
                    <div key={index} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="border-l-4 border-corporate-blue-light pl-4">
                        <Link 
                          to={page.path}
                          className="text-lg font-semibold text-corporate-blue hover:text-corporate-blue-light transition-colors"
                        >
                          {page.title}
                        </Link>
                        <p className="text-gray-600 mt-1">{page.description}</p>
                        
                        {page.subPages && (
                          <div className="mt-3 ml-4 space-y-2">
                            {page.subPages.map((subPage, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subPage.path}
                                className="block text-gray-700 hover:text-corporate-blue transition-colors"
                              >
                                → {subPage.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Search Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-corporate-blue">快速搜索</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="搜索页面或内容..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue"
                  />
                  <button className="bg-corporate-blue text-white px-6 py-2 rounded-lg hover:bg-corporate-blue-dark transition-colors">
                    搜索
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">热门搜索：</p>
                  <div className="flex flex-wrap gap-2">
                    {['光学透镜', '激光器', '测量系统', '联系方式', '产品目录'].map((term, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-corporate-blue hover:text-white cursor-pointer transition-colors"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links Sidebar */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl text-corporate-blue">快速链接</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quickLinks.map((link, index) => (
                    <div key={index} className="animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                      <a 
                        href={link.path}
                        className="block p-3 bg-gray-50 rounded-lg hover:bg-corporate-blue hover:text-white transition-colors group"
                      >
                        <h3 className="font-semibold group-hover:text-white">{link.title}</h3>
                        <p className="text-sm text-gray-600 group-hover:text-blue-100 mt-1">
                          {link.description}
                        </p>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-corporate-blue">联系信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold">电话</p>
                    <p className="text-sm text-gray-600">+86-755-1234-5678</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="font-semibold">邮箱</p>
                    <p className="text-sm text-gray-600">info@aacoptics.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold">地址</p>
                    <p className="text-sm text-gray-600">深圳市南山区科技园</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-corporate-blue mb-6 text-center">
            完整导航
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-semibold text-corporate-blue mb-3">产品中心</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">光学透镜</a></li>
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">反射镜</a></li>
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">棱镜</a></li>
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">激光器</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-corporate-blue mb-3">解决方案</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">激光加工</a></li>
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">精密测量</a></li>
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">成像系统</a></li>
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">光通信</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-corporate-blue mb-3">服务支持</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">技术支持</a></li>
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">售后服务</a></li>
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">培训服务</a></li>
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">维修服务</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-corporate-blue mb-3">公司信息</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">公司简介</a></li>
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">发展历程</a></li>
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">荣誉资质</a></li>
                <li><a href="#" className="text-gray-600 hover:text-corporate-blue">招聘信息</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
