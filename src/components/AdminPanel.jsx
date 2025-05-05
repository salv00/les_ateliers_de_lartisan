
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Clock, Plus, Calendar, LogOut, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth
import { LoginForm } from "@/components/admin/LoginForm";
import { RealizationForm } from "@/components/admin/RealizationForm";
import { NewsForm } from "@/components/admin/NewsForm";
import { ScheduleForm } from "@/components/admin/ScheduleForm";

export function AdminPanel({ onAddRealization, onAddNews, onUpdateSchedules, schedules: initialSchedules }) {
  const { toast } = useToast();
  const { session, user, logout, isLoading: isAuthLoading } = useAuth(); // Use auth context
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast({ title: "Déconnexion", description: "Vous avez été déconnecté." });
      setIsDialogOpen(false); // Close dialog on logout
    } catch (error) {
      console.error("Logout error:", error);
      toast({ title: "Erreur", description: "Impossible de se déconnecter.", variant: "destructive" });
    } finally {
      setIsLoggingOut(false);
    }
  };

   const handleImageUpload = async (file, type) => {
     if (!file) return null;
     try {
       const fileExt = file.name.split('.').pop();
       const fileName = `${type}-${Date.now()}.${fileExt}`;
       // Include user ID in path for potential future ownership rules
       const filePath = `${user?.id || 'public'}/${type}/${fileName}`; 

       const { error: uploadError } = await supabase.storage
         .from('images') // Bucket name
         .upload(filePath, file);

       if (uploadError) {
         throw uploadError; // Let RLS handle specific errors now
       }

       const { data } = supabase.storage
         .from('images')
         .getPublicUrl(filePath);

       if (!data || !data.publicUrl) {
         throw new Error("Impossible d'obtenir l'URL publique après l'upload.");
       }

       return data.publicUrl;
     } catch (error) {
       console.error('Erreur upload image:', error);
       // Provide more context if it's an RLS error
       const errorMsg = error.message.includes('security policy') 
         ? "Violation des règles de sécurité. Assurez-vous d'être connecté et que les politiques RLS sont correctes."
         : `Impossible de téléverser l'image: ${error.message}`;
       toast({ title: "Erreur Upload", description: errorMsg, variant: "destructive" });
       throw error; 
     } 
   };

  const isAuthenticated = !!session; // Check if session exists

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-4 right-4 shadow-lg hover:shadow-xl transition-shadow rounded-full z-50 bg-primary text-primary-foreground hover:bg-primary/90"
          aria-label="Panneau d'administration"
        >
          <Lock className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Panneau d'Administration</DialogTitle>
          {!isAuthenticated && !isAuthLoading && <DialogDescription>Connectez-vous pour gérer le contenu du site.</DialogDescription>}
           {isAuthLoading && <DialogDescription>Vérification de l'authentification...</DialogDescription>}
        </DialogHeader>
        
        {isAuthLoading ? (
           <div className="flex justify-center items-center p-8">
             <Loader2 className="h-8 w-8 animate-spin text-primary" />
           </div>
        ) : !isAuthenticated ? (
          <LoginForm /> // LoginForm now handles its own logic via context
        ) : (
          <>
            <Tabs defaultValue="realizations" className="pt-4">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="realizations"><Calendar className="w-4 h-4 mr-1 inline"/> Réalisations</TabsTrigger>
                <TabsTrigger value="news"><Plus className="w-4 h-4 mr-1 inline"/> Actualités</TabsTrigger>
                <TabsTrigger value="schedules"><Clock className="w-4 h-4 mr-1 inline"/> Horaires</TabsTrigger>
              </TabsList>

              <TabsContent value="realizations" className="space-y-6">
                <h3 className="text-lg font-semibold">Ajouter une Réalisation</h3>
                <RealizationForm 
                   onAddRealization={onAddRealization} 
                   handleImageUpload={handleImageUpload} 
                />
              </TabsContent>

              <TabsContent value="news" className="space-y-6">
                 <h3 className="text-lg font-semibold">Ajouter une Actualité</h3>
                 <NewsForm 
                    onAddNews={onAddNews} 
                    handleImageUpload={handleImageUpload} 
                 />
              </TabsContent>

              <TabsContent value="schedules" className="space-y-6">
                <h3 className="text-lg font-semibold">Modifier les Horaires</h3>
                <ScheduleForm 
                   onUpdateSchedules={onUpdateSchedules} 
                   initialSchedules={initialSchedules} 
                />
              </TabsContent>
            </Tabs>
             <Button 
                variant="outline" 
                onClick={handleLogout} 
                disabled={isLoggingOut} 
                className="mt-6 w-full"
              >
               {isLoggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
               Se déconnecter
             </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
  