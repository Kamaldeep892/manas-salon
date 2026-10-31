import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3, Heart, MapPin, Menu, MessageCircle, Phone, Scissors, Sparkles, Star, X, } from 'lucide-react';
const ease = [0.2, 0.65, 0.2, 1];
const heroList = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const heroItem = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } };
const address = '32/39 Chandi Ghosh Road, Wireless Park, Kolkata, West Bengal 700040, India';
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
const reviewsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Manna's Salon Kolkata")}`;
const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Manna's Salon, ${address}`)}`;
const phoneNumber = '09038275845';
// Suggested categories only; confirm availability with Manna's Salon before publishing as a service menu.
const serviceCategories = [
    { title: 'Haircut & styling', detail: 'A considered refresh, shaped around your own sense of style.', image: '/images/hair-care.jpg', alt: 'A barber shaping a man’s haircut', number: '01' },
    { title: 'Hair colouring', detail: 'Colour conversations that begin with the look you have in mind.', image: '/images/hero-salon.jpg', alt: 'A man getting a fresh haircut in a neighborhood barbershop', number: '02' },
    { title: 'Hair spa & treatments', detail: 'A little time set aside for your hair and for yourself.', image: '/images/hair-care.jpg', alt: 'A barber carefully trimming a man’s hair', number: '03' },
    { title: 'Facial & skincare', detail: 'Thoughtful care for a moment that feels entirely your own.', image: '/images/skincare.jpg', alt: 'Men enjoying haircuts at a neighborhood barbershop', number: '04' },
    { title: 'Bridal & party makeup', detail: 'A look to feel beautifully like yourself for the occasion.', image: '/images/makeup-look.jpg', alt: 'A barber giving a client a neat fade haircut', number: '05' },
    { title: 'Beauty & grooming', detail: 'The finishing details, approached with care and attention.', image: '/images/salon-detail.jpg', alt: 'A sunlit mirror and blush towel in a salon', number: '06' },
];
const galleryImages = [
    { src: '/images/hero-salon.jpg', alt: 'A man enjoying a fresh haircut in warm salon light', title: 'A little room to feel like you', ratio: 'portrait' },
    { src: '/images/salon-interior.jpg', alt: 'Welcoming salon chair and brass mirror in Kolkata', title: 'A welcoming corner', ratio: 'landscape' },
    { src: '/images/hair-care.jpg', alt: 'A barber carefully shaping a man’s haircut', title: 'The thoughtful details', ratio: 'landscape' },
    { src: '/images/makeup-look.jpg', alt: 'A barber shaping a client’s hairstyle', title: 'Your own kind of beautiful', ratio: 'portrait' },
    { src: '/images/salon-detail.jpg', alt: 'Sunlight falling across a mirror and folded blush towel', title: 'An easy moment', ratio: 'portrait' },
    { src: '/images/skincare.jpg', alt: 'Men enjoying haircuts at a neighborhood barbershop', title: 'Care, at your pace', ratio: 'landscape' },
];
const navItems = [
    ['About', '#about'], ['Services', '#services'], ['Gallery', '#gallery'],
    ['Reviews', '#reviews'], ['Contact', '#contact'],
];
// Scroll-triggered fade + upward reveal (runs once). Respects prefers-reduced-motion via MotionConfig.
function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
    const Tag = motion[as];
    return (<Tag className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12, margin: '0px 0px -30px 0px' }} transition={{ duration: 0.75, delay, ease }} {...rest}>
      {children}
    </Tag>);
}
function Stars({ size = 18 }) {
    return (<>
      {[0, 1, 2, 3, 4].map((n) => (<motion.span key={n} className="inline-flex" initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.3 + n * 0.08 }}>
          <Star size={size} fill="currentColor" strokeWidth={1}/>
        </motion.span>))}
    </>);
}
function SectionHeading({ eyebrow, title, description, light = false }) {
    return (<div className={`max-w-[650px] ${light ? 'text-[var(--ivory)]' : ''}`}>
      <p className="eyebrow mb-5 flex items-center gap-3 text-[var(--champagne)]"><span className="h-px w-8 bg-[var(--champagne)]"/>{eyebrow}</p>
      <h2 className="serif text-[clamp(2.5rem,5.3vw,4.6rem)] leading-[1.06] tracking-[-.035em]">{title}</h2>
      {description && <p className={`mt-5 max-w-[510px] text-[.98rem] leading-[1.85] ${light ? 'text-white/75' : 'text-[#665c62]'}`}>{description}</p>}
    </div>);
}
function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const update = () => setScrolled(window.scrollY > 24);
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);
    useEffect(() => {
        if (!menuOpen)
            return;
        const closeOnEscape = (event) => {
            if (event.key === 'Escape')
                setMenuOpen(false);
        };
        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [menuOpen]);
    return (<>
      <div className="bg-[var(--plum)] py-[9px] text-center text-[.65rem] tracking-[.13em] text-[var(--ivory)]">
        A LITTLE TIME, JUST FOR YOU <span className="mx-2 text-[var(--champagne)]">·</span> BEAUTY IN KOLKATA
      </div>
      <header className={`fixed inset-x-0 z-40 transition-all duration-300 ${scrolled ? 'top-0 bg-[rgba(255,249,245,.97)] shadow-[0_8px_30px_rgba(53,34,45,.08)] backdrop-blur-md' : 'top-[31px] bg-[var(--ivory)]'}`}>
        <div className="shell flex h-[78px] items-center justify-between">
          <a href="#home" className="group flex items-center gap-3" aria-label="Manna's Salon home" data-testid="link-home">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--champagne)] text-[var(--plum)]"><span className="serif text-[1.35rem] italic">m</span></span>
            <span className="leading-tight"><span className="serif block text-[1.26rem] tracking-[-.03em] text-[var(--plum)]">Manna’s Salon</span><span className="mt-1 block text-[.52rem] tracking-[.23em] text-[#786d72]">KOLKATA · BEAUTY, PERSONALLY</span></span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navItems.map(([name, href]) => <a key={name} className="nav-link" href={href} data-testid={`nav-${name.toLowerCase()}`}>{name}</a>)}
            <a className="button-primary !min-h-[2.8rem] !px-5" href="#enquiry" data-testid="nav-book">Enquire now <ArrowUpRight size={15}/></a>
          </nav>
          <button className="flex h-11 w-11 items-center justify-center text-[var(--plum)] lg:hidden" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
            {menuOpen ? <X size={23}/> : <Menu size={23}/>}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {menuOpen && (<motion.div key="mobile-menu" id="mobile-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }} className="overflow-hidden border-t border-[var(--beige)] bg-[var(--ivory)] lg:hidden">
              <nav className="shell flex flex-col py-3" aria-label="Mobile navigation">
                {navItems.map(([name, href], i) => (<motion.a key={name} href={href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease }} className="border-b border-[var(--beige)] py-3.5 text-sm text-[var(--charcoal)]" data-testid={`mobile-nav-${name.toLowerCase()}`}>{name}</motion.a>))}
                <a href="#enquiry" onClick={() => setMenuOpen(false)} className="mt-4 button-primary" data-testid="mobile-nav-enquire">Enquire about a visit <ArrowUpRight size={15}/></a>
              </nav>
            </motion.div>)}
        </AnimatePresence>
      </header>
    </>);
}
function Rating({ compact = false }) {
    return (<div className={`flex items-center gap-3 ${compact ? '' : 'border-l border-[var(--champagne)]/50 pl-5'}`} data-testid="rating-aggregate">
      <div className="flex gap-[2px] text-[var(--champagne)]" aria-label="5 gold stars">
        {[0, 1, 2, 3, 4].map((n) => <Star key={n} size={compact ? 13 : 15} fill="currentColor" strokeWidth={1}/>)}
      </div>
      <span className="text-[.75rem] text-[var(--charcoal)]"><strong className="font-semibold">4.9/5</strong><span className="mx-1 text-[#8f8388]">·</span>263 reviews</span>
    </div>);
}
function Hero() {
    return (<section id="home" className="relative overflow-hidden bg-[var(--ivory)] pt-[110px]">
      <div className="shell grid min-h-[660px] items-center gap-8 pb-16 pt-12 md:grid-cols-[.92fr_1.08fr] md:gap-12 md:pb-20 md:pt-16 lg:min-h-[735px]">
        <motion.div variants={heroList} initial="hidden" animate="show" className="relative z-10 py-7 md:py-0">
          <motion.p variants={heroItem} className="eyebrow mb-7 text-[var(--plum)]"><span className="mr-3 inline-block h-px w-9 align-middle bg-[var(--champagne)]"/>YOUR NEIGHBOURHOOD SALON, KOLKATA</motion.p>
          <motion.h1 variants={heroItem} className="serif max-w-[620px] text-[clamp(3.6rem,7vw,6.85rem)] leading-[.98] tracking-[-.055em] text-[var(--plum)]">Beauty that<br /><em className="font-normal text-[#9a6b7c]">feels like you.</em></motion.h1>
          <motion.p variants={heroItem} className="mt-7 max-w-[430px] text-[1rem] leading-[1.85] text-[#62575e]">A thoughtful, personal beauty destination in Kolkata. Come as you are; leave feeling a little more like yourself.</motion.p>
          <motion.div variants={heroItem} className="mt-9 flex flex-wrap gap-3">
            <a href="#enquiry" className="button-primary" data-testid="button-hero-enquire">Enquire about a visit <ArrowUpRight size={16}/></a>
            <a href="#services" className="button-outline" data-testid="button-hero-services">Explore categories <ArrowDown size={15}/></a>
          </motion.div>
          <motion.div variants={heroItem} className="mt-10 flex items-center gap-5">
            <Rating compact/>
            <span className="hidden h-8 w-px bg-[#d7c5cb] sm:block"/>
            <span className="hidden text-[.72rem] leading-[1.5] text-[#72666c] sm:block">Personal care,<br />at your own pace.</span>
          </motion.div>
          <span className="serif absolute -left-12 top-[360px] hidden text-[8rem] leading-none text-[var(--blush)]/35 lg:block" aria-hidden="true">m</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease }} className="relative min-h-[400px] md:h-[570px]">
          <div className="absolute inset-0 right-0 overflow-hidden rounded-t-[48%] md:left-[7%] md:rounded-t-[48%]">
            <img src="/images/hero-salon.jpg" alt="A man getting a fresh haircut in a warm, welcoming salon" width="1024" height="1280" fetchPriority="high" className="h-full w-full object-cover object-center"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(40,22,34,.25)] via-transparent to-[rgba(255,249,245,.08)]"/>
          </div>
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.7, ease }} className="absolute bottom-8 left-0 hidden w-[210px] border border-[var(--champagne)] bg-[var(--ivory)] p-5 shadow-[0_15px_45px_rgba(45,30,39,.13)] md:block">
            <span className="eyebrow text-[var(--plum)]">A FEEL-GOOD VISIT</span>
            <p className="serif mt-2 text-[1.5rem] leading-tight text-[var(--plum)]">Thoughtfully<br />made personal.</p>
            <span className="mt-4 block h-px w-10 bg-[var(--champagne)]"/>
          </motion.div>
          <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.9 }} className="absolute right-3 top-8 flex h-[94px] w-[94px] flex-col items-center justify-center rounded-full border border-[var(--champagne)] bg-[var(--ivory)] text-center shadow-[0_10px_30px_rgba(45,30,39,.1)] md:right-0 md:top-12">
            <span className="serif text-[1.5rem] text-[var(--plum)]">4.9</span><span className="text-[.52rem] tracking-[.12em] text-[#685c62]">OUT OF 5</span><span className="mt-1 flex gap-[2px] text-[var(--champagne)]" aria-hidden="true">{[0, 1, 2, 3, 4].map((n) => <Star key={n} size={10} fill="currentColor" strokeWidth={1}/>)}</span>
          </motion.div>
          <div className="absolute bottom-[-8px] right-0 rounded-full bg-[var(--plum)] px-4 py-2 text-[.64rem] tracking-[.13em] text-[var(--ivory)] md:bottom-[-14px] md:right-[18%]">CHANDI GHOSH ROAD · KOLKATA</div>
        </motion.div>
      </div>
      <div className="border-y border-[#e7d9d5] bg-[var(--ivory)]">
        <div className="shell flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4"><span className="serif text-[1.8rem] text-[var(--plum)]">A good feeling, from the first hello.</span><Heart size={16} strokeWidth={1.2} className="text-[var(--champagne)]" aria-hidden="true"/></div>
          <span className="eyebrow text-[#776b70]">A PERSONAL BEAUTY EXPERIENCE IN KOLKATA</span>
        </div>
      </div>
    </section>);
}
function About() {
    return (<section id="about" className="section-pad bg-[var(--beige)]">
      <div className="shell grid items-center gap-14 md:grid-cols-[.95fr_1.05fr] lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-[500px]">
          <div className="image-hover aspect-[.85] overflow-hidden rounded-t-[48%] rounded-b-sm">
            <img src="/images/salon-interior.jpg" alt="Warm, welcoming salon interior with a chair and brass mirror" width="1024" height="1280" loading="lazy" className="h-full w-full object-cover"/>
          </div>
          <div className="absolute -bottom-6 -right-2 border border-[var(--champagne)] bg-[var(--ivory)] px-6 py-5 sm:-right-7">
            <p className="serif text-[1.45rem] italic text-[var(--plum)]">Make yourself<br />at home.</p>
          </div>
          <span className="eyebrow absolute -left-5 top-[42%] hidden -rotate-90 text-[var(--plum)] sm:block">A PLACE TO PAUSE</span>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading eyebrow="A LITTLE ABOUT US" title="Beauty is personal. It should feel that way."/>
          <p className="mt-7 max-w-[540px] text-[.98rem] leading-[1.9] text-[#62575e]">At Manna’s Salon, beauty is personal. We believe every client deserves thoughtful attention, a welcoming atmosphere, and a salon experience tailored to their individual style. Visit us to discover a beauty experience designed around you.</p>
          <p className="mt-4 max-w-[500px] text-[.9rem] leading-[1.8] text-[#796d73]">A neighbourhood salon in Wireless Park, Kolkata—where the little details matter and you can simply be yourself.</p>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="button-outline mt-8" data-testid="button-about-directions">Find your way here <MapPin size={15}/></a>
        </Reveal>
      </div>
    </section>);
}
function Services() {
    return (<section id="services" className="section-pad bg-[var(--ivory)]">
      <div className="shell">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="A MENU OF POSSIBILITIES" title="A little something for you." description="Tell us what you have in mind. We’ll help you find the right way to make it yours."/>
          <p className="max-w-[290px] border-l border-[var(--champagne)] pl-4 text-[.75rem] leading-[1.7] text-[#786c72]">The categories below are suggestions and need to be confirmed with the salon. Please enquire about current availability.</p>
        </Reveal>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((service, index) => (<Reveal as="article" delay={(index % 3) * 0.1} className="group" key={service.number} data-testid={`card-service-${service.number}`}>
              <a href="#enquiry" className="block" aria-label={`Enquire about ${service.title}`} data-testid={`link-service-${service.number}`}>
                <div className="image-hover relative aspect-[1.32] bg-[var(--beige)]">
                  <img src={service.image} alt={service.alt} width="1024" height="1280" loading="lazy" className="h-full w-full object-cover"/>
                  <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ivory)] text-[.65rem] tracking-wider text-[var(--plum)]">{service.number}</span>
                  <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[var(--ivory)] text-[var(--plum)] opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={17}/></span>
                </div>
                <div className="flex items-start justify-between gap-3 border-b border-[#e1d4cf] pb-4 pt-5">
                  <div><h3 className="serif text-[1.55rem] text-[var(--plum)]">{service.title}</h3><p className="mt-2 max-w-[300px] text-[.83rem] leading-[1.65] text-[#746970]">{service.detail}</p></div>
                  <ArrowRight size={16} className="mt-2 shrink-0 text-[var(--champagne)] transition-transform group-hover:translate-x-1"/>
                </div>
              </a>
            </Reveal>))}
        </div>
        <p className="mt-8 text-center text-[.72rem] leading-relaxed text-[#7b7075]">Service categories are indicative only, not a confirmed service list. Please contact Manna’s Salon to confirm availability.</p>
      </div>
    </section>);
}
function Experience() {
    const features = [
        { icon: Heart, title: 'A personal touch', text: 'Your style, your comfort, your conversation. It starts with listening.' },
        { icon: Sparkles, title: 'A welcoming feeling', text: 'A neighbourhood place to settle in, slow down and enjoy a little care.' },
        { icon: Scissors, title: 'The little details', text: 'Thoughtful attention to the details that make a visit feel like yours.' },
        { icon: Check, title: 'Style that feels right', text: 'The best look is the one that still feels like you when you leave.' },
    ];
    return (<section className="relative overflow-hidden bg-[var(--plum)] py-[5.5rem] text-[var(--ivory)]">
      <div className="absolute -right-8 top-8 hidden select-none font-serif text-[18rem] leading-none text-white/[.035] md:block" aria-hidden="true">m</div>
      <div className="shell relative">
        <Reveal className="mx-auto mb-14 max-w-[680px] text-center">
          <p className="eyebrow mb-5 flex items-center justify-center gap-3 text-[var(--champagne)]"><span className="h-px w-8 bg-[var(--champagne)]"/>THE MANNAS FEELING<span className="h-px w-8 bg-[var(--champagne)]"/></p>
          <h2 className="serif text-[clamp(2.5rem,5vw,4.1rem)] leading-tight">A visit that feels<br /><em className="font-normal text-[var(--blush)]">like it was made for you.</em></h2>
        </Reveal>
        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }, i) => (<Reveal as="article" key={title} delay={i * 0.1} className="border-t border-white/20 px-5 py-7 first:pl-0 last:pr-0 lg:border-l lg:border-t-0 lg:px-7 lg:first:border-l-0" data-testid={`feature-${i + 1}`}>
              <Icon size={22} strokeWidth={1.3} className="mb-5 text-[var(--champagne)]" aria-hidden="true"/>
              <h3 className="serif text-[1.45rem]">{title}</h3>
              <p className="mt-3 text-[.82rem] leading-[1.8] text-white/70">{text}</p>
            </Reveal>))}
        </div>
      </div>
    </section>);
}
function Gallery() {
    const [active, setActive] = useState(null);
    const closeRef = useRef(null);
    const openerRef = useRef(null);
    const isOpen = active !== null;
    useEffect(() => {
        if (!isOpen) {
            openerRef.current?.focus();
            return;
        }
        closeRef.current?.focus();
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previous; };
    }, [isOpen]);
    const onLightboxKey = (event) => {
        if (event.key === 'Escape')
            setActive(null);
        if (event.key === 'ArrowRight')
            setActive((current) => current === null ? null : (current + 1) % galleryImages.length);
        if (event.key === 'ArrowLeft')
            setActive((current) => current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length);
        if (event.key === 'Tab') {
            const controls = Array.from(event.currentTarget.querySelectorAll('button:not([disabled])'));
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
            }
            else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
            }
        }
    };
    return (<section id="gallery" className="section-pad bg-[var(--ivory)]">
      <div className="shell">
        <Reveal className="mb-11 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading eyebrow="A FEW MOMENTS" title="A feeling, in pictures." description="A little glimpse of the warmth and care we hope you’ll feel when you visit."/>
          <span className="eyebrow pb-2 text-[#756a70]">MANNAS SALON · KOLKATA</span>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
          {galleryImages.map((image, index) => {
            const gridClass = ['md:col-span-4 md:row-span-2', 'md:col-span-4', 'md:col-span-4', 'md:col-span-4', 'md:col-span-4', 'md:col-span-4'][index];
            return (<Reveal as="button" key={image.title} delay={(index % 3) * 0.08} type="button" onClick={(event) => { openerRef.current = event.currentTarget; setActive(index); }} className={`group relative block w-full overflow-hidden bg-[var(--beige)] text-left ${gridClass} ${image.ratio === 'portrait' ? 'aspect-[.82]' : 'aspect-[1.25]'}`} aria-label={`Open gallery image: ${image.title}`} data-testid={`button-gallery-image-${index + 1}`}>
                <img src={image.src} alt={image.alt} width="1024" height="1280" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"/>
                <span className="absolute inset-0 bg-gradient-to-t from-[#21151f]/50 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100"/>
                <span className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[var(--ivory)]"><span className="serif text-[1rem] sm:text-[1.25rem]">{image.title}</span><ArrowUpRight size={16}/></span>
              </Reveal>);
        })}
        </div>
      </div>
      <AnimatePresence>{active !== null && (<motion.div key="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-[#211720]/95 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Salon image gallery" onKeyDown={onLightboxKey} onClick={(event) => { if (event.target === event.currentTarget)
            setActive(null); }}>
          <button ref={closeRef} type="button" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-white hover:text-[var(--blush)]" aria-label="Close gallery" onClick={() => setActive(null)} data-testid="button-gallery-close"><X /></button>
          <button type="button" className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white hover:text-[var(--blush)] sm:left-8" aria-label="Previous image" onClick={() => setActive((active - 1 + galleryImages.length) % galleryImages.length)} data-testid="button-gallery-previous"><ArrowLeft /></button>
          <motion.figure key={active} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, ease }} className="flex max-h-full max-w-5xl flex-col items-center">
            <img src={galleryImages[active].src} alt={galleryImages[active].alt} width="1024" height="1280" className="max-h-[78vh] max-w-full object-contain"/>
            <figcaption className="mt-4 text-center"><span className="serif text-xl text-white">{galleryImages[active].title}</span><span className="ml-4 text-sm text-white/60">{active + 1} / {galleryImages.length}</span></figcaption>
          </motion.figure>
          <button type="button" className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white hover:text-[var(--blush)] sm:right-8" aria-label="Next image" onClick={() => setActive((active + 1) % galleryImages.length)} data-testid="button-gallery-next"><ArrowRight /></button>
        </motion.div>)}</AnimatePresence>
    </section>);
}
function Reviews() {
    return (<section id="reviews" className="bg-[var(--beige)] py-[5.5rem]">
      <div className="shell grid items-center gap-10 md:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow mb-5 flex items-center gap-3 text-[var(--plum)]"><span className="h-px w-8 bg-[var(--champagne)]"/>KIND WORDS, IN THE AGGREGATE</p>
          <h2 className="serif text-[clamp(2.5rem,4vw,3.75rem)] leading-[1.08] text-[var(--plum)]">A lovely little<br />vote of confidence.</h2>
          <p className="mt-5 max-w-[420px] text-[.9rem] leading-[1.8] text-[#665a61]">We’re grateful for every person who has shared their experience. Find customer reviews using the Google Maps search.</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col items-start justify-between gap-7 border-y border-[var(--champagne)]/60 py-8 sm:flex-row sm:items-center">
          <div data-testid="text-review-aggregate">
            <div className="flex items-center gap-3"><span className="serif text-[4.5rem] leading-none text-[var(--plum)]">4.9</span><span className="serif pt-3 text-[1.4rem] text-[#73666c]">/ 5</span></div>
            <div className="mt-3 flex gap-1 text-[var(--champagne)]" aria-label="5 gold stars"><Stars size={18}/></div>
            <p className="mt-2 text-[.75rem] text-[#766a70]">263 customer reviews</p>
          </div>
          <div className="max-w-[270px] sm:text-right">
            <p className="serif text-[1.45rem] leading-snug text-[var(--plum)]">263 customer reviews</p>
            <p className="mt-2 text-[.75rem] leading-relaxed text-[#786d72]">Aggregate information only. View the original customer reviews on Google.</p>
          </div>
          <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" className="button-primary shrink-0" data-testid="button-google-reviews">Search Google Maps <ArrowUpRight size={15}/></a>
        </Reveal>
      </div>
    </section>);
}
function Enquiry() {
    const [values, setValues] = useState({ name: '', phone: '', service: '', date: '', time: '', message: '' });
    const [errors, setErrors] = useState({});
    const [preparedUrl, setPreparedUrl] = useState('');
    const [formMessage, setFormMessage] = useState('');
    const dateMin = new Date().toISOString().slice(0, 10);
    const update = (key, value) => {
        setValues((previous) => ({ ...previous, [key]: value }));
        setErrors((previous) => ({ ...previous, [key]: undefined }));
        setPreparedUrl('');
        setFormMessage('');
    };
    const submit = (event) => {
        event.preventDefault();
        const next = {};
        if (!values.name.trim())
            next.name = 'Please enter your name.';
        if (!values.phone.trim())
            next.phone = 'Please enter your phone number.';
        else if (!/^[+]?[\d\s()-]{8,20}$/.test(values.phone.trim()) || values.phone.replace(/\D/g, '').length < 8 || values.phone.replace(/\D/g, '').length > 15)
            next.phone = 'Please enter a valid phone number.';
        if (!values.service)
            next.service = 'Please choose a category to enquire about.';
        if (!values.date)
            next.date = 'Please choose a preferred date.';
        else if (values.date < dateMin)
            next.date = 'Please choose today or a future date.';
        if (!values.time)
            next.time = 'Please choose a preferred time.';
        setErrors(next);
        if (Object.keys(next).length) {
            setPreparedUrl('');
            setFormMessage('Please check the highlighted fields and try again.');
            return;
        }
        const message = [
            "Hello Manna's Salon, I'd like to enquire about an appointment.",
            `Name: ${values.name.trim()}`,
            `Phone: ${values.phone.trim()}`,
            `Preferred service category: ${values.service} (please confirm availability)`,
            `Preferred date: ${values.date}`,
            `Preferred time: ${values.time}`,
            values.message.trim() ? `Additional message: ${values.message.trim()}` : '',
        ].filter(Boolean).join('\n');
        setPreparedUrl(`https://wa.me/919038275845?text=${encodeURIComponent(message)}`);
        setFormMessage('Your enquiry is ready to send. Review the prefilled message in WhatsApp; this is not an appointment confirmation.');
    };
    const inputClass = (key) => `field ${errors[key] ? 'border-red-700' : ''}`;
    return (<section id="enquiry" className="section-pad bg-[var(--plum)]">
      <div className="shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <Reveal className="pt-3">
          <SectionHeading eyebrow="LET’S START WITH A HELLO" title="A little time for you?" description="Tell us what you’re thinking. Your message will open as a prefilled WhatsApp enquiry for the salon to review. Nothing is booked until you speak with the salon." light/>
          <div className="mt-9 border-t border-white/20 pt-6">
            <span className="eyebrow text-[var(--champagne)]">PREFER A CONVERSATION?</span>
            <a href={`tel:${phoneNumber}`} className="mt-3 flex items-center gap-3 text-[var(--ivory)] hover:text-[var(--blush)]" data-testid="link-enquiry-phone"><Phone size={17} className="text-[var(--champagne)]"/><span className="serif text-[1.55rem]">09038275845</span></a>
            <p className="mt-2 text-[.77rem] text-white/65">Call Manna’s Salon directly.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="bg-[var(--ivory)] p-6 sm:p-9 lg:p-10">
          <p className="eyebrow mb-2 text-[var(--plum)]">APPOINTMENT ENQUIRY</p>
          <p className="mb-7 text-[.82rem] leading-relaxed text-[#776a70]">Fields marked with an asterisk are required. Please contact the salon to confirm your appointment.</p>
          <form onSubmit={submit} noValidate data-testid="form-enquiry">
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
              <label className="block text-[.74rem] font-semibold text-[var(--charcoal)]">Full name <span className="text-[var(--plum)]">*</span>
                <input className={`${inputClass('name')} mt-2`} type="text" autoComplete="name" value={values.name} onChange={(e) => update('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'error-name' : undefined} placeholder="Your name" required data-testid="input-enquiry-name"/>
                {errors.name && <span id="error-name" className="mt-1 block text-xs text-red-800">{errors.name}</span>}
              </label>
              <label className="block text-[.74rem] font-semibold text-[var(--charcoal)]">Phone number <span className="text-[var(--plum)]">*</span>
                <input className={`${inputClass('phone')} mt-2`} type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={(e) => update('phone', e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'error-phone' : undefined} placeholder="Your contact number" required data-testid="input-enquiry-phone"/>
                {errors.phone && <span id="error-phone" className="mt-1 block text-xs text-red-800">{errors.phone}</span>}
              </label>
              <label className="block text-[.74rem] font-semibold text-[var(--charcoal)]">Service category <span className="text-[var(--plum)]">*</span>
                <span className="relative mt-2 block">
                  <select className={`${inputClass('service')} appearance-none pr-10`} value={values.service} onChange={(e) => update('service', e.target.value)} aria-invalid={!!errors.service} aria-describedby={errors.service ? 'error-service' : 'service-note'} required data-testid="select-enquiry-service">
                    <option value="">Choose a category</option>{serviceCategories.map((category) => <option key={category.number} value={category.title}>{category.title}</option>)}
                  </select><ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#786d72]"/>
                </span>
                <span id={errors.service ? 'error-service' : 'service-note'} className={`mt-1 block text-[.68rem] font-normal ${errors.service ? 'text-red-800' : 'text-[#796d73]'}`}>{errors.service || 'Suggested category; please confirm availability.'}</span>
              </label>
              <label className="block text-[.74rem] font-semibold text-[var(--charcoal)]">Preferred date <span className="text-[var(--plum)]">*</span>
                <input className={`${inputClass('date')} mt-2`} type="date" min={dateMin} value={values.date} onChange={(e) => update('date', e.target.value)} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'error-date' : undefined} required data-testid="input-enquiry-date"/>
                {errors.date && <span id="error-date" className="mt-1 block text-xs text-red-800">{errors.date}</span>}
              </label>
              <label className="block text-[.74rem] font-semibold text-[var(--charcoal)] sm:col-span-2">Preferred time <span className="text-[var(--plum)]">*</span>
                <select className={`${inputClass('time')} mt-2`} value={values.time} onChange={(e) => update('time', e.target.value)} aria-invalid={!!errors.time} aria-describedby={errors.time ? 'error-time' : undefined} required data-testid="select-enquiry-time">
                  <option value="">Choose a preferred time</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Flexible</option>
                </select>
                {errors.time && <span id="error-time" className="mt-1 block text-xs text-red-800">{errors.time}</span>}
              </label>
              <label className="block text-[.74rem] font-semibold text-[var(--charcoal)] sm:col-span-2">Anything else you’d like us to know? <span className="font-normal text-[#82777d]">(optional)</span>
                <textarea className="field mt-2 min-h-[100px] resize-y" value={values.message} onChange={(e) => update('message', e.target.value)} placeholder="Share a little about what you have in mind…" data-testid="textarea-enquiry-message"/>
              </label>
            </div>
            {formMessage && <motion.p key={formMessage} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`mt-5 text-[.82rem] leading-relaxed ${Object.keys(errors).length ? 'text-red-800' : 'text-[var(--plum)]'}`} role="status" aria-live="polite" data-testid="status-enquiry">{formMessage}</motion.p>}
            <div className="mt-6 flex flex-col gap-3">
              <button type="submit" className="button-primary w-full" data-testid="button-submit-enquiry">Prepare WhatsApp enquiry <MessageCircle size={16}/></button>
              {preparedUrl && <motion.a initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }} href={preparedUrl} target="_blank" rel="noopener noreferrer" className="button-outline w-full" data-testid="link-send-whatsapp">Continue to WhatsApp <ArrowUpRight size={15}/></motion.a>}
              <p className="text-center text-[.67rem] leading-relaxed text-[#756a70]">Your details are not sent by this page. WhatsApp opens with a prefilled message; the salon must confirm availability. Or <a className="underline underline-offset-2" href={`tel:${phoneNumber}`} data-testid="link-enquiry-call-fallback">call 09038275845</a>.</p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>);
}
function Contact() {
    const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(`Manna's Salon, ${address}`)}&z=16&hl=en&output=embed`;
    // Only show the iframe when Google Maps is reachable; otherwise keep the fallback card visible.
    const [canEmbed, setCanEmbed] = useState(false);
    useEffect(() => {
        const controller = new AbortController();
        fetch('https://maps.google.com/maps', { mode: 'no-cors', signal: controller.signal })
            .then(() => setCanEmbed(true))
            .catch(() => setCanEmbed(false));
        return () => controller.abort();
    }, []);
    return (<section id="contact" className="section-pad bg-[var(--ivory)]">
      <div className="shell">
        <Reveal className="mb-10 grid gap-6 md:grid-cols-[1fr_.8fr] md:items-end">
          <SectionHeading eyebrow="COME SAY HELLO" title="Find us in Wireless Park." description="A little beauty destination on Chandi Ghosh Road, Kolkata. We’d love to hear from you."/>
          <p className="flex items-center gap-3 text-[.78rem] text-[#786d72] md:justify-end"><Clock3 size={16} className="text-[var(--champagne)]"/> Please call to discuss a convenient visit.</p>
        </Reveal>
        <Reveal className="grid overflow-hidden border border-[#e3d7d1] md:grid-cols-[.75fr_1.25fr]">
          <div className="flex flex-col justify-between bg-[var(--beige)] p-7 sm:p-10">
            <div>
              <span className="serif text-[1.8rem] text-[var(--plum)]">Manna’s Salon</span>
              <div className="mt-8 space-y-6">
                <div className="flex gap-4"><Phone size={17} className="mt-1 shrink-0 text-[var(--champagne)]"/><div><span className="eyebrow text-[#75686f]">GIVE US A CALL</span><a href={`tel:${phoneNumber}`} className="mt-1 block text-[1rem] text-[var(--plum)] underline-offset-4 hover:underline" data-testid="link-contact-phone">09038275845</a></div></div>
                <div className="flex gap-4"><MapPin size={18} className="mt-1 shrink-0 text-[var(--champagne)]"/><div><span className="eyebrow text-[#75686f]">COME FIND US</span><p className="mt-1 max-w-[270px] text-[.9rem] leading-[1.7] text-[var(--charcoal)]" data-testid="text-contact-address">{address}</p></div></div>
              </div>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`tel:${phoneNumber}`} className="button-primary !px-5" data-testid="button-call-now"><Phone size={15}/> Call now</a>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="button-outline !px-5" data-testid="button-contact-directions">Get directions <ArrowUpRight size={15}/></a>
            </div>
          </div>
          <div className="relative min-h-[320px] bg-[#e8ded8] sm:min-h-[390px]">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center" style={{ backgroundImage: 'linear-gradient(rgba(84,35,68,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(84,35,68,.06) 1px, transparent 1px)', backgroundSize: '44px 44px' }}>
              <motion.span initial={{ y: -14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }} className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--ivory)] shadow-lg"><MapPin size={24} /></motion.span>
              <span className="serif text-[1.5rem] text-[var(--plum)]">Manna’s Salon</span>
              <p className="max-w-[300px] text-[.85rem] leading-[1.7] text-[var(--charcoal)]">{address}</p>
              <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="button-primary mt-2" data-testid="link-map-open">Open in Google Maps <ArrowUpRight size={15} /></a>
            </div>
            {canEmbed && <iframe title={`Map showing the area around Manna’s Salon at ${address}`} src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0"/>}
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 flex items-center gap-2 bg-[var(--ivory)] px-4 py-3 text-[.7rem] font-semibold uppercase tracking-wider text-[var(--plum)] shadow-md" data-testid="link-map-directions">Open directions <ArrowUpRight size={14}/></a>
          </div>
        </Reveal>
      </div>
    </section>);
}
function Footer() {
    return (<footer className="bg-[#31222d] pb-24 pt-14 text-[var(--ivory)] md:pb-8">
      <div className="shell">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-[1.2fr_.8fr_1fr]">
          <div>
            <a href="#home" className="serif text-[1.75rem] text-[var(--ivory)]" data-testid="footer-home">Manna’s Salon</a>
            <p className="mt-3 max-w-[320px] text-[.82rem] leading-[1.8] text-white/65">A thoughtful, personal beauty destination in Kolkata. Come as you are; leave feeling more like yourself.</p>
          </div>
          <div>
            <p className="eyebrow text-[var(--champagne)]">EXPLORE</p>
            <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-[.8rem] text-white/75" aria-label="Footer navigation">
              {[['About', '#about'], ['Services', '#services'], ['Gallery', '#gallery'], ['Reviews', '#reviews'], ['Contact', '#contact']].map(([label, href]) => <a key={label} href={href} className="hover:text-[var(--blush)]" data-testid={`footer-nav-${label.toLowerCase()}`}>{label}</a>)}
            </nav>
          </div>
          <div>
            <p className="eyebrow text-[var(--champagne)]">COME SAY HELLO</p>
            <a href={`tel:${phoneNumber}`} className="mt-4 block text-[.88rem] text-white/85 hover:text-[var(--blush)]" data-testid="footer-phone">09038275845</a>
            <p className="mt-2 max-w-[310px] text-[.78rem] leading-[1.65] text-white/60">{address}</p>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-[.73rem] text-[var(--blush)] underline underline-offset-4" data-testid="footer-directions">Get directions <ArrowUpRight size={13}/></a>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 pt-5 text-[.68rem] text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Manna’s Salon. All rights reserved.</span>
          <span>Made with care in Kolkata.</span>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-[#d9c9c6] bg-[rgba(255,249,245,.97)] p-3 shadow-[0_-8px_28px_rgba(53,34,45,.08)] backdrop-blur-md md:hidden">
        <a href={`tel:${phoneNumber}`} className="button-outline min-h-[2.8rem] flex-1 !px-3" data-testid="mobile-call"><Phone size={15}/> Call</a>
        <a href="#enquiry" className="button-primary min-h-[2.8rem] flex-[1.5] !px-3" data-testid="mobile-enquire">Enquire about a visit <ArrowUpRight size={15}/></a>
      </div>
    </footer>);
}
function Home() {
    return (<>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--ivory)] focus:p-3 focus:text-[var(--plum)]">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero /><About /><Services /><Experience /><Gallery /><Reviews /><Enquiry /><Contact />
      </main>
      <Footer />
    </>);
}
function App() {
    return (<MotionConfig reducedMotion="user">
      <Home />
    </MotionConfig>);
}
export default App;
