import { useState, useEffect, useRef, useCallback } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "✍️", title: "Content Creation", desc: "Engaging posts, graphics & videos crafted by skilled writers, designers and video producers tailored to your brand voice.", color: "#6366f1", features: ["Blog & Social Posts", "Graphic Design", "Video Production", "Brand Storytelling"] },
  { icon: "📊", title: "Social Media Strategy", desc: "Custom data-driven strategies built on deep market research and competitor analysis to hit every business goal.", color: "#8b5cf6", features: ["Market Research", "Competitor Analysis", "Goal-Aligned Planning", "Platform Optimization"] },
  { icon: "📢", title: "Paid Advertising", desc: "High-performance ad campaigns across Meta, Google & LinkedIn with advanced targeting to maximise your ROI.", color: "#ec4899", features: ["Facebook & Instagram Ads", "Google Ads", "Retargeting", "A/B Testing"] },
  { icon: "🤝", title: "Influencer Marketing", desc: "Authentic partnerships with top influencers across industries to expand reach and build lasting brand trust.", color: "#f59e0b", features: ["Influencer Sourcing", "Campaign Management", "ROI Tracking", "Content Collaboration"] },
  { icon: "💬", title: "Community Management", desc: "Active engagement with your followers to foster loyalty, respond to inquiries, and maintain a positive brand image.", color: "#10b981", features: ["24/7 Monitoring", "Crisis Management", "Fan Engagement", "Review Management"] },
  { icon: "📈", title: "Analytics & Reporting", desc: "Detailed performance reports with actionable insights so you always know exactly what your investment delivers.", color: "#3b82f6", features: ["Monthly Reports", "KPI Tracking", "Custom Dashboards", "ROI Analysis"] },
];

const STATS = [
  { num: 200, suffix: "+", label: "Happy Clients" },
  { num: 500, suffix: "+", label: "Projects Done" },
  { num: 6,   suffix: "+", label: "Years Active" },
  { num: 98,  suffix: "%", label: "Satisfaction Rate" },
];

const TESTIMONIALS = [
  { name: "Rahul Sharma",  role: "Owner, RS Fashion",         text: "Abhyutthanam Digital transformed our social media presence completely. Our engagement tripled in just 2 months!",                                              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
  { name: "Priya Verma",   role: "CEO, Verma Enterprises",    text: "The team brought both creativity and strategy. Our ad ROI improved by 185% within the first quarter. Truly remarkable.",                                        img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80" },
  { name: "Amit Gupta",    role: "Founder, TechStart India",  text: "Professional, dedicated and results-focused. They truly understand the Varanasi market while bringing a global perspective.",                                    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80" },
  { name: "Sneha Mishra",  role: "Marketing Head, Mishra Foods", text: "From strategy to execution their team delivers excellence at every step. Our brand awareness skyrocketed within the first campaign.",                        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" },
];

const PORTFOLIO = [
  { title: "Fashion Brand Growth",        category: "Social Media",          result: "+340% Instagram Reach",    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80", tags: ["Instagram","Content","Strategy"] },
  { title: "E-commerce Revenue Boost",    category: "Paid Advertising",      result: "+220% ROAS on Meta Ads",   img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80", tags: ["Facebook Ads","ROI","E-commerce"] },
  { title: "Health Brand Launch",         category: "Influencer Marketing",  result: "1M+ Impressions",          img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80", tags: ["Influencers","Launch","Awareness"] },
  { title: "Restaurant Digital Presence", category: "Community Management",  result: "+500% Engagement Rate",    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", tags: ["Community","Local SEO","Reviews"] },
  { title: "Tech Startup Visibility",     category: "Content Strategy",      result: "3× LinkedIn Followers",    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80", tags: ["LinkedIn","B2B","Content"] },
  { title: "Education Institute Growth",  category: "Full Digital Marketing", result: "+180% Lead Generation",   img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80", tags: ["Leads","Education","Multi-Platform"] },
];

const BLOG_POSTS = [
  { title: "10 Social Media Trends Dominating 2024",      excerpt: "Discover the latest trends shaping social media marketing and how to leverage them for your business.",                    date: "Dec 10, 2024", readTime: "5 min", img: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=500&q=80", category: "Trends" },
  { title: "How to Build a Winning Content Strategy",     excerpt: "A step-by-step guide to creating content that resonates with your audience and drives measurable engagement.",             date: "Dec 5, 2024",  readTime: "7 min", img: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=500&q=80", category: "Strategy" },
  { title: "Maximizing ROI with Meta Ads in 2024",        excerpt: "Advanced targeting techniques and optimisation strategies to get the most out of your Meta advertising budget.",          date: "Nov 28, 2024", readTime: "6 min", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80", category: "Advertising" },
  { title: "Influencer Marketing: Micro vs Macro",        excerpt: "Understanding which type of influencer collaboration delivers better results for your brand and budget.",                  date: "Nov 20, 2024", readTime: "4 min", img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=500&q=80", category: "Influencers" },
  { title: "Analytics That Actually Matter for SMBs",     excerpt: "Cut through the noise and focus on the key metrics that truly drive business decisions and growth.",                       date: "Nov 12, 2024", readTime: "8 min", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80", category: "Analytics" },
  { title: "Community Management Best Practices",         excerpt: "Build and grow thriving online communities that turn followers into loyal brand advocates.",                                date: "Nov 5, 2024",  readTime: "5 min", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80", category: "Community" },
];

const TEAM = [
  { name: "Saurabh Pandey",  role: "CEO & Founder",        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80", bio: "Visionary leader with deep expertise in digital marketing and a passion for innovation that drives business transformation." },
  { name: "Ananya Singh",    role: "Head of Creative",     img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80", bio: "Award-winning creative director specialising in brand storytelling, visual design, and compelling content strategies." },
  { name: "Vikram Rao",      role: "Paid Media Specialist",img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80", bio: "Performance marketing expert delivering exceptional ROI across Meta, Google and LinkedIn ad platforms." },
  { name: "Deepika Tiwari",  role: "Strategy Manager",     img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80", bio: "Data-driven strategist translating complex market insights into actionable campaigns that consistently exceed goals." },
];

const NAV_ITEMS = ["home","about","services","portfolio","blog","contact"];

// ── PARTICLE CANVAS ───────────────────────────────────────────────────────────
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let id;
    const pts = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 65; i++)
      pts.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3, r: Math.random()*1.5+.4, a: Math.random()*.4+.1 });
    const tick = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach((p,i) => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>canvas.width) p.vx*=-1;
        if(p.y<0||p.y>canvas.height) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(139,92,246,${p.a})`; ctx.fill();
        pts.slice(i+1).forEach(q => {
          const d=Math.hypot(p.x-q.x,p.y-q.y);
          if(d<100){ ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.strokeStyle=`rgba(139,92,246,${.08*(1-d/100)})`; ctx.lineWidth=.5; ctx.stroke(); }
        });
      });
      id=requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize",resize); };
  },[]);
  return <canvas ref={ref} style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:.7 }} />;
}

// ── COUNTER ───────────────────────────────────────────────────────────────────
function Counter({ target, suffix }) {
  const [n,setN]=useState(0); const ref=useRef(null);
  useEffect(() => {
    const obs=new IntersectionObserver(([e]) => {
      if(e.isIntersecting){
        let s=0; const step=Math.ceil(target/55);
        const t=setInterval(()=>{ s=Math.min(s+step,target); setN(s); if(s>=target) clearInterval(t); },22);
        obs.disconnect();
      }
    });
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[target]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// ── SHARED STYLES & ATOMS ─────────────────────────────────────────────────────
const G  = { background:"linear-gradient(135deg,#6366f1,#8b5cf6)" };
const GT = { background:"linear-gradient(135deg,#818cf8,#ec4899)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" };

function Tag({children}) {
  return(
    <span style={{ display:"inline-block",background:"rgba(139,92,246,.15)",border:"1px solid rgba(139,92,246,.3)",color:"#a78bfa",padding:".3rem .9rem",borderRadius:999,fontSize:".78rem",textTransform:"uppercase",letterSpacing:".06em",marginBottom:".9rem" }}>
      {children}
    </span>
  );
}
function H2({children}) {
  return <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.5rem)",fontWeight:800,color:"#f1f5f9",lineHeight:1.2,marginBottom:".8rem" }}>{children}</h2>;
}
function SecHead({tag,title,hl,desc}) {
  return(
    <div style={{ textAlign:"center",marginBottom:"3rem" }}>
      <Tag>{tag}</Tag>
      <H2>{title} <span style={GT}>{hl}</span></H2>
      <p style={{ color:"#94a3b8",maxWidth:560,margin:"0 auto",lineHeight:1.7 }}>{desc}</p>
    </div>
  );
}
function BtnP({children,onClick,full=false}) {
  return(
    <button onClick={onClick} style={{ ...G,color:"#fff",border:"none",padding:".8rem 2rem",borderRadius:12,cursor:"pointer",fontSize:".95rem",fontWeight:600,display:"inline-flex",alignItems:"center",gap:".45rem",width:full?"100%":undefined,justifyContent:full?"center":undefined }}>
      {children}
    </button>
  );
}
function BtnO({children,onClick}) {
  return(
    <button onClick={onClick} style={{ background:"transparent",color:"#e2e8f0",border:"1px solid rgba(139,92,246,.4)",padding:".8rem 2rem",borderRadius:12,cursor:"pointer",fontSize:".95rem",fontWeight:600 }}>
      {children}
    </button>
  );
}
function Card({children,style={},glow=false}) {
  return(
    <div style={{ background:glow?"linear-gradient(135deg,rgba(99,102,241,.12),rgba(139,92,246,.12))":"rgba(139,92,246,.06)",border:`1px solid rgba(139,92,246,${glow?.4:.15})`,borderRadius:20,...style }}>
      {children}
    </div>
  );
}
function PageHero({title,hl,sub}) {
  return(
    <div style={{ position:"relative",padding:"9rem 1.5rem 5rem",background:"linear-gradient(135deg,#080810,#100820)",overflow:"hidden",textAlign:"center" }}>
      <Particles />
      <div style={{ position:"relative",zIndex:1 }}>
        <h1 style={{ fontSize:"clamp(2.2rem,5vw,3.5rem)",fontWeight:900,color:"#f1f5f9",marginBottom:".75rem" }}>{title} <span style={GT}>{hl}</span></h1>
        <p style={{ color:"#94a3b8",fontSize:"1.05rem",maxWidth:540,margin:"0 auto",lineHeight:1.75 }}>{sub}</p>
      </div>
    </div>
  );
}
function CTA({nav}) {
  return(
    <section style={{ background:"linear-gradient(135deg,rgba(99,102,241,.12),rgba(139,92,246,.12))",border:"1px solid rgba(139,92,246,.2)",margin:"0 1.5rem 4rem",borderRadius:24,padding:"4rem 1.5rem" }}>
      <div style={{ maxWidth:660,margin:"0 auto",textAlign:"center" }}>
        <H2>Ready to Grow <span style={GT}>Digitally?</span></H2>
        <p style={{ color:"#94a3b8",fontSize:"1rem",lineHeight:1.75,margin:".75rem 0 2rem" }}>Let's build your success story together. Get a free strategy consultation today.</p>
        <BtnP onClick={()=>nav("contact")}>Get Free Consultation →</BtnP>
      </div>
    </section>
  );
}
function PCard({item}) {
  const [h,sH]=useState(false);
  return(
    <div onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)}
      style={{ borderRadius:20,overflow:"hidden",border:"1px solid rgba(139,92,246,.18)",background:"rgba(139,92,246,.055)",transition:"transform .3s",transform:h?"translateY(-8px)":"none",cursor:"pointer" }}>
      <div style={{ position:"relative",overflow:"hidden" }}>
        <img src={item.img} alt={item.title} style={{ width:"100%",height:210,objectFit:"cover",display:"block",transition:"transform .4s",transform:h?"scale(1.06)":"scale(1)" }} />
        <span style={{ position:"absolute",top:12,left:12,...G,color:"#fff",padding:".22rem .7rem",borderRadius:999,fontSize:".72rem",fontWeight:600 }}>{item.category}</span>
      </div>
      <div style={{ padding:"1.25rem" }}>
        <h4 style={{ color:"#f1f5f9",marginBottom:".45rem" }}>{item.title}</h4>
        <p style={{ color:"#10b981",fontSize:".88rem",fontWeight:600,marginBottom:".75rem" }}>{item.result}</p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:".35rem" }}>
          {item.tags.map((t,i)=><span key={i} style={{ background:"rgba(139,92,246,.18)",color:"#a78bfa",padding:".18rem .6rem",borderRadius:999,fontSize:".72rem" }}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function Home({nav}) {
  return(
    <div>
      {/* HERO */}
      <section style={{ position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",background:"linear-gradient(135deg,#080810,#100820)",overflow:"hidden",padding:"0 1.5rem" }}>
        <Particles />
        <div style={{ maxWidth:1180,margin:"0 auto",width:"100%",position:"relative",zIndex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem",alignItems:"center",paddingTop:80 }}>
          <div>
            <div style={{ display:"inline-flex",alignItems:"center",gap:".5rem",background:"rgba(139,92,246,.14)",border:"1px solid rgba(139,92,246,.3)",color:"#a78bfa",padding:".38rem 1rem",borderRadius:999,fontSize:".82rem",marginBottom:"1.4rem" }}>
              ⭐ #1 Digital Agency in Varanasi
            </div>
            <h1 style={{ fontSize:"clamp(2.4rem,5vw,3.8rem)",fontWeight:900,lineHeight:1.1,color:"#f1f5f9",marginBottom:"1.4rem" }}>
              Elevate Your Brand<br /><span style={GT}>in the Digital World</span>
            </h1>
            <p style={{ color:"#94a3b8",fontSize:"1.05rem",lineHeight:1.75,marginBottom:"2rem",maxWidth:480 }}>
              Abhyutthanam Digital crafts data-driven social media strategies that transform your online presence and accelerate real business growth.
            </p>
            <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"2.5rem" }}>
              <BtnP onClick={()=>nav("services")}>Explore Services →</BtnP>
              <BtnO onClick={()=>nav("about")}>Our Story</BtnO>
            </div>
            <div style={{ display:"flex",gap:"1.8rem",flexWrap:"wrap" }}>
              {STATS.map((st,i)=>(
                <div key={i} style={{ textAlign:"center" }}>
                  <div style={{ ...GT,fontSize:"1.9rem",fontWeight:800 }}><Counter target={st.num} suffix={st.suffix} /></div>
                  <div style={{ color:"#64748b",fontSize:".78rem" }}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Hero Visual */}
          <div style={{ display:"flex",justifyContent:"center",alignItems:"center" }}>
            <div style={{ position:"relative",width:300,height:300 }}>
              <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",...G,width:88,height:88,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.2rem",boxShadow:"0 0 70px rgba(139,92,246,.7)",zIndex:2 }}>🚀</div>
              <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:256,height:256,border:"1px dashed rgba(139,92,246,.28)",borderRadius:"50%" }} />
              {["📘","📸","▶️","💼","🐦"].map((ic,i)=>{
                const a=(i*72-90)*Math.PI/180, x=Math.cos(a)*128+150-22, y=Math.sin(a)*128+150-22;
                return <div key={i} style={{ position:"absolute",left:x,top:y,background:"rgba(139,92,246,.2)",border:"1px solid rgba(139,92,246,.4)",width:44,height:44,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem" }}>{ic}</div>;
              })}
              <div style={{ position:"absolute",top:-14,right:-46,background:"rgba(12,10,28,.95)",border:"1px solid rgba(139,92,246,.35)",backdropFilter:"blur(16px)",padding:".7rem 1rem",borderRadius:12,display:"flex",gap:".65rem",alignItems:"center",zIndex:3,boxShadow:"0 8px 30px rgba(0,0,0,.5)" }}>
                <span style={{ fontSize:"1.4rem" }}>📸</span>
                <div><div style={{ fontWeight:700,fontSize:".82rem",color:"#f1f5f9" }}>Instagram</div><div style={{ color:"#10b981",fontSize:".72rem" }}>+340% Reach</div></div>
              </div>
              <div style={{ position:"absolute",bottom:30,left:-52,background:"rgba(12,10,28,.95)",border:"1px solid rgba(139,92,246,.35)",backdropFilter:"blur(16px)",padding:".7rem 1rem",borderRadius:12,display:"flex",gap:".65rem",alignItems:"center",zIndex:3,boxShadow:"0 8px 30px rgba(0,0,0,.5)" }}>
                <span style={{ fontSize:"1.4rem" }}>📈</span>
                <div><div style={{ fontWeight:700,fontSize:".82rem",color:"#f1f5f9" }}>ROI Growth</div><div style={{ color:"#10b981",fontSize:".72rem" }}>+185% Average</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding:"5rem 1.5rem",maxWidth:1180,margin:"0 auto" }}>
        <SecHead tag="What We Offer" title="Our Core" hl="Services" desc="Comprehensive digital marketing solutions crafted to deliver measurable results for your business." />
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.4rem" }}>
          {SERVICES.map((sv,i)=>(
            <Card key={i} style={{ padding:"1.75rem",cursor:"pointer",transition:"transform .3s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-7px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="none"}>
              <div style={{ width:52,height:52,borderRadius:14,background:sv.color+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",marginBottom:"1.1rem" }}>{sv.icon}</div>
              <h3 style={{ color:"#f1f5f9",fontSize:"1.05rem",fontWeight:700,marginBottom:".6rem" }}>{sv.title}</h3>
              <p style={{ color:"#94a3b8",fontSize:".88rem",lineHeight:1.65,marginBottom:"1rem" }}>{sv.desc}</p>
              <span onClick={()=>nav("services")} style={{ color:sv.color,fontSize:".88rem",fontWeight:600,cursor:"pointer" }}>Learn More →</span>
            </Card>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section style={{ background:"linear-gradient(135deg,#0c0c1a,#130828)",padding:"5rem 1.5rem" }}>
        <div style={{ maxWidth:1180,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center" }}>
          <div style={{ position:"relative" }}>
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" alt="team" style={{ width:"100%",borderRadius:20,objectFit:"cover",maxHeight:440 }} />
            <div style={{ position:"absolute",bottom:24,right:-16,...G,borderRadius:16,padding:"1rem 1.4rem",textAlign:"center",color:"#fff",display:"flex",flexDirection:"column",gap:".15rem",boxShadow:"0 8px 32px rgba(99,102,241,.5)" }}>
              <strong style={{ fontSize:"2rem" }}>6+</strong>
              <span style={{ fontSize:".78rem",opacity:.9 }}>Years of Excellence</span>
            </div>
          </div>
          <div>
            <Tag>Why Choose Us</Tag>
            <H2>We Drive Results,<br /><span style={GT}>Not Just Traffic</span></H2>
            <p style={{ color:"#94a3b8",lineHeight:1.75,marginBottom:"1.75rem" }}>Every strategy is built on data, creativity, and deep market understanding — tailored specifically to your brand.</p>
            {[
              { icon:"🚀", title:"Innovative Strategies",   desc:"Cutting-edge marketing tactics keeping you ahead of competition." },
              { icon:"👥", title:"Expert Team",             desc:"Passionate professionals with deep digital marketing expertise." },
              { icon:"📊", title:"Measurable ROI",          desc:"Transparent reporting so you always know your investment returns." },
              { icon:"🌏", title:"Local Insight, Global Reach", desc:"Varanasi roots with strategies built for national & global audiences." },
            ].map((f,i)=>(
              <div key={i} style={{ display:"flex",gap:".9rem",marginBottom:"1.25rem",alignItems:"flex-start" }}>
                <div style={{ background:"rgba(139,92,246,.18)",width:44,height:44,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",flexShrink:0 }}>{f.icon}</div>
                <div>
                  <h4 style={{ color:"#f1f5f9",marginBottom:".2rem",fontSize:".95rem" }}>{f.title}</h4>
                  <p style={{ color:"#94a3b8",fontSize:".85rem" }}>{f.desc}</p>
                </div>
              </div>
            ))}
            <BtnP onClick={()=>nav("about")}>Discover Our Story →</BtnP>
          </div>
        </div>
      </section>

      {/* PORTFOLIO TEASER */}
      <section style={{ padding:"5rem 1.5rem",maxWidth:1180,margin:"0 auto" }}>
        <SecHead tag="Our Work" title="Recent" hl="Success Stories" desc="Real campaigns. Real results. See how we've transformed brands online." />
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.75rem" }}>
          {PORTFOLIO.slice(0,3).map((p,i)=><PCard key={i} item={p} />)}
        </div>
        <div style={{ textAlign:"center",marginTop:"2rem" }}>
          <BtnP onClick={()=>nav("portfolio")}>View All Projects →</BtnP>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background:"linear-gradient(135deg,#0c0c1a,#130828)",padding:"5rem 1.5rem" }}>
        <div style={{ maxWidth:1180,margin:"0 auto" }}>
          <SecHead tag="Client Voices" title="What Our" hl="Clients Say" desc="Trusted by businesses across Varanasi and all of India." />
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"1.4rem" }}>
            {TESTIMONIALS.map((t,i)=>(
              <Card key={i} glow={i===1} style={{ padding:"1.75rem" }}>
                <div style={{ color:"#f59e0b",fontSize:"1.1rem",marginBottom:".9rem" }}>★★★★★</div>
                <p style={{ color:"#cbd5e1",lineHeight:1.75,fontStyle:"italic",marginBottom:"1.5rem" }}>"{t.text}"</p>
                <div style={{ display:"flex",alignItems:"center",gap:".75rem" }}>
                  <img src={t.img} alt={t.name} style={{ width:46,height:46,borderRadius:"50%",objectFit:"cover" }} />
                  <div>
                    <div style={{ fontWeight:700,color:"#f1f5f9",fontSize:".9rem" }}>{t.name}</div>
                    <div style={{ fontSize:".78rem",color:"#94a3b8" }}>{t.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <CTA nav={nav} />
    </div>
  );
}

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
function About({nav}) {
  return(
    <div>
      <PageHero title="About" hl="Abhyutthanam Digital" sub="Our story, mission, and the passionate team behind your digital success." />

      <section style={{ padding:"5rem 1.5rem",maxWidth:1180,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center" }}>
          <div style={{ position:"relative" }}>
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" alt="Varanasi" style={{ width:"100%",borderRadius:20,objectFit:"cover" }} />
          </div>
          <div>
            <Tag>Our Story</Tag>
            <H2>Born in Varanasi,<br /><span style={GT}>Built for the World</span></H2>
            <p style={{ color:"#94a3b8",lineHeight:1.8,marginBottom:"1rem" }}>Founded in 2018 with a vision to revolutionise the digital marketing landscape, Abhyutthanam Digital combines Varanasi's local wisdom with cutting-edge global strategies.</p>
            <p style={{ color:"#94a3b8",lineHeight:1.8,marginBottom:"1.75rem" }}>Under CEO Saurabh Pandey's leadership, we've grown into a full-service agency trusted by 200+ businesses across India.</p>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:".9rem" }}>
              {STATS.map((st,i)=>(
                <Card key={i} style={{ padding:"1rem",textAlign:"center" }}>
                  <div style={{ ...GT,fontSize:"1.8rem",fontWeight:800 }}><Counter target={st.num} suffix={st.suffix} /></div>
                  <div style={{ color:"#94a3b8",fontSize:".8rem",marginTop:".2rem" }}>{st.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background:"linear-gradient(135deg,#0c0c1a,#130828)",padding:"5rem 1.5rem" }}>
        <div style={{ maxWidth:1180,margin:"0 auto" }}>
          <SecHead tag="Our Purpose" title="Mission &" hl="Vision" desc="The core principles that guide every strategy we build." />
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.75rem" }}>
            {[
              { icon:"🎯", title:"Our Mission", color:"#6366f1", text:"To empower businesses by enhancing their online presence through innovative, data-driven strategies that deliver measurable results." },
              { icon:"🔭", title:"Our Vision",  color:"#8b5cf6", text:"To be the go-to digital marketing partner for businesses of all sizes, delivering innovative solutions and driving sustainable growth." },
              { icon:"💡", title:"Our Approach",color:"#ec4899", text:"A strategic and data-driven process where every decision is backed by research and every strategy aligns with your unique business objectives." },
            ].map((mv,i)=>(
              <Card key={i} style={{ padding:"2rem",textAlign:"center" }}>
                <div style={{ fontSize:"2.8rem",marginBottom:".9rem" }}>{mv.icon}</div>
                <h3 style={{ color:mv.color,marginBottom:".75rem",fontSize:"1.2rem" }}>{mv.title}</h3>
                <p style={{ color:"#94a3b8",lineHeight:1.7,fontSize:".9rem" }}>{mv.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:"5rem 1.5rem",maxWidth:1180,margin:"0 auto" }}>
        <SecHead tag="What We Stand For" title="Our Core" hl="Values" desc="The principles that define how we work and who we are." />
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1.4rem" }}>
          {[
            { icon:"💫", color:"#6366f1", title:"Innovation",   desc:"Always seeking new and creative solutions to stay ahead." },
            { icon:"🤝", color:"#8b5cf6", title:"Integrity",    desc:"Maintaining transparency and honesty in all our dealings." },
            { icon:"🏆", color:"#ec4899", title:"Excellence",   desc:"Striving for the highest quality in every project." },
            { icon:"🌱", color:"#10b981", title:"Collaboration",desc:"Working together with clients to achieve shared goals." },
          ].map((v,i)=>(
            <Card key={i} style={{ padding:"1.75rem",textAlign:"center" }}>
              <div style={{ fontSize:"2.4rem",marginBottom:".75rem" }}>{v.icon}</div>
              <h3 style={{ color:v.color,marginBottom:".5rem" }}>{v.title}</h3>
              <p style={{ color:"#94a3b8",fontSize:".85rem",lineHeight:1.6 }}>{v.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ background:"linear-gradient(135deg,#0c0c1a,#130828)",padding:"5rem 1.5rem" }}>
        <div style={{ maxWidth:1180,margin:"0 auto" }}>
          <SecHead tag="The People" title="Meet Our" hl="Team" desc="Passionate professionals dedicated to your digital success." />
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"2rem" }}>
            {TEAM.map((m,i)=>(
              <Card key={i} style={{ overflow:"hidden" }}>
                <div style={{ position:"relative" }}>
                  <img src={m.img} alt={m.name} style={{ width:"100%",height:240,objectFit:"cover",display:"block" }} />
                  <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"55%",background:"linear-gradient(transparent,rgba(8,8,16,.9))" }} />
                </div>
                <div style={{ padding:"1.4rem" }}>
                  <h3 style={{ color:"#f1f5f9",fontWeight:700,marginBottom:".2rem" }}>{m.name}</h3>
                  <div style={{ color:"#8b5cf6",fontSize:".82rem",marginBottom:".7rem" }}>{m.role}</div>
                  <p style={{ color:"#94a3b8",fontSize:".83rem",lineHeight:1.6 }}>{m.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <CTA nav={nav} />
    </div>
  );
}

// ── SERVICES PAGE ─────────────────────────────────────────────────────────────
function Services({nav}) {
  return(
    <div>
      <PageHero title="Our" hl="Services" sub="Comprehensive digital marketing solutions built to transform your online presence and drive real growth." />

      <section style={{ padding:"5rem 1.5rem",maxWidth:1180,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"2rem" }}>
          {SERVICES.map((sv,i)=>(
            <Card key={i} style={{ padding:"2rem",transition:"transform .3s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-6px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="none"}>
              <div style={{ width:62,height:62,borderRadius:16,background:sv.color+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.8rem",marginBottom:"1.1rem" }}>{sv.icon}</div>
              <h3 style={{ color:"#f1f5f9",fontSize:"1.2rem",marginBottom:".7rem" }}>{sv.title}</h3>
              <p style={{ color:"#94a3b8",lineHeight:1.7,marginBottom:"1.4rem" }}>{sv.desc}</p>
              <div style={{ borderTop:"1px solid rgba(139,92,246,.18)",paddingTop:"1.1rem" }}>
                <div style={{ color:"#64748b",fontSize:".74rem",textTransform:"uppercase",letterSpacing:".06em",marginBottom:".7rem" }}>Included</div>
                {sv.features.map((f,j)=>(
                  <div key={j} style={{ display:"flex",gap:".5rem",color:"#cbd5e1",fontSize:".88rem",marginBottom:".35rem" }}>
                    <span style={{ color:sv.color }}>✓</span>{f}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ background:"linear-gradient(135deg,#0c0c1a,#130828)",padding:"5rem 1.5rem" }}>
        <div style={{ maxWidth:1180,margin:"0 auto" }}>
          <SecHead tag="How We Work" title="Our Proven" hl="Process" desc="A systematic approach that ensures consistent, measurable results for every client." />
          <div style={{ display:"flex",flexWrap:"wrap",gap:"1.25rem",justifyContent:"center" }}>
            {[
              { n:"01",title:"Discovery", desc:"Deep-dive into your brand, goals, audience, and competition.", icon:"🔍" },
              { n:"02",title:"Strategy",  desc:"Build a data-backed custom plan tailored to your objectives.", icon:"📋" },
              { n:"03",title:"Creation",  desc:"Our creative team brings the strategy to life with content.",  icon:"✨" },
              { n:"04",title:"Launch",    desc:"Deploy campaigns with precision timing and advanced targeting.",icon:"🚀" },
              { n:"05",title:"Optimise",  desc:"Continuous monitoring and A/B testing for peak performance.", icon:"⚙️" },
              { n:"06",title:"Report",    desc:"Detailed performance reports with insights and next steps.",   icon:"📊" },
            ].map((p,i)=>(
              <div key={i} style={{ background:"rgba(139,92,246,.08)",border:"1px solid rgba(139,92,246,.2)",borderRadius:18,padding:"1.5rem",width:185,textAlign:"center" }}>
                <div style={{ fontSize:"1.9rem",marginBottom:".45rem" }}>{p.icon}</div>
                <div style={{ color:"#8b5cf6",fontWeight:800,fontSize:"1.4rem",marginBottom:".2rem" }}>{p.n}</div>
                <h4 style={{ color:"#f1f5f9",marginBottom:".5rem",fontSize:".95rem" }}>{p.title}</h4>
                <p style={{ color:"#94a3b8",fontSize:".78rem",lineHeight:1.55 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA nav={nav} />
    </div>
  );
}

// ── PORTFOLIO PAGE ────────────────────────────────────────────────────────────
function Portfolio({nav}) {
  const [filter,setFilter]=useState("All");
  const cats=["All","Social Media","Paid Advertising","Influencer Marketing","Community Management","Content Strategy","Full Digital Marketing"];
  const filtered=filter==="All"?PORTFOLIO:PORTFOLIO.filter(p=>p.category===filter);
  return(
    <div>
      <PageHero title="Our" hl="Portfolio" sub="Real campaigns. Real brands. Real results. See how we've driven digital transformation." />
      <section style={{ padding:"5rem 1.5rem",maxWidth:1180,margin:"0 auto" }}>
        <div style={{ display:"flex",flexWrap:"wrap",gap:".65rem",justifyContent:"center",marginBottom:"2.5rem" }}>
          {cats.map((c,i)=>(
            <button key={i} onClick={()=>setFilter(c)} style={{ padding:".45rem 1.1rem",borderRadius:999,border:"1px solid rgba(139,92,246,.35)",background:filter===c?"linear-gradient(135deg,#6366f1,#8b5cf6)":"transparent",color:filter===c?"#fff":"#94a3b8",cursor:"pointer",fontSize:".82rem",fontWeight:filter===c?600:400 }}>{c}</button>
          ))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"2rem" }}>
          {filtered.map((p,i)=><PCard key={i} item={p} />)}
        </div>
      </section>
      <CTA nav={nav} />
    </div>
  );
}

// ── BLOG PAGE ─────────────────────────────────────────────────────────────────
function Blog({nav}) {
  return(
    <div>
      <PageHero title="Insights &" hl="Blog" sub="Stay updated with the latest digital marketing trends, strategies and expert insights." />
      <section style={{ padding:"5rem 1.5rem",maxWidth:1180,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:"2rem" }}>
          {BLOG_POSTS.map((post,i)=>(
            <div key={i} style={{ border:"1px solid rgba(139,92,246,.16)",borderRadius:20,overflow:"hidden",background:"rgba(139,92,246,.045)",transition:"transform .3s",cursor:"pointer" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-6px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="none"}>
              <div style={{ position:"relative",overflow:"hidden" }}>
                <img src={post.img} alt={post.title} style={{ width:"100%",height:200,objectFit:"cover",display:"block" }} />
                <span style={{ position:"absolute",top:12,left:12,...G,color:"#fff",padding:".22rem .7rem",borderRadius:999,fontSize:".72rem",fontWeight:600 }}>{post.category}</span>
              </div>
              <div style={{ padding:"1.5rem" }}>
                <div style={{ display:"flex",gap:"1rem",color:"#475569",fontSize:".78rem",marginBottom:".7rem" }}>
                  <span>📅 {post.date}</span><span>⏱ {post.readTime}</span>
                </div>
                <h3 style={{ color:"#f1f5f9",fontSize:"1.05rem",marginBottom:".7rem",lineHeight:1.45 }}>{post.title}</h3>
                <p style={{ color:"#94a3b8",fontSize:".88rem",lineHeight:1.65,marginBottom:"1rem" }}>{post.excerpt}</p>
                <span style={{ color:"#8b5cf6",fontSize:".88rem",fontWeight:600 }}>Read More →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTA nav={nav} />
    </div>
  );
}

// ── CONTACT PAGE ──────────────────────────────────────────────────────────────
function Contact() {
  const [form,setForm]=useState({ name:"",email:"",phone:"",service:"",message:"" });
  const [sent,setSent]=useState(false);
  const upd = k => e => setForm(f=>({...f,[k]:e.target.value}));
  const submit = () => { setSent(true); setTimeout(()=>{setSent(false);setForm({name:"",email:"",phone:"",service:"",message:""})},4000); };
  const inp = { width:"100%",background:"rgba(139,92,246,.08)",border:"1px solid rgba(139,92,246,.22)",borderRadius:10,padding:".75rem 1rem",color:"#f1f5f9",fontSize:".9rem",marginBottom:"1rem",outline:"none",boxSizing:"border-box",fontFamily:"inherit" };
  return(
    <div>
      <PageHero title="Get In" hl="Touch" sub="Ready to transform your digital presence? Let's build your success story together." />
      <section style={{ padding:"5rem 1.5rem",maxWidth:1060,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem" }}>
          <div>
            <Tag>Contact Info</Tag>
            <H2>Let's Start a <span style={GT}>Conversation</span></H2>
            <p style={{ color:"#94a3b8",lineHeight:1.75,marginBottom:"2rem" }}>Whether you're a startup or an established brand — we're here to help you grow digitally.</p>
            {[
              { icon:"📍",title:"Visit Us", val:"Varanasi, Uttar Pradesh, India" },
              { icon:"📧",title:"Email",    val:"info@abhyutthanam.com" },
              { icon:"📞",title:"Call Us",  val:"+91 98765 43210" },
              { icon:"🕒",title:"Hours",    val:"Mon–Sat: 9AM – 7PM" },
            ].map((c,i)=>(
              <div key={i} style={{ display:"flex",gap:".9rem",marginBottom:"1.4rem",alignItems:"flex-start" }}>
                <div style={{ background:"rgba(139,92,246,.16)",width:46,height:46,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.25rem",flexShrink:0 }}>{c.icon}</div>
                <div>
                  <div style={{ color:"#f1f5f9",fontWeight:600,marginBottom:".18rem" }}>{c.title}</div>
                  <div style={{ color:"#94a3b8",fontSize:".88rem" }}>{c.val}</div>
                </div>
              </div>
            ))}
            <div style={{ display:"flex",gap:".6rem",marginTop:"1.5rem" }}>
              {["📘","📸","🐦","💼","▶️"].map((ic,i)=>(
                <div key={i} style={{ width:38,height:38,background:"rgba(139,92,246,.15)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"1.1rem" }}>{ic}</div>
              ))}
            </div>
          </div>
          <Card style={{ padding:"2rem" }}>
            {sent?(
              <div style={{ textAlign:"center",padding:"3.5rem 0" }}>
                <div style={{ fontSize:"4rem",marginBottom:"1rem" }}>✅</div>
                <h3 style={{ color:"#f1f5f9",marginBottom:".5rem" }}>Message Sent!</h3>
                <p style={{ color:"#94a3b8" }}>We'll get back to you within 24 hours.</p>
              </div>
            ):(
              <div>
                <h3 style={{ color:"#f1f5f9",marginBottom:"1.5rem",fontSize:"1.2rem" }}>Send Us a Message</h3>
                <input placeholder="Full Name" value={form.name} onChange={upd("name")} style={inp} />
                <input placeholder="Email Address" type="email" value={form.email} onChange={upd("email")} style={inp} />
                <input placeholder="Phone Number" type="tel" value={form.phone} onChange={upd("phone")} style={inp} />
                <select value={form.service} onChange={upd("service")} style={{ ...inp,background:"rgba(139,92,246,.1)" }}>
                  <option value="">Select Service</option>
                  {SERVICES.map((sv,i)=><option key={i} value={sv.title}>{sv.title}</option>)}
                </select>
                <textarea placeholder="Tell us about your project..." value={form.message} onChange={upd("message")} style={{ ...inp,height:110,resize:"vertical" }} />
                <BtnP onClick={submit} full>Send Message →</BtnP>
              </div>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({nav}) {
  return(
    <footer style={{ background:"#040408",borderTop:"1px solid rgba(139,92,246,.14)",padding:"4rem 1.5rem 1.75rem" }}>
      <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1.5fr",gap:"2.5rem",maxWidth:1180,margin:"0 auto 2.5rem" }}>
        <div>
          <div onClick={()=>nav("home")} style={{ display:"flex",alignItems:"center",gap:".7rem",cursor:"pointer",marginBottom:".9rem" }}>
            <div style={{ ...G,width:36,height:36,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem" }}>🚀</div>
            <div>
              <span style={{ display:"block",fontSize:".98rem",fontWeight:800,color:"#f1f5f9" }}>Abhyutthanam</span>
              <span style={{ display:"block",fontSize:".65rem",color:"#8b5cf6",letterSpacing:".12em",textTransform:"uppercase" }}>Digital</span>
            </div>
          </div>
          <p style={{ color:"#475569",lineHeight:1.7,fontSize:".86rem",maxWidth:270,marginBottom:"1.25rem" }}>Empowering businesses through innovative digital marketing strategies since 2018.</p>
          <div style={{ display:"flex",gap:".55rem" }}>
            {["📘","📸","🐦","💼","▶️"].map((ic,i)=>(
              <div key={i} style={{ width:34,height:34,background:"rgba(139,92,246,.14)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:".95rem" }}>{ic}</div>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ color:"#f1f5f9",marginBottom:"1.1rem",fontSize:".95rem" }}>Quick Links</h4>
          {NAV_ITEMS.map((item,i)=>(
            <div key={i} onClick={()=>nav(item)} style={{ color:"#64748b",fontSize:".86rem",marginBottom:".55rem",cursor:"pointer",textTransform:"capitalize" }}>{item}</div>
          ))}
        </div>
        <div>
          <h4 style={{ color:"#f1f5f9",marginBottom:"1.1rem",fontSize:".95rem" }}>Services</h4>
          {SERVICES.map((sv,i)=>(
            <div key={i} onClick={()=>nav("services")} style={{ color:"#64748b",fontSize:".83rem",marginBottom:".5rem",cursor:"pointer" }}>{sv.title}</div>
          ))}
        </div>
        <div>
          <h4 style={{ color:"#f1f5f9",marginBottom:"1.1rem",fontSize:".95rem" }}>Contact</h4>
          {[{ic:"📍",v:"Varanasi, Uttar Pradesh, India"},{ic:"📧",v:"info@abhyutthanam.com"},{ic:"📞",v:"+91 98765 43210"}].map((c,i)=>(
            <div key={i} style={{ display:"flex",gap:".6rem",marginBottom:".65rem" }}>
              <span>{c.ic}</span><span style={{ color:"#64748b",fontSize:".83rem" }}>{c.v}</span>
            </div>
          ))}
          <div style={{ marginTop:"1rem" }}>
            <div style={{ color:"#475569",fontSize:".78rem",marginBottom:".45rem" }}>Subscribe to Newsletter</div>
            <div style={{ display:"flex",gap:".5rem" }}>
              <input type="email" placeholder="Your email" style={{ flex:1,background:"rgba(139,92,246,.09)",border:"1px solid rgba(139,92,246,.2)",borderRadius:8,padding:".5rem .75rem",color:"#f1f5f9",fontSize:".8rem",outline:"none" }} />
              <button style={{ ...G,border:"none",borderRadius:8,padding:".5rem .8rem",color:"#fff",cursor:"pointer",fontWeight:700 }}>→</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:1180,margin:"0 auto",paddingTop:"1.5rem",borderTop:"1px solid rgba(139,92,246,.1)",textAlign:"center",color:"#374151",fontSize:".82rem" }}>
        © 2024 Abhyutthanam Digital. All rights reserved. | Founded by CEO <span style={{ color:"#8b5cf6" }}>Saurabh Pandey</span> · Varanasi, UP
      </div>
    </footer>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page,setPage]=useState("home");
  const [scrolled,setScrolled]=useState(false);
  const [menu,setMenu]=useState(false);
  const nav=useCallback(p=>{ setPage(p); setMenu(false); window.scrollTo({top:0,behavior:"smooth"}); },[]);

  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>20);
    window.addEventListener("scroll",h);
    return ()=>window.removeEventListener("scroll",h);
  },[]);

  return(
    <div style={{ background:"#080810",color:"#f1f5f9",fontFamily:"'Inter',system-ui,sans-serif",minHeight:"100vh" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#080810}
        ::-webkit-scrollbar-thumb{background:#6366f1;border-radius:3px}
        button{transition:opacity .2s,transform .15s;font-family:inherit}
        button:hover{opacity:.86}
        input,select,textarea{font-family:inherit}
        @media(max-width:768px){
          .grid2{grid-template-columns:1fr!important}
          .deskonly{display:none!important}
          .mobonly{display:flex!important}
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:1000,padding:"0 1.5rem",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid rgba(139,92,246,.14)",background:scrolled?"rgba(8,8,16,.96)":"transparent",transition:"background .3s" }}>
        <div onClick={()=>nav("home")} style={{ display:"flex",alignItems:"center",gap:".7rem",cursor:"pointer" }}>
          <div style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)",width:36,height:36,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem" }}>🚀</div>
          <div>
            <span style={{ display:"block",fontSize:"1rem",fontWeight:800,color:"#f1f5f9" }}>Abhyutthanam</span>
            <span style={{ display:"block",fontSize:".62rem",color:"#8b5cf6",letterSpacing:".14em",textTransform:"uppercase" }}>Digital</span>
          </div>
        </div>
        <div className="deskonly" style={{ display:"flex",gap:".15rem" }}>
          {NAV_ITEMS.map((item,i)=>(
            <span key={i} onClick={()=>nav(item)} style={{ color:page===item?"#f1f5f9":"#94a3b8",background:page===item?"rgba(139,92,246,.18)":"transparent",padding:".45rem .85rem",borderRadius:9,fontSize:".88rem",cursor:"pointer",textTransform:"capitalize",fontWeight:page===item?600:400 }}>{item}</span>
          ))}
        </div>
        <button className="deskonly" onClick={()=>nav("contact")} style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",padding:".5rem 1.25rem",borderRadius:999,cursor:"pointer",fontSize:".88rem",fontWeight:600 }}>
          Get Started
        </button>
        <button className="mobonly" onClick={()=>setMenu(!menu)} style={{ display:"none",background:"none",border:"none",color:"#f1f5f9",fontSize:"1.5rem",cursor:"pointer" }}>☰</button>
      </nav>

      {/* MOBILE MENU */}
      {menu&&(
        <div style={{ position:"fixed",inset:0,zIndex:999,background:"rgba(8,8,16,.97)",backdropFilter:"blur(20px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1.5rem" }}>
          <button onClick={()=>setMenu(false)} style={{ position:"absolute",top:20,right:20,background:"none",border:"none",color:"#f1f5f9",fontSize:"2rem",cursor:"pointer" }}>✕</button>
          {NAV_ITEMS.map((item,i)=>(
            <span key={i} onClick={()=>nav(item)} style={{ color:"#f1f5f9",fontSize:"1.6rem",fontWeight:700,cursor:"pointer",textTransform:"capitalize" }}>{item}</span>
          ))}
          <button onClick={()=>nav("contact")} style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",padding:".9rem 2.5rem",borderRadius:12,cursor:"pointer",fontSize:"1.1rem",fontWeight:600 }}>Get Started</button>
        </div>
      )}

      {/* PAGES */}
      <main>
        {page==="home"      && <Home      nav={nav} />}
        {page==="about"     && <About     nav={nav} />}
        {page==="services"  && <Services  nav={nav} />}
        {page==="portfolio" && <Portfolio nav={nav} />}
        {page==="blog"      && <Blog      nav={nav} />}
        {page==="contact"   && <Contact />}
      </main>

      <Footer nav={nav} />
    </div>
  );
}