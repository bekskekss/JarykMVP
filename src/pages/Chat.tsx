import { useState } from "react";
import { Send, Bot, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Здравствуйте! Я AI-помощник для поддержки женщин. Я здесь, чтобы помочь вам найти информацию, ресурсы и оказать эмоциональную поддержку. Как я могу помочь вам сегодня?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickActions = [
    "Где найти помощь рядом?",
    "Как распознать насилие?",
    "Юридическая помощь",
    "Нужна поддержка",
  ];

  // Функция для отправки сообщения на Python сервер
  const sendToBackend = async (userMessage: string): Promise<string> => {
  try {
    // Автоматическое определение URL для продакшена и разработки
    const isProduction = window.location.hostname !== 'localhost';
    const API_URL = isProduction 
      ? 'https://bekskekss.onrender.com/api/chat'
      : 'http://localhost:5000/api/chat';

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error('Ошибка сервера');
    }

    const data = await response.json();
    
    if (data.status === 'success') {
      return data.response;
    } else {
      throw new Error(data.error || 'Неизвестная ошибка');
    }
    
  } catch (error) {
    console.error('Ошибка:', error);
    return "Извините, произошла ошибка при подключении к серверу. Пожалуйста, попробуйте позже.";
  }
};

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();

    // Добавляем сообщение пользователя
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Получаем ответ от Python сервера
      const botResponseText = await sendToBackend(userMessage);

      const botResponse: Message = {
        id: messages.length + 2,
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Извините, не могу получить ответ. Проверьте подключение к интернету и попробуйте еще раз.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4">AI-Помощник поддержки</h1>
          <p className="text-xl text-muted-foreground">
            Задайте любой вопрос - я помогу найти информацию и ресурсы
          </p>
        </div>

        <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Важно знать</h3>
              <p className="text-sm text-muted-foreground">
                Этот чат-бот предоставляет информационную поддержку, но не заменяет профессиональную помощь. В экстренной ситуации звоните 102 или 112.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === "bot"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {message.sender === "bot" ? (
                          <Bot className="w-4 h-4" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                      </div>
                      <div
                        className={`rounded-2xl p-4 max-w-[80%] ${
                          message.sender === "bot"
                            ? "bg-muted"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                        <span className="text-xs opacity-70 mt-2 block">
                          {message.timestamp.toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="rounded-2xl p-4 bg-muted">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Напишите ваш вопрос..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    size="icon"
                    disabled={isLoading || !inputValue.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Быстрые вопросы</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleQuickAction(action)}
                    disabled={isLoading}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-destructive/10 border-destructive/20">
              <h3 className="font-semibold mb-2 text-destructive">Экстренная помощь</h3>
              <p className="text-sm text-muted-foreground mb-4">
                В опасности сейчас?
              </p>
              <div className="space-y-2">
                <a href="tel:102" className="block">
                  <Button variant="destructive" size="sm" className="w-full">
                    📞 Полиция: 102
                  </Button>
                </a>
                <a href="tel:112" className="block">
                  <Button variant="destructive" size="sm" className="w-full">
                    🚨 Экстренные: 112
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
