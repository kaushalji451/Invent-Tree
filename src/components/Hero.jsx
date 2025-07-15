import React from "react";
import cn from "../utils/cn";

const Hero = ({ className }) => {
  return (
    <div
      className={cn(
        "relative flex h-screen w-full items-center justify-center",
      )}
    >
      <div className="flex h-[400px] w-[600px] items-center justify-between gap-x-12">
        <div className="h-full w-full border border-black">
          <h2 className="text-persian-green-700 text-6xl font-bold tracking-tight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
          <h1 className="text-persian-green-700 text-4xl">Messege</h1>
        </div>
        <div className="h-full w-full border border-black">hello</div>
      </div>
    </div>
  );
};

export default Hero;
