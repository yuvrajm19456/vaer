import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 75%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        taglineRef.current,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 0.6,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 65%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>

      <div className="footer-top">
        VÆR
      </div>

      <div className="footer-center">
        <h2 ref={logoRef}>
          V1
        </h2>

        <p ref={taglineRef}>
          Motion, redefined.
        </p>
      </div>

      <div className="footer-bottom">

        <div>
          <span>VÆR AUTOMOTIVE</span>
          <span>COPENHAGEN — DENMARK</span>
        </div>

        <div>
          <span>620 HP</span>
          <span>620 KM RANGE</span>
          <span>3.1 SEC</span>
        </div>

        <div>
          <span>© 2028 VÆR AUTOMOTIVE</span>
          <span>CONCEPT VEHICLE — FICTIONAL</span>
        </div>

      </div>

    </footer>
  );
}