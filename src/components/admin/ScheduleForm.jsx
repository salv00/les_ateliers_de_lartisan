
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";

const dayOrder = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export function ScheduleForm({ onUpdateSchedules, initialSchedules }) {
  const [editableSchedules, setEditableSchedules] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialSchedules && initialSchedules.length > 0) {
       const sorted = [...initialSchedules].sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
       setEditableSchedules(sorted);
    } else {
        // Initialize with default structure if needed, though App.jsx handles default creation
        const defaultStructure = dayOrder.map(day => ({ id: crypto.randomUUID(), day, hours: '', updated_at: new Date().toISOString() }));
        setEditableSchedules(defaultStructure);
    }
  }, [initialSchedules]);


  const handleScheduleUpdate = (day, newHours) => {
    setEditableSchedules(currentSchedules =>
      currentSchedules.map(schedule =>
        schedule.day === day ? { ...schedule, hours: newHours } : schedule
      )
    );
  };

  const saveSchedules = async () => {
    setIsSaving(true);
    try {
      await onUpdateSchedules(editableSchedules);
       // Success toast handled by the parent (App.jsx)
    } catch (error) {
       // Error handled by the parent (App.jsx)
       console.error("Failed to save schedules:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {editableSchedules.map((schedule) => (
        <div key={schedule.day} className="flex items-center gap-4">
          <Label htmlFor={`schedule-${schedule.day}`} className="w-24 shrink-0">{schedule.day}</Label>
          <Input
            id={`schedule-${schedule.day}`}
            type="text"
            value={schedule.hours}
            onChange={(e) => handleScheduleUpdate(schedule.day, e.target.value)}
            placeholder="ex: 09:00-18:00 ou Fermé"
            disabled={isSaving}
          />
        </div>
      ))}
      <Button onClick={saveSchedules} className="w-full" disabled={isSaving}>
        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
        {isSaving ? 'Sauvegarde...' : 'Enregistrer les horaires'}
      </Button>
    </div>
  );
}
  