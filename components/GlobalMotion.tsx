'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function GlobalMotion(){
  const pathname=usePathname();
  useLayoutEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx=gsap.context(()=>{
      gsap.fromTo('.nav-shell',{y:-28,autoAlpha:0},{y:0,autoAlpha:1,duration:.85,ease:'expo.out'});
      gsap.fromTo('.brand img',{scale:.72,rotate:-7,autoAlpha:0},{scale:1,rotate:0,autoAlpha:1,duration:.9,delay:.12,ease:'back.out(1.7)'});
      gsap.fromTo('.nav-links a',{y:-10,autoAlpha:0},{y:0,autoAlpha:1,duration:.55,stagger:.045,delay:.2,ease:'power3.out'});

      if(pathname!=='/'){
        gsap.fromTo('.page-hero .eyebrow,.page-hero .section-kicker',{y:18,autoAlpha:0},{y:0,autoAlpha:1,duration:.55,ease:'power3.out'});
        gsap.fromTo('.page-hero h1',{y:55,autoAlpha:0,scale:.95},{y:0,autoAlpha:1,scale:1,duration:.9,ease:'expo.out'});
        gsap.fromTo('.page-hero p',{y:24,autoAlpha:0},{y:0,autoAlpha:1,duration:.7,delay:.18,ease:'power3.out'});
        gsap.utils.toArray<HTMLElement>('.food-grid').forEach(grid=>{
          const cards=grid.querySelectorAll('.food-card');
          if(!cards.length)return;
          gsap.fromTo(cards,{y:58,autoAlpha:0,scale:.96},{y:0,autoAlpha:1,scale:1,duration:.78,stagger:.065,ease:'power3.out',immediateRender:false,scrollTrigger:{trigger:grid,start:'top 90%',once:true}});
        });
      }

      gsap.utils.toArray<HTMLElement>('.btn,.order-pill,.v15-hero-cta,.v15-box-cta').forEach(btn=>{
        btn.addEventListener('mouseenter',()=>gsap.to(btn,{scale:1.045,duration:.18,ease:'power2.out'}));
        btn.addEventListener('mouseleave',()=>gsap.to(btn,{scale:1,duration:.24,ease:'power2.out'}));
      });
    });
    return()=>ctx.revert();
  },[pathname]);
  return null;
}
