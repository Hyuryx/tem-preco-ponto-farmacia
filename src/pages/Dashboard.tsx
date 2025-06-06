
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Users, BarChart3, MapPin, Settings, LogOut, Calendar, FileText, Printer } from "lucide-react";
import { TimeClockCard } from "@/components/TimeClockCard";
import { EmployeeList } from "@/components/EmployeeList";
import ReportsSection from "@/components/ReportsSection";
import { AdminPanel } from "@/components/AdminPanel";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTimeTracking } from "@/hooks/useTimeTracking";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "employee";
  company: string;
}

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { employees, timeEntries } = useTimeTracking({ name: 'admin', role: 'admin', company: 'TEM PREÇO' });

  useEffect(() => {
    // Verificar se o usuário está logado
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate("/");
      return;
    }

    try {
      const user = JSON.parse(userData);
      setCurrentUser(user);
      
      // Manter a aba ativa após recarregar a página
      const savedTab = localStorage.getItem('activeTab');
      if (savedTab) {
        setActiveTab(savedTab);
      } else {
        setActiveTab(user.role === "employee" ? "clock" : "clock");
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      navigate("/");
    }
  }, [navigate]);

  // Salvar aba ativa no localStorage
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('activeTab', value);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('activeTab');
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    navigate("/");
  };

  // Funções para os cards clicáveis
  const getActiveEmployees = () => {
    const today = new Date().toISOString().split('T')[0];
    return timeEntries.filter(entry => 
      entry.date === today && 
      (entry.status === 'clocked-in' || entry.status === 'lunch-break' || entry.status === 'lunch-return')
    ).length;
  };

  const getTotalHoursWorked = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = timeEntries.filter(entry => entry.date === today);
    const totalHours = todayEntries.reduce((sum, entry) => sum + entry.totalHours, 0);
    return Math.floor(totalHours);
  };

  const getPresentToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return timeEntries.filter(entry => 
      entry.date === today && entry.clockIn
    ).length;
  };

  const getOvertimeHours = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = timeEntries.filter(entry => entry.date === today);
    const totalOvertime = todayEntries.reduce((sum, entry) => sum + entry.overtimeHours, 0);
    return Math.floor(totalOvertime);
  };

  const handleCardClick = (cardType: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (cardType) {
      case 'employees':
        setDialogContent({
          title: 'Funcionários Ativos',
          data: employees.filter(emp => {
            const entry = timeEntries.find(e => e.userId === emp.name && e.date === today);
            return entry && (entry.status === 'clocked-in' || entry.status === 'lunch-break' || entry.status === 'lunch-return');
          }).map(emp => ({
            name: emp.name,
            role: emp.role,
            status: timeEntries.find(e => e.userId === emp.name && e.date === today)?.status || 'Ausente'
          }))
        });
        break;
      case 'hours':
        setDialogContent({
          title: 'Horas Trabalhadas Hoje',
          data: timeEntries.filter(entry => entry.date === today && entry.totalHours > 0)
            .map(entry => ({
              employee: entry.userId,
              hours: `${Math.floor(entry.totalHours)}h ${Math.floor((entry.totalHours % 1) * 60)}m`,
              status: entry.status
            }))
        });
        break;
      case 'present':
        setDialogContent({
          title: 'Presentes Hoje',
          data: timeEntries.filter(entry => entry.date === today && entry.clockIn)
            .map(entry => ({
              employee: entry.userId,
              clockIn: entry.clockIn,
              status: entry.status
            }))
        });
        break;
      case 'overtime':
        setDialogContent({
          title: 'Horas Extras',
          data: timeEntries.filter(entry => entry.date === today && entry.overtimeHours > 0)
            .map(entry => ({
              employee: entry.userId,
              overtime: `${Math.floor(entry.overtimeHours)}h ${Math.floor((entry.overtimeHours % 1) * 60)}m`,
              balance: entry.accumulatedBalance >= 0 ? 'Positivo' : 'Negativo'
            }))
        });
        break;
    }
    setDialogOpen(true);
  };

  if (!currentUser) {
    return <div>Carregando...</div>;
  }

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
              <span className="text-sm text-gray-500">
                {currentUser.role === "admin" ? "Administrador" : "Funcionário"}
              </span>
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
        {currentUser.role === "employee" ? (
          // Vista do funcionário - apenas ponto
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Registro de Ponto</h2>
              <p className="text-gray-600">Registre sua entrada, pausas e saída do trabalho</p>
            </div>
            <TimeClockCard currentUser={currentUser} />
          </div>
        ) : (
          // Vista do administrador - acesso completo
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('employees')}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Funcionários Ativos</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{getActiveEmployees()}</div>
                    <p className="text-xs text-muted-foreground">Trabalhando agora</p>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('hours')}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Horas Trabalhadas</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{getTotalHoursWorked()}h</div>
                    <p className="text-xs text-muted-foreground">Hoje</p>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('present')}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Presentes Hoje</CardTitle>
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{getPresentToday()}</div>
                    <p className="text-xs text-muted-foreground">{Math.round((getPresentToday() / employees.length) * 100)}% da equipe</p>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('overtime')}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Horas Extras</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{getOvertimeHours()}h</div>
                    <p className="text-xs text-muted-foreground">Hoje</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="employees">
              <EmployeeList currentUser={currentUser} />
            </TabsContent>

            <TabsContent value="reports">
              <ReportsSection />
            </TabsContent>

            <TabsContent value="admin">
              <AdminPanel />
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Dialog para mostrar detalhes dos cards */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{dialogContent?.title}</DialogTitle>
          </DialogHeader>
          {dialogContent && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      {dialogContent.data[0] && Object.keys(dialogContent.data[0]).map((key: string) => (
                        <th key={key} className="border border-gray-300 p-2 text-left font-semibold">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dialogContent.data.map((row: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {Object.values(row).map((value: any, cellIndex: number) => (
                          <td key={cellIndex} className="border border-gray-300 p-2">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
