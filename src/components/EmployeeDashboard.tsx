
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Calendar, LogOut, Printer } from "lucide-react";
import { TimeClockCard } from "@/components/TimeClockCard";
import { VacationManagement } from "@/components/VacationManagement";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "employee";
  company: string;
}

interface EmployeeDashboardProps {
  currentUser: User;
}

export const EmployeeDashboard = ({ currentUser }: EmployeeDashboardProps) => {
  const [activeTab, setActiveTab] = useState("clock");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedTab = localStorage.getItem('employeeActiveTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('employeeActiveTab', value);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('employeeActiveTab');
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-red-600">TEM PREÇO</h1>
              <span className="ml-4 text-sm text-gray-500">{currentUser.company}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Funcionário</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Imprimir
              </Button>
              <span className="text-sm text-gray-700">{currentUser.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="clock" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Registro de Ponto
            </TabsTrigger>
            <TabsTrigger value="vacation" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Férias e Justificativas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clock">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Registro de Ponto</h2>
              <p className="text-gray-600">Registre sua entrada, pausas e saída do trabalho</p>
            </div>
            <TimeClockCard currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="vacation">
            <VacationManagement currentUser={currentUser} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
