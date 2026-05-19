import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import CareProcess from "@/components/CareProcess";

// Dynamically import components that fetch from Supabase to avoid SSR issues
const Departments = dynamic(() => import("@/components/Departments"), {
  ssr: false,
});

const Doctors = dynamic(() => import("@/components/Doctors"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <div
        aria-hidden="true"
        className="h-14 md:h-20 bg-gradient-to-b from-slate-50 via-white to-white"
      />
      <Departments />
      <Stats />
      <Doctors />
      <About />
      <CareProcess />
      <Contact />
      <Footer />
    </main>
  );
}
