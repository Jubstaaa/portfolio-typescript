"use client";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import Card from "./Card";
import React from "react";
import { sendContactMail } from "@/lib/actions";
import Form from "./Form";

export const ContactCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = 300;

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      offset: [size, size],
      devicePixelRatio: 1, // Daha az GPU yükü
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1,
      mapSamples: 4000, // Minimum sample (yük çok azalır)
      mapBrightness: 2.5,
      baseColor: [1, 1, 1],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [0.7595, -122.4367], size: 0.02 },
        { location: [40.7128, -74.006], size: 0.05 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.004; // Daha yavaş ve akıcı dönüş
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <Card
      whileHover={false}
      classNames={{
        body: "w-full max-w-6xl mx-auto gap-9 p-6 lg:p-16 bg-gradient-to-b from-[#ffffff] to-[#e2e8f0] items-center relative overflow-hidden",
      }}
    >
      <div className="flex flex-col gap-5 items-center text-3xl lg:text-5xl font-semibold leading-none text-center z-10">
        Contact with me to sizzle your project.
        <span className="text-secondary text-base font-medium tracking-normal">
          Great designs, new generation ideas, user-centered projects.
          Let&apos;s work together now!
        </span>
      </div>
      <Form
        action={sendContactMail}
        fields={[
          {
            name: "name",
            placeholder: "Name",
          },
          {
            name: "email",
            placeholder: "Email",
          },
          {
            name: "description",
            placeholder: "Work Description",
            type: "textarea",
          },
        ]}
      />

      {/* Daha küçük globe */}
      <canvas
        ref={canvasRef}
        style={{ width: size * 2, height: size * 2 }}
        className="absolute right-0 bottom-0 translate-x-0 "
      />
    </Card>
  );
};
