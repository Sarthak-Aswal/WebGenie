// components/ClientLottie.tsx
'use client';

import { Player } from "@lottiefiles/react-lottie-player";// or 'react-lottie-player'


export default function ClientLottie() {
  return (
   <Player
      src="https://lottie.host/c98831ce-1f8b-406a-9d86-0bbad7aff19b/fH6AvOKMzh.lottie"  // place the .lottie file in public/animations
      autoplay
      loop
      style={{ height: "300px", width: "300px" }}
    />
  );
}
