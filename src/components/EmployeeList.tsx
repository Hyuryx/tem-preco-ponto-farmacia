
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Edit, Eye } from "lucide-react";

interface EmployeeListProps {
  currentUser: {
    name: string;
    role: string;
    company: string;
  };
}

export const EmployeeList = ({ currentUser }: EmployeeListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data - em produção viria do banco de dados
  const [employees] = useState([
    {
      id: 1,
      name: "João Silva",
      role: "Farmacêutico",
      department: "Farmácia",
      status: "Presente",
      hoursToday: "6h 30m",
      lastClockIn: "08:00",
      location: "Loja Central"
    },
    {
      id: 2,
      name: "Maria Santos",
      role: "Atendente",
      department: "Atendimento",
      status: "Ausente",
      hoursToday: "0h",
      lastClockIn: "--:--",
      location: "Loja Norte"
    },
    {
      id: 3,
      name: "Pedro Costa",
      role: "Gerente",
      department: "Administração",
      status: "Presente",
      hoursToday: "7h 15m",
      lastClockIn: "07:45",
      location: "Loja Sul"
    },
    {
      id: 4,
      name: "Ana Lima",
      role: "Auxiliar",
      department: "Farmácia",
      status: "Almoço",
      hoursToday: "4h",
      lastClockIn: "12:00",
      location: "Loja Central"
    }
  ]);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Presente":
        return <Badge className="bg-green-100 text-green-800">Presente</Badge>;
      case "Ausente":
        return <Badge className="bg-red-100 text-red-800">Ausente</Badge>;
      case "Almoço":
        return <Badge className="bg-yellow-100 text-yellow-800">Almoço</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Funcionários</CardTitle>
          {currentUser.role === "admin" && (
            <Button className="bg-red-600 hover:bg-red-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Adicionar Funcionário
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar funcionários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Horas Hoje</TableHead>
                <TableHead>Último Ponto</TableHead>
                <TableHead>Local</TableHead>
                {currentUser.role === "admin" && <TableHead>Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{getStatusBadge(employee.status)}</TableCell>
                  <TableCell>{employee.hoursToday}</TableCell>
                  <TableCell>{employee.lastClockIn}</TableCell>
                  <TableCell>{employee.location}</TableCell>
                  {currentUser.role === "admin" && (
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
