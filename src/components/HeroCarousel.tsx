
import React, { useState, useEffect, useCallback } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, Pause } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroCarousel = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [api, setApi] = useState<any>(null);

  const slides = [
    {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop',
      title: t('hero.slide1.title'),
      subtitle: t('hero.slide1.subtitle'),
      description: t('hero.slide1.description')
    },
    {
      type: 'video',
      video: 'https://www.aacoptics.com/wp-content/uploads/2021/04/AAC-Technologies-Wafer-Level-Glass-WLG-2021_CN_1080psub.mp4',
      poster: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop',
      title: t('hero.slide2.title'),
      subtitle: t('hero.slide2.subtitle'),
      description: t('hero.slide2.description')
    },
    {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop',
      title: t('hero.slide3.title'),
      subtitle: t('hero.slide3.subtitle'),
      description: t('hero.slide3.description')
    },
    {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=600&fit=crop',
      title: t('hero.slide4.title'),
      subtitle: t('hero.slide4.subtitle'),
      description: t('hero.slide4.description')
    },
    {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=600&fit=crop',
      title: t('hero.slide5.title'),
      subtitle: t('hero.slide5.subtitle'),
      description: t('hero.slide5.description')
    }
  ];

  // Auto advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (api) {
        api.scrollNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  // 监听轮播状态变化
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  // 进度条动画
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentSlide]);

  // 重置进度条当切换幻灯片时
  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  const handleVideoPlay = (slideIndex: number, videoElement: HTMLVideoElement) => {
    if (playingVideo === slideIndex) {
      videoElement.pause();
      setPlayingVideo(null);
    } else {
      videoElement.play();
      setPlayingVideo(slideIndex);
    }
  };

  return (
    <section className="w-full">
      <div className="relative aspect-video min-h-[220px] w-full">
        <Carousel
          className="w-full h-full"
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="h-full">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative w-full h-full overflow-hidden">
                  {slide.type === 'video' ? (
                    <div className="relative w-full h-full">
                      <video 
                        ref={(el) => {
                          if (el) {
                            el.onplay = () => setPlayingVideo(index);
                            el.onpause = () => setPlayingVideo(null);
                            el.onended = () => setPlayingVideo(null);
                          }
                        }}
                        src={slide.video}
                        poster={slide.poster}
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                      />
                      {playingVideo !== index && (
                        <div 
                          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-20"
                          onClick={(e) => {
                            const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                            if (video) {
                              handleVideoPlay(index, video);
                            }
                          }}
                        >
                          <div className="bg-white bg-opacity-90 rounded-full p-4 md:p-6 backdrop-blur-sm hover:bg-opacity-100 transition-all">
                            <Play className="w-8 h-8 md:w-12 md:h-12 text-corporate-blue" />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Mobile-optimized text overlay */}
                  {!(slide.type === 'video' && playingVideo === index) && (
                    <>
                      <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none"></div>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
                        <div className="container mx-auto">
                          <div className="max-w-4xl mx-auto text-center text-white animate-fade-in">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                              {slide.title}
                            </h1>
                            <h2 className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-blue-100 leading-relaxed">
                              {slide.subtitle}
                            </h2>
                            <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
                              {slide.description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pointer-events-auto px-4">
                              <Button size="lg" className="bg-corporate-blue-light text-white hover:bg-corporate-blue w-full sm:w-auto">
                                <Link to="/products" className="block w-full">{t('common.viewProducts')}</Link>
                              </Button>
                              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-corporate-blue w-full sm:w-auto">
                                <Link to="/contact" className="block w-full">{t('common.contactUs')}</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {/* 轮播按钮放在图片区域 */}
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 text-corporate-blue z-10 md:w-12 md:h-12" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 text-corporate-blue z-10 md:w-12 md:h-12" />
                  {/* 指示点和进度条悬浮在图片右下角 */}
                  {!isMobile && index === currentSlide && (
                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md rounded-lg p-4 w-[300px] z-20">
                      <div className="flex items-center justify-between mb-2 text-white text-sm">
                        <span>{currentSlide + 1} / {slides.length}</span>
                        <span className="truncate ml-2 max-w-[180px]">{slides[currentSlide]?.title}</span>
                      </div>
                      <Progress value={progress} className="h-2 bg-white/20" />
                      <div className="flex justify-center mt-3 space-x-2">
                        {slides.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => api?.scrollTo(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                              idx === currentSlide ? 'bg-white' : 'bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Mobile progress bar */}
        {isMobile && (
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="h-1 bg-gradient-to-r from-transparent via-corporate-blue to-transparent relative">
              <div 
                className="h-full bg-corporate-blue-light transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroCarousel;
