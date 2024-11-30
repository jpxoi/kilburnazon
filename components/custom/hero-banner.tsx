"use client";

import Image from "next/image";

import { useUser } from '@clerk/nextjs'

const calculateSalutation = () => {
  const hours = new Date().getHours();
  if (hours >= 0 && hours < 12) {
    return "Good Morning";
  } else if (hours >= 12 && hours < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

export default function HeroBanner() {
    const { isLoaded, isSignedIn, user } = useUser()

  return (
    <div
      id="hero"
      className="flex flex-col items-center justify-center gap-4 bg-primary text-white w-screen max-h-96 overflow-clip"
    >
      <Image
        src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero"
        width={2670}
        height={384}
        layout="responsive"
        className="object-cover transform -translate-y-40 w-full h-full opacity-30"
      />
      <div className="absolute">
        <h2 className="text-center text-4xl font-bold">
          {calculateSalutation()}{(!isLoaded || !isSignedIn || !user || !user.firstName) ? "!" : ", " + user.firstName + "!"}
        </h2>
        <p className="text-center text-lg">
          Welcome to the Kilburnazon Intranet.
        </p>
      </div>
    </div>
  );
}
