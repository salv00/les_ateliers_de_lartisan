
import React from 'react';
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section className="py-16" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">À propos</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-lg mb-4"
            >
              Technicien spécialisé dans la réalisation d'équipements mécaniques spéciaux, spécifique au client. Le savoir faire de nos ateliers mécaniques va de la forge d'éléments mécaniques ou de ferronnerie, en passant par leurs rénovations, jusqu'à la conception et la réalisation d'ensembles complets mécaniques à usage industriel, agricole, agro-alimentaire…ainsi que d'ensembles complets en ferronnerie.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-4"
            >
              Choisissez un partenaire qualifié et réactif, un artisan à l'écoute de vos besoins, faites confiance aux Ateliers de l'artisan!
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img alt="Atelier mécanique professionnel" className="rounded-lg shadow-xl" src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
  