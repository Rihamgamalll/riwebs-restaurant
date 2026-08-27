import {NextResponse} from 'next/server';
const PHONE='201013290912';
function safe(v:unknown,max=120){return String(v??'').replace(/[<>]/g,'').slice(0,max)}
export async function POST(req:Request){
 try{
  const body=await req.json(); const lang=body?.language==='ar'?'ar':'en'; const items=Array.isArray(body?.items)?body.items.slice(0,40):[];
  if(!items.length)return NextResponse.json({error:'Order is empty'},{status:400});
  let calculated=0;
  const lines=items.map((x:any,i:number)=>{const qty=Math.max(1,Math.min(50,Number(x.qty)||1));const unit=Math.max(0,Number(x.unitPrice)||0);calculated+=qty*unit;const opts=[x.size,x.type,...(Array.isArray(x.extras)?x.extras:[])].filter(Boolean).map((v:any)=>safe(v,60)).join(' · ');return `${i+1}. ${safe(x.displayName||x.name)} ×${qty}\n   ${opts|| (lang==='ar'?'عادي':'Standard')}\n   EGP ${qty*unit}`});
  const id=`RW-${Date.now().toString(36).toUpperCase()}`;
  const message=lang==='ar'?`مرحبًا RiWebs 👋\nعايز/ة أأكد الأوردر ده (${id}):\n\n${lines.join('\n\n')}\n\nالإجمالي: EGP ${calculated}\n\nمن فضلك أكد التوفر وتفاصيل الاستلام/التوصيل.\nالقاهرة، مصر`:`Hello RiWebs 👋\nI would like to confirm this order (${id}):\n\n${lines.join('\n\n')}\n\nTotal: EGP ${calculated}\n\nPlease confirm availability and pickup/delivery details.\nCairo, Egypt`;
  return NextResponse.json({ok:true,orderId:id,total:calculated,message,whatsappUrl:`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`});
 }catch{return NextResponse.json({error:'Invalid request'},{status:400})}
}
