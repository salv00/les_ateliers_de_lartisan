
import React from 'react';
import { Clock, Phone, MapPin, Facebook } from "lucide-react";
import { Map } from "@/components/Map";

export function ContactSection({ schedules }) {
  return (
    <section className="py-16" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <p>18 Rue du Schossrain, 68240 Kaysersberg Vignoble</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:0668007371" className="hover:text-primary">06 68 00 73 71</a>
              </div>
              <div className="flex items-center gap-3">
                <Facebook className="w-5 h-5 text-primary" />
                <a 
                  href="https://www.facebook.com/frederic.michael.581" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Suivez-nous sur Facebook
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Horaires d'ouverture
              </h3>
              <div className="space-y-2">
                {schedules.map((schedule) => (
                  <div key={schedule.day} className="flex justify-between py-2 border-b last:border-b-0">
                    <span className="font-medium">{schedule.day}</span>
                    <span className="text-muted-foreground">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="h-[400px] md:h-full rounded-lg overflow-hidden shadow-lg">
             <Map />
          </div>
        </div>
      </div>
    </section>
  );
}
  