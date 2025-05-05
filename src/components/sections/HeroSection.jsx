
import React from 'react';
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative h-[80vh] hero-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl font-bold mb-6">Les Ateliers de l'Artisan</h1>
          <p className="text-xl mb-8">Artisan forgeron à Kaysersberg - Création et restauration de pièces métalliques sur mesure</p>
        </motion.div>
      </div>
    </section>
  );
}
  