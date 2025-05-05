
import React from 'react';
import { motion } from "framer-motion";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale'; // Import French locale

export function NewsSection({ news }) {
  return (
    <section className="py-16 bg-secondary" id="news">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Actualités</h2>
         {news.length === 0 ? (
           <p className="text-center text-muted-foreground">Aucune actualité à afficher pour le moment.</p>
         ) : (
           <div className="grid md:grid-cols-2 gap-8">
             {news.map((item, index) => (
               <motion.div
                 key={item.id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="bg-card rounded-lg overflow-hidden shadow-lg flex flex-col border border-border hover:shadow-xl transition-shadow duration-300"
               >
                 {item.image_url ? (
                    <div className="w-full h-48 bg-muted overflow-hidden">
                      <img 
                        src={item.image_url} 
                        alt={item.title || 'Actualité'} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy" // Improve performance
                      />
                    </div>
                 ) : (
                   <div className="w-full h-48 bg-muted flex items-center justify-center">
                     <span className="text-muted-foreground text-sm">Pas d'image</span>
                   </div>
                 )}
                 <div className="p-4 flex-grow flex flex-col">
                   <h3 className="text-xl font-semibold mb-2 text-primary">{item.title}</h3>
                   <p className="text-muted-foreground flex-grow mb-2">{item.description}</p>
                   <p className="text-xs text-muted-foreground mt-auto pt-2 border-t border-border">
                     Publié le {format(new Date(item.created_at), 'd MMMM yyyy', { locale: fr })}
                   </p>
                 </div>
               </motion.div>
             ))}
           </div>
         )}
      </div>
    </section>
  );
}
  