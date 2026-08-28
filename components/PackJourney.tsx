'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from './LanguageProvider';

const layers = [
  { src: '/assets/Burger1.png', name: 'TOP BUN', ar: 'الخبز العلوي', exploded: -218, assembled: -118, width: 400 },
  { src: '/assets/Burger2.png', name: 'LETTUCE', ar: 'خس', exploded: -154, assembled: -82, width: 400 },
  { src: '/assets/Burger3.png', name: 'TOMATO', ar: 'طماطم', exploded: -92, assembled: -50, width: 392 },
  { src: '/assets/Burger4.png', name: 'CHEDDAR', ar: 'شيدر', exploded: -35, assembled: -18, width: 394 },
  { src: '/assets/Burger5.png', name: 'HOUSE SAUCE', ar: 'صوص RiWebs', exploded: 20, assembled: 12, width: 395 },
  { src: '/assets/Burger6.png', name: 'CRISPY CHICKEN', ar: 'تشيكن كريسبي', exploded: 84, assembled: 48, width: 398 },
  { src: '/assets/Burger7.png', name: 'EXTRA MELT', ar: 'جبنة إضافية', exploded: 145, assembled: 83, width: 390 },
  { src: '/assets/Burger8.png', name: 'BOTTOM BUN', ar: 'الخبز السفلي', exploded: 210, assembled: 120, width: 395 },
];

export default function PackJourney() {
  const heroRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLElement>(null);
  const { t, lang } = useLanguage();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heroCtx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduced) {
        gsap.set('.v15-layer', { autoAlpha: 1 });
        gsap.set('.v15-final-burger', { autoAlpha: 0 });
      }

      if (!reduced) {
        gsap.set('.v15-layer', { autoAlpha: 0 });
        gsap.set('.v15-final-burger', { autoAlpha: 0 });
        gsap.fromTo('.v15-hero-bg', { scale: 1.12, filter: 'brightness(.55)' }, { scale: 1.02, filter: 'brightness(1)', duration: 1.6, ease: 'expo.out' });
        gsap.fromTo('.v15-orbit', { scale: .55, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.25, stagger: .12, ease: 'expo.out' });
        gsap.fromTo('.v15-kicker', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .65, ease: 'power3.out', delay: .12 });
        gsap.fromTo('.v15-title-line', { yPercent: 110, rotate: 2 }, { yPercent: 0, rotate: 0, duration: .9, stagger: .09, ease: 'expo.out', delay: .14 });
        gsap.fromTo('.v15-copy p', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .75, ease: 'power3.out', delay: .45 });
        gsap.fromTo('.v15-layer', {
          autoAlpha: 0,
          x: (i: number) => i % 2 ? 70 : -70,
          rotate: (i: number) => i % 2 ? 7 : -7,
          scale: .82,
        }, {
          autoAlpha: 1,
          x: 0,
          rotate: 0,
          scale: 1,
          duration: 1.05,
          stagger: .055,
          ease: 'back.out(1.35)',
          delay: .22,
        });
        gsap.fromTo('.v15-legend-row', { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .65, stagger: .045, delay: .72, ease: 'power3.out' });
        gsap.to('.v15-ember', { y: -38, x: 'random(-14,14)', opacity: .15, duration: 'random(1.6,3.2)', repeat: -1, yoyo: true, stagger: .18, ease: 'sine.inOut' });
        gsap.to('.v15-glow', { scale: 1.1, opacity: .72, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.v15-rig', { y: -7, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }

      mm.add('(min-width: 761px)', () => {
        const layerEls = gsap.utils.toArray<HTMLElement>('.v15-layer');
        const legendEls = gsap.utils.toArray<HTMLElement>('.v15-legend-row');

        gsap.set('.v15-final-burger', { autoAlpha: 0, scale: .78, rotate: -3 });

        if (reduced) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=1900',
            scrub: .75,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: 'power3.inOut' },
        });

        tl
          .to('.v15-copy', { x: -32, autoAlpha: .18, duration: .24 }, 0)
          .to('.v15-orbit-a', { rotate: 135, scale: 1.16, duration: 1 }, 0)
          .to('.v15-orbit-b', { rotate: -115, scale: .92, duration: 1 }, 0)
          .to(layerEls, {
            y: (i) => layers[i].assembled - layers[i].exploded,
            scale: .91,
            rotate: (i) => (i - 3.5) * .22,
            duration: .72,
            stagger: .007,
            ease: 'expo.inOut',
          }, .08)
          .to(legendEls, {
            y: (i) => layers[i].assembled - layers[i].exploded,
            autoAlpha: .5,
            duration: .72,
            stagger: .007,
          }, .08)
          .to('.v15-scroll', { autoAlpha: 0, y: 10, duration: .12 }, .18)
          .to(layerEls, { autoAlpha: 0, scale: .83, duration: .14, stagger: .004 }, .79)
          .to('.v15-final-burger', { autoAlpha: 1, scale: 1, rotate: 0, duration: .24, ease: 'back.out(1.6)' }, .82)
          .to('.v15-final-burger', { y: -12, scale: 1.035, duration: .13, ease: 'power2.out' }, .94)
          .to('.v15-final-burger', { y: 0, scale: 1, duration: .13, ease: 'power2.inOut' }, 1.07)
          .to('.v15-progress-fill', { scaleX: 1, duration: 1 }, 0);
      });

      mm.add('(max-width: 760px)', () => {
        const layerEls = gsap.utils.toArray<HTMLElement>('.v15-layer');
        gsap.set('.v15-final-burger', { autoAlpha: 0, scale: .78 });
        if (reduced) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=1350',
            scrub: .7,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl
          .to('.v15-copy', { y: -20, autoAlpha: .28, duration: .18 }, 0)
          .to(layerEls, {
            y: (i) => (layers[i].assembled - layers[i].exploded) * .56,
            scale: .92,
            duration: .62,
            stagger: .006,
            ease: 'expo.inOut',
          }, .06)
          .to('.v15-scroll', { autoAlpha: 0, duration: .12 }, .14)
          .to(layerEls, { autoAlpha: 0, scale: .86, duration: .12 }, .72)
          .to('.v15-final-burger', { autoAlpha: 1, scale: 1, duration: .2, ease: 'back.out(1.5)' }, .75)
          .to('.v15-final-burger', { y: -8, duration: .12 }, .9)
          .to('.v15-final-burger', { y: 0, duration: .12 }, 1.02)
          .to('.v15-progress-fill', { scaleX: 1, duration: 1 }, 0);
      });

      return () => mm.revert();
    }, heroRef);

    const boxCtx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.set('.v15-box-closed', { autoAlpha: 0, scale: .94 });

      if (!reduced) {
        gsap.fromTo('.v15-box-copy > *', { y: 26, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: .72, stagger: .085, ease: 'power3.out',
          scrollTrigger: { trigger: boxRef.current, start: 'top 72%' },
        });
        gsap.to('.v15-table-ring', { rotate: 360, duration: 16, repeat: -1, ease: 'none' });
        gsap.to('.v15-box-aura', { scale: 1.13, opacity: .65, duration: 1.7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.v15-box-spark', { y: -30, opacity: .08, duration: 'random(1.5,2.6)', repeat: -1, yoyo: true, stagger: .2, ease: 'sine.inOut' });

        const boxTl = gsap.timeline({
          scrollTrigger: {
            trigger: boxRef.current,
            start: 'top top',
            end: '+=1650',
            scrub: .68,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        boxTl
          .fromTo('.v15-box-open', { autoAlpha: 0, y: -90, scale: .72, rotateZ: -7 }, { autoAlpha: 1, y: 0, scale: 1, rotateZ: 0, duration: .32, ease: 'back.out(1.45)' }, 0)
          .to('.v15-box-product', { rotateY: 360, rotateX: 4, scale: 1.035, duration: .42, ease: 'power2.inOut' }, .26)
          .to('.v15-box-product', { rotateY: 720, rotateX: 0, scale: 1, duration: .35, ease: 'power2.inOut' }, .63)
          .to('.v15-box-open', { autoAlpha: 0, scale: .96, duration: .14 }, .78)
          .to('.v15-box-closed', { autoAlpha: 1, scale: 1, duration: .2, ease: 'back.out(1.35)' }, .82)
          .to('.v15-box-product', { y: -12, duration: .1, ease: 'power2.out' }, .96)
          .to('.v15-box-product', { y: 0, duration: .13, ease: 'bounce.out' }, 1.06)
          .fromTo('.v15-seal', { scale: 0, rotate: -20, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: .2, ease: 'back.out(2)' }, .95)
          .to('.v15-box-meter span', { scaleX: 1, duration: 1 }, 0)
          .to('.v15-box-stage', { filter: 'drop-shadow(0 34px 42px rgba(0,0,0,.58))', duration: .2 }, 1.03);
      }
    }, boxRef);

    return () => {
      heroCtx.revert();
      boxCtx.revert();
    };
  }, [lang]);

  const title1 = t('hero.title1');
  const title2 = t('hero.title2');

  return (
    <>
      <section className="v15-hero" ref={heroRef}>
        <div className="v15-hero-bg" />
        <div className="v15-vignette" />
        <div className="v15-orbit v15-orbit-a" />
        <div className="v15-orbit v15-orbit-b" />
        <div className="v15-embers" aria-hidden>
          {Array.from({ length: 9 }).map((_, i) => <i className="v15-ember" key={i} />)}
        </div>

        <div className="v15-copy">
          <span className="v15-kicker">{t('hero.kicker')}</span>
          <h1>
            <span className="v15-title-mask"><span className="v15-title-line">{title1}</span></span>
            <span className="v15-title-mask"><em className="v15-title-line">{title2}</em></span>
          </h1>
          <p>{t('hero.copy')}</p>
          <Link href="/menu" className="v15-hero-cta">EXPLORE THE MENU <b>↗</b></Link>
        </div>

        <div className="v15-rig">
          <div className="v15-glow" />
          {layers.map((l, i) => (
            <div
              className="v15-layer"
              key={l.src}
              style={{ '--y': `${l.exploded}px`, '--w': `${l.width}px`, '--z': 40 - i } as CSSProperties}
            >
              <Image src={l.src} alt={lang === 'ar' ? l.ar : l.name} width={1600} height={800} priority={i < 3} />
            </div>
          ))}
        </div>

        <div className="v15-final-burger">
          <Image src="/assets/full-burger.png" alt="RiWebs burger" fill priority sizes="(max-width:760px) 82vw, 560px" />
        </div>

        <div className="v15-legend">
          {layers.map((l, i) => (
            <div className="v15-legend-row" key={l.name} style={{ '--ly': `${l.exploded}px` } as CSSProperties}>
              <b>{String(i + 1).padStart(2, '0')}</b><i /><span>{lang === 'ar' ? l.ar : l.name}</span>
            </div>
          ))}
        </div>

        <div className="v15-scroll"><span>{t('hero.scroll')}</span><i><b /></i></div>
        <div className="v15-progress"><span>01</span><i><b className="v15-progress-fill" /></i><span>02</span></div>
      </section>

      <section className="v15-box-scene" ref={boxRef}>
        <div className="v15-box-bg" />
        <div className="v15-box-vignette" />
        <div className="v15-box-grain" />
        <div className="v15-box-copy">
          <span className="v15-kicker">{t('pack.kicker')}</span>
          <h2>{t('pack.title1')}<br/><em>{t('pack.title2')}</em></h2>
          <p>{t('pack.copy')}</p>
          <Link href="/menu" className="v15-box-cta">{t('pack.cta')} <b>↗</b></Link>
        </div>

        <div className="v15-table-ring" aria-hidden />
        <div className="v15-box-aura" aria-hidden />
        <div className="v15-box-sparks" aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => <i className="v15-box-spark" key={i} />)}
        </div>

        <div className="v15-box-stage">
          <div className="v15-box-product">
            <div className="v15-box-open"><Image src="/assets/box-open.png" alt="RiWebs complete meal box open" fill sizes="(max-width:760px) 92vw, 720px" /></div>
            <div className="v15-box-closed"><Image src="/assets/box-closed.png" alt="RiWebs meal box closed" fill sizes="(max-width:760px) 92vw, 720px" /></div>
            <div className="v15-seal">READY</div>
          </div>
        </div>

        <div className="v15-box-status">
          <small>PACKING JOURNEY</small>
          <strong>{lang === 'ar' ? 'من مطبخنا ليك' : 'FROM OUR KITCHEN TO YOU'}</strong>
          <div className="v15-box-meter"><span /></div>
        </div>
      </section>
    </>
  );
}
