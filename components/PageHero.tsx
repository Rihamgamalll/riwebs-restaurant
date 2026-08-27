'use client';
import {useLanguage} from './LanguageProvider';
export default function PageHero({kicker,title,copy}:{kicker:string;title:string;copy:string}){const {t}=useLanguage();return <section className="page-hero"><span className="eyebrow">{t(kicker)}</span><h1>{t(title)}</h1><p>{t(copy)}</p></section>}
