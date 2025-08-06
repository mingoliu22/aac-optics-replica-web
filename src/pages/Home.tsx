
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroCarousel from '@/components/HeroCarousel';
import { Camera, Microscope, Eye, Target, Newspaper, Calendar } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  const { t } = useLanguage();

  const products = [
    {
      title: t('products.optics'),
      description: t('products.opticsDesc'),
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      category: 'optics'
    },
    {
      title: t('products.systems'),
      description: t('products.systemsDesc'),
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      category: 'systems'
    },
    {
      title: t('products.components'),
      description: t('products.componentsDesc'),
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
      category: 'components'
    }
  ];

  const applications = [
    {
      title: t('applications.medical.title'),
      description: t('applications.medical.description'),
      icon: <Eye className="w-8 h-8 md:w-12 md:h-12 text-corporate-blue" />,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop'
    },
    {
      title: t('applications.research.title'),
      description: t('applications.research.description'),
      icon: <Microscope className="w-8 h-8 md:w-12 md:h-12 text-corporate-blue" />,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop'
    },
    {
      title: t('applications.industrial.title'),
      description: t('applications.industrial.description'),
      icon: <Target className="w-8 h-8 md:w-12 md:h-12 text-corporate-blue" />,
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop'
    },
    {
      title: t('applications.imaging.title'),
      description: t('applications.imaging.description'),
      icon: <Camera className="w-8 h-8 md:w-12 md:h-12 text-corporate-blue" />,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c54780?w=600&h=400&fit=crop'
    }
  ];

  const newsItems = [
    {
      id: 1,
      title: t('news.item1.title'),
      date: '2024-03-15',
      excerpt: t('news.item1.excerpt'),
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: t('news.item2.title'),
      date: '2024-03-10',
      excerpt: t('news.item2.excerpt'),
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: t('news.item3.title'),
      date: '2024-03-05',
      excerpt: t('news.item3.excerpt'),
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Products Section - Mobile optimized */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-corporate-blue mb-4">
              {t('home.products.title')}
            </h2>
            <div className="w-16 md:w-24 h-1 bg-corporate-blue-light mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-corporate-blue text-lg md:text-xl">{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">{product.description}</p>
                  <Button variant="outline" className="w-full">
                    <Link to={`/products?category=${product.category}`}>{t('common.learnMore')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Optical Applications Section - Mobile optimized carousel */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-corporate-blue mb-4">
              {t('home.applications.title')}
            </h2>
            <div className="w-16 md:w-24 h-1 bg-corporate-blue-light mx-auto mb-4 md:mb-6"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              {t('home.applications.description')}
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                slidesToScroll: 1,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {applications.map((app, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <Card className="text-center hover:shadow-lg transition-shadow duration-300 animate-scale-in h-full" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img 
                          src={app.image} 
                          alt={app.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader className="pb-3">
                        <div className="flex justify-center mb-3 md:mb-4">{app.icon}</div>
                        <CardTitle className="text-corporate-blue text-lg md:text-xl">{app.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm md:text-base">{app.description}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 w-10 h-10 md:w-12 md:h-12 bg-white shadow-lg hover:bg-gray-50 border" />
              <CarouselNext className="right-0 w-10 h-10 md:w-12 md:h-12 bg-white shadow-lg hover:bg-gray-50 border" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* News Section - Mobile optimized */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-corporate-blue mb-4">
              {t('home.news.title')}
            </h2>
            <div className="w-16 md:w-24 h-1 bg-corporate-blue-light mx-auto mb-4 md:mb-6"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              {t('home.news.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newsItems.map((news, index) => (
              <Card key={news.id} className="hover:shadow-lg transition-shadow duration-300 animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center text-xs md:text-sm text-gray-500 mb-2">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    {news.date}
                  </div>
                  <CardTitle className="text-corporate-blue line-clamp-2 text-lg md:text-xl">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm md:text-base">{news.excerpt}</p>
                  <Button variant="outline" className="w-full">
                    {t('common.readMore')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-6 md:mt-8">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/news" className="flex items-center justify-center">
                <Newspaper className="w-4 h-4 mr-2" />
                {t('home.news.viewMore')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile optimized */}
      <section className="py-12 md:py-16 bg-corporate-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-blue-100 px-4">
            {t('home.cta.description')}
          </p>
          <Button size="lg" className="bg-white text-corporate-blue hover:bg-blue-50 w-full sm:w-auto">
            <Link to="/contact" className="block w-full">{t('common.contactUs')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
