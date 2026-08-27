'use client';
import Image from 'next/image';
import Link from 'next/link';
import {Menu,X,ShoppingBag} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {useCart} from './CartProvider';

const links=[
  ['Home','/'],
  ['Menu','/menu'],
  ['Our Burgers','/burgers'],
  ['Sandwiches','/sandwiches'],
  ['Sides','/sides'],
  ['Drinks','/drinks'],
  ['About','/about'],
  ['Contact','/contact']
];

export default function Navbar(){
 const [open,setOpen]=useState(false);
 const path=usePathname();
 const cart=useCart();

 return <header className={`nav-shell ${path==='/'?'nav-home':''}`}>
  <nav className="nav">
   <button className="nav-hamb" aria-label="Open navigation" onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button>
   <Link href="/" className="brand"><Image src="/branding/riwebs-logo.png" alt="RiWebs Restaurant" width={138} height={84} priority/></Link>
   <div className="nav-links">{links.map(([name,href])=><Link className={path===href?'active':''} key={href} href={href}>{name}</Link>)}</div>
   <Link className="order-pill" href="/menu">ORDER NOW</Link>
   <button className="nav-bag" onClick={()=>cart.setOpen(true)} aria-label="Open order"><ShoppingBag size={17}/><small>{cart.count}</small></button>
  </nav>
  <div className={`mobile-menu ${open?'open':''}`}>
   {links.map(([name,href])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{name}</Link>)}
   <Link className="btn btn-primary" href="/menu" onClick={()=>setOpen(false)}>ORDER NOW</Link>
  </div>
 </header>
}
