
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, GraduationCap, Users } from 'lucide-react';

const Careers = () => {
  const { t } = useLanguage();

  const jobOpenings = [
    {
      title: "光学工程师",
      department: "研发部",
      location: "上海",
      type: "全职",
      experience: "3-5年",
      description: "负责光学产品的设计和开发，包括光学系统建模、仿真分析等工作。",
      requirements: [
        "光学工程或相关专业硕士及以上学历",
        "熟悉光学设计软件如Zemax、CodeV等",
        "有光学产品开发经验",
        "良好的英语读写能力"
      ]
    },
    {
      title: "销售经理",
      department: "销售部",
      location: "北京",
      type: "全职",
      experience: "2-4年",
      description: "负责光学产品的市场开拓和客户维护，制定销售策略并完成销售目标。",
      requirements: [
        "市场营销或相关专业本科及以上学历",
        "有B2B销售经验，光学行业优先",
        "优秀的沟通和谈判能力",
        "能够适应出差工作"
      ]
    },
    {
      title: "质量工程师",
      department: "质量部",
      location: "深圳",
      type: "全职",
      experience: "1-3年",
      description: "负责产品质量管理体系建设，质量问题分析和改进，供应商质量管理。",
      requirements: [
        "质量管理或相关专业本科及以上学历",
        "熟悉ISO9001质量管理体系",
        "有光学或精密制造行业经验优先",
        "具备质量分析和解决问题的能力"
      ]
    }
  ];

  const benefits = [
    {
      icon: <GraduationCap className="h-8 w-8 text-corporate-blue" />,
      title: "培训发展",
      description: "完善的培训体系，助力员工职业发展"
    },
    {
      icon: <Users className="h-8 w-8 text-corporate-blue" />,
      title: "团队氛围",
      description: "开放包容的工作环境，和谐的团队氛围"
    },
    {
      icon: <MapPin className="h-8 w-8 text-corporate-blue" />,
      title: "办公环境",
      description: "现代化办公环境，完善的办公设施"
    },
    {
      icon: <Clock className="h-8 w-8 text-corporate-blue" />,
      title: "工作平衡",
      description: "弹性工作时间，倡导工作生活平衡"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-corporate-blue to-corporate-blue-light text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">加入我们的团队</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            在AAC Optics，我们致力于光学技术的创新与发展。如果您对光学充满热情，
            希望在一个充满挑战和机遇的环境中成长，我们期待您的加入。
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么选择我们</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              我们提供有竞争力的薪酬福利，完善的职业发展平台，让每一位员工都能在这里实现自己的价值。
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">招聘职位</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              我们正在寻找优秀的人才加入我们的团队，共同推动光学技术的发展。
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
                      经验要求: {job.experience}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">职位描述：</h4>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">任职要求：</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <Button className="bg-corporate-blue hover:bg-corporate-blue-dark">
                    申请职位
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">联系我们</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            如果您对我们的职位感兴趣，或者希望了解更多信息，请随时与我们联系。
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">HR邮箱</h3>
                <p className="text-corporate-blue">hr@aac-optics.com</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">联系电话</h3>
                <p className="text-corporate-blue">+86 21 1234 5678</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">公司地址</h3>
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
