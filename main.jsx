import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Ghost, Heart, Search, MapPin, CalendarDays, MessageCircle,
  Sparkles, Star, ShieldAlert, Crown, Coffee, Gift, BarChart3,
  X, Check, Menu, Moon, Zap, ChevronRight, Send, ArrowLeft,
  CreditCard, Clock3, Users, Skull, Bot
} from "lucide-react";
import "./styles.css";

const ghosts = [
  {id:1,name:"Lady Eleanor",age:326,type:"Victorian Ghost",place:"Abandoned Manor",match:96,emoji:"👻",bio:"Romantic, dramatic, and still waiting for someone to reply since 1699.",tags:["Romantic","Elegant","Dramatic"],rating:4.9},
  {id:2,name:"Greg",age:84,type:"Poltergeist",place:"Apartment 4B",match:89,emoji:"💀",bio:"I throw objects when I get nervous. Looking for someone patient.",tags:["Funny","Chaotic","Loyal"],rating:4.7},
  {id:3,name:"Misty",age:47,type:"Classic Ghost",place:"Old Lighthouse",match:87,emoji:"🌫️",bio:"Professional fog enthusiast. My love language is appearing suddenly.",tags:["Calm","Mysterious","Sweet"],rating:4.8},
  {id:4,name:"Vlad",age:612,type:"Vampire",place:"Castle Nocturne",match:84,emoji:"🧛",bio:"Technically undead. Excellent dinner reservations. Terrible at mornings.",tags:["Night Owl","Luxury","Dramatic"],rating:4.6},
  {id:5,name:"Daisy",age:219,type:"Haunted Doll",place:"Antique Shop",match:82,emoji:"🪆",bio:"Small, spooky, and surprisingly good at conversation.",tags:["Cute","Possessive","Vintage"],rating:4.9},
  {id:6,name:"Rex",age:103,type:"Skeleton",place:"Forgotten Cemetery",match:79,emoji:"☠️",bio:"No skin in the game. Literally.",tags:["Dry Humor","Chill","Honest"],rating:4.5},
  {id:7,name:"Mara",age:901,type:"Witch Spirit",place:"Moonlit Forest",match:77,emoji:"🧙",bio:"I cast spells, make tea, and occasionally curse my exes.",tags:["Magical","Bold","Tea Lover"],rating:4.8},
  {id:8,name:"Shadow",age:1200,type:"Unknown Entity",place:"Somewhere Dark",match:74,emoji:"🖤",bio:"Nobody knows what I am. Including me.",tags:["Mysterious","Quiet","Rare"],rating:4.4},
  {id:9,name:"Boo",age:12,type:"Friendly Ghost",place:"Local School",match:72,emoji:"😇",bio:"New to haunting. Looking for someone to learn the afterlife with.",tags:["Friendly","Playful","New"],rating:4.7},
  {id:10,name:"Morticia",age:488,type:"Gothic Spirit",place:"Black Rose Hotel",match:91,emoji:"🥀",bio:"I like black roses, candlelight and extremely long walks after midnight.",tags:["Goth","Romantic","Luxury"],rating:4.9},
  {id:11,name:"Sir Reginald",age:743,type:"Royal Ghost",place:"Ancient Castle",match:68,emoji:"🎩",bio:"Formerly important. Currently looking for a co-haunter.",tags:["Polite","Royal","Old School"],rating:4.3},
  {id:12,name:"Pixel",age:31,type:"Digital Ghost",place:"The Internet",match:86,emoji:"👾",bio:"I died before I could finish updating my operating system.",tags:["Techy","Funny","Online"],rating:4.8}
];

const prices = [
  {name:"Free Spirit",price:"₹0",period:"forever",features:["5 matches/day","Basic ghost filters","3 messages/day","Cemetery mode"]},
  {name:"Boo+",price:"₹299",period:"/month",featured:true,features:["Unlimited matches","Unlimited haunting","See who liked you","Premium filters","Remove ads"]},
  {name:"Afterlife Premium",price:"₹999",period:"/month",features:["Everything in Boo+","Unlimited Supernatural Likes","Priority haunting","Invisible mode","AI Ghost Wingman"]},
  {name:"IMMORTAL",price:"₹9,999",period:"/month",features:["Everything","CEO of the Afterlife","Private cemetery","Ghost limousine","Lifetime haunting support"]}
];

function App(){
  const [page,setPage]=useState("home");
  const [selected,setSelected]=useState(null);
  const [liked,setLiked]=useState([]);
  const [toast,setToast]=useState("");
  const [menu,setMenu]=useState(false);

  const notify=(msg)=>{setToast(msg);setTimeout(()=>setToast(""),2400)};
  const go=(p)=>{setPage(p);setMenu(false);window.scrollTo({top:0,behavior:"smooth"})};

  return <div className="app">
    <header className="nav">
      <button className="brand" onClick={()=>go("home")}><span className="brand-mark">👻</span><span>Boo<span>Date</span></span></button>
      <nav className={menu?"nav-links open":"nav-links"}>
        {["home","discover","matches","booking","pricing","map","chat"].map((p)=>(
          <button key={p} className={page===p?"active":""} onClick={()=>go(p)}>{p==="home"?"Home":p==="discover"?"Find Ghosts":p==="matches"?"Matches":p==="booking"?"Date Planner":p==="pricing"?"Premium":p==="map"?"Ghost Map":"Chat"}</button>
        ))}
      </nav>
      <div className="nav-actions"><button className="ghost-btn" onClick={()=>go("profile")}>Create Profile</button><button className="menu-btn" onClick={()=>setMenu(!menu)}><Menu/></button></div>
    </header>

    <main>
      {page==="home" && <Home go={go} notify={notify}/>}
      {page==="discover" && <Discover ghosts={ghosts} liked={liked} setLiked={setLiked} setSelected={setSelected} go={go} notify={notify}/>}
      {page==="matches" && <Matches ghosts={ghosts} liked={liked} setSelected={setSelected} go={go}/>}
      {page==="booking" && <Booking notify={notify}/>}
      {page==="pricing" && <Pricing notify={notify}/>}
      {page==="map" && <GhostMap notify={notify}/>}
      {page==="chat" && <Chat ghosts={ghosts} notify={notify}/>}
      {page==="profile" && <Profile notify={notify} go={go}/>}
      {selected && <GhostModal ghost={selected} close={()=>setSelected(null)} notify={notify} go={go}/>}
    </main>

    <footer><div><span className="brand-mini">👻 BooDate</span> — Find the spirit that haunts your heart.</div><div>For entertainment only • All ghosts are fictional</div></footer>
    {toast && <div className="toast"><Check size={17}/>{toast}</div>}
  </div>
}

function Home({go,notify}){
  return <div>
    <section className="hero">
      <div className="stars">✦　·　✧　　·　✦　·　　✧</div>
      <div className="hero-copy">
        <div className="pill"><Sparkles size={15}/> The #1 dating platform for the deceased</div>
        <h1>Tired of dating<br/><span>humans?</span></h1>
        <p className="hero-sub">Date someone who's already dead. Find your perfect afterlife partner, plan a paranormal date, and finally experience a relationship with <b>zero pulse.</b></p>
        <div className="hero-buttons"><button className="primary" onClick={()=>go("discover")}>👻 Find My Ghost <ChevronRight size={18}/></button><button className="secondary" onClick={()=>go("discover")}>Browse the Dead</button></div>
        <div className="hero-proof"><span><b>13,482</b> ghosts online</span><span><b>82,921</b> successful hauntings</span><span><b>0</b> pulse required</span></div>
      </div>
      <div className="hero-ghost"><div className="glow"></div><div className="big-ghost">👻</div><div className="orbit orbit1">❤️</div><div className="orbit orbit2">💀</div><div className="orbit orbit3">🌙</div><div className="match-card"><span>💘</span><div><b>96% Match</b><small>Lady Eleanor</small></div></div></div>
    </section>

    <section className="section">
      <div className="section-head"><div><span className="eyebrow">THE AFTERLIFE DATING EXPERIENCE</span><h2>Everything you need to find <em>the one.</em></h2></div><button className="text-btn" onClick={()=>go("discover")}>Explore ghosts <ChevronRight size={16}/></button></div>
      <div className="feature-grid">
        {[
          ["💘","Smart Matching","Our completely questionable algorithm finds ghosts based on personality, death year and haunting compatibility."],
          ["🪦","Date Booking","Book cemetery walks, haunted mansion dinners and midnight forest dates."],
          ["🔮","Paranormal Map","Enter any location and get a totally scientific ghost population estimate."],
          ["🤖","BooBot AI","Your AI ghost wingman gives dating advice that nobody asked for."]
        ].map(([i,t,d])=><div className="feature" key={t}><div className="feature-icon">{i}</div><h3>{t}</h3><p>{d}</p><button onClick={()=>notify("Feature activated. Probably.")}>Try it <ChevronRight size={15}/></button></div>)}
      </div>
    </section>

    <section className="stats-band"><div><b>13,482</b><span>Ghosts Online</span></div><div><b>96%</b><span>Average Match</span></div><div><b>1,284</b><span>Dates Tonight</span></div><div><b>327</b><span>Accidental Possessions</span></div></section>

    <section className="section center">
      <span className="eyebrow">HOW IT WORKS</span><h2>Four steps to your <em>afterlife</em> romance.</h2>
      <div className="steps">{[["01","Create a profile","Tell us who you were, who you are, and how dramatically you died."],["02","Get matched","Our algorithm calculates your spiritual chemistry."],["03","Start haunting","Chat, send gifts, or dramatically appear in their bedroom."],["04","Book a date","Because even ghosts deserve dinner reservations."]].map(x=><div className="step" key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div>
    </section>
    <section className="cta"><div><span className="eyebrow">YOUR SOULMATE IS WAITING</span><h2>Ready to make a <em>grave</em> connection?</h2><p>Join thousands of ghosts who have stopped haunting alone.</p></div><button className="primary" onClick={()=>go("discover")}>Start Haunting ❤️</button></section>
  </div>
}

function Discover({ghosts,liked,setLiked,setSelected,notify}){
  const [q,setQ]=useState("");
  const [type,setType]=useState("All");
  const filtered=useMemo(()=>ghosts.filter(g=>(g.name+" "+g.type+" "+g.place).toLowerCase().includes(q.toLowerCase())&&(type==="All"||g.type===type)),[q,type]);
  const types=["All",...new Set(ghosts.map(g=>g.type))];
  return <div className="page">
    <div className="page-title"><div><span className="eyebrow">THE DEAD ARE ALIVE</span><h1>Find your ghost.</h1><p>Browse compatible spirits, entities and suspiciously attractive skeletons.</p></div><div className="radar"><span></span> Paranormal radar: <b>ACTIVE</b></div></div>
    <div className="filters"><div className="search"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search ghosts, types or locations..."/></div><select value={type} onChange={e=>setType(e.target.value)}>{types.map(t=><option key={t}>{t}</option>)}</select><button onClick={()=>notify("Advanced filters require a soul subscription.")}>⚙ Filters</button></div>
    <div className="ghost-grid">{filtered.map(g=><GhostCard key={g.id} g={g} liked={liked.includes(g.id)} onLike={()=>{setLiked(l=>l.includes(g.id)?l.filter(x=>x!==g.id):[...l,g.id]);notify(liked.includes(g.id)?"Removed from matches":"Supernatural Like sent 👻")}} onOpen={()=>setSelected(g)}/>)}</div>
  </div>
}

function GhostCard({g,liked,onLike,onOpen}){
  return <article className="ghost-card">
    <div className="ghost-avatar"><span>{g.emoji}</span><div className="online"></div><div className="match">{g.match}% match</div></div>
    <div className="card-body"><div className="card-top"><div><h3>{g.name}</h3><p>{g.age} years dead • {g.type}</p></div><div className="rating"><Star size={14} fill="currentColor"/>{g.rating}</div></div><p className="bio">{g.bio}</p><div className="tags">{g.tags.map(t=><span key={t}>{t}</span>)}</div><div className="location"><MapPin size={14}/>{g.place}</div><div className="card-actions"><button onClick={onOpen}>View Profile</button><button className={liked?"liked like":"like"} onClick={onLike}>{liked?<Heart fill="currentColor"/>:<Heart/>}</button></div></div>
  </article>
}

function Matches({ghosts,liked,setSelected,go}){
  const list=liked.length?ghosts.filter(g=>liked.includes(g.id)):ghosts.slice(0,3);
  return <div className="page"><div className="page-title"><div><span className="eyebrow">YOUR SPIRITUAL CHEMISTRY</span><h1>Matches ❤️</h1><p>{liked.length?`${liked.length} ghosts are in your supernatural shortlist.`:"No likes yet — we've added a few suggestions."}</p></div></div>
  <div className="match-list">{list.map(g=><div className="match-row" key={g.id}><div className="mini-avatar">{g.emoji}</div><div className="match-info"><h3>{g.name}</h3><p>{g.type} • {g.place}</p></div><strong>{g.match}%</strong><button onClick={()=>setSelected(g)}>View</button><button onClick={()=>go("chat")}>Chat</button></div>)}</div></div>
}

function Booking({notify}){
  const [selected,setSelected]=useState(null);
  const dates=[["Cemetery Walk","₹299","60 min","Moonlight, candles & 1 ghost","🪦"],["Haunted Mansion Dinner","₹1,499","2 hrs","Candlelight dinner & ghost waiter","🏚️"],["Midnight Forest Date","₹799","2 hrs","Ghost guide & flashlight","🌲"],["Castle Date","₹4,999","4 hrs","Private castle & romantic fog","🏰"],["Afterlife Luxury","₹99,999","24 hrs","Private cemetery & haunted limousine","🌌"]];
  return <div className="page"><div className="page-title"><div><span className="eyebrow">DATE NIGHT, BUT DEAD</span><h1>Book a ghost date.</h1><p>Choose an experience. We promise at least one paranormal incident.</p></div></div><div className="booking-grid">{dates.map(d=><div className={"date-card "+(selected===d[0]?"selected":"")} key={d[0]} onClick={()=>setSelected(d[0])}><div className="date-icon">{d[4]}</div><h3>{d[0]}</h3><div className="date-price">{d[1]} <small>• {d[2]}</small></div><p>{d[3]}</p><button onClick={()=>{setSelected(d[0]);notify(d[0]+" selected")}}>Choose Date <ChevronRight size={15}/></button></div>)}</div>{selected&&<div className="checkout"><div><span className="eyebrow">DEMO CHECKOUT</span><h2>{selected}</h2><p><CalendarDays size={16}/> 13 October 2026 • 11:59 PM</p><p><Users size={16}/> 2 guests • Ghost: Lady Eleanor</p></div><div className="invoice"><div>Experience <b>{dates.find(x=>x[0]===selected)?.[1]}</b></div><div>Paranormal tax <b>₹66.60</b></div><div>Ghost handling fee <b>₹99</b></div><div>Soul processing fee <b>₹199</b></div><hr/><div className="total">Total <b>₹1,163.60</b></div><button className="primary" onClick={()=>notify("Demo booking confirmed! No actual payment was taken.")}><CreditCard size={17}/> Pay (Demo)</button></div></div>}</div>
}

function Pricing({notify}){
 return <div className="page"><div className="page-title center"><span className="eyebrow">UNNECESSARY PREMIUM FEATURES</span><h1>Choose your afterlife plan.</h1><p>Because apparently haunting people for free wasn't enough.</p></div><div className="pricing-grid">{prices.map(p=><div className={"price-card "+(p.featured?"featured":"")} key={p.name}>{p.featured&&<div className="popular">MOST POPULAR</div>}<div className="price-icon">{p.name==="IMMORTAL"?"👑":p.name==="Afterlife Premium"?"💀":p.name==="Boo+"?"👻":"🌙"}</div><h2>{p.name}</h2><div className="big-price">{p.price}<small>{p.period}</small></div><ul>{p.features.map(f=><li key={f}><Check size={15}/>{f}</li>)}</ul><button className={p.featured?"primary":"secondary"} onClick={()=>notify("Demo plan selected. No charge.")}>Choose Plan</button></div>)}</div></div>
}

function GhostMap({notify}){
 const [location,setLocation]=useState("");
 const [scan,setScan]=useState(false);
 const [result,setResult]=useState(null);
 const doScan=()=>{if(!location){notify("Enter a location first 👻");return}setScan(true);setResult(null);setTimeout(()=>{setScan(false);setResult({total:Math.floor(Math.random()*25)+4,romantic:Math.floor(Math.random()*8)+1,angry:Math.floor(Math.random()*9)+1,lost:Math.floor(Math.random()*7)+1,intensity:Math.floor(Math.random()*35)+60})},1600)};
 return <div className="page"><div className="page-title"><div><span className="eyebrow">100% SCIENTIFIC* PARANORMAL ANALYSIS</span><h1>Ghost Map 🔮</h1><p>*Science department declined to comment.</p></div></div><div className="map-panel"><div className="map-art"><div className="map-grid"></div><div className="pin p1">👻</div><div className="pin p2">💀</div><div className="pin p3">👻</div><div className="map-center">🌍</div></div><div className="scan-box"><h2>Scan a location</h2><p>Paste a Google Maps link or type a location.</p><div className="search"><MapPin size={18}/><input value={location} onChange={e=>setLocation(e.target.value)} placeholder="e.g. abandoned hospital, Kerala..."/></div><button className="primary scan-btn" onClick={doScan}><Zap size={17}/>{scan?"Scanning paranormal frequencies...":"Run Ghost Scan"}</button>{result&&<div className="scan-result"><div className="scan-number">{result.total}<small>ghosts detected</small></div><div className="result-grid"><span>❤️ Romantic <b>{result.romantic}</b></span><span>😡 Angry <b>{result.angry}</b></span><span>🪦 Lost souls <b>{result.lost}</b></span><span>🌫️ Intensity <b>{result.intensity}%</b></span></div><div className="recommend">💘 Recommended date: <b>Midnight Cemetery Walk</b></div></div>}</div></div></div>
}

function Chat({ghosts,notify}){
 const [active,setActive]=useState(ghosts[0]); const [text,setText]=useState(""); const [messages,setMessages]=useState([{from:"them",text:"Hello stranger 👻"},{from:"me",text:"Hey! Are you free tonight?"},{from:"them",text:"Unfortunately I'm booked."},{from:"me",text:"Doing what?"},{from:"them",text:"Haunting Room 302."}]);
 const send=()=>{if(!text.trim())return;setMessages(m=>[...m,{from:"me",text}]);setText("");setTimeout(()=>setMessages(m=>[...m,{from:"them",text:["👻 Boo.","I died waiting for someone to text back.","That is oddly romantic.","Meet me at midnight?"][Math.floor(Math.random()*4)]}]),700)};
 return <div className="page"><div className="page-title"><div><span className="eyebrow">PARANORMAL MESSAGING</span><h1>Ghost Chat 💬</h1></div></div><div className="chat-app"><aside className="chat-side">{ghosts.slice(0,6).map(g=><button className={active.id===g.id?"chat-person active": "chat-person"} onClick={()=>setActive(g)} key={g.id}><span>{g.emoji}</span><div><b>{g.name}</b><small>{g.match}% match</small></div><i></i></button>)}</aside><section className="chat-main"><div className="chat-head"><span>{active.emoji}</span><div><b>{active.name}</b><small>Online • {active.type}</small></div><button onClick={()=>notify("This button has no purpose.")}><ShieldAlert size={18}/></button></div><div className="messages">{messages.map((m,i)=><div key={i} className={"bubble "+m.from}>{m.text}</div>)}</div><div className="quick"><button onClick={()=>setText("👻 Boo!")}>👻 Boo</button><button onClick={()=>setText("I like your ectoplasm.")}>❤️ Compliment</button><button onClick={()=>setText("Wanna haunt together?")}>🪦 Ask out</button></div><div className="composer"><input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type a message..."/><button onClick={send}><Send size={18}/></button></div></section></div></div>
}

function Profile({notify,go}){
 const [name,setName]=useState(""); const [type,setType]=useState("Classic Ghost");
 return <div className="page"><div className="page-title"><div><span className="eyebrow">JOIN THE DEAD</span><h1>Create your ghost profile.</h1><p>It's free. Unless you want to exist.</p></div></div><div className="profile-form"><div className="profile-preview"><div className="preview-ghost">👻</div><h2>{name||"Your Ghost Name"}</h2><p>0 years dead • {type}</p><div className="profile-score">PROFILE COMPLETION <b>42%</b></div></div><div className="form-fields"><label>Ghost Name<input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Casper"/></label><label>Years Since Death<input type="number" placeholder="e.g. 127"/></label><label>Ghost Type<select value={type} onChange={e=>setType(e.target.value)}><option>Classic Ghost</option><option>Poltergeist</option><option>Skeleton</option><option>Vampire</option><option>Witch Spirit</option><option>Haunted Doll</option><option>Unknown Entity</option></select></label><label>Looking For<select><option>Eternal Love</option><option>Casual Haunting</option><option>Cemetery Companion</option><option>Just Bored</option></select></label><label className="full">Bio<textarea placeholder="Tell the afterlife about yourself..."/></label><button className="primary full" onClick={()=>{notify("Profile created! Welcome to the afterlife 👻");go("discover")}}>Publish My Ghost Profile</button></div></div></div>
}

function GhostModal({ghost,close,notify,go}){
 return <div className="modal-backdrop" onClick={close}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={close}><X/></button><div className="modal-avatar">{ghost.emoji}</div><div className="modal-copy"><span className="match-label">{ghost.match}% MATCH</span><h2>{ghost.name}</h2><p>{ghost.age} years dead • {ghost.type}</p><div className="rating"><Star size={15} fill="currentColor"/> {ghost.rating} haunt rating</div><p className="modal-bio">{ghost.bio}</p><div className="tags">{ghost.tags.map(t=><span key={t}>{t}</span>)}</div><div className="modal-actions"><button className="primary" onClick={()=>{notify("Supernatural Like sent ❤️");close()}}><Heart/> Like</button><button className="secondary" onClick={()=>{close();go("chat")}}><MessageCircle/> Message</button></div></div></div></div>
}

createRoot(document.getElementById("root")).render(<App/>);
