import React from "react";
import Link from "next/link";
import { Ghost, ArrowLeftCircle } from "lucide-react";

const NotFound = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-violet-50 px-6 py-20 font-sans">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <Ghost className="w-16 h-16 text-violet-600" strokeWidth={1.5} />
        </div>

        <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
          404
        </h1>

        <p className="text-xl font-medium text-gray-800 mb-2">
          Boo! Page not found.
        </p>

        <p className="text-gray-500 mb-6">
          It seems this page wandered off. But don’t worry, you can still get back home safely.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-full shadow transition"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
