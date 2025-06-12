import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          subject: formData.subject,
          message: formData.message
        }]);

      if (error) {
        console.error('Error saving message:', error);
        toast({
          title: "提交失败",
          description: "消息提交失败，请稍后重试",
          variant: "destructive",
        });
      } else {
        toast({
          title: "提交成功",
          description: "您的消息已成功提交，我们会尽快回复您",
        });
        // 重置表单
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "提交失败",
        description: "发生未知错误，请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      title: '总部地址',
      content: '深圳市南山区科技园南区深圳湾科技生态园',
      icon: '📍'
    },
    {
      title: '联系电话',
      content: '+86-755-1234-5678',
      icon: '📞'
    },
    {
      title: '电子邮箱',
      content: 'info@aacoptics.com',
      icon: '✉️'
    },
    {
      title: '工作时间',
      content: '周一至周五 9:00-18:00',
      icon: '🕒'
    }
  ];

  const offices = [
    {
      city: '深圳总部',
      address: '深圳市南山区科技园南区深圳湾科技生态园10栋A座',
      phone: '+86-755-1234-5678',
      email: 'shenzhen@aacoptics.com'
    },
    {
      city: '北京办事处',
      address: '北京市海淀区中关村科技园区海淀大街27号',
      phone: '+86-10-1234-5678',
      email: 'beijing@aacoptics.com'
    },
    {
      city: '上海办事处',
      address: '上海市浦东新区张江高科技园区科苑路399号',
      phone: '+86-21-1234-5678',
      email: 'shanghai@aacoptics.com'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-corporate-blue mb-4">
            {t('contact.title')}
          </h1>
          <div className="w-24 h-1 bg-corporate-blue-light mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            我们期待与您的合作，请通过以下方式与我们联系
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl text-corporate-blue">发送消息</CardTitle>
                <p className="text-gray-600">
                  请填写以下表单，我们会尽快回复您的咨询
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        姓名 *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        公司名称
                      </label>
                      <Input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="请输入公司名称"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        邮箱地址 *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="请输入邮箱地址"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        联系电话
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="请输入联系电话"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      咨询主题 *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="请输入咨询主题"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      详细信息 *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="请详细描述您的需求或问题"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? '提交中...' : '发送消息'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="text-xl text-corporate-blue">{t('contact.getInTouch')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold text-corporate-blue">{info.title}</h3>
                      <p className="text-gray-600">{info.content}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">地图位置</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Office Locations */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-blue mb-4">
              办公地点
            </h2>
            <div className="w-24 h-1 bg-corporate-blue-light mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <CardTitle className="text-corporate-blue">{office.city}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">地址</h4>
                    <p className="text-gray-600 text-sm">{office.address}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">电话</h4>
                    <p className="text-gray-600">{office.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">邮箱</h4>
                    <p className="text-gray-600">{office.email}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-corporate-blue mb-4">
              常见问题
            </h2>
            <div className="w-16 h-1 bg-corporate-blue-light mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-corporate-blue mb-2">如何获取产品报价？</h3>
              <p className="text-gray-600 text-sm">
                您可以通过邮件、电话或在线表单联系我们，我们的销售团队会根据您的具体需求提供详细报价。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-corporate-blue mb-2">是否支持定制产品？</h3>
              <p className="text-gray-600 text-sm">
                是的，我们有专业的工程师团队，可以根据客户的特殊需求设计和制造定制化的光学产品。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-corporate-blue mb-2">产品质保期是多久？</h3>
              <p className="text-gray-600 text-sm">
                我们的产品提供标准一年质保，特定产品可根据协议提供延长质保服务。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-corporate-blue mb-2">交货期通常是多长时间？</h3>
              <p className="text-gray-600 text-sm">
                标准产品通常2-4周交货，定制产品根据复杂程度需要4-8周时间。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
