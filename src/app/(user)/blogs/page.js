import Container from "../../../components/container";
import React from "react";

const Blogs = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center mt-20 ">
        <h1 className="text-4xl font-bold">Blogs</h1>
        <p className="mt-4 text-lg">
          This is the blogs page where you can find various articles and posts.
        </p>
        <p className="text-md mt-2">Stay tuned for more updates!</p>
        <div className="mt-8">
          <img
            src="https://via.placeholder.com/400"
            alt="Placeholder Image"
            className="rounded-lg shadow-lg"
          />
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Image Source: Placeholder.com
        </p>
      </div>
    </Container>
  );
};

export default Blogs;
