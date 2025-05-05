
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth hook

export function LoginForm() {
  const [email, setEmail] = useState("admin@ateliersartisan.fr"); // Pre-fill for convenience
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth(); // Get login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
       toast({ title: "Champs requis", description: "Veuillez entrer l'email et le mot de passe.", variant: "destructive" });
       return;
    }
    setIsLoggingIn(true);
    try {
      await login(email, password); // Use Supabase auth login
      toast({
        title: "Connexion réussie",
        description: "Accès administrateur accordé.",
      });
      // No need to call onLoginSuccess, state is managed by AuthContext
      // Optionally clear password field after successful attempt indication (listener handles actual success)
      // setPassword(""); 
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Échec de la connexion",
        description: error.message || "Email ou mot de passe incorrect.",
        variant: "destructive",
      });
      setPassword(""); // Clear password on failure
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@exemple.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoggingIn}
        />
      </div>
      <div className="space-y-2 relative">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoggingIn}
        />
        <Button
           type="button"
           variant="ghost"
           size="icon"
           className="absolute right-1 top-[28px] h-7 w-7"
           onClick={() => setShowPassword(!showPassword)}
           aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
         >
           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
         </Button>
      </div>
      <Button type="submit" className="w-full" disabled={isLoggingIn}>
        {isLoggingIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Se connecter
      </Button>
    </form>
  );
}
  