import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./App.css";

import Hero from "./components/Hero";
import Design from "./components/Design";
import Performance from "./components/Performance";
import Interior from "./components/Interior";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // SMOOTH NAVIGATION

    const navLinks = document.querySelectorAll('a[href^="#"]');

    const handleNavClick = (event) => {
      event.preventDefault();

      const target = document.querySelector(
        event.currentTarget.getAttribute("href")
      );

      if (target) {
        lenis.scrollTo(target);
      }
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavClick);
    });

    // ACTIVE NAVIGATION

    const sections = ["top", "design", "performance", "interior"];

    const updateActiveNav = (id) => {
      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    };

    const triggers = sections.map((id) => {
      const section = document.getElementById(id);

      if (!section) return null;

      return ScrollTrigger.create({
        trigger: section,
        start: "top 45%",
        end: "bottom 45%",

        onEnter: () => updateActiveNav(id),
        onEnterBack: () => updateActiveNav(id),
      });
    });

    updateActiveNav("top");

    // LENIS ANIMATION LOOP

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavClick);
      });

      triggers.forEach((trigger) => {
        if (trigger) trigger.kill();
      });

      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <Hero />
      <Design />
      <Performance />
      <Interior />
      <Footer />
    </main>
  );
}

export default App;