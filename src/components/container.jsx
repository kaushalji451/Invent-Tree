import cn from "../utils/cn";
import React from "react";

const Container = ({ className, children }) => {
  return (
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
};

export default Container;
