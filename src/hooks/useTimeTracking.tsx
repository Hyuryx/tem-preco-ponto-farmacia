import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/hooks/useSettings';

export interface TimeEntry {
  id: string;
  userId: string;
  date: string;
  clockIn?: string;
  lunchOut?: string;
  lunchIn?: string;
  clockOut?: string;
  totalHours: number;
  overtimeHours: number;
  accumulatedBalance: number;
  status: 'clocked-in' | 'lunch-break' | 'lunch-return' | 'clocked-out' | 'not-started';
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  age: number;
  gender: 'Masculino' | 'Feminino';
  isAdmin: boolean;
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: 'admin' | 'employee';
  employeeId?: string;
  createdAt: string;
  createdBy: string;
}

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  createdAt: string;
  createdBy: string;
}

export const useTimeTracking = (currentUser: any) => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [systemUsers, setSystemUsers] = useState<SystemUser[]>([
    {
      id: '1',
      name: 'Admin Sistema',
      email: 'admin@tempreco.com',
      password: 'admin123',
      userType: 'admin',
      createdAt: new Date().toISOString(),
      createdBy: 'Sistema'
    },
    {
      id: '2',
      name: 'Funcionário Sistema',
      email: 'funcionario@tempreco.com',
      password: 'func123',
      userType: 'employee',
      employeeId: '1',
      createdAt: new Date().toISOString(),
      createdBy: 'Sistema'
    }
  ]);
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: '1',
      name: 'TEM PREÇO',
      cnpj: '12.345.678/0001-90',
      address: 'Rua Principal, 123 - Centro',
      phone: '(11) 99999-9999',
      createdAt: new Date().toISOString(),
      createdBy: 'Sistema'
    }
  ]);
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@tempreco.com',
      role: 'Farmacêutico',
      department: 'Farmácia',
      age: 35,
      gender: 'Masculino',
      isAdmin: false
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@tempreco.com',
      role: 'Atendente',
      department: 'Atendimento',
      age: 28,
      gender: 'Feminino',
      isAdmin: false
    },
    {
      id: '3',
      name: 'Pedro Costa',
      email: 'pedro@tempreco.com',
      role: 'Gerente',
      department: 'Administração',
      age: 42,
      gender: 'Masculino',
      isAdmin: true
    },
    {
      id: '4',
      name: 'Ana Lima',
      email: 'ana@tempreco.com',
      role: 'Auxiliar de Farmácia',
      department: 'Farmácia',
      age: 25,
      gender: 'Feminino',
      isAdmin: false
    }
  ]);
  const { toast } = useToast();
  const { workHours } = useSettings();

  const today = new Date().toISOString().split('T')[0];

  // Carregar dados persistidos do localStorage na inicialização
  useEffect(() => {
    const savedTimeEntries = localStorage.getItem('timeEntries');
    const savedSystemUsers = localStorage.getItem('systemUsers');
    const savedCompanies = localStorage.getItem('companies');
    
    if (savedTimeEntries) {
      try {
        setTimeEntries(JSON.parse(savedTimeEntries));
      } catch (error) {
        console.error('Erro ao carregar dados do ponto:', error);
      }
    }

    if (savedSystemUsers) {
      try {
        setSystemUsers(JSON.parse(savedSystemUsers));
      } catch (error) {
        console.error('Erro ao carregar usuários do sistema:', error);
      }
    }

    if (savedCompanies) {
      try {
        setCompanies(JSON.parse(savedCompanies));
      } catch (error) {
        console.error('Erro ao carregar empresas:', error);
      }
    }
  }, []);

  // Salvar no localStorage sempre que os dados mudarem
  useEffect(() => {
    if (timeEntries.length > 0) {
      localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
    }
  }, [timeEntries]);

  useEffect(() => {
    if (systemUsers.length > 0) {
      localStorage.setItem('systemUsers', JSON.stringify(systemUsers));
    }
  }, [systemUsers]);

  useEffect(() => {
    if (companies.length > 0) {
      localStorage.setItem('companies', JSON.stringify(companies));
    }
  }, [companies]);

  // Carregar saldo acumulado do usuário
  const getAccumulatedBalance = (userId: string): number => {
    const saved = localStorage.getItem(`balance_${userId}`);
    return saved ? parseFloat(saved) : 0;
  };

  // Salvar saldo acumulado do usuário
  const saveAccumulatedBalance = (userId: string, balance: number) => {
    localStorage.setItem(`balance_${userId}`, balance.toString());
  };

  const getTodayEntry = (): TimeEntry => {
    const existing = timeEntries.find(entry => 
      entry.userId === currentUser.name && entry.date === today
    );
    
    if (existing) return existing;
    
    const accumulatedBalance = getAccumulatedBalance(currentUser.name);
    
    return {
      id: `${currentUser.name}-${today}`,
      userId: currentUser.name,
      date: today,
      totalHours: 0,
      overtimeHours: 0,
      accumulatedBalance,
      status: 'not-started'
    };
  };

  const calculateHours = (entry: TimeEntry): { totalHours: number; overtimeHours: number; accumulatedBalance: number } => {
    if (!entry.clockIn) return { 
      totalHours: 0, 
      overtimeHours: 0, 
      accumulatedBalance: entry.accumulatedBalance 
    };

    const clockInTime = new Date(`${entry.date}T${entry.clockIn}`);
    let clockOutTime: Date;

    if (entry.clockOut) {
      clockOutTime = new Date(`${entry.date}T${entry.clockOut}`);
    } else {
      clockOutTime = new Date();
    }

    let totalMinutes = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60);

    // Subtrair tempo de almoço baseado nas configurações
    if (entry.lunchOut && entry.lunchIn) {
      const lunchOutTime = new Date(`${entry.date}T${entry.lunchOut}`);
      const lunchInTime = new Date(`${entry.date}T${entry.lunchIn}`);
      const lunchMinutes = (lunchInTime.getTime() - lunchOutTime.getTime()) / (1000 * 60);
      totalMinutes -= lunchMinutes;
    } else if (entry.lunchOut && !entry.lunchIn && entry.status === 'lunch-break') {
      // Se está no almoço, subtrair o tempo decorrido do almoço
      const lunchOutTime = new Date(`${entry.date}T${entry.lunchOut}`);
      const currentTime = new Date();
      const lunchMinutes = (currentTime.getTime() - lunchOutTime.getTime()) / (1000 * 60);
      totalMinutes -= lunchMinutes;
    }

    const totalHours = Math.max(0, totalMinutes / 60);
    
    // Usar as configurações de horário para calcular o saldo
    const dailyRequiredHours = workHours.dailyHours;
    const dailyBalance = totalHours - dailyRequiredHours;
    
    // Se o dia foi finalizado, atualizar saldo acumulado
    let newAccumulatedBalance = entry.accumulatedBalance;
    if (entry.clockOut && entry.status === 'clocked-out') {
      newAccumulatedBalance = entry.accumulatedBalance + dailyBalance;
      saveAccumulatedBalance(entry.userId, newAccumulatedBalance);
    }
    
    // Para cálculo em tempo real durante o trabalho
    const currentBalance = entry.clockOut ? newAccumulatedBalance : entry.accumulatedBalance + dailyBalance;
    
    const overtimeHours = Math.max(0, currentBalance);

    return { 
      totalHours, 
      overtimeHours, 
      accumulatedBalance: entry.clockOut ? newAccumulatedBalance : entry.accumulatedBalance 
    };
  };

  const updateTimeEntry = (updatedEntry: TimeEntry) => {
    const calculated = calculateHours(updatedEntry);
    updatedEntry.totalHours = calculated.totalHours;
    updatedEntry.overtimeHours = calculated.overtimeHours;
    updatedEntry.accumulatedBalance = calculated.accumulatedBalance;

    setTimeEntries(prev => {
      const filtered = prev.filter(entry => entry.id !== updatedEntry.id);
      return [...filtered, updatedEntry];
    });
  };

  const resetDailyEntry = () => {
    const entry = getTodayEntry();
    const resetEntry = {
      ...entry,
      clockIn: undefined,
      lunchOut: undefined,
      lunchIn: undefined,
      clockOut: undefined,
      totalHours: 0,
      overtimeHours: 0,
      status: 'not-started' as const
    };
    
    setTimeEntries(prev => prev.filter(e => e.id !== entry.id));
  };

  const clockIn = () => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    const entry = getTodayEntry();
    
    // Verificar se já não está trabalhando
    if (entry.status === 'clocked-in' || entry.status === 'lunch-break' || entry.status === 'lunch-return') {
      toast({
        title: "Aviso",
        description: "Você já está com o ponto ativo.",
        variant: "destructive"
      });
      return;
    }

    // Sempre criar uma nova entrada ou resetar se já finalizado
    if (entry.status === 'clocked-out' || !entry.clockIn) {
      const newEntry = {
        ...entry,
        clockIn: timeString,
        lunchOut: undefined,
        lunchIn: undefined,
        clockOut: undefined,
        status: 'clocked-in' as const
      };
      updateTimeEntry(newEntry);
    }

    toast({
      title: "Ponto registrado",
      description: `Entrada registrada às ${timeString}`,
    });
  };

  const lunchOut = () => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    const entry = getTodayEntry();

    if (!entry.clockIn) {
      toast({
        title: "Erro",
        description: "Você precisa registrar a entrada primeiro.",
        variant: "destructive"
      });
      return;
    }

    if (entry.lunchOut) {
      toast({
        title: "Erro",
        description: "Você já registrou a saída para o almoço hoje.",
        variant: "destructive"
      });
      return;
    }

    const updatedEntry = {
      ...entry,
      lunchOut: timeString,
      status: 'lunch-break' as const
    };

    updateTimeEntry(updatedEntry);
    toast({
      title: "Ponto registrado",
      description: `Saída para almoço registrada às ${timeString}`,
    });
  };

  const lunchIn = () => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    const entry = getTodayEntry();

    if (!entry.lunchOut) {
      toast({
        title: "Erro",
        description: "Você precisa registrar a saída para o almoço primeiro.",
        variant: "destructive"
      });
      return;
    }

    if (entry.lunchIn) {
      toast({
        title: "Erro",
        description: "Você já registrou o retorno do almoço hoje.",
        variant: "destructive"
      });
      return;
    }

    const updatedEntry = {
      ...entry,
      lunchIn: timeString,
      status: 'lunch-return' as const
    };

    updateTimeEntry(updatedEntry);
    toast({
      title: "Ponto registrado",
      description: `Retorno do almoço registrado às ${timeString}`,
    });
  };

  const clockOut = () => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    const entry = getTodayEntry();

    if (!entry.clockIn) {
      toast({
        title: "Erro",
        description: "Você precisa registrar a entrada primeiro.",
        variant: "destructive"
      });
      return;
    }

    if (entry.lunchOut && !entry.lunchIn) {
      toast({
        title: "Erro",
        description: "Você precisa registrar o retorno do almoço antes de bater a saída.",
        variant: "destructive"
      });
      return;
    }

    const updatedEntry = {
      ...entry,
      clockOut: timeString,
      status: 'clocked-out' as const
    };

    updateTimeEntry(updatedEntry);
    toast({
      title: "Ponto registrado",
      description: `Saída registrada às ${timeString}`,
    });
  };

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee = {
      ...employee,
      id: Date.now().toString()
    };
    setEmployees(prev => [...prev, newEmployee]);
    toast({
      title: "Funcionário adicionado",
      description: `${employee.name} foi adicionado com sucesso.`,
    });
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prev => 
      prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
    );
    toast({
      title: "Funcionário atualizado",
      description: `${updatedEmployee.name} foi atualizado com sucesso.`,
    });
  };

  const addSystemUser = (user: Omit<SystemUser, 'id' | 'createdAt' | 'createdBy'>) => {
    const newUser = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.name || 'Desconhecido'
    };
    setSystemUsers(prev => [...prev, newUser]);
    toast({
      title: "Usuário criado",
      description: `Usuário ${user.name} foi criado com sucesso.`,
    });
    return newUser;
  };

  const updateSystemUser = (updatedUser: SystemUser) => {
    setSystemUsers(prev => 
      prev.map(user => user.id === updatedUser.id ? updatedUser : user)
    );
    toast({
      title: "Usuário atualizado",
      description: `${updatedUser.name} foi atualizado com sucesso.`,
    });
  };

  const deleteSystemUser = (userId: string) => {
    setSystemUsers(prev => prev.filter(user => user.id !== userId));
    toast({
      title: "Usuário removido",
      description: "Usuário foi removido com sucesso.",
    });
  };

  const addCompany = (company: Omit<Company, 'id' | 'createdAt' | 'createdBy'>) => {
    const newCompany = {
      ...company,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.name || 'Desconhecido'
    };
    setCompanies(prev => [...prev, newCompany]);
    toast({
      title: "Empresa adicionada",
      description: `${company.name} foi adicionada com sucesso.`,
    });
    return newCompany;
  };

  const updateCompany = (updatedCompany: Company) => {
    setCompanies(prev => 
      prev.map(company => company.id === updatedCompany.id ? updatedCompany : company)
    );
    toast({
      title: "Empresa atualizada",
      description: `${updatedCompany.name} foi atualizada com sucesso.`,
    });
  };

  const deleteCompany = (companyId: string) => {
    setCompanies(prev => prev.filter(company => company.id !== companyId));
    toast({
      title: "Empresa removida",
      description: "Empresa foi removida com sucesso.",
    });
  };

  return {
    timeEntries,
    employees,
    systemUsers,
    companies,
    getTodayEntry,
    clockIn,
    lunchOut,
    lunchIn,
    clockOut,
    addEmployee,
    updateEmployee,
    addSystemUser,
    updateSystemUser,
    deleteSystemUser,
    addCompany,
    updateCompany,
    deleteCompany,
    calculateHours,
    workHours
  };
};
