
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimeClockCardProps {
  currentUser: {
    name: string;
    role: string;
    company: string;
  };
}

export const TimeClockCard = ({ currentUser }: TimeClockCardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [lastClockIn, setLastClockIn] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    return () => {
      clearInterval(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleClockIn = () => {
    const now = new Date();
    setLastClockIn(now);
    
    // Simulate saving to database
    const clockData = {
      userId: currentUser.name,
      timestamp: now.toISOString(),
      location: location,
      type: 'clock-in',
      isOnline: isOnline
    };

    console.log("Clock in data:", clockData);

    toast({
      title: "Ponto registrado",
      description: `Entrada registrada às ${now.toLocaleTimeString()}`,
    });
  };

  const handleClockOut = () => {
    const now = new Date();
    
    const clockData = {
      userId: currentUser.name,
      timestamp: now.toISOString(),
      location: location,
      type: 'clock-out',
      isOnline: isOnline
    };

    console.log("Clock out data:", clockData);

    toast({
      title: "Ponto registrado",
      description: `Saída registrada às ${now.toLocaleTimeString()}`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Registro de Ponto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-lg text-gray-600">
              {currentTime.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm">
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-green-500" />
                <span className="text-green-600">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-orange-500" />
                <span className="text-orange-600">Offline (será sincronizado)</span>
              </>
            )}
          </div>

          {location && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Localização confirmada</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={handleClockIn}
              className="bg-green-600 hover:bg-green-700 h-12"
            >
              ENTRADA
            </Button>
            <Button 
              onClick={handleClockOut}
              className="bg-red-600 hover:bg-red-700 h-12"
            >
              SAÍDA
            </Button>
          </div>

          {lastClockIn && (
            <div className="text-center text-sm text-gray-600">
              Última entrada: {lastClockIn.toLocaleString()}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Resumo do Dia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">8h 30m</div>
              <div className="text-sm text-gray-600">Horas Trabalhadas</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">30m</div>
              <div className="text-sm text-gray-600">Horas Extras</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Histórico de Hoje</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Entrada:</span>
                <span className="font-medium">08:00</span>
              </div>
              <div className="flex justify-between">
                <span>Almoço (Saída):</span>
                <span className="font-medium">12:00</span>
              </div>
              <div className="flex justify-between">
                <span>Almoço (Volta):</span>
                <span className="font-medium">13:00</span>
              </div>
              <div className="flex justify-between">
                <span>Saída:</span>
                <span className="font-medium text-gray-400">--:--</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
