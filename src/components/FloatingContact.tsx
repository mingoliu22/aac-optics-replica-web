
import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: <Mail className="w-5 h-5" />,
      text: '发邮件给我们',
      action: () => window.location.href = 'mailto:info@aacoptics.com',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      text: '电话回访',
      action: () => window.open('tel:+86-755-1234-5678'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      text: '打电话给我们',
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
        className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-gray-500 hover:bg-gray-600' 
            : 'bg-corporate-blue hover:bg-corporate-blue-dark'
        }`}
        size="icon"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-corporate-blue font-bold text-xs">联系</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default FloatingContact;
