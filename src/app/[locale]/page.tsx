import { AmbientBackground } from "@/components/site/ambient-background";
import { BrandWork } from "@/components/site/brand-work";
import { Contact } from "@/components/site/contact";
import { Hero } from "@/components/site/hero";
import { PageSheet } from "@/components/site/page-sheet";
import { Statement } from "@/components/site/statement";
import { MotionProvider } from "@/components/site/motion-provider";
import { SiteFooter } from "@/components/site/site-footer";
import { Experience } from "@/components/site/experience";
import { TypeDesign } from "@/components/site/type-design";
import { GlassmorphismPortfolioBlock } from "@/components/ui/glassmorphism-portfolio-block-shadcnui";
import { ProjectShowcase } from "@/components/ui/project-showcase";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <div className="flex flex-1 flex-col gap-4 sm:gap-6">
        <MotionProvider>
          <PageSheet>
            <Hero />
          </PageSheet>
          <PageSheet>
            <Statement />
          </PageSheet>
          <PageSheet>
            <ProjectShowcase />
          </PageSheet>
          <PageSheet>
            <BrandWork />
          </PageSheet>
          <PageSheet>
            <TypeDesign />
          </PageSheet>
          <PageSheet>
            <Experience />
          </PageSheet>
          <PageSheet>
            <GlassmorphismPortfolioBlock />
          </PageSheet>
          <PageSheet>
            <Contact />
          </PageSheet>
        </MotionProvider>
      </div>
      <PageSheet>
        <SiteFooter />
      </PageSheet>
    </>
  );
}
