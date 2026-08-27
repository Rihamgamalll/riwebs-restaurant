'use client';
import Image from 'next/image';import Link from 'next/link';import {useLanguage} from './LanguageProvider';
const cats=[
 {title:'cat.burgers',copy:'cat.burgersCopy',href:'/burgers',img:'/assets/Menu/Double Burger beef.png'},
 {title:'cat.sandwiches',copy:'cat.sandwichesCopy',href:'/sandwiches',img:'/assets/Menu/Sandwich Rool Beef.png'},
 {title:'cat.sides',copy:'cat.sidesCopy',href:'/sides',img:'/assets/fries.png'},
 {title:'cat.drinks',copy:'cat.drinksCopy',href:'/drinks',img:'/assets/Pepsi.png'},
];
export default function HomeCategories(){const {t}=useLanguage();const lines=t('home.more').split('\n');return <section className="category-showcase section"><div className="section-head"><div><span className="section-kicker">{t('home.lane')}</span><h2>{lines.map((x,i)=><span key={x}>{x}{i<lines.length-1?<br/>:null}</span>)}</h2></div><Link href="/menu">{t('home.explore')}</Link></div><div className="category-grid">{cats.map(c=><Link href={c.href} className="category-card" key={c.title}><div className="category-art"><Image src={c.img} alt={t(c.title)} fill sizes="(max-width: 760px) 90vw, 25vw"/></div><div><small>{t('home.exploreCard')}</small><h3>{t(c.title)}</h3><p>{t(c.copy)}</p></div><b>↗</b></Link>)}</div></section>}
