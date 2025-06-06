
import { useState, useEffect } from 'react';

export interface Settings {
  automaticSync: boolean;
  geoLocation: boolean;
  darkMode: boolean;
  multiCompany: boolean;
  offlineMode: boolean;
  auditLog: boolean;
  smartReminder: boolean;
  antifraud: boolean;
  language: string;
  timezone: string;
  workHours: {
    startTime: string;
    lunchStart: string;
    lunchEnd: string;
    endTime: string;
  };
}

interface WorkHours {
  dailyHours: number;
  lunchDuration: number;
  weeklyHours: number;
  workingDays: number[];
}

interface CompanySettings {
  name: string;
  cnpj: string;
  address: string;
  phone: string;
}

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    automaticSync: true,
    geoLocation: true,
    darkMode: false,
    multiCompany: true,
    offlineMode: true,
    auditLog: true,
    smartReminder: true,
    antifraud: true,
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    workHours: {
      startTime: '08:00',
      lunchStart: '12:00',
      lunchEnd: '13:00',
      endTime: '17:00'
    }
  });

  const [workHours, setWorkHours] = useState<WorkHours>({
    dailyHours: 8,
    lunchDuration: 60,
    weeklyHours: 40,
    workingDays: [1, 2, 3, 4, 5] // Monday to Friday
  });

  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    name: 'TEM PREÇO',
    cnpj: '',
    address: '',
    phone: ''
  });

  // Carregar configurações do localStorage ao inicializar
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    const savedWorkHours = localStorage.getItem('workHours');
    const savedCompanySettings = localStorage.getItem('companySettings');

    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        // Aplicar modo escuro se estiver ativado
        if (parsed.darkMode) {
          document.documentElement.classList.add('dark');
        }
        // Aplicar idioma se disponível
        if (parsed.language) {
          document.documentElement.setAttribute('lang', parsed.language);
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      }
    }

    if (savedWorkHours) {
      try {
        setWorkHours(JSON.parse(savedWorkHours));
      } catch (error) {
        console.error('Erro ao carregar horários:', error);
      }
    }

    if (savedCompanySettings) {
      try {
        setCompanySettings(JSON.parse(savedCompanySettings));
      } catch (error) {
        console.error('Erro ao carregar dados da empresa:', error);
      }
    }
  }, []);

  const updateSetting = (key: keyof Settings | string, value: any) => {
    if (key === 'darkMode') {
      document.documentElement.classList.toggle('dark', value);
    }
    
    if (key === 'language') {
      document.documentElement.setAttribute('lang', value);
    }
    
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      const newSettings = {
        ...settings,
        [parent]: {
          ...(settings[parent as keyof Settings] as any),
          [child]: value
        }
      };
      setSettings(newSettings);
      localStorage.setItem('appSettings', JSON.stringify(newSettings));
    } else {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      localStorage.setItem('appSettings', JSON.stringify(newSettings));
    }
    
    console.log('Configuração atualizada:', key, value);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !settings.darkMode;
    updateSetting('darkMode', newDarkMode);
  };

  const updateWorkHours = (newWorkHours: WorkHours) => {
    setWorkHours(newWorkHours);
    localStorage.setItem('workHours', JSON.stringify(newWorkHours));
    console.log('Configurações de horário salvas:', newWorkHours);
  };

  const updateCompanySettings = (newCompanySettings: CompanySettings) => {
    setCompanySettings(newCompanySettings);
    localStorage.setItem('companySettings', JSON.stringify(newCompanySettings));
    console.log('Configurações da empresa salvas:', newCompanySettings);
  };

  return { 
    settings, 
    updateSetting,
    darkMode: settings.darkMode,
    toggleDarkMode,
    workHours,
    updateWorkHours,
    companySettings,
    updateCompanySettings
  };
};
