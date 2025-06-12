"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function FloatingHearts() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="fixed inset-0 z-0 pointer-events-none"
      options={{
        particles: {
          number: {
            value: 50,
            density: { enable: true, value_area: 800 }
          },
          color: { value: "#ff80ab" },
          shape: {
            type: "image",
            image: [
              {
                src: "/assets/heart.svg",
                width: 100,
                height: 100
              }
            ]
          },
          opacity: { value: 0.5, random: false },
          size: { value: 16, random: true },
          line_linked: { enable: false },
          move: {
            enable: true,
            speed: 1.5,
            direction: "top",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false, mode: "bubble" },
            onclick: { enable: false, mode: "repulse" },
            resize: true
          }
        },
        retina_detect: true
      }}
    />
  );
} 