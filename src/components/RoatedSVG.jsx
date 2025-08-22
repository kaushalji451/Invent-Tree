import React from 'react'
import { motion } from 'framer-motion'
const RoatedSVG = () => {
  return (
    <div className="flex items-center justify-center h-screen relative">
      {/* Rotating SVG Circle with text using framer-motion */}
      <motion.svg
        viewBox="0 0 300 300"
        className="w-[128px] h-[128px]"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear"
        }}
      >
        <defs>
          <path
            id="circlePath"
            d="M 150, 150
             m -100, 0
             a 100,100 0 1,1 200,0
             a 100,100 0 1,1 -200,0"
          />
        </defs>
        <text
          className="fill-black "
          fontSize="20"
          fontFamily="sans-serif"
        >
          <textPath href="#circlePath" startOffset="0%">
            SCROLL &nbsp; &nbsp; SCROLL &nbsp; &nbsp; SCROLL &nbsp; &nbsp; SCROLL
            &nbsp; &nbsp; SCROLL &nbsp; &nbsp; SCROLL
          </textPath>
        </text>
      </motion.svg>

      {/* Centered logo */}
      <div className="absolute text-5xl text-black">
        <img
          src="https://niveshjano.in/assets/logo-D_wrZTeL.png"
          alt="nj logo"
          className="w-10 h-10 object-contain"
        />
      </div>
    </div>
  )
}

export default RoatedSVG
