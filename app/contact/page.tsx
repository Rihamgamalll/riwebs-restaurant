'use client';
import PageHero from '@/components/PageHero';
import {MapPin,Clock,Instagram,Facebook,Music2} from 'lucide-react';
import {useLanguage} from '@/components/LanguageProvider';
const social=[
 {key:'contact.instagram',label:'@riweb_s',href:'https://www.instagram.com/riweb_s',Icon:Instagram},
 {key:'contact.facebook',label:'RiWebs Facebook',href:'https://www.facebook.com/share/1FPBCjVdJf/?mibextid=wwXIfr',Icon:Facebook},
 {key:'contact.tiktok',label:'@riwebs',href:'https://www.tiktok.com/@riwebs?_r=1&_t=ZS-98JlqhtmWA5',Icon:Music2},
];
export default function Contact(){const {t}=useLanguage();return <main>
 <PageHero kicker="page.contact.kicker" title="page.contact.title" copy="page.contact.copy"/>
 <section className="contact-grid section"><div className="contact-cards contact-cards-clean">
  <div><MapPin/><small>{t('contact.location')}</small><h3>{t('contact.city')}<br/>{t('contact.country')}</h3></div>
  <div><Clock/><small>{t('contact.hours')}</small><h3>{t('contact.daily')}<br/>12 PM — 1 AM</h3></div>
  {social.map(({key,label,href,Icon})=><div key={key}><Icon/><small>{t(key)}</small><h3><a href={href} target="_blank" rel="noreferrer">{label} ↗</a></h3></div>)}
 </div><div className="map-placeholder"><div><MapPin size={46}/><b>{t('contact.map')}</b><span>{t('contact.maploc')}</span></div></div></section>
 </main>}
