'use client';
import Image from 'next/image';
import {Minus,Plus,X} from 'lucide-react';
import {useMemo,useState} from 'react';
import type {MenuItem} from '@/data/menu';
import {useCart} from './CartProvider';
import {useLanguage} from './LanguageProvider';
export default function ProductCustomizer({item,onClose}:{item:MenuItem;onClose:()=>void}){
 const {add}=useCart(); const {itemName,itemDescription,category,choice,t}=useLanguage();
 const [qty,setQty]=useState(1); const [size,setSize]=useState(0); const [type,setType]=useState(0); const [extras,setExtras]=useState<number[]>([]);
 const unit=useMemo(()=>item.price+(item.sizes?.[size]?.price||0)+(item.types?.[type]?.price||0)+extras.reduce((s,i)=>s+(item.extras?.[i]?.price||0),0),[item,size,type,extras]);
 const toggle=(i:number)=>setExtras(v=>v.includes(i)?v.filter(x=>x!==i):[...v,i]); const name=itemName(item);
 return <div className="customizer-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
  <div className="customizer" role="dialog" aria-modal="true" aria-label={`Customize ${name}`}>
   <button className="customizer-close" onClick={onClose} aria-label="Close"><X/></button>
   <div className="customizer-visual"><Image src={item.image} alt={name} fill sizes="520px"/></div>
   <div className="customizer-body">
    <small>{category(item.category)}</small><h2>{name}</h2><p>{itemDescription(item)}</p>
    {item.sizes?.length?<div className="choice-group"><b>{t('custom.size')}</b><div className="choice-row">{item.sizes.map((x,i)=><button className={size===i?'active':''} onClick={()=>setSize(i)} key={x.label}>{choice(x.label)}{x.price?` +${x.price}`:''}</button>)}</div></div>:null}
    {item.types?.length?<div className="choice-group"><b>{t('custom.type')}</b><div className="choice-row">{item.types.map((x,i)=><button className={type===i?'active':''} onClick={()=>setType(i)} key={x.label}>{choice(x.label)}{x.price?` +${x.price}`:''}</button>)}</div></div>:null}
    {item.extras?.length?<div className="choice-group"><b>{t('custom.extras')}</b><div className="choice-row extras">{item.extras.map((x,i)=><button className={extras.includes(i)?'active':''} onClick={()=>toggle(i)} key={x.label}>{choice(x.label)} +{x.price}</button>)}</div></div>:null}
    <div className="customizer-footer"><div className="qty-control"><button onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus/></button><b>{qty}</b><button onClick={()=>setQty(q=>q+1)}><Plus/></button></div><button className="add-configured" onClick={()=>{add(item,qty,{unitPrice:unit,size:item.sizes?.[size]?.label,type:item.types?.[type]?.label,extras:extras.map(i=>item.extras![i].label)});onClose()}}>{t('custom.add')} <span>EGP {unit*qty}</span></button></div>
   </div>
  </div>
 </div>
}
