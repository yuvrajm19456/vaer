import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Hero.css";

import trailer from "../assets/trailer.mp4";
import music from "../assets/music.mp3";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const taglineRef = useRef(null);
  const scrollRef = useRef(null);
  const audioRef = useRef(null);

  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (soundOn) {
      gsap.to(audio, {
        volume: 0,
        duration: 0.6,
        onComplete: () => {
          audio.pause();
        },
      });

      setSoundOn(false);
    } else {
      audio.volume = 0;

      audio
        .play()
        .then(() => {
          gsap.to(audio, {
            volume: 0.12,
            duration: 1.2,
          });

          setSoundOn(true);
        })
        .catch(() => {
          console.log("Audio playback was blocked.");
        });
    }
  };

  useLayoutEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0.12;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      timeline

        // Video slowly moves away
        .to(videoRef.current, {
          scale: 1.12,
          opacity: 0,
          ease: "none",
          duration: 1,
        })

        // Main title disappears
        .to(
          contentRef.current,
          {
            y: -100,
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.45,
          },
          "<"
        )

        // Tagline disappears
        .to(
          taglineRef.current,
          {
            y: -40,
            opacity: 0,
            duration: 0.3,
          },
          "<"
        )

        // Scroll indicator disappears
        .to(
          scrollRef.current,
          {
            opacity: 0,
            duration: 0.2,
          },
          "<"
        );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef}>
      
      {/* Navigation */}
      <nav className="hero-nav">
        <a href="#top" className="nav-logo">
          VÆR
        </a>

        <div className="nav-links">
          <a href="#design">DESIGN</a>
          <a href="#performance">PERFORMANCE</a>
          <a href="#interior">INTERIOR</a>
        </div>
      </nav>

      {/* Background Music */}
      <audio
        ref={audioRef}
        src={music}
        autoPlay
        loop
      />

      <div className="hero-stage">

        {/* Sound Control */}
        <button
          className="sound-control"
          onClick={toggleSound}
          aria-label={
            soundOn ? "Turn sound off" : "Turn sound on"
          }
        >
          <span className="sound-icon">
            {soundOn ? "◉" : "○"}
          </span>

          <span>
            {soundOn ? "SOUND ON" : "SOUND OFF"}
          </span>
        </button>

        {/* Trailer */}
        <video
          ref={videoRef}
          className="hero-video"
          src={trailer}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dark cinematic overlay */}
        <div className="hero-overlay" />

        {/* Hero Typography */}
        <div
          className="hero-content"
          ref={contentRef}
        >
          <p className="hero-eyebrow">
            VÆR AUTOMOTIVE
          </p>

          <h1>
            VÆR
            <span>V1</span>
          </h1>

          <p
            className="hero-tagline"
            ref={taglineRef}
          >
            Motion, redefined.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div
          className="hero-scroll"
          ref={scrollRef}
        >
          <span>SCROLL TO EXPLORE</span>
          <div className="scroll-line" />
        </div>

      </div>
    </section>
  );
}