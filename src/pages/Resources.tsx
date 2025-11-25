import { Book, FileText, Heart, AlertCircle, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Resources = () => {
  const articles = [
    {
      title: "Как распознать признаки насилия",
      category: "Информация",
      description: "Психологическое, физическое и экономическое насилие - как их идентифицировать",
      icon: AlertCircle,
      color: "text-destructive",
    },
    {
      title: "Юридическая помощь: с чего начать",
      category: "Правовая помощь",
      description: "Шаги для получения правовой защиты и поддержки",
      icon: FileText,
      color: "text-primary",
    },
    {
      title: "Психологическое восстановление",
      category: "Психология",
      description: "Техники самопомощи и работа с травмой",
      icon: Heart,
      color: "text-accent",
    },
    {
      title: "Планирование безопасности",
      category: "Безопасность",
      description: "Как создать план безопасного ухода из опасной ситуации",
      icon: AlertCircle,
      color: "text-destructive",
    },
  ];

  const guides = [
    {
      title: "Полное руководство по защите от насилия",
      pages: "48 страниц",
      format: "PDF",
    },
    {
      title: "Список экстренных контактов",
      pages: "2 страницы",
      format: "PDF",
    },
    {
      title: "Памятка: Ваши права",
      pages: "12 страниц",
      format: "PDF",
    },
  ];

  const stories = [
    {
      title: "История Анны: Как я нашла силы уйти",
      duration: "5 мин чтения",
      category: "Личный опыт",
    },
    {
      title: "Восстановление после травмы: путь Марии",
      duration: "7 мин чтения",
      category: "Личный опыт",
    },
    {
      title: "Новая жизнь: история Елены",
      duration: "6 мин чтения",
      category: "Личный опыт",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Информационные материалы</h1>
          <p className="text-xl text-muted-foreground">
            Знания и ресурсы для защиты и восстановления
          </p>
        </div>

        <Tabs defaultValue="articles" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="articles">Статьи</TabsTrigger>
            <TabsTrigger value="guides">Руководства</TabsTrigger>
            <TabsTrigger value="stories">Истории</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article, index) => {
                const Icon = article.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 ${article.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-primary mb-2 block">
                          {article.category}
                        </span>
                        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-4">
                          {article.description}
                        </p>
                        <Button variant="outline" size="sm">
                          Читать статью
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {guides.map((guide, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Book className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                      <span>{guide.pages}</span>
                      <span>•</span>
                      <span>{guide.format}</span>
                    </div>
                    <Button className="mt-auto gap-2" size="sm">
                      <Download className="w-4 h-4" />
                      Скачать
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stories" className="space-y-6">
            <div className="space-y-4">
              {stories.map((story, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <span className="text-xs font-medium text-accent mb-2 block">
                        {story.category}
                      </span>
                      <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {story.duration}
                      </span>
                    </div>
                    <Button variant="outline">Читать</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="mt-12 p-8 bg-primary/5 border-primary/20">
          <div className="text-center max-w-2xl mx-auto">
            <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4">Нужна помощь прямо сейчас?</h2>
            <p className="text-muted-foreground mb-6">
              Наш AI-помощник готов ответить на ваши вопросы и помочь найти нужную информацию
            </p>
            <Button size="lg" className="gap-2">
              Поговорить с помощником
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Resources;
