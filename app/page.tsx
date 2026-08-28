'use client';
import PackJourney from '@/components/PackJourney';
import SignatureBurgers from '@/components/SignatureBurgers';
import HomeCategories from '@/components/HomeCategories';
import HomeMotion from '@/components/HomeMotion';
import {useLanguage} from '@/components/LanguageProvider';

export default function Home(){
  const {t}=useLanguage();
  const lines=t('home.manifesto').split('\n');
  return <main>
    <HomeMotion/>
    <PackJourney/>
    <SignatureBurgers/>
    <HomeCategories/>
    <section className="manifesto section"><span>{t('home.manifestoTag')}</span><h2>{lines.map((x,i)=><span key={x}>{x}{i<lines.length-1?<br/>:null}</span>)}</h2></section>
  </main>
}
