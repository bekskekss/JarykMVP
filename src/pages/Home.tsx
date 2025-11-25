import { Link } from "react-router-dom";
import { Map, BookOpen, MessageCircle, Shield, Heart, Users, AlertTriangle, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const features = [
    {
      icon: Map,
      title: "Карта помощи",
      description: "Найдите ближайшие шелтеры, кризисные центры и организации поддержки",
      link: "/map",
      color: "text-primary",
    },
    {
      icon: BookOpen,
      title: "Информация",
      description: "Статьи, советы, психологические тесты и разбор реальных кейсов",
      link: "/resources",
      color: "text-accent",
    },
    {
      icon: MessageCircle,
      title: "AI-Помощник",
      description: "Умный чат-бот для поиска информации и эмоциональной поддержки",
      link: "/chat",
      color: "text-secondary",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Безопасность",
      description: "Конфиденциальность и защита ваших данных",
    },
    {
      icon: Heart,
      title: "Поддержка",
      description: "Эмоциональная помощь в трудный момент",
    },
    {
      icon: Users,
      title: "Сообщество",
      description: "Вы не одни - мы здесь, чтобы помочь",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Помощь и поддержка для женщин
              </h1>
              <p className="text-xl text-muted-foreground">
                Столкнулись с насилием? Мы готовы помочь. Найдите ресурсы, информацию и поддержку.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/map">
                  <Button size="lg" className="gap-2 shadow-md hover:shadow-lg transition-shadow">
                    <Map className="w-5 h-5" />
                    Найти помощь рядом
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button size="lg" variant="outline" className="gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Поговорить с помощником
                  </Button>
                </Link>
              </div>
              
              {/* SOS и Донаты кнопки */}
              {/* <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/sos">
                  <Button 
                    size="lg" 
                    variant="destructive" 
                    className="gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    <AlertTriangle className="w-5 h-5" />
                    SOS Помощь
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button 
                    size="lg" 
                    variant="default" 
                    className="gap-2 bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    <HeartHandshake className="w-5 h-5" />
                    Поддержать проект
                  </Button>
                </Link>
              </div> */}
              
              <p className="text-sm text-muted-foreground">
                🔒 Конфиденциально и безопасно
              </p>
            </div>
            <div className="relative animate-scale-in">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-8 border-card">
                <img
                  src={heroImage}
                  alt="Поддержка женщин"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Как мы можем помочь</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Комплексная поддержка в трудной ситуации
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.link} className="group">
                  <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
                    <div className={`w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши принципы</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-card shadow-md flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-20 bg-destructive/10 border-y border-destructive/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">В экстренной ситуации?</h2>
          <p className="text-xl mb-6 text-muted-foreground">
            Если вы в опасности прямо сейчас, немедленно звоните
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:102">
              <Button size="lg" variant="destructive" className="text-lg">
                📞 Полиция: 102
              </Button>
            </a>
            <a href="tel:112">
              <Button size="lg" variant="destructive" className="text-lg">
                🚨 Экстренные службы: 112
              </Button>
            </a>
            <Link to="/sos">
              <Button size="lg" variant="destructive" className="text-lg gap-2">
                <AlertTriangle className="w-5 h-5" />
                SOS Помощь
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <HeartHandshake className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Поддержите наш проект</h2>
            <p className="text-xl mb-6 text-muted-foreground">
              Ваша помощь позволяет нам развивать проект и помогать большему количеству женщин
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/donate">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3">
                  💝 Сделать пожертвование
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-green-600 text-green-600 hover:bg-green-50">
                  🤝 Стать волонтером
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Все средства идут на развитие проекта и помощь женщинам в трудной ситуации
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
