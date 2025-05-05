
import React from 'react';
import { motion } from "framer-motion";
import { Hammer } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Hammer className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Les Ateliers de l'Artisan</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="hover:text-primary transition-colors">À propos</a>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#realizations" className="hover:text-primary transition-colors">Réalisations</a>
            <a href="#news" className="hover:text-primary transition-colors">Actualités</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
