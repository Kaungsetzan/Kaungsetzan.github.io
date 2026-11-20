import { About } from "@/components/home/About";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Skills } from "@/components/home/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Skills />
      <About />
    </>
  );
}
