
import { useState, useEffect } from "react";
import { EmployeeDashboard } from "@/components/EmployeeDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "employee";
  company: string;
}

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário está logado
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate("/");
      return;
    }

    try {
      const user = JSON.parse(userData);
      setCurrentUser(user);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      navigate("/");
    }
  }, [navigate]);

  if (!currentUser) {
    return <div>Carregando...</div>;
  }

  // Renderizar dashboard baseado no tipo de usuário
  if (currentUser.role === "employee") {
    return <EmployeeDashboard currentUser={currentUser} />;
  }

  return <AdminDashboard currentUser={currentUser} />;
};

export default Dashboard;
