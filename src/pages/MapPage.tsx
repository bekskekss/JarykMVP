import { useState } from "react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  
  

  const resources = [
    {
      name: "Кризисный центр для женщин",
      type: "Шелтер",
      address: "ул. Медерова где фаиза, Бишкек",
      phone: "+996 (500) 893-507",
      hours: "24/7",
      distance: "1.2 км",
      lat: 42.8746,
      lng: 74.6111
    },
    {
      name: "Центр социальной помощи",
      type: "Консультация",
      address: "ул. Чуй 145, Бишкек",
      phone: "+996 (500) 893-507",
      hours: "9:00 - 18:00",
      distance: "2.5 км",
      lat: 42.8829,
      lng: 74.5943
    },
    {
      name: "Горячая линия помощи",
      type: "Телефон доверия",
      address: "Онлайн",
      phone: "01kg163ALK",
      hours: "24/7",
      distance: "Онлайн",
    },
    {
      name: "Психологическая помощь",
      type: "Консультация",
      address: "пр. Манаса 56, Бишкек",
      phone: "+996 (500) 893-507",
      hours: "10:00 - 20:00",
      distance: "3.8 км",
      lat: 42.8675,
      lng: 74.6038
    },
  ];

  const filteredResources = resources.filter((resource) =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Карта помощи</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Найдите ближайшие организации поддержки и помощи
          </p>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Поиск по названию или типу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
            <Button variant="outline" className="gap-2">
              <Navigation className="w-4 h-4" />
              Рядом со мной
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Google Maps Integration */}
          <div className="lg:col-span-1">
            <Card className="p-0 h-[600px] overflow-hidden relative">
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1UlE8bv7TWdbFPZgn73FdnKsHCFrjcV4&ehbc=2E312F&noprof=1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта помощи для женщин"
              className="absolute top-[-50px] left-0 w-full h-[calc(100%+50px)]" 
            />
            </Card>
          </div>

          {/* Alternative: Interactive Google Maps with API */}
          {/* 
          <div className="lg:col-span-1">
            <Card className="p-0 h-[600px] overflow-hidden">
              <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="w-16 h-16 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Интерактивная карта Google Maps
                  </p>
                  <Button onClick={() => window.open('https://www.google.com/maps/d/u/0/viewer?mid=1UlE8bv7TWdbFPZgn73FdnKsHCFrjcV4&ll=42.8746216%2C74.6111019&z=12', '_blank')}>
                    Открыть в новом окне
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          */}

          {/* Resources List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">
              Найдено ресурсов: {filteredResources.length}
            </h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredResources.map((resource, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{resource.name}</h3>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {resource.type}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                      {resource.distance}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{resource.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <a href={`tel:${resource.phone}`} className="hover:text-primary transition-colors">
                        {resource.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{resource.hours}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">Подробнее</Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        if (resource.lat && resource.lng) {
                          window.open(`https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`, '_blank');
                        }
                      }}
                    >
                      Маршрут
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <Card className="mt-8 p-6 bg-destructive/10 border-destructive/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Экстренная помощь</h3>
              <p className="text-muted-foreground mb-3">
                Если вы в опасности прямо сейчас, позвоните в экстренные службы:
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:102">
                  <Button variant="destructive" size="sm">Полиция: 102</Button>
                </a>
                <a href="tel:112">
                  <Button variant="destructive" size="sm">Экстренные: 112</Button>
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MapPage;
