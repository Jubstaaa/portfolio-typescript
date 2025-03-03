"use client";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import Card from "./Card";
import React from "react";
import { sendContactMail } from "@/lib/actions";
import Form from "./Form";

export const ContactCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800 * 2,
      height: 800 * 2,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1], // Set the globe to white color
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.005; // Slower rotation
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
        body: "w-full max-w-6xl mx-auto gap-9 p-16 bg-gradient-to-b from-[#ffffff] to-[#e2e8f0] items-center",
      }}
    >
      <div className="flex flex-col gap-5 items-center text-5xl font-semibold leading-none text-center z-10">
        Contact with me to sizzle your project.
        <span className="text-[#647586] text-base font-medium tracking-normal">
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

      <canvas
        ref={canvasRef}
        style={{ width: 800, height: 800, maxWidth: "100%", aspectRatio: 1 }}
        className={"absolute right-0 bottom-0 translate-x-1/3 translate-y-1/2"}
      />
    </Card>
  );
};
