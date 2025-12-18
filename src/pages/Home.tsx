import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Services } from '../components/sections/Services';
import { Stats } from '../components/sections/Stats';
import { Partners } from '../components/sections/Partners';
import { Contact } from '../components/sections/Contact';
import { ScrollReveal } from '../components/PageTransition';

/**
 * Home Page Component with scroll animations
 */
export const Home = () => {
  return (
    <>
      <Hero />
      
      <ScrollReveal direction="fade">
        <About />
      </ScrollReveal>
      
      <ScrollReveal direction="fade">
        <Services />
      </ScrollReveal>
      
      <ScrollReveal direction="fade">
        <Stats />
      </ScrollReveal>
      
      <ScrollReveal direction="fade">
        <Partners />
      </ScrollReveal>
      
      <ScrollReveal direction="fade">
        <Contact />
      </ScrollReveal>
    </>
  );
};