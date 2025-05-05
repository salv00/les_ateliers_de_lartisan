
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export function NewsForm({ onAddNews, handleImageUpload }) {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id.replace('news-', '')]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImageFile(null);
      setImagePreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast({ title: "Champs requis", description: "Veuillez remplir le titre et la description.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    setIsUploading(!!imageFile);

    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile, 'news');
      }

      const newsData = {
        title: formData.title,
        description: formData.description,
        image_url: imageUrl,
        created_at: new Date().toISOString()
      };

      await onAddNews(newsData);
      
      // Reset form on success
      setFormData({ title: "", description: "" });
      setImageFile(null);
      setImagePreview("");
      e.target.reset(); 

    } catch (error) {
      console.error("Failed to submit news:", error);
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="news-title">Titre</Label>
        <Input id="news-title" type="text" placeholder="Titre de l'actualité"
          value={formData.title}
          onChange={handleInputChange}
          required disabled={isSubmitting || isUploading} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="news-description">Description</Label>
        <Textarea id="news-description" placeholder="Contenu de l'actualité"
          value={formData.description}
          onChange={handleInputChange}
          required disabled={isSubmitting || isUploading} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="news-image">Image (Optionnel)</Label>
        <Input id="news-image" type="file" accept="image/*" 
          onChange={handleImageChange} 
          disabled={isSubmitting || isUploading} />
        {imagePreview && <img src={imagePreview} alt="Prévisualisation" className="mt-2 max-h-40 rounded object-cover"/>}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting || isUploading}>
         {(isSubmitting || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
         {isUploading ? 'Téléversement...' : (isSubmitting ? 'Ajout...' : 'Ajouter l\'actualité')}
      </Button>
    </form>
  );
}
  