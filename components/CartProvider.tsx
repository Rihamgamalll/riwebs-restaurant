'use client';
import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import type {MenuItem} from '@/data/menu';
export type CartConfig={size?:string;type?:string;extras?:string[];unitPrice:number};
export type CartLine={key:string;item:MenuItem;qty:number;config:CartConfig};
type CartCtx={lines:CartLine[];count:number;total:number;add:(item:MenuItem,qty?:number,config?:CartConfig)=>void;inc:(key:string)=>void;remove:(key:string)=>void;clear:()=>void;open:boolean;setOpen:(v:boolean)=>void};
const C=createContext<CartCtx|null>(null); const STORAGE='riwebs-cart-v1';
export function CartProvider({children}:{children:React.ReactNode}){
 const [lines,setLines]=useState<CartLine[]>([]); const [open,setOpen]=useState(false); const [ready,setReady]=useState(false);
 useEffect(()=>{try{const raw=localStorage.getItem(STORAGE);if(raw)setLines(JSON.parse(raw))}catch{}finally{setReady(true)}},[]);
 useEffect(()=>{if(ready)try{localStorage.setItem(STORAGE,JSON.stringify(lines))}catch{}},[lines,ready]);
 const add=(item:MenuItem,qty=1,config:CartConfig={unitPrice:item.price})=>{const key=[item.id,config.size,config.type,(config.extras||[]).join(',')].join('|');setLines(v=>{const hit=v.find(x=>x.key===key);return hit?v.map(x=>x.key===key?{...x,qty:x.qty+qty}:x):[...v,{key,item,qty,config}]});setOpen(true)};
 const inc=(key:string)=>setLines(v=>v.map(x=>x.key===key?{...x,qty:x.qty+1}:x));
 const remove=(key:string)=>setLines(v=>v.flatMap(x=>x.key===key?(x.qty>1?[{...x,qty:x.qty-1}]:[]):[x]));
 const value=useMemo(()=>({lines,count:lines.reduce((a,b)=>a+b.qty,0),total:lines.reduce((a,b)=>a+b.config.unitPrice*b.qty,0),add,inc,remove,clear:()=>setLines([]),open,setOpen}),[lines,open]);
 return <C.Provider value={value}>{children}</C.Provider>
}
export const useCart=()=>{const c=useContext(C);if(!c)throw new Error('CartProvider missing');return c};
