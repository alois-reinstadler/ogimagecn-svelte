import type {
  BlogProps, ChangelogProps, EditorialProps, EventProps, GridProps, LogoProps,
  OwnerProps, PhotoProps, ProductProps, ProfileProps, QuoteProps,
  ShadcnRegistry1Props, ShadcnRegistry2Props, ShadcnRegistry3Props,
  ShadcnRegistry4Props, ShadcnRegistry5Props, ShadcnRegistry6Props,
  ShioriProps, ShowcaseProps, StatProps, TerminalProps
} from '../registry.js';
import { div, image, node, span, type OgNode, type OgStyle } from './node.js';

type Resolved<T> = Required<Omit<T, 'overlay'>>;

const initials = (name: string) => name.split(' ').map((part) => part.charAt(0)).slice(0, 2).join('').toUpperCase();
const imgOr = (src: string, width: number, height: number, imageStyle: OgStyle, fallback: OgNode) =>
  src ? image(src, width, height, imageStyle) : fallback;

const svg = (attrs: Record<string, string | number>, children: OgNode[]) => node('svg', undefined, children, attrs);
const path = (d: string, attrs: Record<string, string | number> = {}) => node('path', undefined, undefined, { d, ...attrs });

export function blogTemplate(p: Resolved<BlogProps>): OgNode {
  return div({ backgroundColor:'#ffffff', color:'#0a0a0a', display:'flex', flexDirection:'column', height:'100%', justifyContent:'space-between', padding:'80px', position:'relative', width:'100%' }, [
    div({ alignSelf:'flex-start', backgroundColor:'rgba(124,58,237,0.15)', borderRadius:'999px', color:'#7c3aed', display:'flex', fontSize:'26px', fontWeight:600, letterSpacing:'0.02em', padding:'10px 22px', textTransform:'uppercase' }, [p.category]),
    div({ display:'flex', flexDirection:'column' }, [
      div({ display:'flex', fontSize:p.title.length > 48 ? 64 : 78, fontWeight:700, letterSpacing:'-0.03em', lineHeight:1.05, maxWidth:'1000px' }, [p.title]),
      div({ color:'#52525b', display:'flex', fontSize:'34px', lineHeight:1.4, marginTop:'28px', maxWidth:'920px' }, [p.excerpt])
    ]),
    div({ alignItems:'center', display:'flex', gap:'20px' }, [
      p.avatar ? image(p.avatar,72,72,{ borderRadius:'999px' }) : div({ alignItems:'center', backgroundColor:'#7c3aed', borderRadius:'999px', color:'#ffffff', display:'flex', fontSize:'30px', fontWeight:700, height:'72px', justifyContent:'center', width:'72px' }, [initials(p.author)]),
      div({ display:'flex', flexDirection:'column' }, [
        div({ display:'flex', fontSize:'30px', fontWeight:600 }, [p.author]),
        div({ color:'#71717a', display:'flex', fontSize:'24px' }, [p.meta])
      ])
    ]),
    div({ alignItems:'center', display:'flex', gap:'12px', position:'absolute', right:'80px', top:'80px' }, [
      imgOr(p.logo,40,40,{ borderRadius:'8px', objectFit:'contain' },div({ alignItems:'center', backgroundColor:'#7c3aed', borderRadius:'8px', color:'#ffffff', display:'flex', fontSize:'20px', fontWeight:700, height:'40px', justifyContent:'center', width:'40px' })),
      div({ fontSize:'32px', fontWeight:700 }, [p.brand])
    ])
  ]);
}

export function changelogTemplate(p: Resolved<ChangelogProps>): OgNode {
  const check = svg({ fill:'none', height:22, stroke:'#34d399', 'stroke-linecap':'round', 'stroke-linejoin':'round', 'stroke-width':3, viewBox:'0 0 24 24', width:22 }, [path('M20 6 9 17l-5-5')]);
  return div({ backgroundColor:'#0a0a0a', backgroundImage:'radial-gradient(circle at 100% 0%, rgba(52,211,153,0.16), transparent 50%)', color:'#fafafa', display:'flex', flexDirection:'column', height:'100%', padding:'80px', position:'relative', width:'100%' }, [
    div({ alignItems:'center', display:'flex', gap:'20px' }, [
      div({ alignItems:'center', backgroundColor:'rgba(52,211,153,0.15)', borderRadius:'999px', color:'#34d399', display:'flex', fontSize:'28px', fontWeight:700, gap:'8px', padding:'10px 22px' }, [...(p.logo ? [image(p.logo,20,20,{ borderRadius:'4px', objectFit:'contain' })] : []), p.version]),
      div({ color:'#a1a1aa', display:'flex', fontSize:'28px' }, [p.date])
    ]),
    div({ display:'flex', fontSize:'80px', fontWeight:700, letterSpacing:'-0.03em', marginTop:'32px' }, [p.title]),
    div({ display:'flex', flexDirection:'column', gap:'22px', marginTop:'44px' }, p.items.slice(0,4).map((item) =>
      div({ alignItems:'center', display:'flex', gap:'20px' }, [div({ alignItems:'center', backgroundColor:'rgba(52,211,153,0.15)', borderRadius:'999px', display:'flex', height:'40px', justifyContent:'center', width:'40px' }, [check]), div({ color:'#e4e4e7', display:'flex', fontSize:'34px' }, [item])])
    )),
    div({ alignItems:'center', display:'flex', gap:'12px', position:'absolute', right:'80px', top:'80px' }, [
      imgOr(p.logo,40,40,{ borderRadius:'8px', objectFit:'contain' },div({ alignItems:'center', backgroundColor:'#34d399', borderRadius:'8px', color:'#0a0a0a', display:'flex', fontSize:'20px', fontWeight:700, height:'40px', justifyContent:'center', width:'40px' })),
      div({ color:'#71717a', fontSize:'32px', fontWeight:700 }, [p.brand])
    ])
  ]);
}

export function editorialTemplate(p: Resolved<EditorialProps>): OgNode {
  return div({ backgroundColor:'#f5f1e9', color:'#0a0a0a', display:'flex', flexDirection:'column', height:'100%', justifyContent:'space-between', overflow:'hidden', padding:'80px', position:'relative', width:'100%' }, [
    div({ bottom:'-60px', color:'rgba(10,10,10,0.05)', display:'flex', fontSize:'420px', fontWeight:800, letterSpacing:'-0.04em', lineHeight:1, position:'absolute', right:'-20px' }, [p.ghost || p.title.split(' ')[0]]),
    div({ alignItems:'center', alignSelf:'flex-start', backgroundColor:'rgba(225,29,72,0.15)', borderRadius:'999px', color:'#e11d48', display:'flex', fontSize:'26px', fontWeight:700, letterSpacing:'0.04em', padding:'10px 24px', textTransform:'uppercase' }, [p.kicker]),
    div({ display:'flex', fontSize:p.title.length > 36 ? 96 : 120, fontWeight:800, letterSpacing:'-0.04em', lineHeight:0.98, maxWidth:'1000px' }, [p.title]),
    div({ alignItems:'center', borderTop:'2px solid rgba(10,10,10,0.15)', display:'flex', justifyContent:'space-between', paddingTop:'28px' }, [
      div({ alignItems:'center', display:'flex', gap:'12px' }, [
        imgOr(p.logo,32,32,{ borderRadius:'6px', objectFit:'contain' },div({ alignItems:'center', backgroundColor:'#e11d48', borderRadius:'6px', color:'#fff', display:'flex', fontSize:'16px', fontWeight:700, height:'32px', justifyContent:'center', width:'32px' })),
        div({ display:'flex', fontSize:'32px', fontWeight:700 }, [p.brand])
      ]),
      div({ color:'#52525b', display:'flex', fontSize:'30px' }, [p.meta])
    ])
  ]);
}

export function eventTemplate(p: Resolved<EventProps>): OgNode {
  const calendar = svg({ fill:'none', height:30, stroke:'#f59e0b', 'stroke-linecap':'round', 'stroke-linejoin':'round', 'stroke-width':2, viewBox:'0 0 24 24', width:30 }, [node('rect',undefined,undefined,{height:18,rx:2,width:18,x:3,y:4}),path('M16 2v4M8 2v4M3 10h18')]);
  return div({ backgroundColor:'#0a0a0a', backgroundImage:'radial-gradient(circle at 100% 0%, rgba(245,158,11,0.2), transparent 55%)', color:'#fafafa', display:'flex', flexDirection:'column', height:'100%', justifyContent:'space-between', padding:'80px', width:'100%' }, [
    div({ alignItems:'center', display:'flex', justifyContent:'space-between' }, [
      div({ alignItems:'center', backgroundColor:'rgba(245,158,11,0.15)', border:'1px solid rgba(245,158,11,0.4)', borderRadius:'999px', color:'#f59e0b', display:'flex', fontSize:'26px', fontWeight:600, gap:'12px', letterSpacing:'0.04em', padding:'10px 22px', textTransform:'uppercase' }, [div({ backgroundColor:'#f59e0b', borderRadius:'999px', height:'12px', width:'12px' }),p.label]),
      div({ alignItems:'center', display:'flex', gap:'12px' }, [imgOr(p.logo,40,40,{borderRadius:'8px',objectFit:'contain'},div({alignItems:'center',backgroundColor:'#f59e0b',borderRadius:'8px',color:'#0a0a0a',display:'flex',fontSize:'20px',fontWeight:700,height:'40px',justifyContent:'center',width:'40px'})),div({color:'#a1a1aa',fontSize:'28px',fontWeight:600},[p.brand])])
    ]),
    div({ display:'flex', fontSize:p.title.length > 40 ? 72 : 88, fontWeight:700, letterSpacing:'-0.03em', lineHeight:1.02, maxWidth:'1000px' }, [p.title]),
    div({ alignItems:'center', display:'flex', gap:'20px' }, [div({alignItems:'center',display:'flex',fontSize:'30px',fontWeight:600,gap:'14px'},[calendar,p.date]),div({color:'#52525b',display:'flex',fontSize:'30px'},['·']),div({color:'#a1a1aa',display:'flex',fontSize:'30px'},[p.location])])
  ]);
}

export function gridTemplate(p: Resolved<GridProps>): OgNode {
  return div({ backgroundColor:'#0a0a0a', color:'#ffffff', display:'flex', height:'100%', position:'relative', width:'100%' }, [
    div({borderLeft:'1px dashed #44403c',bottom:0,left:'64px',position:'absolute',top:0,width:'1px'}), div({borderLeft:'1px dashed #44403c',bottom:0,position:'absolute',right:'64px',top:0,width:'1px'}),
    div({borderTop:'1px dashed #44403c',height:'1px',left:0,position:'absolute',right:0,top:'64px'}), div({borderTop:'1px dashed #44403c',bottom:'64px',height:'1px',left:0,position:'absolute',right:0}),
    div({bottom:'128px',display:'flex',flexDirection:'column',justifyContent:'center',left:'128px',position:'absolute',right:'128px',top:'128px',width:'896px'},[
      div({display:'flex',flexGrow:1,fontSize:p.title.length > 20 ? 64 : 80,fontWeight:600,letterSpacing:'-0.04em',lineHeight:1.1,textWrap:'balance'},[p.title]),
      div({color:'#a8a29e',display:'flex',flexGrow:1,fontSize:'40px',fontWeight:500,lineHeight:1.5,marginTop:'24px',textWrap:'balance'},[p.description])
    ]),
    div({alignItems:'center',bottom:'96px',display:'flex',gap:'14px',position:'absolute',right:'96px'},[imgOr(p.logo,48,48,{borderRadius:'12px',objectFit:'contain'},div({alignItems:'center',backgroundColor:'#fff',borderRadius:'12px',color:'#0a0a0a',display:'flex',fontSize:'26px',fontWeight:800,height:'48px',justifyContent:'center',width:'48px'})),span({fontSize:'30px',fontWeight:600},[p.brand])])
  ]);
}

export function logoTemplate(p: Resolved<LogoProps>): OgNode {
  const isColor = p.background.startsWith('#');
  return div({ alignItems:'center', backgroundColor:isColor ? p.background : '#09090b', backgroundImage:isColor ? 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.2), transparent 60%)' : p.background, color:'#fafafa', display:'flex', flexDirection:'column', height:'100%', justifyContent:'center', width:'100%' }, [
    imgOr(p.logo,140,140,{borderRadius:'28px',objectFit:'contain'},div({alignItems:'center',backgroundColor:'#7c3aed',borderRadius:'28px',boxShadow:'0 24px 80px rgba(124,58,237,0.33)',color:'#fff',display:'flex',fontSize:'72px',fontWeight:800,height:'140px',justifyContent:'center',width:'140px'},[p.monogram])),
    div({display:'flex',fontSize:'96px',fontWeight:800,letterSpacing:'-0.04em',marginTop:'44px'},[p.brand]),
    ...(p.tagline ? [div({color:'#a1a1aa',display:'flex',fontSize:'32px',marginTop:'16px'},[p.tagline])] : [])
  ]);
}

export function ownerTemplate(p: Resolved<OwnerProps>): OgNode {
  return div({ backgroundColor:'#f5f5f5', color:'#1a1a1a', display:'flex', flexDirection:'column', height:'100%', padding:'8px', width:'100%' }, [
    div({ backgroundColor:'#ffffff', borderRadius:'56px', display:'flex', flexDirection:'column', height:'100%', overflow:'hidden', padding:'48px', position:'relative', width:'100%' }, [
      div({color:'#a3a3a3',display:'flex',fontSize:'64px',fontWeight:600,letterSpacing:'-0.03em',lineHeight:1.05},[p.eyebrow]),
      div({display:'flex',fontSize:'64px',fontWeight:600,letterSpacing:'-0.03em',lineHeight:1.05,maxWidth:'800px'},[p.title]),
      div({alignItems:'flex-end',bottom:'0px',display:'flex',gap:'16px',left:'48px',position:'absolute',right:'48px'},p.images.map((src,i)=>
        div({borderRadius:'24px 24px 0 0',display:'flex',flex:1,height:i===1?'300px':'260px',overflow:'hidden'},[image(src,undefined,undefined,{borderRadius:'24px 24px 0 0',height:'100%',objectFit:'cover',width:'100%'})])
      )),
      div({alignItems:'center',display:'flex',gap:'8px',position:'absolute',right:'36px',top:'36px'},[
        imgOr(p.logo,32,32,{borderRadius:'8px',objectFit:'contain'},div({backgroundColor:'#1a1a1a',borderRadius:'8px',height:'32px',width:'32px'})),
        div({fontSize:'28px',fontWeight:600,letterSpacing:'-0.03em'},[p.brand])
      ])
    ])
  ]);
}

export function photoTemplate(p: Resolved<PhotoProps>): OgNode {
  const fallback='linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #7c3aed 100%)';
  return div({backgroundColor:'#0a0a0a',backgroundImage:p.image?`url(${p.image})`:fallback,backgroundPosition:'center',backgroundSize:'1200px 630px',color:'#fff',display:'flex',flexDirection:'column',height:'100%',justifyContent:'flex-end',padding:'80px',position:'relative',width:'100%'},[
    div({backgroundImage:'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.85) 100%)',bottom:0,left:0,position:'absolute',right:0,top:0}),
    div({alignSelf:'flex-start',backgroundColor:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.4)',borderRadius:'999px',display:'flex',fontSize:'26px',fontWeight:600,letterSpacing:'0.04em',padding:'10px 22px',textTransform:'uppercase'},[p.label]),
    div({display:'flex',fontSize:p.title.length>36?72:88,fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.02,marginTop:'28px',maxWidth:'1000px',textShadow:'0 2px 24px rgba(0,0,0,0.5)'},[p.title]),
    div({alignItems:'center',display:'flex',gap:'12px',marginTop:'32px'},[
      imgOr(p.logo,36,36,{borderRadius:'8px',objectFit:'contain'},div({alignItems:'center',backgroundColor:'rgba(255,255,255,0.2)',borderRadius:'8px',color:'#fff',display:'flex',fontSize:'16px',fontWeight:700,height:'36px',justifyContent:'center',width:'36px'})),
      div({color:'rgba(255,255,255,0.85)',fontSize:'28px',fontWeight:600},[p.brand])
    ])
  ]);
}

export function productTemplate(p: Resolved<ProductProps>): OgNode {
  return div({backgroundColor:'#09090b',color:'#fafafa',display:'flex',height:'100%',padding:'72px',width:'100%'},[
    div({display:'flex',flex:1,flexDirection:'column',justifyContent:'space-between',paddingRight:'56px'},[
      div({alignItems:'center',display:'flex',gap:'14px'},[imgOr(p.logo,32,32,{borderRadius:'10px',objectFit:'contain'},div({backgroundColor:'#6366f1',borderRadius:'10px',height:'32px',width:'32px'})),div({display:'flex',fontSize:'28px',fontWeight:600},[p.brand])]),
      div({display:'flex',flexDirection:'column'},[
        div({display:'flex',fontSize:p.title.length>28?64:76,fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.05,maxWidth:'560px'},[p.title]),
        div({color:'#a1a1aa',display:'flex',fontSize:'30px',lineHeight:1.4,marginTop:'24px',maxWidth:'520px'},[p.description])
      ]),
      div({alignItems:'center',alignSelf:'flex-start',backgroundColor:'#6366f1',borderRadius:'999px',color:'#fff',display:'flex',fontSize:'32px',fontWeight:700,padding:'14px 32px'},[p.price])
    ]),
    p.image
      ? div({alignItems:'center',backgroundColor:'#18181b',border:'1px solid rgba(250,250,250,0.1)',borderRadius:'28px',display:'flex',height:'100%',justifyContent:'center',overflow:'hidden',width:'486px'},[image(p.image,486,486,{height:'100%',objectFit:'cover',width:'100%'})])
      : div({alignItems:'center',backgroundColor:'#18181b',backgroundImage:'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',backgroundPosition:'center',backgroundSize:'486px 486px',border:'1px solid rgba(250,250,250,0.1)',borderRadius:'28px',display:'flex',height:'100%',justifyContent:'center',width:'486px'})
  ]);
}

export function profileTemplate(p: Resolved<ProfileProps>): OgNode {
  return div({alignItems:'center',backgroundColor:'#18181b',backgroundImage:'radial-gradient(circle at 0% 100%, rgba(244,63,94,0.18), transparent 55%)',color:'#fafafa',display:'flex',gap:'64px',height:'100%',padding:'80px',width:'100%'},[
    p.avatar?image(p.avatar,300,300,{border:'4px solid rgba(250,250,250,0.15)',borderRadius:'999px'}):div({alignItems:'center',backgroundColor:'#f43f5e',border:'4px solid rgba(250,250,250,0.15)',borderRadius:'999px',color:'#fff',display:'flex',flexShrink:0,fontSize:'120px',fontWeight:700,height:'300px',justifyContent:'center',width:'300px'},[initials(p.name)]),
    div({display:'flex',flexDirection:'column'},[
      div({display:'flex',fontSize:'72px',fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.05},[p.name]),
      div({color:'#f43f5e',display:'flex',fontSize:'34px',fontWeight:600,marginTop:'12px'},[p.role]),
      div({color:'#a1a1aa',display:'flex',fontSize:'28px',lineHeight:1.4,marginTop:'24px',maxWidth:'560px'},[p.bio]),
      div({alignItems:'center',alignSelf:'flex-start',backgroundColor:'rgba(250,250,250,0.06)',border:'1px solid rgba(250,250,250,0.12)',borderRadius:'999px',color:'#d4d4d8',display:'flex',fontSize:'26px',fontWeight:500,marginTop:'32px',padding:'10px 24px'},[p.website])
    ])
  ]);
}

export function quoteTemplate(p: Resolved<QuoteProps>): OgNode {
  return div({backgroundColor:'#18181b',color:'#fafafa',display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',padding:'96px',width:'100%'},[
    div({color:'#f472b6',display:'flex',fontSize:'140px',fontWeight:800,lineHeight:0.8},['“']),
    div({display:'flex',fontSize:p.quote.length>90?52:64,fontWeight:600,letterSpacing:'-0.02em',lineHeight:1.2,marginTop:'8px',maxWidth:'1000px'},[p.quote]),
    div({alignItems:'center',display:'flex',gap:'20px',marginTop:'56px'},[
      p.avatar?image(p.avatar,76,76,{borderRadius:'999px'}):div({alignItems:'center',backgroundColor:'#f472b6',borderRadius:'999px',color:'#18181b',display:'flex',fontSize:'32px',fontWeight:700,height:'76px',justifyContent:'center',width:'76px'},[initials(p.author)]),
      div({display:'flex',flexDirection:'column'},[div({display:'flex',fontSize:'32px',fontWeight:600},[p.author]),div({color:'#a1a1aa',display:'flex',fontSize:'26px'},[p.handle])])
    ])
  ]);
}

export function shadcnRegistry1Template(p: Resolved<ShadcnRegistry1Props>): OgNode {
  return div({backgroundColor:'#09090b',backgroundImage:'radial-gradient(ellipse at 70% 80%, rgba(120,50,60,0.15), transparent 60%), radial-gradient(ellipse at 20% 20%, rgba(60,60,80,0.1), transparent 50%)',color:'#fafafa',display:'flex',flexDirection:'column',height:'100%',justifyContent:'space-between',padding:'72px',position:'relative',width:'100%'},[
    div({alignItems:'center',display:'flex',justifyContent:'space-between',width:'100%'},[
      div({alignItems:'center',display:'flex',gap:'16px'},[imgOr(p.logo,48,48,{borderRadius:'12px',objectFit:'contain'},div({backgroundColor:'#22d3ee',borderRadius:'999px',display:'flex',height:'48px',width:'48px'})),div({fontSize:'32px',fontWeight:600,letterSpacing:'-0.01em'},[p.name])]),
      div({color:'#71717a',fontSize:'28px',fontWeight:500},[p.url])
    ]),
    div({display:'flex',flexDirection:'column',gap:'24px',marginTop:'-40px'},[
      div({display:'flex',fontSize:p.url.length>20?96:120,fontWeight:700,letterSpacing:'-0.04em',lineHeight:1,textWrap:'balance'},[p.url]),
      div({color:'#a1a1aa',display:'flex',fontSize:'36px',fontWeight:400,lineHeight:1.3,maxWidth:'800px',textWrap:'balance'},[p.description])
    ]),
    ...(p.items.length ? [div({alignItems:'center',display:'flex',gap:'16px'},p.items.map(item=>div({backgroundColor:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',color:'#d4d4d8',display:'flex',fontSize:'24px',fontWeight:500,padding:'12px 20px'},[item])))] : [])
  ]);
}

export function shadcnRegistry2Template(p: Resolved<ShadcnRegistry2Props>): OgNode {
  const bolt=svg({width:32,height:32,viewBox:'0 0 24 24',fill:'none',stroke:'#ffffff','stroke-width':2,'stroke-linecap':'round','stroke-linejoin':'round'},[path('M13 2L3 14h9l-1 8 10-12h-9l1-8z')]);
  return div({backgroundColor:'#ffffff',color:'#0a0a0a',display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',padding:'80px',position:'relative',width:'100%'},[
    div({alignItems:'center',display:'flex',gap:'20px',marginBottom:'64px'},[
      p.logo?image(p.logo,64,64,{objectFit:'contain'}):div({alignItems:'center',backgroundColor:p.accent,borderRadius:'16px',display:'flex',height:'64px',justifyContent:'center',width:'64px'},[bolt]),
      div({alignItems:'center',display:'flex',gap:'20px'},[div({fontSize:'40px',fontWeight:700,letterSpacing:'-0.02em'},[p.name]),div({color:'#d4d4d8',fontSize:'36px',fontWeight:500},['|']),div({color:'#a1a1aa',fontSize:'36px',fontWeight:500},[p.category])])
    ]),
    div({display:'flex',fontSize:p.title.length>50?64:72,fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.1,maxWidth:'900px',textWrap:'balance'},[p.title]),
    ...(p.items.length?[div({alignItems:'center',color:'#71717a',display:'flex',fontSize:'32px',fontWeight:500,gap:'24px',marginTop:'48px'},p.items.map((item,i)=>div({alignItems:'center',display:'flex',gap:'24px'},[span({},[item]),...(i<p.items.length-1?[span({color:'#d4d4d8'},['•'])]:[])])))] : [])
  ]);
}

export function shadcnRegistry3Template(p: Resolved<ShadcnRegistry3Props>): OgNode {
  return div({backgroundColor:'#0a0a0a',color:'#fafafa',display:'flex',flexDirection:'column',height:'100%',overflow:'hidden',padding:'80px',position:'relative',width:'100%'},[
    div({bottom:'-80px',color:'rgba(255,255,255,0.04)',display:'flex',fontSize:'320px',fontWeight:800,left:'40px',letterSpacing:'-0.04em',lineHeight:0.85,position:'absolute'},[p.ghost||p.title.split(' ')[0]]),
    div({alignItems:'flex-start',display:'flex',justifyContent:'space-between',position:'relative'},[
      div({display:'flex',flexDirection:'column',fontSize:p.title.length>60?52:64,fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.1,maxWidth:'800px',textWrap:'balance'},[p.title,...(p.credit?[div({color:'#52525b',fontSize:'24px',fontWeight:400,marginTop:'24px'},[p.credit])]:[])]),
      div({alignItems:'center',border:'3px solid rgba(255,255,255,0.2)',borderRadius:'999px',display:'flex',flexShrink:0,height:'160px',justifyContent:'center',marginLeft:'40px',overflow:'hidden',width:'160px'},[
        p.logo?image(p.logo,140,140,{borderRadius:'999px',objectFit:'cover'}):div({backgroundImage:'linear-gradient(135deg, #60EFFF, #0061FF)',borderRadius:'999px',height:'140px',width:'140px'})
      ])
    ])
  ]);
}

export function shadcnRegistry4Template(p: Resolved<ShadcnRegistry4Props>): OgNode {
  return div({alignItems:'center',backgroundColor:'#0a0a0a',backgroundImage:'radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.1), transparent 70%)',backgroundSize:'100% 100%',color:'#fafafa',display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',padding:'80px',position:'relative',width:'100%'},[
    div({alignItems:'center',display:'flex',gap:'16px',marginBottom:'48px'},[imgOr(p.logo,56,56,{objectFit:'contain'},div({backgroundColor:'rgba(255,255,255,0.3)',borderRadius:'12px',height:'56px',width:'56px'})),div({fontSize:'40px',fontWeight:600,letterSpacing:'-0.02em'},[p.name])]),
    div({display:'flex',flexWrap:'wrap',fontSize:p.title.length>60?52:64,fontWeight:700,justifyContent:'center',letterSpacing:'-0.03em',lineHeight:1.15,maxWidth:'900px',textAlign:'center',textWrap:'balance'},p.title.split(' ').map((word,i)=>span({color:i%2===0?'#71717a':'#fafafa',marginRight:'0.3em'},[word]))),
    ...(p.url?[div({color:'#52525b',fontSize:'24px',fontWeight:500,letterSpacing:'0.02em',marginTop:'48px'},[p.url])]:[])
  ]);
}

const frame = (style:'dashed'|'solid', inset:string, color:string): OgNode[] => [
  div({borderLeft:`1px ${style} ${color}`,bottom:0,left:inset,position:'absolute',top:0,width:'1px'}),
  div({borderLeft:`1px ${style} ${color}`,bottom:0,position:'absolute',right:inset,top:0,width:'1px'}),
  div({borderTop:`1px ${style} ${color}`,height:'1px',left:0,position:'absolute',right:0,top:inset}),
  div({borderTop:`1px ${style} ${color}`,bottom:inset,height:'1px',left:0,position:'absolute',right:0})
];

export function shadcnRegistry5Template(p: Resolved<ShadcnRegistry5Props>): OgNode {
  return div({backgroundColor:'#fafafa',color:'#0a0a0a',display:'flex',height:'100%',position:'relative',width:'100%'},[
    ...frame('dashed','64px','#44403c'),
    div({alignItems:'center',bottom:'128px',display:'flex',flexDirection:'column',justifyContent:'center',left:'128px',position:'absolute',right:'128px',textAlign:'center',top:'128px',width:'896px'},[
      div({alignItems:'center',display:'flex',gap:'12px',marginBottom:'32px'},[imgOr(p.logo,40,40,{objectFit:'contain'},div({backgroundColor:'rgba(0,0,0,0.3)',borderRadius:'12px',height:'40px',width:'40px'})),div({color:'#18181b',fontSize:'28px',fontWeight:600},[p.name])]),
      div({display:'flex',fontSize:p.title.length>30?72:88,fontWeight:800,letterSpacing:'-0.04em',lineHeight:1,textWrap:'balance'},[p.title]),
      ...(p.description?[div({color:'#71717a',display:'flex',fontSize:'28px',fontWeight:400,lineHeight:1.5,marginTop:'32px',textWrap:'balance'},[p.description])]:[])
    ])
  ]);
}

export function shadcnRegistry6Template(p: Resolved<ShadcnRegistry6Props>): OgNode {
  return div({backgroundColor:'#000000',color:'#f4f4f5',display:'flex',height:'100%',position:'relative',width:'100%'},[
    ...frame('solid','48px','#27272a'),
    div({alignItems:'center',display:'flex',gap:'16px',left:'72px',position:'absolute',top:'72px'},[imgOr(p.logo,64,64,{objectFit:'contain'},div({backgroundColor:'#fff',borderRadius:'12px',height:'64px',width:'64px'})),span({fontSize:'32px',fontWeight:600,letterSpacing:'-0.02em'},[p.brand])]),
    div({borderTop:'2px solid #27272a',bottom:'96px',display:'flex',flexDirection:'column',justifyContent:'flex-end',left:0,position:'absolute',right:0,top:'160px'},[
      div({borderBottom:'2px solid #27272a',borderTop:'2px solid #27272a',display:'flex',fontSize:p.title.length>60?52:64,fontWeight:600,letterSpacing:'-0.025em',lineHeight:1,padding:'0px 72px',textWrap:'balance'},[p.title]),
      ...(p.description?[div({borderBottom:'2px solid #27272a',color:'#a1a1aa',display:'flex',fontSize:'28px',fontWeight:400,lineHeight:1.25,padding:'32px 72px',textWrap:'balance'},[p.description])]:[])
    ])
  ]);
}

export function shioriTemplate(p: Resolved<ShioriProps>): OgNode {
  return div({backgroundColor:p.background,display:'flex',flexDirection:'column',height:'100%',padding:'60px',position:'relative',width:'100%'},[
    p.logo?image(p.logo,96,96,{borderRadius:'50%',objectFit:'contain'}):div({backgroundImage:'linear-gradient(135deg, #ff7a18, #ffb347)',borderRadius:'50%',height:'96px',width:'96px'}),
    div({bottom:'60px',display:'flex',justifyContent:'space-between',left:'60px',position:'absolute',right:'60px'},[
      div({color:p.brandColor,flex:0.25,fontSize:'64px',fontWeight:600,letterSpacing:'-0.03em',lineHeight:1.3},[p.brand]),
      div({color:p.titleColor,flex:0.6,fontSize:'64px',fontWeight:600,letterSpacing:'-0.03em',lineHeight:1.3},[p.title]),
      div({flex:0.25})
    ])
  ]);
}

export function showcaseTemplate(p: Resolved<ShowcaseProps>): OgNode {
  const bars=[0.4,0.65,0.5,0.8,0.55,0.95,0.7,0.85];
  return div({alignItems:'center',backgroundColor:'#09090b',backgroundImage:'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.2), transparent 55%)',color:'#fafafa',display:'flex',flexDirection:'column',height:'100%',overflow:'hidden',paddingTop:'64px',width:'100%'},[
    div({display:'flex',fontSize:'60px',fontWeight:700,letterSpacing:'-0.03em',textAlign:'center'},[p.title]),
    div({color:'#a1a1aa',display:'flex',fontSize:'28px',marginTop:'14px',maxWidth:'760px',textAlign:'center'},[p.subtitle]),
    div({backgroundColor:'#0a0a0a',border:'1px solid rgba(250,250,250,0.12)',borderRadius:'20px 20px 0 0',boxShadow:'0 -10px 60px rgba(99,102,241,0.25)',display:'flex',flexDirection:'column',height:'360px',marginTop:'48px',width:'1000px'},[
      div({alignItems:'center',borderBottom:'1px solid rgba(250,250,250,0.08)',display:'flex',gap:'10px',padding:'20px 24px'},[
        ...['#ef4444','#f59e0b','#22c55e'].map(c=>div({backgroundColor:c,borderRadius:'999px',height:'14px',width:'14px'})),
        div({backgroundColor:'rgba(250,250,250,0.06)',borderRadius:'8px',color:'#71717a',display:'flex',fontSize:'20px',marginLeft:'20px',padding:'8px 20px'},[p.url])
      ]),
      div({display:'flex',flex:1},[
        div({borderRight:'1px solid rgba(250,250,250,0.08)',display:'flex',flexDirection:'column',gap:'18px',padding:'28px 24px',width:'220px'},[0.9,0.6,0.7,0.5].map((w,i)=>div({backgroundColor:i===0?p.accent:'rgba(250,250,250,0.12)',borderRadius:'8px',height:'20px',width:`${w*100}%`}))),
        div({display:'flex',flex:1,flexDirection:'column',padding:'28px 36px'},[
          div({color:'#71717a',display:'flex',fontSize:'22px'},['Revenue']),
          div({display:'flex',fontSize:'56px',fontWeight:700,letterSpacing:'-0.02em',marginTop:'4px'},['$346,723']),
          div({alignItems:'flex-end',display:'flex',flex:1,gap:'18px',marginTop:'24px'},bars.map((h,i)=>div({backgroundColor:i%2===0?p.accent:'rgba(250,250,250,0.18)',borderRadius:'6px 6px 0 0',display:'flex',flex:1,height:`${h*100}%`})))
        ])
      ])
    ])
  ]);
}

export function statTemplate(p: Resolved<StatProps>): OgNode {
  const arrow=svg({fill:'none',height:26,stroke:'#22c55e','stroke-linecap':'round','stroke-linejoin':'round','stroke-width':3,viewBox:'0 0 24 24',width:26},[path('M7 17 17 7M9 7h8v8')]);
  return div({backgroundColor:'#09090b',backgroundImage:'radial-gradient(circle at 50% 120%, rgba(34,197,94,0.18), transparent 55%)',color:'#fafafa',display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',padding:'96px',position:'relative',width:'100%'},[
    div({color:'#a1a1aa',display:'flex',fontSize:'30px',fontWeight:600,letterSpacing:'0.04em',textTransform:'uppercase'},[p.label]),
    div({alignItems:'flex-end',display:'flex',gap:'28px',marginTop:'20px'},[
      div({display:'flex',fontSize:'200px',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1},[p.value]),
      ...(p.trend?[div({alignItems:'center',backgroundColor:'rgba(34,197,94,0.15)',borderRadius:'999px',color:'#22c55e',display:'flex',fontSize:'34px',fontWeight:700,gap:'10px',marginBottom:'36px',padding:'10px 22px'},[arrow,p.trend])]:[])
    ]),
    div({color:'#d4d4d8',display:'flex',fontSize:'34px',lineHeight:1.4,marginTop:'28px',maxWidth:'820px'},[p.caption]),
    div({alignItems:'center',bottom:'56px',color:'#71717a',display:'flex',fontSize:'26px',fontWeight:600,gap:'12px',position:'absolute'},[imgOr(p.logo,24,24,{borderRadius:'6px',objectFit:'contain'},div({backgroundColor:'#22c55e',borderRadius:'8px',height:'24px',width:'24px'})),p.brand])
  ]);
}

export function terminalTemplate(p: Resolved<TerminalProps>): OgNode {
  return div({backgroundColor:'#0a0a0a',color:'#fafafa',display:'flex',flexDirection:'column',height:'100%',justifyContent:'space-between',padding:'80px',width:'100%'},[
    div({alignItems:'center',display:'flex',gap:'16px'},[imgOr(p.logo,44,44,{borderRadius:'8px',objectFit:'contain'},div({alignItems:'center',backgroundColor:'#22c55e',borderRadius:'8px',color:'#fff',display:'flex',fontSize:'20px',fontWeight:700,height:'44px',justifyContent:'center',width:'44px'})),div({display:'flex',fontSize:'34px',fontWeight:700},[p.brand])]),
    div({display:'flex',flexDirection:'column'},[
      div({display:'flex',fontSize:p.title.length>28?84:104,fontWeight:800,letterSpacing:'-0.02em',lineHeight:1,textTransform:'uppercase'},[p.title]),
      ...(p.caption?[div({alignSelf:'flex-start',backgroundColor:'rgba(250,250,250,0.06)',border:'1px solid rgba(250,250,250,0.12)',borderRadius:'10px',color:'#22c55e',display:'flex',fontSize:'30px',fontWeight:600,marginTop:'36px',padding:'12px 24px'},[p.caption])]:[])
    ])
  ]);
}
