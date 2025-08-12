
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-corporate-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-corporate-blue font-bold text-sm">AAC</span>
              </div>
              <span className="text-xl font-bold">Optics</span>
            </div>
            <p className="text-blue-100 mb-4 max-w-md">
              {t('about.companyDesc')}
            </p>
            <div className="space-y-2 text-sm text-blue-100">
              <p>{t('contact.address')}: 深圳市南山区科技园</p>
              <p>{t('contact.phone')}: +86-755-1234-5678</p>
              <p>{t('contact.email')}: info@aacoptics.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-white transition-colors">
                  {t('nav.news')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.serviceSupport')}</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-white transition-colors">
                  {t('nav.sitemap')}
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.technicalSupport')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.downloadCenter')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-600 mt-8 pt-8 text-center text-blue-100">
          <p>&copy; 2024 AAC Optics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
