import Navbar from "../components/Navbar";
import React from "react";

const Home = () => {
  return (
    <div>
      <Navbar
      ></Navbar>
      <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-4xl text-center font-regular">
          OSWALD
        </h1>
        </div>
    </div>
  );
};

export default Home;
