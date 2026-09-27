import { About } from '@/components/sections/About';
import { ContactCta } from '@/components/sections/ContactCta';
import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { WhyArkan } from '@/components/sections/WhyArkan';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

export default function Home() {
  useDocumentMeta('home');
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <WhyArkan />
      <Process />
      <ContactCta />
    </>
  );
}
