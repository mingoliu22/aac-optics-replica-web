
import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const contactOptions = [
    {
      icon: <Mail className="w-5 h-5" />,
      text: t('contact.emailUs'),
      action: () => window.location.href = 'mailto:info@aacoptics.com',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      text: t('contact.callback'),
      action: () => window.open('tel:+86-755-1234-5678'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      text: t('contact.call'),
      action: () => window.open('tel:+86-755-1234-5678'),
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Options */}
      {isOpen && (
        <div className="mb-4 space-y-3 animate-scale-in">
          {contactOptions.map((option, index) => (
            <Card 
              key={index} 
              className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={option.action}
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className={`p-2 rounded-full text-white ${option.color}`}>
                    {option.icon}
                  </div>
                  <span className="text-gray-700 whitespace-nowrap">{option.text}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-gray-500 hover:bg-gray-600' 
            : 'bg-corporate-blue hover:bg-corporate-blue-dark'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="flex items-center space-x-1 px-2">
            <MessageCircle className="w-4 h-4 text-white" />
            <span className="text-white font-medium text-sm">{t('contact.contactUs')}</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default FloatingContact;
