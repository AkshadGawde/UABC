import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Services } from '../components/sections/Services';
import { Stats } from '../components/sections/Stats';
import { Partners } from '../components/sections/Partners';
import { Contact } from '../components/sections/Contact';

/**
 * Home Page Component
 */
export const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Stats />
      <Partners />
      <Contact />
    </>
  );
};