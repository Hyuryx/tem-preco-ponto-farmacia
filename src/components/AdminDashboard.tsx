
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, BarChart3, FileText, Calendar, Settings, LogOut, Printer } from "lucide-react";
import { TimeClockCard } from "@/components/TimeClockCard";
import { EmployeeList } from "@/components/EmployeeList";
import ReportsSection from "@/components/ReportsSection";
import { AdminPanel } from "@/components/AdminPanel";
import { VacationManagement } from "@/components/VacationManagement";
import { AdminMetrics } from "@/components/AdminMetrics";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "employee";
  company: string;
}

interface AdminDashboardProps {
  currentUser: User;
}

export const AdminDashboard = ({ currentUser }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("clock");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedTab = localStorage.getItem('adminActiveTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('adminActiveTab', value);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('adminActiveTab');
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
              <span className="text-sm text-gray-500">Administrador</span>
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="clock" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Ponto
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Funcionários
            </TabsTrigger>
            <TabsTrigger value="vacation" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Férias
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Relatórios
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clock">
            <TimeClockCard currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="dashboard">
            <AdminMetrics currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="employees">
            <EmployeeList currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="vacation">
            <VacationManagement currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsSection />
          </TabsContent>

          <TabsContent value="admin">
            <AdminPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
