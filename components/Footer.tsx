'use client';
import Image from 'next/image';
import Link from 'next/link';
import {Instagram,Facebook,Music2,ArrowUpRight,MapPin} from 'lucide-react';
import {useLanguage} from './LanguageProvider';
const socials=[
  {label:'Instagram',href:'https://www.instagram.com/riweb_s',icon:<Instagram/>},
  {label:'Facebook',href:'https://www.facebook.com/share/1FPBCjVdJf/?mibextid=wwXIfr',icon:<Facebook/>},
  {label:'TikTok',href:'https://www.tiktok.com/@riwebs?_r=1&_t=ZS-98JlqhtmWA5',icon:<Music2/>},
];
export default function Footer(){const {t}=useLanguage();return <footer className="footer">
  <div className="footer-top">
    <div className="footer-brand"><Image src="/branding/riwebs-logo.png" alt="RiWebs Restaurant" width={190} height={130}/><p>{t('footer.tag')}</p></div>
    <div><small>{t('footer.explore')}</small><Link href="/menu">{t('footer.menu')}</Link><Link href="/burgers">{t('footer.burgers')}</Link><Link href="/sides">{t('footer.sides')}</Link><Link href="/drinks">{t('footer.drinks')}</Link></div>
    <div><small>{t('footer.visit')}</small><p className="footer-location"><MapPin size={16}/> {t('contact.city')}, {t('contact.country')}</p><p>{t('footer.daily')}<br/>12 PM — 1 AM</p></div>
    <div><small>{t('footer.follow')}</small><div className="socials">{socials.map(s=><a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={`Visit RiWebs on ${s.label}`} title={`Visit ${s.label}`}>{s.icon}<span>{s.label}</span></a>)}</div></div>
  </div>
  <div className="footer-bottom"><span>© 2026 RIWEBS RESTAURANT · {t('contact.city')}, {t('contact.country')}</span><a href="#">{t('footer.privacy')}</a><a href="#">{t('footer.terms')}</a><a className="credit" href="/menu">{t('footer.order')} <ArrowUpRight size={16}/></a></div>
</footer>}
