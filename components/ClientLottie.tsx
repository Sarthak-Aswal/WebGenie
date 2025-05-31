// components/ClientLottie.tsx
'use client';
import Script from 'next/script';
import { Player } from "@lottiefiles/react-lottie-player";// or 'react-lottie-player'


export default function ClientLottie() {
  return (
    <>
    <Script
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
        strategy="beforeInteractive"
      />
   <Player
      src="https://lottie.host/c98831ce-1f8b-406a-9d86-0bbad7aff19b/fH6AvOKMzh.lottie"  // place the .lottie file in public/animations
      autoplay
      loop
      style={{ height: "300px", width: "300px" }}
    /></>
  );
}
