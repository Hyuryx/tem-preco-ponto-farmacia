
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Settings, Users, Building, Clock, Shield, Database } from "lucide-react";

export const AdminPanel = () => {
  const [settings, setSettings] = useState({
    automaticSync: true,
    geoLocation: true,
    darkMode: false,
    multiCompany: true,
    offlineMode: true,
    auditLog: true,
    smartReminder: true,
    antifraud: true
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
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
                      onCheckedChange={(checked) => handleSettingChange('automaticSync', checked)}
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
                      onCheckedChange={(checked) => handleSettingChange('geoLocation', checked)}
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
                      onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
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
                      onCheckedChange={(checked) => handleSettingChange('multiCompany', checked)}
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
                      onCheckedChange={(checked) => handleSettingChange('offlineMode', checked)}
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
                      onCheckedChange={(checked) => handleSettingChange('auditLog', checked)}
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
                      onCheckedChange={(checked) => handleSettingChange('smartReminder', checked)}
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
                      onCheckedChange={(checked) => handleSettingChange('antifraud', checked)}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Nome do funcionário" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@exemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Cargo</Label>
                  <Input id="role" placeholder="Cargo do funcionário" />
                </div>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                Adicionar Funcionário
              </Button>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input id="company-name" placeholder="Nome da empresa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" placeholder="00.000.000/0000-00" />
                </div>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                Adicionar Empresa
              </Button>
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
                  <Input id="start-time" type="time" defaultValue="08:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lunch-start">Início Almoço</Label>
                  <Input id="lunch-start" type="time" defaultValue="12:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lunch-end">Fim Almoço</Label>
                  <Input id="lunch-end" type="time" defaultValue="13:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">Horário de Saída</Label>
                  <Input id="end-time" type="time" defaultValue="17:00" />
                </div>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
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
                  <span>João Silva fez login</span>
                  <span className="text-gray-500">08:00 - 06/06/2025</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Maria Santos registrou ponto de entrada</span>
                  <span className="text-gray-500">08:15 - 06/06/2025</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Admin alterou configurações do sistema</span>
                  <span className="text-gray-500">07:45 - 06/06/2025</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
