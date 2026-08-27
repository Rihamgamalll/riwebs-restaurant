'use client';
import Image from 'next/image';
import {Minus,Plus,ShoppingBag,X,MessageCircle,Loader2} from 'lucide-react';
import {useState} from 'react';
import {useCart} from './CartProvider';
import {useLanguage} from './LanguageProvider';
const WHATSAPP='201013290912';
export default function CartDrawer(){
 const c=useCart(); const {lang,t,itemName,choice}=useLanguage(); const [sending,setSending]=useState(false);
 const buildLocal=()=>{
   const lines=c.lines.map(({item,qty,config},i)=>{const choices=[config.size,config.type,...(config.extras||[])].filter(Boolean).map(x=>choice(String(x))).join(' · ')||t('cart.standard');return `${i+1}. ${itemName(item)} ×${qty}\n   ${choices}\n   EGP ${config.unitPrice*qty}`});
   return lang==='ar'?`مرحبًا RiWebs 👋\nعايز/ة أأكد الأوردر ده:\n\n${lines.join('\n\n')}\n\nالإجمالي: EGP ${c.total}\n\nمن فضلك أكد التوفر وتفاصيل الاستلام/التوصيل.\nالقاهرة، مصر`:`Hello RiWebs 👋\nI would like to confirm this order:\n\n${lines.join('\n\n')}\n\nTotal: EGP ${c.total}\n\nPlease confirm availability and pickup/delivery details.\nCairo, Egypt`;
 };
 const checkout=async()=>{if(!c.lines.length||sending)return;setSending(true);try{
   const payload={language:lang,total:c.total,items:c.lines.map(({item,qty,config})=>({id:item.id,name:item.name,displayName:itemName(item),qty,unitPrice:config.unitPrice,size:config.size,type:config.type,extras:config.extras||[]}))};
   const api=(process.env.NEXT_PUBLIC_API_URL||'').replace(/\/$/,'');
   const res=await fetch(`${api}/api/orders`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
   if(!res.ok)throw new Error('Order API unavailable'); const data=await res.json();
   const url=data.whatsappUrl||`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(data.message||buildLocal())}`; window.location.href=url;
 }catch{window.location.href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildLocal())}`;}finally{setSending(false)}};
 return <>
  <button className="cart-fab" aria-label="Open cart" onClick={()=>c.setOpen(true)}><ShoppingBag size={18}/><span>{c.count}</span></button>
  <div className={`cart-backdrop ${c.open?'show':''}`} onClick={()=>c.setOpen(false)}/>
  <aside className={`cart-drawer ${c.open?'show':''}`} aria-hidden={!c.open}>
   <div className="cart-head"><div><small>{t('cart.title')}</small><h3>{t('cart.cart')}</h3></div><button onClick={()=>c.setOpen(false)}><X/></button></div>
   <div className="cart-lines">{c.lines.length===0?<p className="empty">{t('cart.empty')}</p>:c.lines.map(({key,item,qty,config})=><div className="cart-line" key={key}><Image src={item.image} alt={itemName(item)} width={76} height={76}/><div className="cart-line-copy"><b>{itemName(item)}</b><small>{[config.size,config.type,...(config.extras||[])].filter(Boolean).map(x=>choice(String(x))).join(' · ')||t('cart.standard')}</small><strong>EGP {config.unitPrice*qty}</strong></div><div className="cart-qty"><button onClick={()=>c.remove(key)}><Minus size={15}/></button><span>{qty}</span><button onClick={()=>c.inc(key)}><Plus size={15}/></button></div></div>)}</div>
   <div className="cart-total"><span>{t('cart.total')}</span><b>EGP {c.total}</b></div>
   <button className="btn btn-primary btn-block whatsapp-checkout" disabled={!c.lines.length||sending} onClick={checkout}>{sending?<Loader2 className="spin" size={18}/>:<MessageCircle size={18}/>} {t('cart.confirm')}</button>
   <small className="checkout-note">{t('cart.note')}</small>
   {c.lines.length?<button className="clear-order" onClick={c.clear}>{t('cart.clear')}</button>:null}
  </aside>
 </>;
}
