
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const milestones = [
    { year: '2010', event: t('about.milestones.2010') },
    { year: '2013', event: t('about.milestones.2013') },
    { year: '2016', event: t('about.milestones.2016') },
    { year: '2019', event: t('about.milestones.2019') },
    { year: '2022', event: t('about.milestones.2022') },
    { year: '2024', event: t('about.milestones.2024') }
  ];

  const values = [
    {
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description'),
      icon: '🎯'
    },
    {
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description'),
      icon: '🔬'
    },
    {
      title: t('about.values.customer.title'),
      description: t('about.values.customer.description'),
      icon: '🤝'
    },
    {
      title: t('about.values.integrity.title'),
      description: t('about.values.integrity.description'),
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
                {t('about.companyIntro1')}
              </p>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {t('about.companyIntro2')}
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
              {t('about.valuesTitle')}
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
              {t('about.timelineTitle')}
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
          <h3 className="text-2xl font-bold mb-4">{t('about.ctaTitle')}</h3>
          <p className="text-blue-100 mb-6">
            {t('about.ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-corporate-blue px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              {t('about.contactUs')}
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-corporate-blue transition-colors">
              {t('about.downloadBrochure')}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
