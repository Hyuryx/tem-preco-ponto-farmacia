
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { FileText, Download, Printer, Calendar } from "lucide-react";

interface ReportsSectionProps {
  currentUser: {
    name: string;
    role: string;
    company: string;
  };
}

export const ReportsSection = ({ currentUser }: ReportsSectionProps) => {
  const [selectedReport, setSelectedReport] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const reportTypes = [
    { id: "timesheet", name: "Espelho de Ponto" },
    { id: "overtime", name: "Relatório de Horas Extras" },
    { id: "absences", name: "Relatório de Faltas" },
    { id: "summary", name: "Resumo Mensal" },
    { id: "attendance", name: "Controle de Presença" },
    { id: "vacation", name: "Gestão de Férias" },
    { id: "bank-hours", name: "Banco de Horas" },
    { id: "late-arrivals", name: "Atrasos" },
    { id: "early-departures", name: "Saídas Antecipadas" },
    { id: "work-schedule", name: "Jornada de Trabalho" },
    { id: "location", name: "Relatório de Localização" },
    { id: "audit", name: "Log de Auditoria" },
    { id: "productivity", name: "Produtividade" },
    { id: "cost-center", name: "Centro de Custo" },
    { id: "department", name: "Por Departamento" },
    { id: "weekly", name: "Relatório Semanal" },
    { id: "daily", name: "Relatório Diário" },
    { id: "annual", name: "Relatório Anual" },
    { id: "technical-certificate", name: "Atestado Técnico" },
    { id: "responsibility-term", name: "Termo de Responsabilidade" }
  ];

  const employees = [
    "Todos os funcionários",
    "João Silva",
    "Maria Santos", 
    "Pedro Costa",
    "Ana Lima"
  ];

  const handleGenerateReport = () => {
    if (!selectedReport) {
      alert("Selecione um tipo de relatório");
      return;
    }

    // Simular geração de relatório
    console.log("Generating report:", {
      type: selectedReport,
      employee: selectedEmployee,
      startDate,
      endDate,
      user: currentUser
    });

    alert("Relatório gerado com sucesso!");
  };

  const handlePrintReport = () => {
    if (!selectedReport) {
      alert("Selecione um tipo de relatório primeiro");
      return;
    }
    window.print();
  };

  const handleDownloadReport = () => {
    if (!selectedReport) {
      alert("Selecione um tipo de relatório primeiro");
      return;
    }
    // Simular download
    alert("Download iniciado!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Relatórios ({reportTypes.length} modelos disponíveis)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Relatório</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um relatório" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      {report.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Funcionário</label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione funcionário" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee} value={employee}>
                      {employee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Data Inicial</label>
              <DatePicker
                selected={startDate}
                onSelect={setStartDate}
                placeholder="Selecione a data"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Data Final</label>
              <DatePicker
                selected={endDate}
                onSelect={setEndDate}
                placeholder="Selecione a data"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleGenerateReport}
              className="bg-red-600 hover:bg-red-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              Gerar Relatório
            </Button>
            <Button 
              variant="outline"
              onClick={handlePrintReport}
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
            <Button 
              variant="outline"
              onClick={handleDownloadReport}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Relatórios Mais Usados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Espelho de Ponto Mensal
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Relatório de Horas Extras
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Controle de Presença
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Relatórios Automáticos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              <div className="flex justify-between items-center py-2">
                <span>Relatório Diário</span>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Relatório Semanal</span>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Relatório Mensal</span>
                <Badge className="bg-gray-100 text-gray-800">Inativo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Documentos Legais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Atestado Técnico
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Termo de Responsabilidade
            </Button>
            <div className="text-xs text-gray-500 pt-2">
              100% conforme Portaria 671/MTE
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
