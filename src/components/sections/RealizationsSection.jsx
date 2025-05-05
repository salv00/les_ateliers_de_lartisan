
import React from 'react';
import { motion } from "framer-motion";

export function RealizationsSection({ realizations }) {
  return (
    <section className="py-16" id="realizations">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Nos Réalisations</h2>
        {realizations.length === 0 ? (
           <p className="text-center text-muted-foreground">Aucune réalisation à afficher pour le moment.</p>
         ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {realizations.map((realization, index) => (
              <motion.div
                key={realization.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg overflow-hidden shadow-lg flex flex-col border border-border hover:shadow-xl transition-shadow duration-300"
              >
                {realization.image_url ? (
                   <div className="w-full h-48 bg-muted overflow-hidden">
                     <img 
                       src={realization.image_url} 
                       alt={realization.title || 'Réalisation'} 
                       className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                       loading="lazy" // Improve performance
                     />
                   </div>
                ) : (
                  <div className="w-full h-48 bg-secondary flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Pas d'image</span>
                  </div>
                )}
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{realization.title}</h3>
                  <p className="text-muted-foreground flex-grow">{realization.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
         )}
      </div>
    </section>
  );
}
  