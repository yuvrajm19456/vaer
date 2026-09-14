import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Design.css";

import side from "../assets/side.jpeg";
import top from "../assets/top.png";
import back from "../assets/back.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function Design() {
  const sectionRef = useRef(null);

  const sideRef = useRef(null);
  const topRef = useRef(null);
  const backRef = useRef(null);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  // =========================
  // MOUSE PARALLAX
  // =========================

  useEffect(() => {
    const stage = sectionRef.current;

    if (!stage) return;

    const handleMouseMove = (event) => {
      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(sideRef.current, {
        x: x * 6,
        y: y * 4,
        duration: 1.2,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(topRef.current, {
        x: x * 4,
        y: y * 3,
        duration: 1.4,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(backRef.current, {
        x: x * 2,
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

  // =========================
  // SCROLL ANIMATION
  // =========================

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(sideRef.current, {
        opacity: 1,
        scale: 1,
      });

      gsap.set(topRef.current, {
        opacity: 0,
        scale: 1.04,
      });

      gsap.set(backRef.current, {
        opacity: 0,
        scale: 1.04,
      });

      gsap.set(titleRef.current, {
        opacity: 1,
        y: 0,
      });

      gsap.set(descriptionRef.current, {
        opacity: 1,
        y: 0,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,

        start: "top top",
        end: "bottom bottom",

        scrub: true,

        onUpdate: (self) => {
          const progress = self.progress;

          // =========================
          // IMAGE 1 — SIDE
          // 0 → 0.30
          // =========================

          if (progress < 0.30) {
            gsap.set(sideRef.current, {
              opacity: 1,
              scale: 1,
            });

            gsap.set(topRef.current, {
              opacity: 0,
            });

            gsap.set(backRef.current, {
              opacity: 0,
            });
          }

          // =========================
          // IMAGE 2 — TOP
          // 0.30 → 0.65
          // =========================

          else if (progress < 0.65) {
            const localProgress =
              (progress - 0.30) / 0.35;

            gsap.set(sideRef.current, {
              opacity: 1 - localProgress,
              scale: 1 - localProgress * 0.04,
            });

            gsap.set(topRef.current, {
              opacity: localProgress,
              scale: 1.04 - localProgress * 0.04,
            });

            gsap.set(backRef.current, {
              opacity: 0,
            });
          }

          // =========================
          // IMAGE 3 — REAR
          // 0.65 → 1
          // =========================

          else {
            const localProgress =
              (progress - 0.65) / 0.35;

            gsap.set(sideRef.current, {
              opacity: 0,
            });

            gsap.set(topRef.current, {
              opacity: 1 - localProgress,
              scale: 1,
            });

            gsap.set(backRef.current, {
              opacity: localProgress,
              scale: 1.04 - localProgress * 0.04,
            });
          }

          // =========================
          // TEXT
          // =========================

          if (progress < 0.30) {
            gsap.set(titleRef.current, {
              innerHTML: "FORM FOLLOWS<br />MOTION",
              opacity: 1,
              y: 0,
            });

            gsap.set(descriptionRef.current, {
              innerHTML:
                "Designed with nothing unnecessary.",
              opacity: 1,
              y: 0,
            });
          }

          else if (progress < 0.65) {
            gsap.set(titleRef.current, {
              innerHTML: "AIR<br />BECOMES FORM",
              opacity: 1,
              y: 0,
            });

            gsap.set(descriptionRef.current, {
              innerHTML:
                "Every surface is shaped around the air.",
              opacity: 1,
              y: 0,
            });
          }

          else {
            gsap.set(titleRef.current, {
              innerHTML:
                "EVERY LINE<br />HAS A PURPOSE",
              opacity: 1,
              y: 0,
            });

            gsap.set(descriptionRef.current, {
              innerHTML:
                "Performance, expressed through restraint.",
              opacity: 1,
              y: 0,
            });
          }
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="design-section"
      id="design"
      ref={sectionRef}
    >
      <div className="design-stage">

        <div className="design-label">
          01 — DESIGN
        </div>

        <div className="design-visual">

          <img
            ref={sideRef}
            className="design-image"
            src={side}
            alt="VÆR V1 side profile"
          />

          <img
            ref={topRef}
            className="design-image"
            src={top}
            alt="VÆR V1 top view"
          />

          <img
            ref={backRef}
            className="design-image"
            src={back}
            alt="VÆR V1 rear view"
          />

        </div>

        <div className="design-copy">

          <h2 ref={titleRef}>
            FORM FOLLOWS
            <br />
            MOTION
          </h2>

          <p ref={descriptionRef}>
            Designed with nothing unnecessary.
          </p>

        </div>

        <div className="design-progress">
          <span>01</span>

          <div className="progress-line" />

          <span>03</span>
        </div>

      </div>
    </section>
  );
}