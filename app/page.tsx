import React from 'react';



const DecoLeft = () => (
  <svg
    className="absolute top-0 left-0 w-full h-full opacity-100 z-0"
    viewBox="0 0 1600 900"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <path d="M 0 149 L 300 450 L 0 751" stroke="#A0A4AB" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
  </svg>
);

const DecoRight = () => (
  <svg
    className="absolute top-0 right-0 w-full h-full opacity-100 z-0"
    viewBox="0 0 1600 900"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <path d="M 1600 149 L 1300 450 L 1600 751" stroke="#A0A4AB" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
  </svg>
);

const DiscoverButton = () => (
  <div className="absolute top-[458px] left-[32px] w-[150px] h-[44px] cursor-pointer z-10">
    <img src="/button-icon-text-shrunk.svg" alt="Discover A.I." />
  </div>
);

const TestButton = () => (
  <div className="absolute top-[458px] left-[1711px] w-[127px] h-[44px] cursor-pointer z-10">
    <img src="/button-icon-text-shrunk (1).svg" alt="Take Test" />
  </div>
);

export default function Home() {
  return (
    <div className="bg-[#FCFCFC] text-black min-h-screen p-4 sm:p-8 flex flex-col overflow-x-hidden">
      <header className="w-full max-w-[1920px] mx-auto flex justify-between items-center h-16 z-10 px-4 sm:px-8">
        <div className="text-xs sm:text-sm">
            <span className="font-bold text-black tracking-normal">SKINSTRIC</span><span className="text-gray-400 ml-[12px]">[ INTRO ]</span>
          </div>
        <button className="bg-black text-white px-4 sm:px-8 py-2 sm:py-3 text-xs font-semibold tracking-widest">
          ENTER CODE
        </button>
      </header>

      <main className="grow flex flex-col items-center justify-center text-center relative">
        <DecoLeft />
        <DecoRight />
        <DiscoverButton />
        <TestButton />

        <div className="absolute top-[361px] left-[620px] w-[680px] h-[240px] z-10 text-center font-roobert text-[128px] leading-[120px] tracking-[-0.07em]">
          <h1 className="font-light tracking-tighter">
            Sophisticated
          </h1>
          <h1 className="font-bold tracking-tighter">
            skincare
          </h1>
        </div>
      </main>

      <footer className="absolute top-[862px] left-[32px] w-[316px] h-[72px] z-10">
        <p className="font-roobert font-normal text-sm leading-6 tracking-normal uppercase">
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
        </p>
      </footer>
    </div>
  );
}
