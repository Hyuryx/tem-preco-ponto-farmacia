
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

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

export const useTimeTracking = (currentUser: any) => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
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

  const today = new Date().toISOString().split('T')[0];

  const getTodayEntry = (): TimeEntry => {
    const existing = timeEntries.find(entry => 
      entry.userId === currentUser.name && entry.date === today
    );
    
    if (existing) return existing;
    
    return {
      id: `${currentUser.name}-${today}`,
      userId: currentUser.name,
      date: today,
      totalHours: 0,
      overtimeHours: 0,
      status: 'not-started'
    };
  };

  const calculateHours = (entry: TimeEntry): { totalHours: number; overtimeHours: number } => {
    if (!entry.clockIn) return { totalHours: 0, overtimeHours: 0 };

    const clockInTime = new Date(`${entry.date}T${entry.clockIn}`);
    let clockOutTime: Date;

    if (entry.clockOut) {
      clockOutTime = new Date(`${entry.date}T${entry.clockOut}`);
    } else {
      clockOutTime = new Date();
    }

    let totalMinutes = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60);

    // Subtrair tempo de almoço se aplicável
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
    const overtimeHours = Math.max(0, totalHours - 9); // 9 horas obrigatórias

    return { totalHours, overtimeHours };
  };

  const updateTimeEntry = (updatedEntry: TimeEntry) => {
    const calculated = calculateHours(updatedEntry);
    updatedEntry.totalHours = calculated.totalHours;
    updatedEntry.overtimeHours = calculated.overtimeHours;

    setTimeEntries(prev => {
      const filtered = prev.filter(entry => entry.id !== updatedEntry.id);
      return [...filtered, updatedEntry];
    });
  };

  const clockIn = () => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    const entry = getTodayEntry();
    
    if (entry.clockIn) {
      toast({
        title: "Erro",
        description: "Você já registrou a entrada hoje.",
        variant: "destructive"
      });
      return;
    }

    const updatedEntry = {
      ...entry,
      clockIn: timeString,
      status: 'clocked-in' as const
    };

    updateTimeEntry(updatedEntry);
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

    if (entry.clockOut) {
      toast({
        title: "Erro",
        description: "Você já registrou a saída hoje.",
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

  return {
    timeEntries,
    employees,
    getTodayEntry,
    clockIn,
    lunchOut,
    lunchIn,
    clockOut,
    addEmployee,
    calculateHours
  };
};
