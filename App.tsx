
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Instagram, Phone, MapPin, Clock, ArrowRight, Settings, 
  ChevronRight, User, Wine, Layout as LayoutIcon, FileText, 
  BarChart3, Mail, Plus, Trash2, Eye, EyeOff, Palette, Save,
  Layers
} from 'lucide-react';
import { SiteData, Post, Wine as WineType, Subscriber, Service } from './types';
import { INITIAL_SITE_DATA } from './constants';

// --- Context & State Management ---
const SiteContext = createContext<{
  data: SiteData;
  updateData: (newData: SiteData) => void;
}>({
  data: INITIAL_SITE_DATA,
  updateData: () => {},
});

const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(() => {
    const saved = localStorage.getItem('death_ave_cms_data');
    return saved ? JSON.parse(saved) : INITIAL_SITE_DATA;
  });

  const updateData = (newData: SiteData) => {
    setData(newData);
    localStorage.setItem('death_ave_cms_data', JSON.stringify(newData));
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', data.colors.primary);
    document.documentElement.style.setProperty('--accent-color', data.colors.accent);
    document.documentElement.style.setProperty('--bg-color', data.colors.background);
  }, [data.colors]);

  return (
    <SiteContext.Provider value={{ data, updateData }}>
      {children}
    </SiteContext.Provider>
  );
};

const ThemeStyles = () => (
  <style>{`
    :root {
      --primary-color: #121212;
      --accent-color: #800020;
      --bg-color: #0a0a0a;
    }
    .bg-custom-primary { background-color: var(--primary-color); }
    .text-custom-accent { color: var(--accent-color); }
    .bg-custom-accent { background-color: var(--accent-color); }
    .border-custom-accent { border-color: var(--accent-color); }
    body { background-color: var(--bg-color); }
    .admin-scrollbar::-webkit-scrollbar { width: 4px; }
    .admin-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .admin-scrollbar::-webkit-scrollbar-thumb { background: #333; }
  `}</style>
);

const SectionTitle: React.FC<{ children: React.ReactNode, light?: boolean }> = ({ children, light }) => (
  <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-8 ${light ? 'text-white' : 'text-stone-900 dark:text-stone-100'}`}>
    {children}
  </h2>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useContext(SiteContext);

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-black/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-serif font-bold tracking-tighter uppercase text-white">
              {data.companyName}
            </span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-stone-400 hover:text-custom-accent transition-colors text-[10px] uppercase tracking-[0.2em] font-bold">Home</Link>
            <Link to="/about" className="text-stone-400 hover:text-custom-accent transition-colors text-[10px] uppercase tracking-[0.2em] font-bold">About</Link>
            <Link to="/services" className="text-stone-400 hover:text-custom-accent transition-colors text-[10px] uppercase tracking-[0.2em] font-bold">Services</Link>
            <Link to="/destinations" className="text-stone-400 hover:text-custom-accent transition-colors text-[10px] uppercase tracking-[0.2em] font-bold">Visit</Link>
            <Link to="/posts" className="text-stone-400 hover:text-custom-accent transition-colors text-[10px] uppercase tracking-[0.2em] font-bold">Journal</Link>
            <Link to="/contact" className="text-stone-400 hover:text-custom-accent transition-colors text-[10px] uppercase tracking-[0.2em] font-bold">Contact</Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black fixed inset-0 z-[60] p-8 flex flex-col justify-center items-center gap-8">
          <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-white"><X size={32} /></button>
          <Link to="/" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white uppercase tracking-widest">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white uppercase tracking-widest">About</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white uppercase tracking-widest">Services</Link>
          <Link to="/destinations" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white uppercase tracking-widest">Visit</Link>
          <Link to="/posts" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white uppercase tracking-widest">Journal</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-custom-accent uppercase tracking-widest">Contact</Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { data } = useContext(SiteContext);
  return (
    <footer className="bg-stone-950 border-t border-white/5 py-24 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold uppercase tracking-tighter">{data.companyName}</h3>
          <p className="text-stone-500 text-sm leading-relaxed max-w-xs">{data.tagline}</p>
          <div className="flex space-x-4">
            <a href={data.social.instagram} className="text-stone-500 hover:text-custom-accent transition-colors"><Instagram size={20} /></a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-[10px] uppercase tracking-widest text-stone-500 mb-6">Explore</h4>
          <ul className="space-y-3 text-sm text-stone-400">
            <li><Link to="/about" className="hover:text-white transition-colors">Origins</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Tastings</Link></li>
            <li><Link to="/posts" className="hover:text-white transition-colors">Journal</Link></li>
            <li><Link to="/admin" className="hover:text-white transition-colors opacity-20">Admin</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[10px] uppercase tracking-widest text-stone-500 mb-6">Contact</h4>
          <div className="space-y-4 text-sm text-stone-400">
            <p className="flex items-center gap-3"><MapPin size={14} className="text-custom-accent" /> {data.address}</p>
            <p className="flex items-center gap-3"><Phone size={14} className="text-custom-accent" /> {data.phone}</p>
            <p className="flex items-center gap-3"><Clock size={14} className="text-custom-accent" /> Tue–Sat: {data.hours.tueSat}</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-[10px] uppercase tracking-widest text-stone-500 mb-6">Newsletter</h4>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 px-4 py-3 text-xs w-full focus:outline-none focus:border-custom-accent" />
            <button className="bg-custom-accent px-4 py-3 text-white"><ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---
const Home = () => {
  const { data } = useContext(SiteContext);
  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/75"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <span className="text-custom-accent font-bold tracking-[0.5em] uppercase text-xs mb-6 block animate-in slide-in-from-bottom-4 duration-1000">Hudson Yards, NYC</span>
          <h1 className="text-6xl md:text-9xl font-serif font-bold tracking-tighter mb-10 text-white uppercase leading-none">
            {data.companyName}
          </h1>
          <p className="text-lg md:text-2xl text-stone-300 font-light max-w-3xl mx-auto mb-14 tracking-wide">
            {data.tagline}
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
             <Link to="/services" className="bg-white text-black px-12 py-5 font-bold uppercase tracking-widest text-xs hover:bg-stone-200 transition-colors">Explore Collection</Link>
             <Link to="/destinations" className="border border-white/20 text-white px-12 py-5 font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">Visit Shop</Link>
          </div>
        </div>
      </section>

      {data.sections.philosophy && (
        <section className="py-40 px-4 bg-stone-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <SectionTitle light>A Commitment to Purity</SectionTitle>
            <p className="text-2xl md:text-3xl font-serif italic text-stone-300 leading-relaxed mb-12">"{data.philosophy}"</p>
            <div className="h-px w-32 bg-custom-accent mx-auto"></div>
          </div>
        </section>
      )}

      {data.sections.featuredWines && (
        <section className="py-40 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-4">
              <SectionTitle light>Curated Selection</SectionTitle>
              <Link to="/services" className="text-custom-accent flex items-center gap-2 font-bold tracking-widest uppercase text-xs group">
                View All Bottles <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {data.wines.filter(w => w.isFeatured).map(wine => (
                <div key={wine.id} className="group">
                  <div className="aspect-[4/5] overflow-hidden bg-stone-900 mb-8 border border-white/5 relative">
                    <img src={wine.imageUrl} alt={wine.imageAlt || wine.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-70 group-hover:opacity-100" />
                    <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 text-[10px] uppercase tracking-widest font-bold border border-white/10">
                      {wine.type}
                    </div>
                  </div>
                  <div className="flex justify-between items-start border-b border-white/5 pb-4">
                    <div>
                      <h3 className="text-3xl font-serif font-bold mb-2 group-hover:text-custom-accent transition-colors">{wine.name}</h3>
                      <p className="text-stone-500 text-sm uppercase tracking-widest">{wine.region}</p>
                    </div>
                    <span className="text-2xl font-serif text-white">${wine.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.sections.founder && (
        <section className="py-40 px-4 bg-stone-900 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute -inset-4 border border-custom-accent/30 translate-x-12 translate-y-12 -z-10"></div>
              <img src={data.founderImageUrl} alt={data.founderImageAlt || "Michael Tzezailidis"} className="w-full grayscale shadow-2xl" />
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-custom-accent font-bold uppercase tracking-[0.4em] text-xs mb-6 block">The Founder</span>
              <SectionTitle light>Michael Tzezailidis</SectionTitle>
              <p className="text-stone-400 leading-relaxed mb-12 text-lg font-light">{data.founderBio}</p>
              <Link to="/about" className="inline-flex items-center gap-4 text-white font-bold uppercase tracking-widest text-xs border-b border-custom-accent pb-2">Our Origins</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const PostDetail = () => {
  const { data } = useContext(SiteContext);
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = data.posts.find(p => p.slug === slug);

  if (!post) return <div className="pt-40 text-center">Post not found.</div>;

  return (
    <div className="pt-40 pb-40 px-4 animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/posts')} className="text-xs uppercase tracking-widest font-bold text-stone-500 mb-12 flex items-center gap-2 hover:text-white transition-colors">
          <ArrowRight className="rotate-180" size={14} /> Back to Journal
        </button>
        <span className="text-custom-accent font-bold text-xs uppercase tracking-widest mb-4 block">{post.date}</span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12 leading-tight">{post.title}</h1>
        <div className="aspect-video overflow-hidden mb-16 grayscale">
          <img src={post.imageUrl} className="w-full h-full object-cover" alt={post.title} />
        </div>
        <div className="prose prose-invert max-w-none text-stone-300 text-lg leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </div>
  );
};

const Posts = () => {
  const { data } = useContext(SiteContext);
  return (
    <div className="pt-40 pb-40 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-32">
          <span className="text-custom-accent font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Journal</span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold uppercase tracking-tighter">The Weekly Pour</h1>
        </header>
        <div className="space-y-40">
          {data.posts.filter(p => p.published).map(post => (
            <article key={post.id} className="group grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="overflow-hidden bg-stone-900 aspect-[16/10] border border-white/5">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
              </div>
              <div className="max-w-md">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-6 block">{post.date}</span>
                <h2 className="text-4xl font-serif font-bold mb-8 leading-tight group-hover:text-custom-accent transition-colors">{post.title}</h2>
                <p className="text-stone-400 leading-relaxed mb-10 text-lg">{post.excerpt}</p>
                <Link to={`/posts/${post.slug}`} className="inline-block text-xs font-bold uppercase tracking-widest border-b border-custom-accent pb-2">Read Article</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const { data } = useContext(SiteContext);
  return (
    <div className="pt-40 pb-40 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-24">
          <span className="text-custom-accent font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Our Story</span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold uppercase tracking-tighter">Born from Experience</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start mb-40">
          <div className="text-stone-300 space-y-8 text-xl font-light leading-relaxed">
            <p>{data.aboutText}</p>
            <p>We are a boutique sanctuary dedicated to the artistry of low-intervention viticulture. Every bottle in our shop is hand-selected, representing a commitment to soil health, transparency, and the simple joy of drinking something pure.</p>
          </div>
          <div className="relative pt-12">
            <div className="bg-stone-900 p-12 border-l-4 border-custom-accent relative z-10">
              <h3 className="text-3xl font-serif italic mb-6 leading-tight text-white">"We focus on cleaner wines made without heavy pesticides, partnering with those who respect the earth."</h3>
              <p className="text-stone-500 text-sm uppercase tracking-widest font-bold">— Michael Tzezailidis</p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-custom-accent/10 -z-10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const { data } = useContext(SiteContext);
  return (
    <div className="pt-40 pb-40 px-4 bg-stone-900/30">
      <div className="max-w-7xl mx-auto">
        <header className="mb-32 text-center">
          <span className="text-custom-accent font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Services</span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold uppercase tracking-tighter">Bespoke Experiences</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
          {data.services.filter(s => s.enabled).map(service => (
            <div key={service.id} className="group border border-white/5 bg-stone-900/50 hover:bg-black transition-all">
               <div className="aspect-square overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                 <img src={service.imageUrl} className="w-full h-full object-cover" alt={service.title} />
               </div>
               <div className="p-10">
                 <h3 className="text-3xl font-serif font-bold mb-4">{service.title}</h3>
                 <p className="text-stone-400 text-sm leading-relaxed mb-8">{service.description}</p>
                 <Link to="/contact" className="text-[10px] uppercase tracking-widest font-bold text-custom-accent border-b border-custom-accent/30 pb-2 hover:border-custom-accent transition-all">Book Service</Link>
               </div>
            </div>
          ))}
          <div className="p-12 border border-custom-accent/20 bg-custom-accent/5 flex flex-col justify-center text-center items-center">
            <h3 className="text-3xl font-serif font-bold mb-6">Weekly Tastings</h3>
            <p className="text-stone-400 text-sm mb-10 max-w-xs">Join us every Thursday for curated pours. Announcements via Instagram.</p>
            <a href={data.social.instagram} className="bg-custom-accent text-white px-8 py-4 text-xs font-bold uppercase tracking-widest">Follow for Dates</a>
          </div>
        </div>
        <SectionTitle light>The Vault</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
           {data.wines.map(wine => (
             <div key={wine.id} className="bg-stone-900/40 p-8 border border-white/5 text-center group">
               <div className="h-64 mb-8 overflow-hidden">
                 <img src={wine.imageUrl} className="h-full mx-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-700" alt={wine.imageAlt || wine.name} />
               </div>
               <h4 className="font-serif font-bold text-xl mb-2">{wine.name}</h4>
               <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-6">{wine.region}</p>
               <span className="text-custom-accent font-serif text-xl">${wine.price}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const Destinations = () => {
  const { data } = useContext(SiteContext);
  return (
    <div className="pt-40 pb-40 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        <div>
          <span className="text-custom-accent font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Visit Us</span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold uppercase tracking-tighter mb-10">Death Ave On 10th</h1>
          <p className="text-stone-300 text-xl font-light leading-relaxed mb-16">Located in the heart of Hudson Yards, our shop is an industrial sanctuary for those who appreciate the finer, cleaner side of wine.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-4">Location</h4>
              <p className="text-white flex items-start gap-3"><MapPin size={18} className="text-custom-accent shrink-0 mt-1" /> {data.address}</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-4">Hours</h4>
              <ul className="text-stone-300 text-sm space-y-2">
                <li>Tue–Sat: {data.hours.tueSat}</li>
                <li>Sun: {data.hours.sun}</li>
                <li>Mon: {data.hours.mon}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="h-[700px] border border-white/5 grayscale relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.4497321289196!2d-74.00350712341!3d40.751025071387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259ae65c9535b%3A0xc3f5c1287c2b33e2!2s317%2010th%20Ave%2C%20New%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1715694382500!5m2!1sen!2sus" 
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const { data } = useContext(SiteContext);
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="pt-40 pb-40 px-4 bg-stone-900/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
        <div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold uppercase tracking-tighter mb-12">Connect</h1>
          <p className="text-stone-400 text-xl font-light mb-16 leading-relaxed">Reach out for private tastings, collection guidance, or just to say hello. Our team is at your disposal.</p>
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-widest font-bold text-custom-accent w-20">Call</span>
              <p className="text-2xl font-serif">{data.phone}</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-widest font-bold text-custom-accent w-20">Visit</span>
              <p className="text-2xl font-serif">{data.address}</p>
            </div>
          </div>
        </div>
        <div className="bg-black/50 p-16 border border-white/5 relative">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
               <div className="w-20 h-20 bg-custom-accent flex items-center justify-center mb-8 rotate-45">
                 <ArrowRight className="text-white -rotate-45" size={32} />
               </div>
               <h3 className="text-4xl font-serif font-bold mb-6 uppercase tracking-tight">Message Received</h3>
               <p className="text-stone-500">We will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 px-6 py-4 focus:outline-none focus:border-custom-accent transition-colors" type="text" />
                <input required placeholder="Email" className="w-full bg-white/5 border border-white/10 px-6 py-4 focus:outline-none focus:border-custom-accent transition-colors" type="email" />
              </div>
              <textarea required placeholder="Message" rows={5} className="w-full bg-white/5 border border-white/10 px-6 py-4 focus:outline-none focus:border-custom-accent transition-colors"></textarea>
              <button className="w-full bg-custom-accent py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-red-950 transition-colors">Send Inquiry</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Admin CMS Dashboard ---
const AdminDashboard = () => {
  const { data, updateData } = useContext(SiteContext);
  const [activeTab, setActiveTab] = useState<'content' | 'wines' | 'posts' | 'services' | 'theme' | 'seo' | 'subscribers'>('content');
  const [localData, setLocalData] = useState(data);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSave = () => {
    updateData(localData);
    alert("Site Published Successfully.");
  };

  const updateField = (path: string, value: any) => {
    const keys = path.split('.');
    const newData = { ...localData };
    let current: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setLocalData(newData);
  };

  const Input = ({ label, path, type = "text" }: { label: string, path: string, type?: string }) => {
    const val = path.split('.').reduce((o, i) => o[i], localData as any);
    return (
      <div className="mb-6">
        <label className="text-[10px] uppercase font-bold text-stone-500 mb-2 block">{label}</label>
        <input 
          type={type} 
          value={val || ''} 
          onChange={(e) => updateField(path, type === 'number' ? Number(e.target.value) : e.target.value)} 
          className="w-full bg-stone-900 border border-white/10 p-3 text-sm focus:border-custom-accent outline-none" 
        />
      </div>
    );
  };

  const TextArea = ({ label, path }: { label: string, path: string }) => {
    const val = path.split('.').reduce((o, i) => o[i], localData as any);
    return (
      <div className="mb-6">
        <label className="text-[10px] uppercase font-bold text-stone-500 mb-2 block">{label}</label>
        <textarea 
          rows={4} 
          value={val || ''} 
          onChange={(e) => updateField(path, e.target.value)} 
          className="w-full bg-stone-900 border border-white/10 p-3 text-sm focus:border-custom-accent outline-none" 
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col md:flex-row">
      <div className="md:hidden p-4 bg-black border-b border-white/5 flex justify-between items-center fixed w-full z-50">
        <h2 className="font-serif font-bold text-custom-accent">CMS PORTAL</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white"><Menu /></button>
      </div>

      <div className={`w-72 bg-black border-r border-white/5 p-8 flex flex-col gap-2 fixed md:sticky h-screen top-0 transition-transform z-50 overflow-y-auto admin-scrollbar ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-serif font-bold text-custom-accent uppercase tracking-tight">CMS Portal</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white"><X size={20} /></button>
        </div>
        
        {[
          { id: 'content', icon: LayoutIcon, label: 'Page Content' },
          { id: 'wines', icon: Wine, label: 'Bottle Vault' },
          { id: 'posts', icon: FileText, label: 'Journal Manager' },
          { id: 'services', icon: Layers, label: 'Services Manager' },
          { id: 'theme', icon: Palette, label: 'Theme & Sections' },
          { id: 'seo', icon: BarChart3, label: 'SEO & Meta' },
          { id: 'subscribers', icon: Mail, label: 'Subscribers' },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => { setActiveTab(tab.id as any); setSidebarOpen(false); }} 
            className={`flex items-center gap-4 p-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-custom-accent text-white' : 'text-stone-500 hover:bg-white/5 hover:text-stone-300'}`}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}

        <div className="mt-auto pt-10">
          <button onClick={handleSave} className="w-full bg-stone-100 text-black py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2">
            <Save size={14} /> Publish Changes
          </button>
          <Link to="/" className="w-full text-center mt-4 text-[10px] uppercase font-bold text-stone-600 hover:text-white block transition-colors">Return to Site</Link>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-16 pt-24 md:pt-16 max-w-6xl mx-auto w-full">
        {activeTab === 'content' && (
          <div className="space-y-12">
            <h1 className="text-4xl font-serif font-bold mb-10">Store Information</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Company Name" path="companyName" />
              <Input label="Tagline" path="tagline" />
            </div>
            <TextArea label="Brand Philosophy" path="philosophy" />
            <TextArea label="About Story" path="aboutText" />
            
            <h2 className="text-xl font-bold uppercase tracking-widest border-b border-white/10 pb-4">Founder Spotlight</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Founder Image URL" path="founderImageUrl" />
              <Input label="Founder Image Alt Text" path="founderImageAlt" />
              <div className="md:col-span-2">
                <TextArea label="Founder Bio" path="founderBio" />
              </div>
            </div>

            <h2 className="text-xl font-bold uppercase tracking-widest border-b border-white/10 pb-4">Contact Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Phone" path="phone" />
              <Input label="Address" path="address" />
            </div>

            <h2 className="text-xl font-bold uppercase tracking-widest border-b border-white/10 pb-4">Store Hours</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input label="Tue - Sat" path="hours.tueSat" />
              <Input label="Sunday" path="hours.sun" />
              <Input label="Monday" path="hours.mon" />
            </div>
          </div>
        )}

        {activeTab === 'wines' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <h1 className="text-4xl font-serif font-bold">Wine Vault</h1>
              <button 
                onClick={() => setLocalData({ ...localData, wines: [{ id: Date.now().toString(), name: "New Bottle", region: "Region", price: 0, type: 'Red', description: "", imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop", imageAlt: "Image of new wine bottle", isFeatured: false }, ...localData.wines] })}
                className="bg-custom-accent px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <Plus size={14} /> Add New Bottle
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {localData.wines.map((wine, idx) => (
                <div key={wine.id} className="bg-stone-900/50 p-8 border border-white/5 relative group flex flex-col">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase font-bold text-stone-500 block">Name</label>
                        <input className="w-full bg-black/40 border border-white/5 p-3 text-sm focus:border-custom-accent outline-none" value={wine.name} onChange={(e) => {
                          const w = [...localData.wines]; w[idx].name = e.target.value; setLocalData({ ...localData, wines: w });
                        }} />
                        <label className="text-[10px] uppercase font-bold text-stone-500 block">Region</label>
                        <input className="w-full bg-black/40 border border-white/5 p-3 text-sm focus:border-custom-accent outline-none" value={wine.region} onChange={(e) => {
                          const w = [...localData.wines]; w[idx].region = e.target.value; setLocalData({ ...localData, wines: w });
                        }} />
                        <label className="text-[10px] uppercase font-bold text-stone-500 block">Wine Category</label>
                        <select className="w-full bg-black/40 border border-white/5 p-3 text-sm focus:border-custom-accent outline-none" value={wine.type} onChange={(e) => {
                           const w = [...localData.wines]; w[idx].type = e.target.value as any; setLocalData({ ...localData, wines: w });
                        }}>
                          {['Red', 'White', 'Rosé', 'Orange', 'Sparkling'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase font-bold text-stone-500 block">Price ($)</label>
                        <input className="w-full bg-black/40 border border-white/5 p-3 text-sm focus:border-custom-accent outline-none" type="number" value={wine.price} onChange={(e) => {
                          const w = [...localData.wines]; w[idx].price = Number(e.target.value); setLocalData({ ...localData, wines: w });
                        }} />
                        <label className="text-[10px] uppercase font-bold text-stone-500 block">Image URL</label>
                        <input className="w-full bg-black/40 border border-white/5 p-3 text-sm focus:border-custom-accent outline-none" value={wine.imageUrl} onChange={(e) => {
                          const w = [...localData.wines]; w[idx].imageUrl = e.target.value; setLocalData({ ...localData, wines: w });
                        }} />
                        <label className="text-[10px] uppercase font-bold text-stone-500 block">Image Alt Text</label>
                        <input className="w-full bg-black/40 border border-white/5 p-3 text-sm focus:border-custom-accent outline-none" value={wine.imageAlt} onChange={(e) => {
                          const w = [...localData.wines]; w[idx].imageAlt = e.target.value; setLocalData({ ...localData, wines: w });
                        }} />
                        <div className="flex items-center gap-4 pt-4">
                           <input type="checkbox" checked={wine.isFeatured} onChange={(e) => {
                             const w = [...localData.wines]; w[idx].isFeatured = e.target.checked; setLocalData({ ...localData, wines: w });
                           }} />
                           <label className="text-xs uppercase font-bold tracking-widest">Featured Home</label>
                        </div>
                      </div>
                   </div>
                   <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                     <button onClick={() => setLocalData({ ...localData, wines: localData.wines.filter(w => w.id !== wine.id) })} className="text-[10px] uppercase tracking-widest font-bold text-stone-500 hover:text-red-500 transition-colors flex items-center gap-2">
                       <Trash2 size={14} /> Remove
                     </button>
                     <button onClick={handleSave} className="bg-custom-accent/20 hover:bg-custom-accent text-white px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 border border-custom-accent/30 group">
                       <Save size={14} /> Save Bottle
                     </button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div>
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-4xl font-serif font-bold">Journal Manager</h1>
              <button 
                onClick={() => {
                  const slug = "new-post-" + Date.now();
                  setLocalData({ ...localData, posts: [{ id: Date.now().toString(), title: "New Entry", slug, excerpt: "Short summary...", content: "Full content here...", date: new Date().toISOString().split('T')[0], imageUrl: "https://images.unsplash.com/photo-1474722883778-79ad0506f2f0?q=80&w=1000&auto=format&fit=crop", published: true }, ...localData.posts] })
                }}
                className="bg-custom-accent px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <Plus size={14} /> New Entry
              </button>
            </div>
            <div className="space-y-8">
              {localData.posts.map((post, idx) => (
                <div key={post.id} className="bg-stone-900/50 p-8 border border-white/5">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase font-bold text-stone-500 block">Post Title</label>
                        <input className="w-full bg-black/40 border border-white/5 p-3 text-sm focus:border-custom-accent outline-none" value={post.title} onChange={(e) => {
                          const p = [...localData.posts]; p[idx].title = e.target.value; setLocalData({ ...localData, posts: p });
                        }} />
                        <label className="text-[10px] uppercase font-bold text-stone-500 block">Slug (URL)</label>
                        <input className="w-full bg-black/40 border border-white/5 p-3 text-sm font-mono focus:border-custom-accent outline-none" value={post.slug} onChange={(e) => {
                          const p = [...localData.posts]; p[idx].slug = e.target.value; setLocalData({ ...localData, posts: p });
                        }} />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase font-bold text-stone-500 block">Date</label>
                        <input className="w-full bg-black/40 border border-white/5 p-3 text-sm focus:border-custom-accent outline-none" type="date" value={post.date} onChange={(e) => {
                          const p = [...localData.posts]; p[idx].date = e.target.value; setLocalData({ ...localData, posts: p });
                        }} />
                        <div className="flex items-center gap-4 pt-6">
                           <input type="checkbox" checked={post.published} onChange={(e) => {
                             const p = [...localData.posts]; p[idx].published = e.target.checked; setLocalData({ ...localData, posts: p });
                           }} />
                           <label className="text-xs uppercase font-bold tracking-widest">Published</label>
                        </div>
                      </div>
                   </div>
                   <div className="space-y-4">
                    <label className="text-[10px] uppercase font-bold text-stone-500 block">Excerpt</label>
                    <textarea rows={2} className="w-full bg-black/40 border border-white/5 p-3 text-sm focus:border-custom-accent outline-none mb-4" value={post.excerpt} onChange={(e) => {
                        const p = [...localData.posts]; p[idx].excerpt = e.target.value; setLocalData({ ...localData, posts: p });
                    }} />
                    <label className="text-[10px] uppercase font-bold text-stone-500 block">Full Content</label>
                    <textarea rows={8} className="w-full bg-black/40 border border-white/5 p-3 text-sm focus:border-custom-accent outline-none" value={post.content} onChange={(e) => {
                        const p = [...localData.posts]; p[idx].content = e.target.value; setLocalData({ ...localData, posts: p });
                    }} />
                   </div>
                   <div className="mt-8 pt-6 border-t border-white/5 flex justify-between">
                     <button onClick={() => setLocalData({ ...localData, posts: localData.posts.filter(p => p.id !== post.id) })} className="text-[10px] uppercase font-bold text-stone-500 hover:text-red-500 flex items-center gap-2">
                       <Trash2 size={14} /> Delete
                     </button>
                     <button onClick={handleSave} className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2">
                       <Save size={14} /> Save Post
                     </button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-4xl font-serif font-bold">Services Manager</h1>
              <button 
                onClick={() => setLocalData({ ...localData, services: [{ id: Date.now().toString(), title: "New Service", description: "Details...", imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop", enabled: true }, ...localData.services] })}
                className="bg-custom-accent px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <Plus size={14} /> Add Service
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {localData.services.map((service, idx) => (
                <div key={service.id} className="bg-stone-900/50 p-8 border border-white/5">
                  <div className="space-y-4">
                    <Input label="Service Title" path={`services.${idx}.title`} />
                    <TextArea label="Description" path={`services.${idx}.description`} />
                    <Input label="Image URL" path={`services.${idx}.imageUrl`} />
                    <div className="flex items-center gap-4 pt-4">
                       <input type="checkbox" checked={service.enabled} onChange={(e) => {
                         const s = [...localData.services]; s[idx].enabled = e.target.checked; setLocalData({ ...localData, services: s });
                       }} />
                       <label className="text-xs uppercase font-bold tracking-widest">Enabled on Site</label>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/5 flex justify-between">
                     <button onClick={() => setLocalData({ ...localData, services: localData.services.filter(s => s.id !== service.id) })} className="text-[10px] uppercase font-bold text-stone-500 hover:text-red-500 flex items-center gap-2">
                       <Trash2 size={14} /> Remove
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="space-y-12">
            <h1 className="text-4xl font-serif font-bold mb-10">Visual Identity</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <Input label="Accent Color (Burgundy)" path="colors.accent" type="color" />
               <Input label="Header/Primary UI" path="colors.primary" type="color" />
               <Input label="Global Background" path="colors.background" type="color" />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-widest border-b border-white/10 pb-4">Visible Sections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(localData.sections).map(section => (
                <div key={section} className="flex items-center justify-between p-4 bg-stone-900 border border-white/5">
                   <span className="text-xs uppercase font-bold tracking-widest">{section}</span>
                   <button 
                    onClick={() => updateField(`sections.${section}`, !(localData.sections as any)[section])}
                    className={`p-2 transition-colors ${ (localData.sections as any)[section] ? 'text-green-500' : 'text-stone-700' }`}
                   >
                     { (localData.sections as any)[section] ? <Eye size={20} /> : <EyeOff size={20} /> }
                   </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-8">
             <h1 className="text-4xl font-serif font-bold mb-10">Search Engine Optimization</h1>
             <Input label="Global Page Title" path="seo.title" />
             <TextArea label="Meta Description" path="seo.description" />
             <Input label="Keywords (Comma separated)" path="seo.keywords" />
             <Input label="OG Image URL (Social Share)" path="seo.ogImage" />
          </div>
        )}

        {activeTab === 'subscribers' && (
          <div>
             <h1 className="text-4xl font-serif font-bold mb-12">Mailing List</h1>
             <div className="bg-black/50 border border-white/5 overflow-x-auto">
               <table className="w-full text-left min-w-[500px]">
                  <thead className="border-b border-white/10 text-[10px] uppercase tracking-widest font-bold text-stone-500">
                    <tr>
                      <th className="p-6">Email Address</th>
                      <th className="p-6">Signed Up</th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-stone-300">
                    {localData.subscribers.map(sub => (
                      <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-6">{sub.email}</td>
                        <td className="p-6">{sub.date}</td>
                        <td className="p-6 text-right">
                          <button onClick={() => setLocalData({ ...localData, subscribers: localData.subscribers.filter(s => s.id !== sub.id) })} className="text-stone-600 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <SiteProvider>
      <ThemeStyles />
      <div className="min-h-screen flex flex-col font-sans selection:bg-custom-accent selection:text-white">
        {!isAdmin && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:slug" element={<PostDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        {!isAdmin && <Footer />}
      </div>
    </SiteProvider>
  );
};

export default App;
