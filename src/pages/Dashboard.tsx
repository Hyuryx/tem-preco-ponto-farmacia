
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário está logado
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate("/", { replace: true });
      return;
    }

    try {
      const user = JSON.parse(userData);
      setCurrentUser(user);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      localStorage.removeItem('currentUser');
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  // Renderizar dashboard baseado no tipo de usuário
  if (currentUser.role === "employee") {
    return <EmployeeDashboard currentUser={currentUser} />;
  }

  return <AdminDashboard currentUser={currentUser} />;
};

export default Dashboard;
