
import React from "react";
import { Navbar } from "@/components/Navbar";
import { AdminPanel } from "@/components/AdminPanel";
import { Toaster } from "@/components/ui/toaster";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { RealizationsSection } from "@/components/sections/RealizationsSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export function Layout({ 
  realizations, 
  news, 
  schedules, 
  onAddRealization, 
  onAddNews, 
  onUpdateSchedules 
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <RealizationsSection realizations={realizations} />
        <NewsSection news={news} />
        <ContactSection schedules={schedules} />
      </main>
      <AdminPanel 
        onAddRealization={onAddRealization} 
        onAddNews={onAddNews} 
        onUpdateSchedules={onUpdateSchedules}
        schedules={schedules}
      />
      <Toaster />
    </div>
  );
}
  