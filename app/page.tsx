"use client";
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const leftSideContentRef = useRef(null);
  const centerContentRef = useRef(null);
  const skincareTextRef = useRef(null);
  const rightSideContentRef = useRef(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    gsap.to(leftSideContentRef.current, { opacity: 0, x: -100, duration: 1, ease: 'power3.inOut' });
    gsap.to(centerContentRef.current, { x: -300, duration: 1, ease: 'power3.inOut' });
    gsap.to(skincareTextRef.current, { paddingLeft: 0, duration: 1, ease: 'power3.inOut' });
  };

  const handleMouseLeave = () => {
    gsap.to(leftSideContentRef.current, { opacity: 1, x: 0, duration: 1, ease: 'power3.inOut' });
    gsap.to(centerContentRef.current, { x: 0, duration: 1, ease: 'power3.inOut' });
    gsap.to(skincareTextRef.current, { paddingLeft: '8rem', duration: 1, ease: 'power3.inOut' });
  };

  const handleMouseEnterLeft = () => {
    gsap.to(rightSideContentRef.current, { opacity: 0, x: 100, duration: 1, ease: 'power3.inOut' });
    gsap.to(centerContentRef.current, { x: 300, duration: 1, ease: 'power3.inOut' });
    gsap.to(skincareTextRef.current, { paddingLeft: '16rem', duration: 1, ease: 'power3.inOut' });
  };

  const handleMouseLeaveLeft = () => {
    gsap.to(rightSideContentRef.current, { opacity: 1, x: 0, duration: 1, ease: 'power3.inOut' });
    gsap.to(centerContentRef.current, { x: 0, duration: 1, ease: 'power3.inOut' });
    gsap.to(skincareTextRef.current, { paddingLeft: '8rem', duration: 1, ease: 'power3.inOut' });
  };

  const handleTakeTestClick = () => {
    router.push('/analysis');
  };

  return (
    <div className="page-container">
      <header className="header">
        <div className="header-left">
          <span className="brand-logo">SKINSTRIC</span>
          <span>[ INTRO ]</span>
        </div>
        <div className="header-right">
          <button className="enter-code-btn">ENTER CODE</button>
        </div>
      </header>
      <main className="main-content">
        <div className="side-content left" ref={leftSideContentRef}>
          <a href="#" className="side-link" onMouseEnter={handleMouseEnterLeft} onMouseLeave={handleMouseLeaveLeft}>
            <Image src="/button-icon-text-shrunk.svg" alt="Discover A.I." width={150} height={44} />
          </a>
        </div>
        <div className="center-content" ref={centerContentRef}>
          <h1>
            Sophisticated
            <br />
            <span className="skincare-text" ref={skincareTextRef}>skincare</span>
          </h1>
        </div>
        <div className="side-content right" ref={rightSideContentRef}>
          <a href="#" className="side-link" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleTakeTestClick}>
            <Image src="/button-icon-text-shrunk%20(1).svg" alt="Take Test" width={127} height={44} />
          </a>
        </div>
      </main>
      <footer className="footer">
        <p>
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES
          <br />
          A HIGHLY-PERSONALISED ROUTINE TAILORED TO
          <br />
          WHAT YOUR SKIN NEEDS.
        </p>
      </footer>
    </div>
  );
}