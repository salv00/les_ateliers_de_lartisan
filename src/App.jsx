
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout"; 
import { useAppData } from "@/hooks/useAppData"; 
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth
import { Loader2 } from "lucide-react"; // Import Loader

function App() {
  const {
    realizations,
    news,
    schedules,
    isLoading: isDataLoading, // Rename to avoid conflict
    handleAddRealization,
    handleAddNews,
    handleUpdateSchedules,
  } = useAppData();

  const { isLoading: isAuthLoading } = useAuth(); // Get auth loading state

  // Show loading indicator if either data or auth state is loading
  if (isDataLoading || isAuthLoading) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-background">
         <div className="text-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
           <p className="text-lg text-primary">Chargement des Ateliers de l'Artisan...</p>
         </div>
         <Toaster /> 
       </div>
     );
  }

  return (
    <Layout 
      realizations={realizations}
      news={news}
      schedules={schedules}
      onAddRealization={handleAddRealization}
      onAddNews={handleAddNews}
      onUpdateSchedules={handleUpdateSchedules}
    />
  );
}

export default App;
  