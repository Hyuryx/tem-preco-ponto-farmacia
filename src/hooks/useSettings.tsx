
import { useState } from 'react';

export interface Settings {
  automaticSync: boolean;
  geoLocation: boolean;
  darkMode: boolean;
  multiCompany: boolean;
  offlineMode: boolean;
  auditLog: boolean;
  smartReminder: boolean;
  antifraud: boolean;
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
    workingDays: [0, 1, 2, 3, 4] // Monday to Friday
  });

  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    name: 'TEM PREÇO',
    cnpj: '',
    address: '',
    phone: ''
  });

  const updateSetting = (key: keyof Settings | string, value: any) => {
    if (key === 'darkMode') {
      document.documentElement.classList.toggle('dark', value);
    }
    
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Settings] as any),
          [child]: value
        }
      }));
    } else {
      setSettings(prev => ({ ...prev, [key]: value }));
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !settings.darkMode;
    updateSetting('darkMode', newDarkMode);
  };

  const updateWorkHours = (newWorkHours: WorkHours) => {
    setWorkHours(newWorkHours);
  };

  const updateCompanySettings = (newCompanySettings: CompanySettings) => {
    setCompanySettings(newCompanySettings);
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
