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
      name: '全部产品',
      title: '产品系列',
      description: '我们提供全系列的光学产品，从基础器件到完整系统解决方案',
      background: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop'
    },
    { 
      id: 'optics', 
      name: '光学器件',
      title: '光学器件',
      description: '高精度光学透镜、反射镜、棱镜等核心光学器件，为您的光学系统提供基础支撑',
      background: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=400&fit=crop'
    },
    { 
      id: 'systems', 
      name: '光学系统',
      title: '光学系统',
      description: '完整的光学系统解决方案，包含成像系统、激光测距系统等专业设备',
      background: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=400&fit=crop'
    },
    { 
      id: 'components', 
      name: '光学组件',
      title: '光学组件',
      description: '各类专业光学组件，包含光纤耦合器、光学棱镜等精密配件',
      background: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=400&fit=crop'
    }
  ];

  const products = [
    {
      id: 1,
      name: '高精度光学透镜',
      category: 'optics',
      description: '采用先进工艺制造的高精度光学透镜，适用于各种光学系统',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      specifications: ['直径: 10-200mm', '精度: λ/10', '镀膜: 可定制']
    },
    {
      id: 2,
      name: '激光反射镜',
      category: 'optics',
      description: '高反射率激光反射镜，适用于激光加工和测量系统',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      specifications: ['反射率: >99.5%', '损伤阈值: 高', '尺寸: 可定制']
    },
    {
      id: 3,
      name: '成像光学系统',
      category: 'systems',
      description: '完整的成像光学系统解决方案，包含镜头组和控制系统',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
      specifications: ['分辨率: 4K+', '焦距: 可调', '接口: 标准化']
    },
    {
      id: 4,
      name: '光学棱镜',
      category: 'components',
      description: '各类光学棱镜，用于光路转换和光谱分析',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
      specifications: ['材质: K9/石英', '精度: 高精度', '镀膜: 可选']
    },
    {
      id: 5,
      name: '光纤耦合器',
      category: 'components',
      description: '高效光纤耦合器，确保光信号的稳定传输',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop',
      specifications: ['插损: <0.5dB', '回损: >50dB', '工作温度: -40~+85°C']
    },
    {
      id: 6,
      name: '激光测距系统',
      category: 'systems',
      description: '高精度激光测距系统，适用于工业测量和自动化',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=400&fit=crop',
      specifications: ['测量范围: 0.1-100m', '精度: ±1mm', '激光等级: Class 2']
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
                    <h4 className="font-semibold text-sm text-corporate-blue mb-2">主要规格：</h4>
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
                      查看详情
                    </Button>
                    <Button className="flex-1">
                      询价
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-corporate-blue rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">需要定制产品？</h3>
            <p className="text-blue-100 mb-6">
              我们的工程师团队可以根据您的具体需求设计和制造专业的光学产品
            </p>
            <Button size="lg" className="bg-white text-corporate-blue hover:bg-blue-50">
              联系工程师
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
