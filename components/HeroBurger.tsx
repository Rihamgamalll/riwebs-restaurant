'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const layers = [
  { src: '/assets/Burger1.png', label: 'Sesame Brioche', desc: 'toasted crown' },
  { src: '/assets/Burger2.png', label: 'Green Leaf', desc: 'fresh crunch' },
  { src: '/assets/Burger3.png', label: 'Tomato', desc: 'juicy slices' },
  { src: '/assets/Burger4.png', label: 'Cheddar', desc: 'melted edge' },
  { src: '/assets/Burger5.png', label: 'Cream Sauce', desc: 'silky finish' },
  { src: '/assets/Burger6.png', label: 'Crispy Chicken', desc: 'golden crunch' },
  { src: '/assets/Burger7.png', label: 'Cheese Layer', desc: 'extra melt' },
  { src: '/assets/Burger8.png', label: 'Bottom Bun', desc: 'toasted base' },
];

export default function HeroBurger() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>('.hero-layer');
      const labels = gsap.utils.toArray<HTMLElement>('.ingredient-tag');

      gsap.set(labels, {
        autoAlpha: 0,
        x: (i) => (i % 2 === 0 ? -24 : 24),
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=180%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl
        .to('.hero-copy', {
          y: -70,
          autoAlpha: 0.15,
          duration: 0.35,
        }, 0)

        .to(els, {
          y: (i) => ((i - 3.5) * 62),
          scale: (i) => 1 - (Math.abs(i - 3.5) * 0.012),
          duration: 1,
          ease: 'none',
        }, 0)

        .to(labels, {
          autoAlpha: 1,
          x: 0,
          stagger: 0.035,
          duration: 0.35,
        }, 0.18)

        .to('.scroll-note', {
          autoAlpha: 0,
          duration: 0.2,
        }, 0.08)

        .to('.hero-orbit', {
          rotate: 10,
          scale: 1.06,
          duration: 1,
        }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="hero">

      {/* HERO BACKGROUND */}
      <div className="hero-background">
        <Image
          src="/assets/background.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className="hero-orbit" />

      <div className="hero-copy">
        <span className="eyebrow">RIWEBS RESTAURANT · CAIRO, EGYPT</span>

        <h1>
          BUILT FOR
          <br />
          <em>THE CRAVING.</em>
        </h1>

        <p>
          Big flavor, crisp edges and a stack designed to be remembered.
        </p>

        <div className="hero-actions">
          <Link className="btn btn-primary" href="/menu">
            EXPLORE MENU
          </Link>

          <Link className="btn btn-ghost" href="/burgers">
            OUR BURGERS
          </Link>
        </div>
      </div>

      <div
        className="burger-stage"
        aria-label="Interactive exploded burger"
      >
        <div className="burger-layers">
          {layers.map((l, i) => (
            <div
              className="hero-layer"
              key={l.src}
              style={{ zIndex: 20 - i }}
            >
              <Image
                src={l.src}
                alt={l.label}
                fill
                sizes="(max-width: 768px) 82vw, 620px"
                priority={i < 3}
              />

              <div
                className={`ingredient-tag ${i % 2 ? 'right' : 'left'}`}
              >
                <small>0{i + 1}</small>
                <b>{l.label}</b>
                <span>{l.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-note">
        <span>SCROLL TO UNSTACK</span>
        <i />
      </div>

    </section>
  );
}