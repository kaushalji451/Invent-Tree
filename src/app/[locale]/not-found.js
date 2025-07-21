
'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full  flex flex-col items-center text-center">
            <div
              className="bg-cover bg-center mt-10 w-1/2 h-130 flex items-center justify-center"
              style={{ backgroundImage: "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')" }}
            >
              <h1 className="text-8xl font-bold text-black drop-shadow-lg absolute top-20">404</h1>
            </div>
            <div className="mt-[-50px]">
              <h3 className="text-2xl font-semibold mt-4">Look like you&apos;re lost</h3>
              <p className="text-gray-600 mt-2">The page you are looking for is not available!</p>
               <Link href="/">
                <button type="button" className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Go to Home</button>
               </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
