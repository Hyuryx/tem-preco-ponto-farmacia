
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Clock, Users, BarChart3, MapPin, Calculator, Eye, EyeOff } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useNavigate } from "react-router-dom";

// Usuários de demonstração
const users = [
  { id: 1, email: "admin@tempreco.com", password: "admin123", role: "admin", name: "João Silva" },
  { id: 2, email: "funcionario@tempreco.com", password: "func123", role: "employee", name: "Maria Santos" }
];

const Index = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar credenciais
    const user = users.find(
      u => u.email === loginData.email && u.password === loginData.password
    );

    if (user) {
      // Salvar dados do usuário no localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: "Farmácia Tem Preço"
      }));

      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${user.name}!`,
      });

      // Redirecionar para o dashboard
      navigate("/dashboard");
    } else {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos",
        variant: "destructive",
      });
    }
  };

  const handleRememberChange = (checked: CheckedState) => {
    setRememberLogin(checked === true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Hero section */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-red-600">
              TEM PREÇO
            </h1>
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800">
              Sistema de
              <br />
              Controle de Ponto
              <br />
              Inteligente
            </h2>
            <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              Controle completo da jornada de trabalho com segurança e praticidade
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <Clock className="w-8 h-8 text-red-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">Ponto Automático</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <Users className="w-8 h-8 text-red-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">Multiusuário</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <BarChart3 className="w-8 h-8 text-red-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">Dashboards</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <MapPin className="w-8 h-8 text-red-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">Geolocalização</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <Calculator className="w-8 h-8 text-red-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">Cálculo Automático</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <BarChart3 className="w-8 h-8 text-red-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">Relatórios</span>
            </div>
          </div>

          {/* Demo credentials */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">Credenciais de Demonstração:</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Administrador:</strong><br />
                Email: admin@tempreco.com<br />
                Senha: admin123
              </div>
              <div>
                <strong>Funcionário:</strong><br />
                Email: funcionario@tempreco.com<br />
                Senha: func123
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-4xl font-bold text-gray-700 mb-6">
                LOGIN
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-gray-600 font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="bg-gray-100 border-0 text-gray-600 placeholder:text-gray-400 text-base h-12 rounded-md"
                    required
                  />
                </div>
                
                <div className="space-y-2 relative">
                  <label className="text-gray-600 font-medium">Senha</label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="bg-gray-100 border-0 text-gray-600 placeholder:text-gray-400 text-base h-12 rounded-md pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-8 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox
                    id="remember"
                    checked={rememberLogin}
                    onCheckedChange={handleRememberChange}
                    className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Lembrar-me
                  </label>
                </div>

                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 mt-6 rounded-md text-lg font-medium">
                  Entrar
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              100% de acordo com a Portaria 671 do Ministério do Trabalho
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
