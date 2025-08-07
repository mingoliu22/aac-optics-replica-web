import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Products = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'all');

  // 当URL参数变化时更新选中的分类
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const categories = [
    { 
      id: 'all', 
      name: t('products.categories.all'),
      title: t('products.categories.allTitle'),
      description: t('products.categories.allDesc'),
      background: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop'
    },
    { 
      id: 'optics', 
      name: t('products.categories.optics'),
      title: t('products.categories.opticsTitle'),
      description: t('products.categories.opticsDesc'),
      background: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=400&fit=crop'
    },
    { 
      id: 'systems', 
      name: t('products.categories.systems'),
      title: t('products.categories.systemsTitle'),
      description: t('products.categories.systemsDesc'),
      background: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=400&fit=crop'
    },
    { 
      id: 'components', 
      name: t('products.categories.components'),
      title: t('products.categories.componentsTitle'),
      description: t('products.categories.componentsDesc'),
      background: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=400&fit=crop'
    }
  ];

  const products = [
    {
      id: 1,
      name: t('products.items.lens.name'),
      category: 'optics',
      description: t('products.items.lens.description'),
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      specifications: [t('products.items.lens.spec1'), t('products.items.lens.spec2'), t('products.items.lens.spec3')]
    },
    {
      id: 2,
      name: t('products.items.mirror.name'),
      category: 'optics',
      description: t('products.items.mirror.description'),
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      specifications: [t('products.items.mirror.spec1'), t('products.items.mirror.spec2'), t('products.items.mirror.spec3')]
    },
    {
      id: 3,
      name: t('products.items.imaging.name'),
      category: 'systems',
      description: t('products.items.imaging.description'),
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
      specifications: [t('products.items.imaging.spec1'), t('products.items.imaging.spec2'), t('products.items.imaging.spec3')]
    },
    {
      id: 4,
      name: t('products.items.prism.name'),
      category: 'components',
      description: t('products.items.prism.description'),
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
      specifications: [t('products.items.prism.spec1'), t('products.items.prism.spec2'), t('products.items.prism.spec3')]
    },
    {
      id: 5,
      name: t('products.items.coupler.name'),
      category: 'components',
      description: t('products.items.coupler.description'),
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop',
      specifications: [t('products.items.coupler.spec1'), t('products.items.coupler.spec2'), t('products.items.coupler.spec3')]
    },
    {
      id: 6,
      name: t('products.items.ranging.name'),
      category: 'systems',
      description: t('products.items.ranging.description'),
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=400&fit=crop',
      specifications: [t('products.items.ranging.spec1'), t('products.items.ranging.spec2'), t('products.items.ranging.spec3')]
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const currentCategory = categories.find(cat => cat.id === selectedCategory) || categories[0];

  return (
    <div className="min-h-screen">
      {/* Dynamic Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${currentCategory.background})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">
              {currentCategory.title}
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-6 opacity-80"></div>
            <p className="text-xl max-w-2xl mx-auto">
              {currentCategory.description}
            </p>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="min-w-24"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300 animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-corporate-blue">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-corporate-blue mb-2">{t('products.specifications')}：</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {product.specifications.map((spec, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-2 h-2 bg-corporate-blue-light rounded-full mr-2"></span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      {t('products.viewDetails')}
                    </Button>
                    <Button className="flex-1">
                      {t('products.inquiry')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-corporate-blue rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">{t('products.customTitle')}</h3>
            <p className="text-blue-100 mb-6">
              {t('products.customDesc')}
            </p>
            <Button size="lg" className="bg-white text-corporate-blue hover:bg-blue-50">
              {t('products.contactEngineer')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
