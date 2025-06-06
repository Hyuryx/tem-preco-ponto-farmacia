import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, Filter, FileText, BarChart3, Clock, Users, TrendingUp, AlertTriangle, CheckCircle, XCircle, Calendar as CalendarIcon, MapPin, DollarSign, FileBarChart, UserCheck, Briefcase, Activity, Target, Award, Settings, Eye, FileSpreadsheet, PieChart, LineChart } from "lucide-react";

const ReportsSection = () => {
  const [selectedReport, setSelectedReport] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const reports = [
    { id: "timesheet", name: "Espelho de Ponto", icon: Clock, description: "Registro detalhado de marcações" },
    { id: "overtime", name: "Horas Extras", icon: TrendingUp, description: "Relatório de horas excedentes" },
    { id: "absences", name: "Faltas e Atrasos", icon: AlertTriangle, description: "Controle de ausências" },
    { id: "vacations", name: "Férias", icon: Calendar, description: "Gestão de períodos de férias" },
    { id: "hour-bank", name: "Banco de Horas", icon: BarChart3, description: "Saldo de horas por funcionário" },
    { id: "monthly", name: "Mensal Consolidado", icon: FileText, description: "Resumo mensal completo" },
    { id: "daily", name: "Diário", icon: CalendarIcon, description: "Marcações do dia" },
    { id: "weekly", name: "Semanal", icon: FileBarChart, description: "Consolidado semanal" },
    { id: "employee-summary", name: "Resumo por Funcionário", icon: UserCheck, description: "Dados individuais" },
    { id: "department", name: "Por Departamento", icon: Briefcase, description: "Relatório departamental" },
    { id: "productivity", name: "Produtividade", icon: Activity, description: "Análise de produtividade" },
    { id: "compliance", name: "Conformidade Legal", icon: CheckCircle, description: "Adequação à legislação" },
    { id: "cost-center", name: "Centro de Custos", icon: DollarSign, description: "Relatório financeiro" },
    { id: "shifts", name: "Turnos", icon: Clock, description: "Gestão de escalas" },
    { id: "geolocation", name: "Geolocalização", icon: MapPin, description: "Marcações por localização" },
    { id: "exceptions", name: "Exceções", icon: XCircle, description: "Marcações irregulares" },
    { id: "justifications", name: "Justificativas", icon: FileText, description: "Documentos anexados" },
    { id: "analytics", name: "Analítico Geral", icon: PieChart, description: "Dashboard analítico" },
    { id: "synthetic", name: "Sintético", icon: LineChart, description: "Resumo executivo" },
    { id: "audit", name: "Auditoria", icon: Eye, description: "Log de atividades" }
  ];

  const generateReport = () => {
    console.log("Gerando relatório:", selectedReport);
    // Implementar geração de relatório
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Relatórios</h2>
        <Button onClick={printReport} variant="outline" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Imprimir
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Tipo de Relatório</label>
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um relatório" />
              </SelectTrigger>
              <SelectContent>
                {reports.map((report) => (
                  <SelectItem key={report.id} value={report.id}>
                    {report.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Data Inicial</label>
            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Data Final</label>
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Funcionário</label>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os funcionários" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="emp1">João Silva</SelectItem>
                <SelectItem value="emp2">Maria Santos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Relatórios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => {
          const IconComponent = report.icon;
          return (
            <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <IconComponent className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{report.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="text-xs">
                        Disponível
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        PDF/Excel
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1" onClick={generateReport}>
                    <Download className="w-4 h-4 mr-1" />
                    Gerar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ReportsSection;
