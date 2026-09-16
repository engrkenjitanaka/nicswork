import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WorkVideos } from "@/components/WorkVideos";
import { DesignWork } from "@/components/DesignWork";
import { Capabilities } from "@/components/Capabilities";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { person } from "@/content";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-amber focus:px-5 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to the work
      </a>

      <Nav />

      <main>
        <Hero />
        <WorkVideos />
        <Capabilities />
        <DesignWork />
        <About />
        <Contact />
      </main>

      <footer className="border-t border-line py-10">
        <div className="shell flex flex-col gap-2 text-[0.72rem] font-light text-mute sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {person.name}
          </span>
          <span className="tracked text-[0.62rem]">{person.role}</span>
        </div>
      </footer>
    </>
  );
}
