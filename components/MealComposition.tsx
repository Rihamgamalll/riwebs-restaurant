'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MealComposition() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 701px)', () => {
        gsap.set('.v4-fry', { transformOrigin: '50% 100%' });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=3000',
            scrub: 1.05,
            pin: true,
            anticipatePin: 1,
          },
          defaults: { ease: 'power3.inOut' },
        });

        tl.fromTo('.v4-intro', { y: 48, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .55 })
          .to('.v4-intro', { y: -34, autoAlpha: 0, duration: .4 }, '+=.25')
          // entire open box arrives first
          .fromTo('.v4-box-wrap',
            { y: 520, scale: .72, rotateX: 8, autoAlpha: 0 },
            { y: 0, scale: 1, rotateX: 0, autoAlpha: 1, duration: 1.1 }, '<')
          // lid opens after the box locks into position
          .fromTo('.v4-box-lid',
            { rotateX: -78, y: 105, scaleY: .55 },
            { rotateX: 0, y: 0, scaleY: 1, duration: .72, ease: 'back.out(1.1)' }, '-=.25')
          .fromTo('.v4-box-glow', { scale: .55, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: .5 }, '-=.45')
          // burger comes in from outside and lands INSIDE the box
          .fromTo('.v4-burger',
            { x: -600, y: -460, rotate: -20, scale: .52, autoAlpha: 0 },
            { x: 0, y: 0, rotate: -2, scale: 1, autoAlpha: 1, duration: .95, ease: 'power4.out' }, '-=.08')
          .to('.v4-burger', { y: 8, duration: .16, ease: 'power2.in' })
          // fries carton enters the box
          .fromTo('.v4-fries-cup',
            { x: -700, y: 80, rotate: -32, scale: .55, autoAlpha: 0 },
            { x: 0, y: 0, rotate: -5, scale: 1, autoAlpha: 1, duration: .8, ease: 'power4.out' }, '-=.35')
          // individual fries rain down into the carton
          .fromTo('.v4-fry-1', { x: -210, y: -520, rotate: -80, autoAlpha: 0 }, { x: 0, y: 0, rotate: -14, autoAlpha: 1, duration: .44 }, '-=.18')
          .fromTo('.v4-fry-2', { x: -60, y: -610, rotate: 55, autoAlpha: 0 }, { x: 0, y: 0, rotate: 7, autoAlpha: 1, duration: .44 }, '-=.34')
          .fromTo('.v4-fry-3', { x: 110, y: -570, rotate: 105, autoAlpha: 0 }, { x: 0, y: 0, rotate: 19, autoAlpha: 1, duration: .44 }, '-=.34')
          .fromTo('.v4-fry-4', { x: 260, y: -500, rotate: -55, autoAlpha: 0 }, { x: 0, y: 0, rotate: 32, autoAlpha: 1, duration: .44 }, '-=.34')
          .fromTo('.v4-fry-5', { x: 330, y: -430, rotate: 70, autoAlpha: 0 }, { x: 0, y: 0, rotate: -27, autoAlpha: 1, duration: .44 }, '-=.34')
          // cup slides into the right compartment
          .fromTo('.v4-cup',
            { x: 760, y: 260, rotate: 24, scale: .52, autoAlpha: 0 },
            { x: 0, y: 0, rotate: 3, scale: 1, autoAlpha: 1, duration: .86, ease: 'power4.out' }, '-=.25')
          // lid and straw assemble separately, like the reference
          .fromTo('.v4-cup-lid',
            { x: 260, y: -440, rotate: 100, scale: .55, autoAlpha: 0 },
            { x: 0, y: 0, rotate: 0, scale: 1, autoAlpha: 1, duration: .58, ease: 'back.out(1.25)' }, '-=.3')
          .fromTo('.v4-straw',
            { x: 350, y: -620, rotate: 80, scale: .6, autoAlpha: 0 },
            { x: 0, y: 0, rotate: -11, scale: 1, autoAlpha: 1, duration: .65, ease: 'power4.out' }, '-=.34')
          .fromTo('.v4-finish', { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .55 }, '-=.05')
          .to('.v4-meal', { scale: 1.025, duration: .5, ease: 'sine.inOut' });
      });

      mm.add('(max-width: 700px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top 60%', end: 'bottom 25%', scrub: .8 },
        });
        tl.from('.v4-box-wrap', { y: 180, autoAlpha: 0, scale: .82 })
          .from('.v4-burger', { x: -180, y: -160, autoAlpha: 0, rotate: -15 }, '-=.45')
          .from('.v4-fries-cup, .v4-fries', { x: -180, autoAlpha: 0 }, '-=.42')
          .from('.v4-cup', { x: 190, autoAlpha: 0 }, '-=.42')
          .from('.v4-cup-lid, .v4-straw', { y: -150, autoAlpha: 0 }, '-=.3');
      });

      return () => mm.revert();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="v4-assembly">
      <div className="v4-shell">
        <div className="v4-intro">
          <span>BUILD YOUR RIWEBS BOX</span>
          <h2>Watch it <em>land.</em></h2>
          <p>Scroll. Every piece flies in, finds its place, and packs itself.</p>
          <div className="v4-scroll"><i /> SCROLL TO PACK</div>
        </div>

        <div className="v4-meal" aria-label="RiWebs meal packing itself into an open takeaway box">
          <div className="v4-box-glow" aria-hidden="true" />

          <div className="v4-box-wrap" aria-hidden="true">
            <div className="v4-box-lid">
              <div className="v4-lid-line" />
              <div className="v4-lid-mark"><b>RiWebs</b><small>RESTAURANT</small></div>
            </div>
            <div className="v4-box-floor">
              <div className="v4-floor-print">GOOD FOOD <b>•</b> GOOD MOOD</div>
            </div>
            <div className="v4-side v4-side-left" />
            <div className="v4-side v4-side-right" />
            <div className="v4-box-front">
              <div className="v4-front-logo">R</div>
              <strong>RiWebs</strong>
              <span>RESTAURANT</span>
            </div>
          </div>

          <div className="v4-burger">
            <Image src="/assets/full-burger.png" alt="RiWebs burger" fill sizes="390px" priority={false} />
          </div>

          <div className="v4-fries-cup" aria-label="RiWebs fries carton">
            <div className="v4-fries-crown">R</div>
            <b>RiWebs</b><span>FRIES</span>
          </div>
          <div className="v4-fries" aria-hidden="true">
            <i className="v4-fry v4-fry-1" /><i className="v4-fry v4-fry-2" />
            <i className="v4-fry v4-fry-3" /><i className="v4-fry v4-fry-4" />
            <i className="v4-fry v4-fry-5" />
          </div>

          <div className="v4-cup" aria-label="RiWebs drink cup">
            <div className="v4-cup-checkers" />
            <div className="v4-cup-brand"><span>R</span><b>RiWebs</b><small>RESTAURANT</small></div>
          </div>
          <div className="v4-cup-lid" aria-hidden="true"><span>R</span></div>
          <div className="v4-straw" aria-hidden="true" />
        </div>

        <div className="v4-finish">
          <span>PACKED. READY. RIWEBS.</span>
          <Link href="/menu" className="btn btn-cream">ORDER YOUR BOX</Link>
        </div>
      </div>
    </section>
  );
}
