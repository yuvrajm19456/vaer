import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Performance.css";

gsap.registerPlugin(ScrollTrigger);

export default function Performance() {
  const sectionRef = useRef(null);
  const numberRef = useRef(null);
  const labelRef = useRef(null);
  const descriptionRef = useRef(null);
  const modesRef = useRef(null);

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

      // POWER
      tl.fromTo(
        numberRef.current,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        }
      );

      tl.fromTo(
        labelRef.current,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        "<0.15"
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
        "<0.1"
      );

      // TRANSITION
      tl.to(
        [numberRef.current, labelRef.current, descriptionRef.current],
        {
          opacity: 0,
          y: -40,
          duration: 0.5,
        },
        "+=0.6"
      );

      // ACCELERATION
      tl.set(numberRef.current, {
        innerHTML: "3.1",
      });

      tl.set(labelRef.current, {
        innerHTML: "SECONDS — 0 TO 100 KM/H",
      });

      tl.set(descriptionRef.current, {
        innerHTML: "Instant torque. Zero hesitation.",
      });

      tl.to(numberRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      });

      tl.to(
        labelRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
        },
        "<0.1"
      );

      tl.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
        },
        "<0.1"
      );

      // TRANSITION
      tl.to(
        [numberRef.current, labelRef.current, descriptionRef.current],
        {
          opacity: 0,
          y: -40,
          duration: 0.5,
        },
        "+=0.6"
      );

      // RANGE
      tl.set(numberRef.current, {
        innerHTML: "620",
      });

      tl.set(labelRef.current, {
        innerHTML: "KM — RANGE",
      });

      tl.set(descriptionRef.current, {
        innerHTML: "Long distance. No compromise.",
      });

      tl.to(numberRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      });

      tl.to(
        labelRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
        },
        "<0.1"
      );

      tl.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
        },
        "<0.1"
      );

      // PERFORMANCE MODES
      tl.fromTo(
        modesRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "+=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
  className="performance-section"
  id="performance"
  ref={sectionRef}
>
      <div className="performance-stage">

        <div className="performance-label">
          02 — PERFORMANCE
        </div>

        <div className="performance-main">
          <div
            className="performance-number"
            ref={numberRef}
          >
            620
          </div>

          <div
            className="performance-unit"
            ref={labelRef}
          >
            HP — ELECTRIC POWER
          </div>

          <p ref={descriptionRef}>
            Dual motor. All wheel drive.
          </p>
        </div>

        <div
          className="performance-modes"
          ref={modesRef}
        >
          <div className="mode active">
            <span>01</span>
            <strong>CALM</strong>
            <small>Quiet power</small>
          </div>

          <div className="mode">
            <span>02</span>
            <strong>FLOW</strong>
            <small>Balanced response</small>
          </div>

          <div className="mode">
            <span>03</span>
            <strong>PULSE</strong>
            <small>Maximum output</small>
          </div>
        </div>

        <div className="performance-specs">
          <span>620 HP</span>
          <span>780 NM</span>
          <span>285 KM/H</span>
        </div>

      </div>
    </section>
  );
}