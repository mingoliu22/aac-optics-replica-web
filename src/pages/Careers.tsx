
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, GraduationCap, Users } from 'lucide-react';

const Careers = () => {
  const { t } = useLanguage();

  const jobOpenings = [
    {
      title: t('careers.jobs.optical.title'),
      department: t('careers.jobs.optical.department'),
      location: t('careers.jobs.optical.location'),
      type: t('careers.jobs.optical.type'),
      experience: t('careers.jobs.optical.experience'),
      description: t('careers.jobs.optical.description'),
      requirements: [
        t('careers.jobs.optical.req1'),
        t('careers.jobs.optical.req2'),
        t('careers.jobs.optical.req3'),
        t('careers.jobs.optical.req4')
      ]
    },
    {
      title: t('careers.jobs.sales.title'),
      department: t('careers.jobs.sales.department'),
      location: t('careers.jobs.sales.location'),
      type: t('careers.jobs.sales.type'),
      experience: t('careers.jobs.sales.experience'),
      description: t('careers.jobs.sales.description'),
      requirements: [
        t('careers.jobs.sales.req1'),
        t('careers.jobs.sales.req2'),
        t('careers.jobs.sales.req3'),
        t('careers.jobs.sales.req4')
      ]
    },
    {
      title: t('careers.jobs.quality.title'),
      department: t('careers.jobs.quality.department'),
      location: t('careers.jobs.quality.location'),
      type: t('careers.jobs.quality.type'),
      experience: t('careers.jobs.quality.experience'),
      description: t('careers.jobs.quality.description'),
      requirements: [
        t('careers.jobs.quality.req1'),
        t('careers.jobs.quality.req2'),
        t('careers.jobs.quality.req3'),
        t('careers.jobs.quality.req4')
      ]
    }
  ];

  const benefits = [
    {
      icon: <GraduationCap className="h-8 w-8 text-corporate-blue" />,
      title: t('careers.benefits.training.title'),
      description: t('careers.benefits.training.description')
    },
    {
      icon: <Users className="h-8 w-8 text-corporate-blue" />,
      title: t('careers.benefits.team.title'),
      description: t('careers.benefits.team.description')
    },
    {
      icon: <MapPin className="h-8 w-8 text-corporate-blue" />,
      title: t('careers.benefits.office.title'),
      description: t('careers.benefits.office.description')
    },
    {
      icon: <Clock className="h-8 w-8 text-corporate-blue" />,
      title: t('careers.benefits.balance.title'),
      description: t('careers.benefits.balance.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-corporate-blue to-corporate-blue-light text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('careers.hero.title')}</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            {t('careers.hero.description')}
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('careers.whyUs.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('careers.whyUs.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('careers.positions.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('careers.positions.description')}
            </p>
          </div>

          <div className="grid gap-8 max-w-4xl mx-auto">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-corporate-blue">{job.title}</CardTitle>
                      <CardDescription className="text-lg mt-2">
                        {job.department} · {job.location} · {job.type}
                      </CardDescription>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {t('careers.experience')}: {job.experience}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">{t('careers.jobDescription')}：</h4>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">{t('careers.requirements')}：</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <Button className="bg-corporate-blue hover:bg-corporate-blue-dark">
                    {t('careers.apply')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('careers.contact.title')}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('careers.contact.description')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">{t('careers.contact.hrEmail')}</h3>
                <p className="text-corporate-blue">hr@aac-optics.com</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">{t('careers.contact.phone')}</h3>
                <p className="text-corporate-blue">+86 21 1234 5678</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">{t('careers.contact.address')}</h3>
                <p className="text-corporate-blue">上海市浦东新区xxx路xxx号</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
