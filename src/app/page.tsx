import { AmbientBackground } from "@/components/site/ambient-background";
import { BrandWork } from "@/components/site/brand-work";
import { Contact } from "@/components/site/contact";
import { Hero } from "@/components/site/hero";
import { Process } from "@/components/site/process";
import { Statement } from "@/components/site/statement";
import { MotionProvider } from "@/components/site/motion-provider";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { TypeDesign } from "@/components/site/type-design";
import { GlassmorphismPortfolioBlock } from "@/components/ui/glassmorphism-portfolio-block-shadcnui";
import { ProjectShowcase } from "@/components/ui/project-showcase";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <SiteNav />
      <main className="flex-1">
        <MotionProvider>
          <Hero />
          <Statement />
          <Process />
          <ProjectShowcase />
          <BrandWork />
          <TypeDesign />
          <GlassmorphismPortfolioBlock />
          <Contact />
        </MotionProvider>
      </main>
      <SiteFooter />
    </>
  );
}
