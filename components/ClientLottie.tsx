// components/ClientLottie.tsx
'use client';

import { Player } from "@lottiefiles/react-lottie-player";// or 'react-lottie-player'


export default function ClientLottie() {
  return (
   <Player
      src="/lottie/empty.lottie"  // place the .lottie file in public/animations
      autoplay
      loop
      style={{ height: "300px", width: "300px" }}
    />
  );
}
