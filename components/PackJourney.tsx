'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useLayoutEffect,useRef,type CSSProperties} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useLanguage} from './LanguageProvider';
const layers=[
 {src:'/assets/Burger1.png',name:'TOP BUN',ar:'الخبز العلوي',exploded:-218,assembled:-118,width:400},
 {src:'/assets/Burger2.png',name:'LETTUCE',ar:'خس',exploded:-154,assembled:-82,width:400},
 {src:'/assets/Burger3.png',name:'TOMATO',ar:'طماطم',exploded:-92,assembled:-50,width:392},
 {src:'/assets/Burger4.png',name:'CHEDDAR',ar:'شيدر',exploded:-35,assembled:-18,width:394},
 {src:'/assets/Burger5.png',name:'HOUSE SAUCE',ar:'صوص RiWebs',exploded:20,assembled:12,width:395},
 {src:'/assets/Burger6.png',name:'CRISPY CHICKEN',ar:'تشيكن كريسبي',exploded:84,assembled:48,width:398},
 {src:'/assets/Burger7.png',name:'EXTRA MELT',ar:'جبنة إضافية',exploded:145,assembled:83,width:390},
 {src:'/assets/Burger8.png',name:'BOTTOM BUN',ar:'الخبز السفلي',exploded:210,assembled:120,width:395},
];
export default function PackJourney(){
 const root=useRef<HTMLElement>(null);const {t,lang}=useLanguage();
 useLayoutEffect(()=>{gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{const mm=gsap.matchMedia();
  mm.add('(min-width:761px)',()=>{const layerEls=gsap.utils.toArray<HTMLElement>('.v13-layer');const legendEls=gsap.utils.toArray<HTMLElement>('.v13-legend-row');
   gsap.set('.v13-final-burger',{autoAlpha:0,scale:.97});gsap.set('.v13-pack',{autoAlpha:0});gsap.set('.v13-ready-box',{autoAlpha:0,scale:1});gsap.set('.v13-closed',{autoAlpha:0,scale:1});gsap.set('.v13-final-copy',{autoAlpha:0,y:10});
   const tl=gsap.timeline({scrollTrigger:{trigger:root.current,start:'top top',end:'+=3900',scrub:.72,pin:true,anticipatePin:1,invalidateOnRefresh:true},defaults:{ease:'power3.inOut'}});
   tl.fromTo('.v13-copy',{x:-24,autoAlpha:0},{x:0,autoAlpha:1,duration:.28},0)
    .fromTo(layerEls,{autoAlpha:0,scale:.97},{autoAlpha:1,scale:1,duration:.34,stagger:.015},.02)
    .fromTo(legendEls,{x:18,autoAlpha:0},{x:0,autoAlpha:1,duration:.30,stagger:.015},.05)
    .to(layerEls,{y:(i)=>layers[i].assembled-layers[i].exploded,scale:.9,duration:.75,stagger:.006,ease:'expo.inOut'},.55)
    .to(legendEls,{y:(i)=>layers[i].assembled-layers[i].exploded,duration:.75,stagger:.006,ease:'expo.inOut'},.55)
    .to('.v13-scroll',{autoAlpha:0,duration:.12},.75)
    .to(layerEls,{autoAlpha:0,duration:.14,stagger:.003},1.18)
    .to('.v13-final-burger',{autoAlpha:1,scale:1,duration:.2},1.19)
    .to('.v13-copy,.v13-legend',{autoAlpha:0,y:-14,duration:.24},1.52)
    .to('.v13-final-burger',{autoAlpha:0,scale:.94,duration:.2},1.55)
    .to('.v13-pack',{autoAlpha:1,duration:.2},1.58)
    .fromTo('.v13-pack-copy',{x:-24,autoAlpha:0},{x:0,autoAlpha:1,duration:.26},1.6)
    // The packing section intentionally has only two visual states.
    .to('.v13-ready-box',{autoAlpha:1,scale:1,duration:.26,ease:'power2.out'},1.62)
    .to('.v13-ready-box',{autoAlpha:1,duration:.55},1.88)
    .to('.v13-ready-box',{autoAlpha:0,duration:.22,ease:'power2.in'},2.42)
    .to('.v13-closed',{autoAlpha:1,scale:1,duration:.26,ease:'power2.out'},2.46)
    .to('.v13-final-copy',{autoAlpha:1,y:0,duration:.18},2.62);
  });
  mm.add('(max-width:760px)',()=>{const layerEls=gsap.utils.toArray<HTMLElement>('.v13-layer');gsap.set('.v13-final-burger,.v13-pack,.v13-ready-box,.v13-closed,.v13-final-copy',{autoAlpha:0});
   const tl=gsap.timeline({scrollTrigger:{trigger:root.current,start:'top top',end:'+=2600',scrub:.62,pin:true,anticipatePin:1,invalidateOnRefresh:true}});
   tl.fromTo(layerEls,{autoAlpha:0,scale:.96},{autoAlpha:1,scale:1,stagger:.01,duration:.26})
    .to(layerEls,{y:(i)=>(layers[i].assembled-layers[i].exploded)*.56,scale:.91,duration:.54,stagger:.005,ease:'expo.inOut'},.36)
    .to(layerEls,{autoAlpha:0,duration:.12},.86)
    .to('.v13-final-burger',{autoAlpha:1,scale:1,duration:.18},.88)
    .to('.v13-copy,.v13-final-burger',{autoAlpha:0,duration:.18},1.08)
    .to('.v13-pack',{autoAlpha:1,duration:.18},1.1)
    .to('.v13-ready-box',{autoAlpha:1,scale:1,duration:.22},1.13)
    .to('.v13-ready-box',{autoAlpha:1,duration:.42},1.42)
    .to('.v13-ready-box',{autoAlpha:0,duration:.18},1.82)
    .to('.v13-closed',{autoAlpha:1,scale:1,duration:.22},1.86)
    .to('.v13-final-copy',{autoAlpha:1,y:0,duration:.16},2.02);
  });return()=>mm.revert();},root);return()=>ctx.revert()},[lang]);
 const title1=t('hero.title1'),title2=t('hero.title2');
 return <section className="v13-root" ref={root}>
  <div className="v13-bg"/><div className="v13-vignette"/><div className="v13-embers"><i/><i/><i/><i/><i/><i/><i/></div>
  <div className="v13-copy"><span className="v13-kicker">{t('hero.kicker')}</span><h1><span>{title1}</span><em>{title2}</em></h1><p>{t('hero.copy')}</p></div>
  <div className="v13-rig"><div className="v13-glow"/>{layers.map((l,i)=><div className="v13-layer" key={l.src} style={{'--y':`${l.exploded}px`,'--w':`${l.width}px`,'--z':40-i} as CSSProperties}><Image src={l.src} alt={lang==='ar'?l.ar:l.name} width={1600} height={800} priority={i<2}/></div>)}</div>
  <div className="v13-final-burger"><Image src="/assets/full-burger.png" alt="RiWebs burger" fill priority sizes="520px"/></div>
  <div className="v13-legend">{layers.map((l,i)=><div className="v13-legend-row" key={l.name} style={{'--ly':`${l.exploded}px`} as CSSProperties}><b>{String(i+1).padStart(2,'0')}</b><i/><div className="v13-mini"><Image src={l.src} alt="" fill sizes="46px" aria-hidden/></div><span>{lang==='ar'?l.ar:l.name}</span></div>)}</div>
  <div className="v13-scroll"><span>{t('hero.scroll')}</span><i/></div><div className="v13-progress"><b>01</b><i/><span>02</span></div>
  <div className="v13-pack">
   <div className="v13-pack-copy"><span className="v13-kicker">{t('pack.kicker')}</span><h2>{t('pack.title1')}<br/><em>{t('pack.title2')}</em></h2><p>{t('pack.copy')}</p><Link href="/menu" className="v13-watch">{t('pack.cta')} <b>›</b></Link></div>
   <div className="v13-box-stage"><div className="v13-ready-box"><Image src="/assets/box-open.png" alt="RiWebs complete meal box open" fill sizes="1100px"/></div><div className="v13-closed"><Image src="/assets/box-closed.png" alt="RiWebs meal box closed" fill sizes="1100px"/></div></div>
   <div className="v13-box-status"><div><b>01</b><span>{t('pack.ready')}</span></div><div><b>02</b><span>{lang==='ar'?'البوكس مقفول':'BOX CLOSED'}</span></div><div className="v13-final-copy"><h3>{t('pack.closed')}</h3></div></div>
  </div>
 </section>
}
