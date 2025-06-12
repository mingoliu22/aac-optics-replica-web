
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const milestones = [
    { year: '2010', event: '公司成立，专注光学器件研发' },
    { year: '2013', event: '获得ISO9001质量认证' },
    { year: '2016', event: '推出第一代高精度光学系统' },
    { year: '2019', event: '成立国际业务部，拓展海外市场' },
    { year: '2022', event: '获得多项光学技术专利' },
    { year: '2024', event: '成为行业领先的光学解决方案提供商' }
  ];

  const values = [
    {
      title: '质量第一',
      description: '严格的质量控制体系，确保每一件产品都达到最高标准',
      icon: '🎯'
    },
    {
      title: '技术创新',
      description: '持续投入研发，推动光学技术的发展和应用',
      icon: '🔬'
    },
    {
      title: '客户至上',
      description: '以客户需求为导向，提供专业的解决方案和服务',
      icon: '🤝'
    },
    {
      title: '诚信经营',
      description: '诚实守信，建立长期稳定的合作关系',
      icon: '💎'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-corporate-blue mb-4">
            {t('about.title')}
          </h1>
          <div className="w-24 h-1 bg-corporate-blue-light mx-auto"></div>
        </div>

        {/* Company Introduction */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-corporate-blue mb-6">
                {t('about.company')}
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                AAC Optics成立于2010年，是一家专业从事光学器件研发、生产和销售的高新技术企业。
                我们拥有先进的生产设备和专业的技术团队，致力于为客户提供高品质的光学产品和解决方案。
              </p>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                经过多年的发展，公司已成为国内外知名的光学器件供应商，产品广泛应用于激光加工、
                精密测量、科学研究等领域。我们始终坚持"质量第一、客户至上"的经营理念，
                为客户创造更大的价值。
              </p>
            </div>
            <div className="animate-scale-in">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop" 
                alt="公司环境"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-corporate-blue to-corporate-blue-light text-white">
              <CardHeader>
                <CardTitle className="text-2xl">{t('about.mission')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 text-lg">
                  {t('about.missionDesc')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-corporate-blue-light to-corporate-blue text-white">
              <CardHeader>
                <CardTitle className="text-2xl">{t('about.vision')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 text-lg">
                  {t('about.visionDesc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Company Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-blue mb-4">
              企业价值观
            </h2>
            <div className="w-24 h-1 bg-corporate-blue-light mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="text-4xl mb-2">{value.icon}</div>
                  <CardTitle className="text-corporate-blue">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Company Timeline */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-blue mb-4">
              发展历程
            </h2>
            <div className="w-24 h-1 bg-corporate-blue-light mx-auto"></div>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-corporate-blue-light"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card className="animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-corporate-blue mb-2">{milestone.year}</h3>
                      <p className="text-gray-600">{milestone.event}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-corporate-blue rounded-full border-4 border-white shadow-lg"></div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-corporate-blue rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">了解更多关于我们</h3>
          <p className="text-blue-100 mb-6">
            欢迎联系我们，了解更多关于AAC Optics的信息和我们的光学解决方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-corporate-blue px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              联系我们
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-corporate-blue transition-colors">
              下载公司简介
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
