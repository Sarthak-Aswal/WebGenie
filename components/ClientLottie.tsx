// components/ClientLottie.tsx
'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react'// or 'react-lottie-player'


export default function ClientLottie() {
  return (
    <DotLottieReact
      src="https://lottie.host/c98831ce-1f8b-406a-9d86-0bbad7aff19b/fH6AvOKMzh.lottie"
      loop
      autoplay
    />
  );
  
};
