'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HomeMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const reveal = (selector:string, trigger:string, extra:gsap.TweenVars = {}) => {
        gsap.fromTo(selector,
          { y: 54, autoAlpha: 0, scale: .97 },
          { y: 0, autoAlpha: 1, scale: 1, duration: .82, stagger: .08, ease: 'power3.out', immediateRender:false, ...extra,
            scrollTrigger:{ trigger, start:'top 88%', once:true } }
        );
      };

      gsap.utils.toArray<HTMLElement>('.section-head').forEach((head) => {
        gsap.fromTo(head.children,
          { y: 34, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: .75, stagger: .1, ease:'power3.out', immediateRender:false,
            scrollTrigger:{ trigger:head, start:'top 90%', once:true } }
        );
      });

      reveal('.signatures .food-card', '.signatures .food-grid', { rotateX:0 });
      reveal('.category-card', '.category-grid');

      gsap.utils.toArray<HTMLElement>('.food-card').forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 ? -12 : -7,
          ease:'none',
          scrollTrigger:{ trigger:card, start:'top bottom', end:'bottom top', scrub:.8 }
        });
      });

      gsap.utils.toArray<HTMLElement>('.category-art').forEach((art, index) => {
        gsap.to(art, {
          yPercent: index % 2 ? -7 : -11,
          rotate: index % 2 ? 1.2 : -1.2,
          ease:'none',
          scrollTrigger:{ trigger:art, start:'top bottom', end:'bottom top', scrub:.85 }
        });
      });

      gsap.fromTo('.manifesto > *',
        { y: 44, autoAlpha: 0 },
        { y:0, autoAlpha:1, duration:.9, stagger:.12, ease:'power4.out', immediateRender:false,
          scrollTrigger:{ trigger:'.manifesto', start:'top 88%', once:true } }
      );

      gsap.to('.manifesto h2', {
        backgroundPositionX:'100%',
        ease:'none',
        scrollTrigger:{trigger:'.manifesto', start:'top bottom', end:'bottom top', scrub:1}
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return null;
}
