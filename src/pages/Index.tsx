
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Clock, Users, BarChart3, MapPin, Calculator, Eye, EyeOff } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";

const Index = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    role: "employee" 
  });
  const [resetEmail, setResetEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login realizado",
      description: "Bem-vindo ao sistema Tem Preço!",
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Cadastro realizado",
      description: "Conta criada com sucesso!",
    });
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Email enviado",
      description: "Instruções de recuperação enviadas para seu email",
    });
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
              Inteligência em
              <br />
              Marcação e Gestão
              <br />
              de Ponto
            </h2>
            <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              Mais praticidade e segurança no controle e gestão online da jornada de trabalho da sua equipe
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

          {/* Rating */}
          <div className="flex items-center justify-center lg:justify-start gap-2 mt-6">
            <span className="text-2xl font-bold text-gray-800">4.8</span>
            <div className="flex text-yellow-400">
              {"★".repeat(5)}
            </div>
            <span className="text-gray-500">+1000 Avaliações</span>
          </div>
        </div>

        {/* Right side - Login form following the image pattern */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="text-center pb-6">
              {!isRegisterMode && !isResetMode && (
                <CardTitle className="text-4xl font-bold text-gray-700 mb-6">
                  LOGIN
                </CardTitle>
              )}
              {isRegisterMode && (
                <CardTitle className="text-3xl font-bold text-gray-700 mb-6">
                  CADASTRO
                </CardTitle>
              )}
              {isResetMode && (
                <CardTitle className="text-3xl font-bold text-gray-700 mb-6">
                  RECUPERAR SENHA
                </CardTitle>
              )}
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-8">
              {!isRegisterMode && !isResetMode && (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-gray-600 font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.username}
                      onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
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

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
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
                    <Button 
                      variant="link" 
                      className="text-sm text-blue-400 p-0 h-auto font-normal"
                      onClick={() => setIsResetMode(true)}
                    >
                      Esqueceu a Senha?
                    </Button>
                  </div>

                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 mt-6 rounded-md text-lg font-medium">
                    Entrar
                  </Button>

                  <div className="text-center mt-6">
                    <p className="text-gray-600 mb-2">
                      Não Tem Uma Conta?{" "}
                      <Button 
                        variant="link" 
                        className="text-blue-400 p-0 h-auto font-normal"
                        onClick={() => setIsRegisterMode(true)}
                      >
                        Inscrever-se
                      </Button>
                    </p>
                  </div>
                </form>
              )}

              {isRegisterMode && (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Nome Completo"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      className="bg-gray-100 border-0 h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="bg-gray-100 border-0 h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Sua senha"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="bg-gray-100 border-0 h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Confirme sua senha"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="bg-gray-100 border-0 h-12"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 h-12">
                    CADASTRAR
                  </Button>
                  <div className="text-center">
                    <Button 
                      variant="link" 
                      className="text-sm text-blue-400"
                      onClick={() => setIsRegisterMode(false)}
                    >
                      Voltar ao Login
                    </Button>
                  </div>
                </form>
              )}

              {isResetMode && (
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="bg-gray-100 border-0 h-12"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 h-12">
                    ENVIAR INSTRUÇÕES
                  </Button>
                  <div className="text-center">
                    <Button 
                      variant="link" 
                      className="text-sm text-blue-400"
                      onClick={() => setIsResetMode(false)}
                    >
                      Voltar ao Login
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              100% de acordo com a Portaria 671 do Ministério do Trabalho
            </p>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <div className="fixed bottom-6 left-6">
        <Button size="icon" className="rounded-full bg-green-500 hover:bg-green-600 shadow-lg">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.25 7.11l-2.18 2.18c-.28-.15-.59-.29-.91-.41l.27-2.91c.61.26 1.2.61 1.73 1.06l1.09-1.09c-.83-.78-1.79-1.39-2.83-1.8L12.04 4.5 9.92 6.14c-1.04.41-2 1.02-2.83 1.8l1.09 1.09c.53-.45 1.12-.8 1.73-1.06l.27 2.91c-.32.12-.63.26-.91.41L7.09 9.11C6.24 10.55 5.78 12.24 5.78 14c0 .85.13 1.68.38 2.47l1.34-.35c-.16-.69-.25-1.4-.25-2.12 0-1.39.35-2.7.97-3.84l1.52 1.52c.5-.24 1.04-.42 1.6-.54l-.2-2.2c.47-.06.95-.09 1.44-.09s.97.03 1.44.09l-.2 2.2c.56.12 1.1.3 1.6.54l1.52-1.52c.62 1.14.97 2.45.97 3.84 0 .72-.09 1.43-.25 2.12l1.34.35c.25-.79.38-1.62.38-2.47 0-1.76-.46-3.45-1.31-4.89z"/>
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Index;
