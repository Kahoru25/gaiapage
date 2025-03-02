"use client";
import {
  AcmeLogo,
  ApexLogo,
  CelestialLogo,
  QuantumLogo,
  PulseLogo,
  EchoLogo,
  supabase,
  openai,
  node,
  power,
  whatsapp,
  webhook,
  google,
  meta,
} from "@/assets";
import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  supabase,
  openai,
  google,
  meta,
  node,
  power,
  whatsapp,
  webhook
];
// #808080

export const LogoTicker = () => {
  return (
    <section className="py- md:py-24">
      <div className="container">
      <h1 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.5em' }} className="text-center">
  Tecnologías Implementadas
</h1>

        <div className="py-5 flex items-center gap-5">
          <div className="flex-0 md:flex-none">
          </div>
          <div className="flex flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_30%,black_60%,transparent)]">
            <motion.div
              initial={{ translateX: "-40%" }}
              animate={{ translateX: "0" }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex flex-none gap-14 pr-14 -translate-x-1/2"
            >
              {[...logos, ...logos].map((logo, index) => (
                <Image
                  key={index}
                  src={logo.src}
                  width={logo.width}
                  height={logo.height}
                  alt="Tecnologias implementados"
                  className="h-12 w-auto"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
