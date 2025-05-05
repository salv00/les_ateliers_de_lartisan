
import React from 'react';
import { motion } from "framer-motion";

export function ServicesSection() {
  return (
    <section className="py-16 bg-secondary" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Nos Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Création sur mesure</h3>
            <p>Réalisation de pièces uniques selon vos besoins et vos envies</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Restauration</h3>
            <p>Restauration de pièces métalliques anciennes dans le respect des techniques traditionnelles</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Conseil</h3>
            <p>Accompagnement et conseil pour vos projets de ferronnerie</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
  