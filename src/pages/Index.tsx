import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSkin, setCurrentSkin] = useState<string | null>(null);
  const [balance, setBalance] = useState(1250);
  const [progress, setProgress] = useState(0);

  const skins = [
    {
      name: "AK-47 Redline",
      rarity: "legendary",
      price: 89.99,
      color: "#FF6B35",
    },
    { name: "M4A4 Asiimov", rarity: "rare", price: 45.5, color: "#4ECDC4" },
    {
      name: "AWP Dragon Lore",
      rarity: "mythical",
      price: 199.99,
      color: "#45B7D1",
    },
    { name: "Glock Fade", rarity: "uncommon", price: 25.0, color: "#F39C12" },
    {
      name: "Knife Karambit",
      rarity: "legendary",
      price: 299.99,
      color: "#FF6B35",
    },
  ];

  const cases = [
    { name: "Spectrum Case", price: 2.5, image: "/placeholder.svg" },
    { name: "Prisma Case", price: 3.0, image: "/placeholder.svg" },
    { name: "Fracture Case", price: 4.5, image: "/placeholder.svg" },
    { name: "Dreams Case", price: 5.0, image: "/placeholder.svg" },
  ];

  const handleOpenCase = () => {
    setIsSpinning(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSpinning(false);
          const randomSkin = skins[Math.floor(Math.random() * skins.length)];
          setCurrentSkin(randomSkin.name);
          setBalance((prev) => prev - 25);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C3E50] via-[#34495E] to-[#2C3E50] relative overflow-hidden">
      {/* Animated Background Coins */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 bg-[#FF6B35] rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
              V
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 bg-[#2C3E50]/90 backdrop-blur-sm border-b border-[#4ECDC4]/20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Icon name="Box" className="text-[#FF6B35]" size={32} />
            <h1 className="text-2xl font-bold text-white">CASE OPENING</h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Icon name="Coins" className="text-[#F39C12]" size={20} />
              <span className="text-white font-semibold">{balance} V</span>
            </div>
            <Button
              variant="outline"
              className="border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4] hover:text-white"
            >
              <Icon name="User" size={16} className="mr-2" />
              Профиль
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent">
            ОТКРОЙ СВОЙ КЕЙС
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Получи редкие скины и валюту V
          </p>

          {/* Case Opening Animation */}
          <div className="relative mb-8">
            <Card className="bg-[#34495E]/80 border-[#4ECDC4]/30 backdrop-blur-sm max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  {isSpinning ? "Открытие кейса..." : "Готов к открытию!"}
                </CardTitle>
                {isSpinning && <Progress value={progress} className="w-full" />}
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] rounded-lg flex items-center justify-center relative">
                  <Icon
                    name="Box"
                    size={64}
                    className={`text-white ${isSpinning ? "animate-spin" : ""}`}
                  />
                  {currentSkin && !isSpinning && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center animate-bounce">
                      <Icon name="Star" size={16} className="text-white" />
                    </div>
                  )}
                </div>

                {currentSkin && !isSpinning && (
                  <div className="mb-4 p-4 bg-[#FF6B35]/20 rounded-lg border border-[#FF6B35]/30">
                    <h3 className="text-white font-bold mb-2">Поздравляем!</h3>
                    <p className="text-[#FF6B35] font-semibold">
                      {currentSkin}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleOpenCase}
                  disabled={isSpinning || balance < 25}
                  className="w-full bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] hover:from-[#FF6B35]/80 hover:to-[#4ECDC4]/80 text-white font-bold py-3"
                >
                  {isSpinning ? "Открытие..." : "Открыть кейс (25 V)"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cases Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Доступные кейсы
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cases.map((caseItem, index) => (
              <Card
                key={index}
                className="bg-[#34495E]/80 border-[#4ECDC4]/30 backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="w-full h-32 bg-gradient-to-br from-[#45B7D1] to-[#4ECDC4] rounded-lg flex items-center justify-center mb-3">
                    <Icon name="Package" size={48} className="text-white" />
                  </div>
                  <CardTitle className="text-white text-center text-lg">
                    {caseItem.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center">
                    <p className="text-[#F39C12] font-semibold mb-3">
                      {caseItem.price} V
                    </p>
                    <Button
                      className="w-full bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-white"
                      size="sm"
                    >
                      Открыть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-[#34495E]/80 border-[#FF6B35]/30 backdrop-blur-sm">
            <CardHeader>
              <Icon
                name="Trophy"
                size={48}
                className="text-[#FF6B35] mx-auto mb-4"
              />
              <CardTitle className="text-white text-center">
                Редкие скины
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center">
                Получайте легендарные и мифические скины с высокой стоимостью
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#34495E]/80 border-[#4ECDC4]/30 backdrop-blur-sm">
            <CardHeader>
              <Icon
                name="Package"
                size={48}
                className="text-[#4ECDC4] mx-auto mb-4"
              />
              <CardTitle className="text-white text-center">
                Инвентарь
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center">
                Управляйте своей коллекцией скинов и отслеживайте их стоимость
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#34495E]/80 border-[#45B7D1]/30 backdrop-blur-sm">
            <CardHeader>
              <Icon
                name="Coins"
                size={48}
                className="text-[#45B7D1] mx-auto mb-4"
              />
              <CardTitle className="text-white text-center">Валюта V</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center">
                Зарабатывайте и тратьте игровую валюту V на открытие кейсов
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
