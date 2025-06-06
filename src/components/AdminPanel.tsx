
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Users, Building, Clock, Shield, Database } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useToast } from "@/hooks/use-toast";

export const AdminPanel = () => {
  const { settings, updateSetting } = useSettings();
  const { toast } = useToast();
  const [companies, setCompanies] = useState([
    { id: '1', name: 'TEM PREÇO - Matriz', cnpj: '12.345.678/0001-90' },
    { id: '2', name: 'TEM PREÇO - Filial Norte', cnpj: '12.345.678/0002-71' }
  ]);
  const [newCompany, setNewCompany] = useState({ name: '', cnpj: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'employee' });

  const handleAddCompany = () => {
    if (!newCompany.name || !newCompany.cnpj) return;
    
    const company = {
      id: Date.now().toString(),
      name: newCompany.name,
      cnpj: newCompany.cnpj
    };
    
    setCompanies(prev => [...prev, company]);
    setNewCompany({ name: '', cnpj: '' });
    toast({
      title: "Empresa adicionada",
      description: `${company.name} foi adicionada com sucesso.`,
    });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    
    toast({
      title: "Usuário adicionado",
      description: `${newUser.name} foi adicionado como ${newUser.role === 'admin' ? 'administrador' : 'funcionário'}.`,
    });
    setNewUser({ name: '', email: '', role: 'employee' });
  };

  const handleSaveSchedule = () => {
    toast({
      title: "Configurações salvas",
      description: "Horários de trabalho atualizados com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="companies">Empresas</TabsTrigger>
          <TabsTrigger value="schedule">Horários</TabsTrigger>
          <TabsTrigger value="audit">Auditoria</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sincronização Automática</Label>
                      <p className="text-sm text-muted-foreground">
                        Sincronizar dados automaticamente quando online
                      </p>
                    </div>
                    <Switch
                      checked={settings.automaticSync}
                      onCheckedChange={(checked) => updateSetting('automaticSync', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Geolocalização</Label>
                      <p className="text-sm text-muted-foreground">
                        Registrar localização no ponto
                      </p>
                    </div>
                    <Switch
                      checked={settings.geoLocation}
                      onCheckedChange={(checked) => updateSetting('geoLocation', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Modo Escuro</Label>
                      <p className="text-sm text-muted-foreground">
                        Ativar tema escuro
                      </p>
                    </div>
                    <Switch
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Multiempresa</Label>
                      <p className="text-sm text-muted-foreground">
                        Gerenciar múltiplas empresas
                      </p>
                    </div>
                    <Switch
                      checked={settings.multiCompany}
                      onCheckedChange={(checked) => updateSetting('multiCompany', checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Modo Offline</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir registro offline
                      </p>
                    </div>
                    <Switch
                      checked={settings.offlineMode}
                      onCheckedChange={(checked) => updateSetting('offlineMode', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Log de Auditoria</Label>
                      <p className="text-sm text-muted-foreground">
                        Registrar todas as atividades
                      </p>
                    </div>
                    <Switch
                      checked={settings.auditLog}
                      onCheckedChange={(checked) => updateSetting('auditLog', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Lembrete Inteligente</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificar sobre registros de ponto
                      </p>
                    </div>
                    <Switch
                      checked={settings.smartReminder}
                      onCheckedChange={(checked) => updateSetting('smartReminder', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sistema Antifraude</Label>
                      <p className="text-sm text-muted-foreground">
                        Verificações de segurança
                      </p>
                    </div>
                    <Switch
                      checked={settings.antifraud}
                      onCheckedChange={(checked) => updateSetting('antifraud', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Gestão de Usuários
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user-name">Nome Completo</Label>
                  <Input 
                    id="user-name" 
                    placeholder="Nome do usuário"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input 
                    id="user-email" 
                    type="email" 
                    placeholder="email@exemplo.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-role">Tipo de Usuário</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Funcionário</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddUser} className="bg-red-600 hover:bg-red-700 w-full">
                    Adicionar Usuário
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Gestão Multiempresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input 
                    id="company-name" 
                    placeholder="Nome da empresa"
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input 
                    id="cnpj" 
                    placeholder="00.000.000/0000-00"
                    value={newCompany.cnpj}
                    onChange={(e) => setNewCompany({...newCompany, cnpj: e.target.value})}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddCompany} className="bg-red-600 hover:bg-red-700 w-full">
                    Adicionar Empresa
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Empresas Cadastradas</h4>
                {companies.map(company => (
                  <div key={company.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{company.name}</span>
                      <span className="text-sm text-gray-500 ml-2">{company.cnpj}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Configuração de Horários
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Horário de Entrada</Label>
                  <Input 
                    id="start-time" 
                    type="time" 
                    value={settings.workHours.startTime}
                    onChange={(e) => updateSetting('workHours.startTime', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lunch-start">Início Almoço</Label>
                  <Input 
                    id="lunch-start" 
                    type="time" 
                    value={settings.workHours.lunchStart}
                    onChange={(e) => updateSetting('workHours.lunchStart', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lunch-end">Fim Almoço</Label>
                  <Input 
                    id="lunch-end" 
                    type="time" 
                    value={settings.workHours.lunchEnd}
                    onChange={(e) => updateSetting('workHours.lunchEnd', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">Horário de Saída</Label>
                  <Input 
                    id="end-time" 
                    type="time" 
                    value={settings.workHours.endTime}
                    onChange={(e) => updateSetting('workHours.endTime', e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleSaveSchedule} className="bg-red-600 hover:bg-red-700">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Log de Auditoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>João Silva registrou entrada</span>
                  <span className="text-gray-500">08:00 - 06/06/2025</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Maria Santos registrou saída para almoço</span>
                  <span className="text-gray-500">12:05 - 06/06/2025</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Admin alterou configurações do sistema</span>
                  <span className="text-gray-500">07:45 - 06/06/2025</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Pedro Costa registrou retorno do almoço</span>
                  <span className="text-gray-500">13:00 - 06/06/2025</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Novo funcionário Ana Lima adicionado</span>
                  <span className="text-gray-500">07:30 - 06/06/2025</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
