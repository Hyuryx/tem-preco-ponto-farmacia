
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, UserPlus, Edit, Eye } from "lucide-react";
import { useTimeTracking } from "@/hooks/useTimeTracking";

interface EmployeeListProps {
  currentUser: {
    name: string;
    role: string;
    company: string;
  };
}

const pharmacyRoles = [
  'Farmacêutico',
  'Auxiliar de Farmácia',
  'Técnico em Farmácia',
  'Atendente',
  'Gerente',
  'Supervisor',
  'Caixa',
  'Estoquista'
];

export const EmployeeList = ({ currentUser }: EmployeeListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    role: '',
    department: 'Farmácia',
    age: '',
    gender: 'Masculino' as 'Masculino' | 'Feminino',
    isAdmin: false
  });

  const { employees, addEmployee } = useTimeTracking(currentUser);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (employee: any) => {
    const statuses = ['Presente', 'Ausente', 'Almoço', 'Férias'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    switch (randomStatus) {
      case "Presente":
        return <Badge className="bg-green-100 text-green-800">Presente</Badge>;
      case "Ausente":
        return <Badge className="bg-red-100 text-red-800">Ausente</Badge>;
      case "Almoço":
        return <Badge className="bg-yellow-100 text-yellow-800">Almoço</Badge>;
      case "Férias":
        return <Badge className="bg-blue-100 text-blue-800">Férias</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{randomStatus}</Badge>;
    }
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role || !newEmployee.age) {
      return;
    }

    addEmployee({
      name: newEmployee.name,
      email: newEmployee.email,
      role: newEmployee.role,
      department: newEmployee.department,
      age: parseInt(newEmployee.age),
      gender: newEmployee.gender,
      isAdmin: newEmployee.isAdmin
    });

    setNewEmployee({
      name: '',
      email: '',
      role: '',
      department: 'Farmácia',
      age: '',
      gender: 'Masculino',
      isAdmin: false
    });
    setIsAddDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Funcionários</CardTitle>
          {currentUser.role === "admin" && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Adicionar Funcionário
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Funcionário</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                      placeholder="Nome do funcionário"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Cargo</Label>
                    <Select value={newEmployee.role} onValueChange={(value) => setNewEmployee({...newEmployee, role: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        {pharmacyRoles.map(role => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      type="number"
                      value={newEmployee.age}
                      onChange={(e) => setNewEmployee({...newEmployee, age: e.target.value})}
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Sexo</Label>
                    <Select value={newEmployee.gender} onValueChange={(value: 'Masculino' | 'Feminino') => setNewEmployee({...newEmployee, gender: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Feminino">Feminino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isAdmin"
                      checked={newEmployee.isAdmin}
                      onChange={(e) => setNewEmployee({...newEmployee, isAdmin: e.target.checked})}
                    />
                    <Label htmlFor="isAdmin">Acesso de Administrador</Label>
                  </div>
                  <Button onClick={handleAddEmployee} className="w-full bg-red-600 hover:bg-red-700">
                    Adicionar Funcionário
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
                {currentUser.role === "admin" && <TableHead>Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{getStatusBadge(employee)}</TableCell>
                  <TableCell>{Math.floor(Math.random() * 8) + 1}h {Math.floor(Math.random() * 59)}m</TableCell>
                  <TableCell>{String(Math.floor(Math.random() * 12) + 7).padStart(2, '0')}:{String(Math.floor(Math.random() * 59)).padStart(2, '0')}</TableCell>
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
