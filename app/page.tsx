import { redirect } from "next/navigation"; 
import { Navbar } from "./components/Navbar";
import { auth } from "./lib/auth";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { TestimonialSection } from "./components/TestimonialSection";
import { CTA } from "./components/Cta";
import { Footer } from "./components/Footer";

export default async function Home() {
  const session = await auth();
  if(session?.user){
    return redirect("/dashboard"); 
  }
  return (
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <Navbar />
      <Hero />
      <Features />
      <TestimonialSection />
      <CTA />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}