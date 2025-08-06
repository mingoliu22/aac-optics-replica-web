
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavbarProps {
  isFloating?: boolean;
}

const Navbar = ({ isFloating = false }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t, getLanguageName } = useLanguage();

  const languages = [
    { code: 'zh' as const, name: '中文' },
    { code: 'en' as const, name: 'English' },
    { code: 'ja' as const, name: '日本語' },
    { code: 'ko' as const, name: '한국어' },
    { code: 'fr' as const, name: 'Français' },
    { code: 'de' as const, name: 'Deutsch' },
    { code: 'pt' as const, name: 'Português' }
  ];

  const navItems = [
    { path: '/', label: t('nav.home'), type: 'link' },
    { path: '/products', label: t('nav.products'), type: 'link' },
    { 
      label: t('nav.about'), 
      type: 'dropdown',
      items: [
        { path: '/about', label: t('nav.about') },
        { path: '/contact', label: t('nav.contact') },
        { path: '/sitemap', label: t('nav.sitemap') }
      ]
    },
    { path: '/careers', label: t('nav.careers'), type: 'link' },
    { path: '/news', label: t('nav.news'), type: 'link' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // 这里可以添加搜索逻辑
    }
  };

  // 根据是否悬浮和是否鼠标悬浮来决定样式
  const getNavbarClasses = () => {
    if (isFloating) {
      return `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHovered 
          ? 'bg-white shadow-lg' 
          : 'bg-transparent'
      }`;
    }
    return 'bg-white shadow-lg sticky top-0 z-50';
  };

  const getTextClasses = () => {
    if (isFloating) {
      return isHovered ? 'text-gray-700' : 'text-white';
    }
    return 'text-gray-700';
  };

  const getHoverTextClasses = () => {
    return 'hover:text-corporate-blue';
  };

  return (
    <nav 
      className={getNavbarClasses()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo - Mobile optimized */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-corporate-blue to-corporate-blue-light rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs md:text-sm">AAC</span>
            </div>
            <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
              isFloating && !isHovered ? 'text-white' : 'text-corporate-blue'
            }`}>
              Optics
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="space-x-4 xl:space-x-6">
                {navItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    {item.type === 'dropdown' ? (
                      <>
                        <NavigationMenuTrigger className={`transition-colors duration-200 bg-transparent text-sm xl:text-base ${getTextClasses()} ${getHoverTextClasses()}`}>
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-48 gap-1 p-2">
                            {item.items?.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className="block px-3 py-2 text-sm text-gray-700 hover:text-corporate-blue hover:bg-gray-50 rounded-md transition-colors duration-200"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        to={item.path!}
                        className={`transition-colors duration-200 text-sm xl:text-base ${getTextClasses()} ${getHoverTextClasses()} ${
                          location.pathname === item.path ? 'font-semibold' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Controls - Mobile optimized */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search - Hidden on small mobile */}
            <div className="relative hidden sm:block">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <Input
                    type="text"
                    placeholder={t('nav.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-32 md:w-48 pr-10 text-sm"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className={`transition-colors duration-200 p-2 ${getTextClasses()} ${getHoverTextClasses()}`}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Language Selector - Simplified for mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`transition-colors duration-200 p-2 md:px-3 ${getTextClasses()} ${getHoverTextClasses()}`}
                >
                  <Globe className="h-4 w-4 mr-0 md:mr-1" />
                  <span className="hidden md:inline">{getLanguageName(language)}</span>
                  <ChevronDown className="h-3 w-3 ml-0 md:ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`cursor-pointer ${
                      language === lang.code ? 'bg-blue-50 text-corporate-blue' : ''
                    }`}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={`h-5 w-5 transition-colors duration-200 ${getTextClasses()}`} />
              ) : (
                <Menu className={`h-5 w-5 transition-colors duration-200 ${getTextClasses()}`} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Improved for mobile/tablet */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
              {/* Mobile Search */}
              <div className="sm:hidden px-3 py-2">
                <form onSubmit={handleSearch} className="flex items-center">
                  <Input
                    type="text"
                    placeholder={t('nav.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-sm"
                  />
                </form>
              </div>
              
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.type === 'dropdown' ? (
                    <div>
                      <div className="px-3 py-2 text-base font-medium text-gray-700 border-b border-gray-100">
                        {item.label}
                      </div>
                      <div className="ml-4 space-y-1 bg-gray-50">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                              location.pathname === subItem.path
                                ? 'text-corporate-blue bg-blue-50'
                                : 'text-gray-600 hover:text-corporate-blue hover:bg-gray-100'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.path!}
                      className={`block px-3 py-3 text-base font-medium rounded-md transition-colors duration-200 ${
                        location.pathname === item.path
                          ? 'text-corporate-blue bg-blue-50'
                          : 'text-gray-700 hover:text-corporate-blue hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="px-3 py-2 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">语言 / Language</div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={language === lang.code ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className="text-xs"
                    >
                      {lang.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
