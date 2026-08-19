import { AmbientBackground } from "@/components/site/ambient-background";
import { Capabilities } from "@/components/site/capabilities";
import { Contact } from "@/components/site/contact";
import { Hero } from "@/components/site/hero";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { GlassmorphismPortfolioBlock } from "@/components/ui/glassmorphism-portfolio-block-shadcnui";
import { ProjectShowcase } from "@/components/ui/project-showcase";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <ProjectShowcase />
        <Capabilities />
        <GlassmorphismPortfolioBlock />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
