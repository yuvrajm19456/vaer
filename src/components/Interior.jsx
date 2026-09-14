import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Interior.css";

import interiorWide from "../assets/interior-wide.jpeg";
import interiorDetail from "../assets/interior.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function Interior() {
  const sectionRef = useRef(null);
  const wideRef = useRef(null);
  const detailRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  // SUBTLE MOUSE MOVEMENT
  useEffect(() => {
    const stage = sectionRef.current;

    if (!stage) return;

    const handleMouseMove = (event) => {
      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(wideRef.current, {
        x: x * 5,
        y: y * 3,
        duration: 1.4,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(detailRef.current, {
        x: x * 3,
        y: y * 2,
        duration: 1.6,
        ease: "power3.out",
        overwrite: true,
      });
    };

    stage.addEventListener("mousemove", handleMouseMove);

    return () => {
      stage.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // SCROLL ANIMATION
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      // MAIN INTERIOR
      tl.fromTo(
        wideRef.current,
        {
          opacity: 0,
          scale: 1.08,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
        }
      );

      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "<0.2"
      );

      tl.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        "<0.15"
      );

      // TRANSITION
      tl.to(
        [wideRef.current, titleRef.current, descriptionRef.current],
        {
          opacity: 0,
          y: -30,
          duration: 0.6,
        },
        "+=0.7"
      );

      // DETAIL IMAGE
      tl.to(
        detailRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
        },
        "<0.1"
      );

      // SECOND MESSAGE
      tl.set(titleRef.current, {
        innerHTML: "HUMAN<br />BY DESIGN",
      });

      tl.set(descriptionRef.current, {
        innerHTML:
          "Every control is placed exactly where instinct expects it.",
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      });

      tl.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        "<0.15"
      );

      // FINAL SLOW PUSH
      tl.to(
        detailRef.current,
        {
          scale: 1.04,
          duration: 1,
        },
        "+=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="interior-section"
      id="interior"
      ref={sectionRef}
    >
      <div className="interior-stage">

        <div className="interior-label">
          03 — INTERIOR
        </div>

        <div className="interior-visual">

          <img
            ref={wideRef}
            className="interior-image interior-wide"
            src={interiorWide}
            alt="VÆR V1 interior"
          />

          <img
            ref={detailRef}
            className="interior-image interior-detail"
            src={interiorDetail}
            alt="VÆR V1 interior detail"
          />

        </div>

        <div className="interior-copy">

          <h2 ref={titleRef}>
            TECHNOLOGY<br />
            DISAPPEARS
          </h2>

          <p ref={descriptionRef}>
            Everything you need. Nothing in the way.
          </p>

        </div>

      </div>
    </section>
  );
}