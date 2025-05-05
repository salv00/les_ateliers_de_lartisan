
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
// No need for useAuth here, Supabase client handles auth token automatically

const defaultSchedules = [
  { day: "Lundi", hours: "9:00–18:00" },
  { day: "Mardi", hours: "9:00–18:00" },
  { day: "Mercredi", hours: "9:00–18:00" },
  { day: "Jeudi", hours: "9:00–18:00" },
  { day: "Vendredi", hours: "9:00–18:00" },
  { day: "Samedi", hours: "Sur rendez-vous" },
  { day: "Dimanche", hours: "Fermé" },
].map(s => ({ ...s, id: crypto.randomUUID(), updated_at: new Date().toISOString() }));

const dayOrder = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

const sortSchedules = (schedules) => {
  // Ensure schedules is always an array before sorting
  if (!Array.isArray(schedules)) return []; 
  return [...schedules].sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
};

export function useAppData() {
  const [realizations, setRealizations] = useState([]);
  const [news, setNews] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch public data - RLS policies allow this for everyone
      const [realizationsRes, newsRes, schedulesRes] = await Promise.all([
        supabase.from('realizations').select('*').order('created_at', { ascending: false }),
        supabase.from('news').select('*').order('created_at', { ascending: false }),
        supabase.from('schedules').select('*')
      ]);

      // Check for errors after all promises resolve
      if (realizationsRes.error) throw realizationsRes.error;
      if (newsRes.error) throw newsRes.error;
      if (schedulesRes.error) throw schedulesRes.error;

      setRealizations(realizationsRes.data || []);
      setNews(newsRes.data || []);
      
      // Handle schedules initialization or update
      if (schedulesRes.data?.length > 0) {
        setSchedules(sortSchedules(schedulesRes.data));
      } else {
        // If no schedules in DB, set default and try to insert them
        // This insert will only work if an authenticated user is present
        // due to RLS policies. It might fail silently on first load if not logged in.
        const sortedDefaults = sortSchedules(defaultSchedules);
        setSchedules(sortedDefaults);
        try {
           await supabase.from('schedules').upsert(sortedDefaults, { onConflict: 'day' });
        } catch (upsertError) {
            // Log potential RLS error during initial schedule setup if not logged in
            console.warn("Could not insert default schedules (might require login):", upsertError.message);
        }
      }

    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      toast({
        title: "Erreur de chargement",
        description: `Impossible de récupérer les données: ${error.message}`,
        variant: "destructive",
      });
      // Fallback to default schedules on error if state is empty
      setSchedules(prev => prev.length > 0 ? prev : sortSchedules(defaultSchedules));
    } finally {
      setIsLoading(false);
    }
  }, [toast]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Write operations now rely on Supabase client automatically using the
  // authenticated user's token and RLS policies enforcing permissions.
  const handleAddRealization = useCallback(async (newRealization) => {
    try {
      const { data, error } = await supabase
        .from('realizations')
        .insert([newRealization])
        .select(); // Select to get the inserted row back
      
      if (error) throw error; // RLS errors will be caught here
      setRealizations(prev => [data[0], ...prev]);
      toast({ title: "Succès", description: "Réalisation ajoutée." });
    } catch (error) {
      console.error("Erreur ajout réalisation:", error);
      toast({ title: "Erreur", description: `Impossible d'ajouter la réalisation: ${error.message}`, variant: "destructive" });
      throw error; // Re-throw to allow form to handle UI state
    }
  }, [toast]);

  const handleAddNews = useCallback(async (newNews) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .insert([newNews])
        .select();
      
      if (error) throw error;
      setNews(prev => [data[0], ...prev]);
      toast({ title: "Succès", description: "Actualité ajoutée." });
    } catch (error) {
      console.error("Erreur ajout actualité:", error);
      toast({ title: "Erreur", description: `Impossible d'ajouter l'actualité: ${error.message}`, variant: "destructive" });
      throw error;
    }
  }, [toast]);

  const handleUpdateSchedules = useCallback(async (newSchedules) => {
    try {
       const schedulesToUpdate = newSchedules.map(s => ({
        day: s.day, // Ensure only expected columns are sent
        hours: s.hours,
        updated_at: new Date().toISOString()
      }));

      // Use upsert to handle both inserting new days (if defaults failed) and updating existing ones
      const { error } = await supabase
        .from('schedules')
        .upsert(schedulesToUpdate, { onConflict: 'day' }); 
      
      if (error) throw error;

      // Fetch the latest schedules after upsert to ensure consistency
      const { data: updatedSchedulesData, error: fetchError } = await supabase
          .from('schedules')
          .select('*');

      if (fetchError) throw fetchError;

      setSchedules(sortSchedules(updatedSchedulesData || []));
      toast({ title: "Succès", description: "Horaires mis à jour." });
    } catch (error) {
      console.error("Erreur mise à jour horaires:", error);
      toast({ title: "Erreur", description: `Impossible de mettre à jour les horaires: ${error.message}`, variant: "destructive" });
      throw error;
    }
  }, [toast]);

  return {
    realizations,
    news,
    schedules,
    isLoading,
    handleAddRealization,
    handleAddNews,
    handleUpdateSchedules,
  };
}
  