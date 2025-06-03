import React from "react";

function Hero() {
  return (
    <section className="bg-white lg:grid lg:place-content-center">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-32 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            AI Course Generator
            <br />
            Custom Learning Paths,
            <br />
            <strong className="text-indigo-600"> Powered by </strong>
            AI
          </h1>

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-400">
              Revolutionize your Course creation with our AI-powered app,
              delivering engaging and high-quality courses in seconds.
            </p>
          </div>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <a
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              href="#"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
