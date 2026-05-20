
const DecoLeft = () => (
  <svg
    className="absolute top-1/2 -translate-y-1/2 left-[-331px] w-[602px] h-[602px] opacity-100 z-0"
    viewBox="0 0 602 602"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M301 0L602 301L301 602L0 301Z"
      stroke="#A0A4AB"
      strokeWidth="2"
      strokeDasharray="2 8"
    />
  </svg>
);

const DecoRight = () => (
  <svg
    className="absolute top-1/2 -translate-y-1/2 right-[-331px] w-[602px] h-[602px] opacity-100 z-0"
    viewBox="0 0 602 602"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M301 0L602 301L301 602L0 301Z"
      stroke="#A0A4AB"
      strokeWidth="2"
      strokeDasharray="2 8"
    />
  </svg>
);

export default function Home() {
  return (
    <div className="bg-[#FCFCFC] text-black min-h-screen p-4 sm:p-8 flex flex-col overflow-x-hidden">
      <header className="w-full flex justify-between items-center py-4 z-10">
        <div className="text-xs sm:text-sm tracking-widest">SKINSTRIC [INTRO]</div>
        <button className="bg-black text-white px-4 sm:px-8 py-2 sm:py-3 text-xs font-semibold tracking-widest">
          ENTER CODE
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center relative">
        <DecoLeft />
        <DecoRight />

        <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 cursor-pointer z-10">
          <img src="/button-icon-text-shrunk.svg" alt="Discover A.I." className="w-24 sm:w-36" />
        </div>

        <div className="my-16 relative z-10">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-thin tracking-tighter">
            Sophisticated
          </h1>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-thin tracking-tighter">
            skincare
          </h1>
        </div>

        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 cursor-pointer z-10">
           <img src="/button-icon-text-shrunk (1).svg" alt="Take Test" className="w-24 sm:w-32" />
        </div>
      </main>

      <footer className="w-full py-4 z-10">
        <p className="max-w-xs text-xs sm:text-sm tracking-wider uppercase">
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED
          ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
        </p>
      </footer>
    </div>
  );
}


