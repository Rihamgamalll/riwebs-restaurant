'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HomeMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.section-head').forEach((head) => {
        gsap.from(head.children, {
          y: 46,
          autoAlpha: 0,
          duration: .85,
          stagger: .12,
          ease: 'power3.out',
          scrollTrigger: { trigger: head, start: 'top 84%' },
        });
      });

      gsap.from('.signatures .food-card', {
        y: 75,
        rotateX: 8,
        autoAlpha: 0,
        scale: .94,
        duration: .9,
        stagger: .1,
        ease: 'back.out(1.25)',
        scrollTrigger: { trigger: '.signatures .food-grid', start: 'top 82%' },
      });

      gsap.from('.category-card', {
        y: 90,
        rotate: (i) => i % 2 ? 2.4 : -2.4,
        autoAlpha: 0,
        scale: .92,
        duration: .95,
        stagger: .09,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.category-grid', start: 'top 82%' },
      });

      gsap.utils.toArray<HTMLElement>('.category-art').forEach((art) => {
        gsap.to(art, {
          yPercent: -9,
          ease: 'none',
          scrollTrigger: { trigger: art, start: 'top bottom', end: 'bottom top', scrub: .8 },
        });
      });

      gsap.from('.manifesto > *', {
        y: 52,
        autoAlpha: 0,
        duration: 1,
        stagger: .14,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.manifesto', start: 'top 78%' },
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
