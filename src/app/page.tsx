"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/SmartImage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Calendar,
  Clock,
  ArrowRight,
  Shield,
  Heart,
  Award,
  Crown,
  Cross,
  Users,
  HandHeart,
  BookOpen,
  Church
} from "lucide-react";
import { useEffect, useRef, useState, useCallback, useMemo, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import * as React from "react";

// Lightbox Context to manage modal open state
interface LightboxContextValue {
  open: (index: number) => void;
}
const LightboxContext = React.createContext<LightboxContextValue | null>(null);

function useLightbox() {
  const ctx = React.useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within LightboxProvider");
  return ctx;
}

const LightboxProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const open = useCallback((i: number) => {
    setIndex(i);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const next = useCallback(() => {
    setIndex(prev => (prev + 1) % resultsMedia.length);
  }, []);
  const prev = useCallback(() => {
    setIndex(prev => (prev - 1 + resultsMedia.length) % resultsMedia.length);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close, next, prev]);

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-white/10 shadow-2xl bg-black">
                {resultsMedia[index].type === 'image' && (
                  <Image
                    src={resultsMedia[index].src}
                    alt={resultsMedia[index].alt}
                    fill
                    sizes="100vw"
                    quality={95}
                    className="object-contain"
                    priority
                  />
                )}
              </div>
              {/* Controls */}
              <button onClick={close} className="absolute top-3 right-3 text-white/80 hover:text-white text-sm bg-black/40 px-3 py-1 rounded-full">Close</button>
              <button onClick={prev} className="absolute top-1/2 -left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center">‹</button>
              <button onClick={next} className="absolute top-1/2 -right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center">›</button>
              <div className="mt-4 flex justify-center gap-2">
                {resultsMedia.map((m, i) => (
                  <button
                    key={m.src + i}
                    onClick={() => setIndex(i)}
                    className={`h-2 w-2 rounded-full ${i===index?'bg-white':'bg-white/40 hover:bg-white/70'}`}
                    aria-label={`Go to slide ${i+1}`}
                  />
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-white/60 tracking-wide">{resultsMedia[index].alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
};

// Carousel component for gallery
function GalleryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', dragFree: false });
  const { open } = useLightbox();
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative" aria-label="Spaces & Atmosphere carousel">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {resultsMedia.map((item, idx) => (
            <motion.div
              key={item.src}
              className="relative min-w-[80%] sm:min-w-[55%] md:min-w-[40%] lg:min-w-[30%] aspect-[4/3] overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              whileHover={{ y: -6 }}
              onClick={() => open(idx)}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width:640px) 80vw, (max-width:768px) 55vw, (max-width:1024px) 40vw, 30vw"
                  quality={90}
                  className="object-contain bg-black transition-all duration-700"
                  priority={idx < 2}
                />
              ) : (
                <LazyVideo src={item.src} className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 text-white/90 text-sm font-medium drop-shadow">
                {item.alt}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Prev/Next Buttons */}
      <div className="absolute -top-16 right-0 flex items-center gap-2">
        <button
          onClick={() => emblaApi && emblaApi.scrollPrev()}
          className="px-3 py-2 rounded-md bg-gray-900/70 text-white text-xs hover:bg-gray-900/90"
        >Prev</button>
        <button
          onClick={() => emblaApi && emblaApi.scrollNext()}
          className="px-3 py-2 rounded-md bg-gray-900/70 text-white text-xs hover:bg-gray-900/90"
        >Next</button>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {resultsMedia.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2.5 w-2.5 rounded-full ${i===selected?'bg-emerald-600':'bg-gray-300 hover:bg-gray-400'} transition-colors`}
            aria-label={`Go to slide ${i+1}`}
          />
        ))}
      </div>
    </div>
  );
}

const homeServices = [
  {
    id: "ministry-healing",
    title: "Healing Ministry",
    subtitle: "Restoration & Hope",
    duration: "Every Sunday",
    price: "Free for All",
    popular: true,
    image: "/pastor-action.jpeg",
    description: "Experience God's healing power through prayer, laying of hands, and divine intervention. Witness testimonies of transformed lives."
  },
  {
    id: "ministry-leadership",
    title: "Leadership Development",
    subtitle: "Future Leaders",
    duration: "Monthly Program",
    price: "Investment in Tomorrow",
    popular: true,
    image: "/board2.jpeg",
    description: "Developing godly leaders for tomorrow. Character building, spiritual growth, and practical leadership skills rooted in Christ."
  },
  {
    id: "ministry-outreach",
    title: "Street Outreach",
    subtitle: "Changing Lives",
    duration: "Weekly Missions",
    price: "Heart for the Lost",
    popular: true,
    image: "/helping9.jpeg",
    description: "Returning to the streets where Apostle Elijah once lived. Sharing hope, providing meals, and demonstrating Christ's love to the vulnerable."
  },
  {
    id: "ministry-worship",
    title: "Worship & Fellowship",
    subtitle: "Spirit-filled Gathering",
    duration: "Multiple Services",
    price: "Come as You Are",
    popular: false,
    image: "/croud3.jpeg",
    description: "Authentic worship, powerful preaching, and genuine fellowship. Experience God's presence in a welcoming community atmosphere."
  }
];

// (removed unused testimonials array)

// Spaces & Atmosphere gallery media — using real hotel/public images
// Keep only images for performance & consistency
type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string; poster?: string };

const resultsMedia: MediaItem[] = [
  { type: "image", src: "/poolpit.jpeg", alt: "Worship at the pulpit" },
  { type: "image", src: "/croud2.jpeg", alt: "Congregation in praise" },
  { type: "image", src: "/croud3.jpeg", alt: "Spirit-filled worship service" },
  { type: "image", src: "/board2.jpeg", alt: "Leadership and discipleship class" },
  { type: "image", src: "/helping6.jpeg", alt: "Community outreach and serving" },
  { type: "image", src: "/helping8.jpeg", alt: "Feeding program blessing the community" },
  { type: "image", src: "/pastor3.jpeg", alt: "Prayer and counseling" },
  { type: "image", src: "/general3.jpeg", alt: "Fellowship and connection" },
  { type: "image", src: "/board.jpeg", alt: "Bible study and teaching" },
  // Example video item (uncomment to use):
  // { type: "video", src: "/ministry-tour.mp4", alt: "Ministry walkthrough", poster: "/ministry-poster.jpg" },
];

// Lightweight lazy video that only loads when near viewport
function LazyVideo({ 
  src, 
  poster, 
  className, 
  muted, 
  loop, 
  playsInline, 
  autoPlay,
  ...props 
}: { 
  src: string; 
  poster?: string; 
  className?: string;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  autoPlay?: boolean;
} & React.VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (active && ref.current) {
      // Set src and load to ensure the browser fetches the video once visible
      if (ref.current.src !== window.location.origin + src) {
        ref.current.src = src;
      }
      try {
        ref.current.load();
        // Auto play the video if autoPlay is enabled
        if (autoPlay && muted) {
          ref.current.play().catch(() => {
            // Auto-play failed, which is normal in some browsers
          });
        }
      } catch {
        // no-op
      }
    }
  }, [active, src, autoPlay, muted]);

  return (
    <video
      ref={ref}
      className={className}
      controls={!autoPlay}
      playsInline={playsInline}
      preload={active ? "metadata" : "none"}
      poster={poster}
      muted={muted}
      loop={loop}
      autoPlay={autoPlay}
  {...props}
    />
  );
}

// Simple crossfade slideshow background component
function Slideshow({ images, interval = 6000 }: { images: string[]; interval?: number }) {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);
  return (
    <div className="absolute inset-0">
      {images.map((src, i) => (
        <motion.div
          key={src + i}
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          style={{ pointerEvents: 'none' }}
        >
          <Image
            src={src}
            alt="Hero background"
            fill
            priority={i === 0}
            sizes="100vw"
            quality={95}
            className="object-contain object-center will-change-transform"
          />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Motion variants for cleaner, modern staggered animations
  const containerStagger: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  // Subtle interactive tilt for hero media
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXspring = useSpring(tiltX, { stiffness: 120, damping: 12 });
  const tiltspringY = useSpring(tiltY, { stiffness: 120, damping: 12 });

  const onHeroMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -10; // -10deg to 10deg
    const ry = ((x - rect.width / 2) / rect.width) * 10;
    tiltX.set(rx);
    tiltY.set(ry);
  };

  const onHeroMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div className="overflow-hidden">
      {/* Floating Quick Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[48] md:hidden">
  <div className="flex items-center gap-3 px-4 py-3 rounded-full backdrop-blur-xl bg-white/70 shadow-lg shadow-emerald-900/10 border border-white/40">
          <Link href="/services" className="flex flex-col items-center text-[10px] font-medium text-gray-700">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Church className="w-5 h-5" />
            </div>
            <span className="mt-1">Ministry</span>
          </Link>
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-emerald-300/50 to-transparent" />
          <a
            href="https://wa.me/27762073299?text=Hi%20Elijah%20Church%20of%20Christ%2C%20I'd%20like%20to%20join%20your%20service."
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-[10px] font-medium text-gray-700"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md">WA</div>
            <span className="mt-1">Join Us</span>
          </a>
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-emerald-300/50 to-transparent" />
          <Link href="/contact" className="flex flex-col items-center text-[10px] font-medium text-gray-700">
            <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-md">
              <HandHeart className="w-5 h-5" />
            </div>
            <span className="mt-1">Prayer</span>
          </Link>
        </div>
      </div>
      {/* Hero Section — clean minimalist with crossfade slideshow */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
  {/* Background slideshow */}
  <Slideshow images={["/poolpit.jpeg","/croud2.jpeg","/board.jpeg","/helping4.jpeg"]} />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.65))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)] mix-blend-overlay" />
        {/* Content */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
          className="relative z-10 w-full px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 mb-8"
              initial={{ opacity:0, y:10 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.3 }}
            >
              <Cross className="w-4 h-4 text-emerald-300" />
              <span className="text-[11px] tracking-[0.25em] font-medium">ELIJAH CHURCH OF CHRIST</span>
            </motion.div>
            <motion.h1
              initial={{ opacity:0, y:24 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.45, duration:0.9 }}
              className="font-semibold leading-[1.05] text-white text-4xl sm:text-5xl md:text-[4rem] md:leading-[1.05] tracking-tight"
            >
              Changing Lives. Healing Hearts.
              <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-200 text-2xl md:text-3xl font-light tracking-wide">Founded on the Rock of Jesus Christ</span>
            </motion.h1>
            <motion.p
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.7, duration:0.7 }}
              className="mt-8 text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            >
              "Without being kind to one another we can't please God" - Apostle Elijah. Join us as we serve the Lord through love, compassion, and transforming lives from the streets to the sanctuary.
            </motion.p>
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.85, duration:0.6 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/about" className="group relative">
                <Button size="lg" className="rounded-full px-10 py-6 bg-emerald-600 hover:bg-emerald-500 text-white text-base shadow-lg shadow-emerald-900/30">
                  Our Story
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="rounded-full px-10 py-6 border-white/30 text-white hover:bg-white/10">
                  Join Us Sunday
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity:0, y:10 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:1.05 }}
              className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto text-left text-white/70"
            >
              {[
                {label:'Foundation', value:'Matthew 7:24'},
                {label:'Mission', value:'Healing'},
                {label:'Heart', value:'Serving'}
              ].map(s => (
                <div key={s.label} className="space-y-1">
                  <div className="text-[11px] uppercase tracking-wide text-white/40">{s.label}</div>
                  <div className="font-medium text-white">{s.value}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center"
          animate={{ opacity:[0.3,1,0.3] }}
          transition={{ duration:2.8, repeat:Infinity }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/70 to-white/0" />
          <div className="mt-3 text-[10px] tracking-[0.3em] text-white/60">SCROLL</div>
        </motion.div>
      </section>

      {/* Services Preview (styled like Services page, with images) */}
      <section className="section-padding skincare-gradient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div
              variants={itemFadeUp}
              className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4"
            >
              ✨ Ministry & Outreach
            </motion.div>
            <motion.h2 
              variants={itemFadeUp} 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              whileInView={{ 
                background: [
                  "linear-gradient(90deg, #059669, #10b981)",
                  "linear-gradient(90deg, #10b981, #14b8a6)",
                  "linear-gradient(90deg, #14b8a6, #10b981)",
                  "linear-gradient(90deg, #10b981, #059669)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Our Ministry
            </motion.h2>
            <motion.p 
              variants={itemFadeUp} 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              whileInView={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Dedicated to changing lives, healing hearts, and producing future leaders for a godly world. Built on the foundation of Jesus Christ who died for our sins.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {homeServices.map((service, index) => (
              <motion.div 
                key={service.id} 
                variants={itemFadeUp} 
                className="group"
                whileHover={{ 
                  y: -12,
                  rotateY: 5,
                  scale: 1.02
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  duration: 0.4 
                }}
              >
                <Card className="h-full bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  
                  <CardContent className="p-0 relative z-10">
                    {/* Service Image with Enhanced Effects */}
                    <div className="relative h-56 overflow-hidden">
                      <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full h-full">
                        <SmartImage
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 100vw"
                          className="object-cover w-full h-full"
                          priority={index < 2}
                          asMotion={false}
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>

                      {/* Animated overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      {service.popular && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                        >
                          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
                            🙏 Core Ministry
                          </Badge>
                        </motion.div>
                      )}

                      <motion.div 
                        className="absolute bottom-4 left-4 right-4"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between items-center text-white drop-shadow-lg">
                          <div className="flex items-center space-x-4">
                            <motion.div 
                              className="flex items-center bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Clock className="w-4 h-4 mr-1" />
                              <span className="text-sm font-medium">{service.duration}</span>
                            </motion.div>
                            <motion.div 
                              className="flex items-center bg-emerald-500/80 px-2 py-1 rounded-full backdrop-blur-sm"
                              whileHover={{ scale: 1.1 }}
                            >
                              <span className="text-sm font-bold">{service.price}</span>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Service Content with Enhanced Animations */}
                    <div className="p-6 space-y-4">
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-emerald-600 text-sm font-medium">
                          {service.subtitle}
                        </p>
                      </motion.div>

                      <motion.p 
                        className="text-gray-600 text-sm leading-relaxed line-clamp-3"
                        whileHover={{ color: "#374151" }}
                        transition={{ duration: 0.2 }}
                      >
                        {service.description}
                      </motion.p>

                      <motion.div 
                        className="pt-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button asChild className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 group shadow-lg hover:shadow-xl transition-all duration-300">
                          <a
                            href={`https://wa.me/27762073299?text=${encodeURIComponent(`Hi Elijah Church of Christ, I'd like to learn more about ${service.title}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="flex items-center justify-center">
                              Learn More
                            </span>
                            <motion.span
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="inline-flex ml-2"
                            >
                              <ArrowRight className="h-4 w-4" />
                            </motion.span>
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Spaces & Atmosphere Section with Carousel & Lightbox */}
      <section className="section-padding bg-white" id="ministry-gallery">
        <LightboxProvider>
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="text-center mb-16"
            >
              <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Ministry & Fellowship
              </motion.h2>
              <motion.p variants={itemFadeUp} className="text-xl text-gray-600">
                Glimpses of our church community, worship spaces, and fellowship activities where lives are transformed.
              </motion.p>
            </motion.div>
            <GalleryCarousel />
          </div>
        </LightboxProvider>
      </section>

      {/* Why Join Us Section */}
  <section className="section-padding bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Why Join Our Church?
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on the foundation of Jesus Christ, our ministry focuses on changing lives, healing, and producing future leaders for a godly world.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Cross,
                title: "Biblical Foundation",
                description: "Built on Matthew 7:24 - the solid rock of Jesus Christ",
                stat: "Mat 7:24",
                statLabel: "Foundation"
              },
              {
                icon: Heart,
                title: "Healing Ministry",
                description: "Experience God's healing power through prayer and faith",
                stat: "Healing",
                statLabel: "Hearts"
              },
              {
                icon: Users,
                title: "Street Outreach",
                description: "Reaching the lost and demonstrating Christ's love to all",
                stat: "Weekly",
                statLabel: "Outreach"
              },
              {
                icon: Crown,
                title: "Leadership Development",
                description: "Producing future leaders for a better godly world",
                stat: "Future",
                statLabel: "Leaders"
              }
            ].map((feature, index) => (
              <motion.div key={feature.title} variants={itemFadeUp}>
                <Card className="h-full text-center p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <CardContent className="space-y-6">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-6 relative"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <feature.icon className="w-full h-full text-emerald-600" />
                      <div className="absolute inset-0 rounded-full bg-emerald-100 -z-10 group-hover:bg-emerald-200 transition-colors"></div>
                    </motion.div>
                    
                    <motion.div
                      className="text-3xl font-bold animated-text-gradient mb-2"
                      whileInView={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {feature.stat}
                    </motion.div>
                    <div className="text-sm text-emerald-600 font-medium mb-4">{feature.statLabel}</div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Mission & Vision
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rooted in Matthew 7:24, we exist to preach Christ, make disciples, and serve our city with compassion—building on the solid Rock.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div variants={itemFadeUp} className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <Cross className="w-6 h-6 text-emerald-600" />
                <h3 className="text-2xl font-semibold text-gray-900">Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To proclaim the Gospel of Jesus Christ, heal the broken, and raise leaders who transform families and communities through love, faith, and service.
              </p>
              <ul className="mt-4 text-gray-700 space-y-2">
                <li>• Preach Christ crucified and risen</li>
                <li>• Equip believers for ministry</li>
                <li>• Serve the poor and vulnerable</li>
              </ul>
            </motion.div>
            <motion.div variants={itemFadeUp} className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-6 h-6 text-emerald-700" />
                <h3 className="text-2xl font-semibold text-gray-900">Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                A vibrant Christ-centered church where lives are changed, families restored, and future leaders are released to impact the nations for God’s glory.
              </p>
              <ul className="mt-4 text-gray-700 space-y-2">
                <li>• A house of prayer for all</li>
                <li>• A training ground for leaders</li>
                <li>• A beacon of hope in our city</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ministry Highlights */}
      <section className="section-padding bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Ministry Highlights
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ways we grow, serve, and witness Christ’s power together.
            </motion.p>
          </motion.div>
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Cross, title: "Evangelism", text: "Sharing Jesus in streets, homes, and workplaces." },
              { icon: BookOpen, title: "Teaching", text: "Bible studies and discipleship tracks for all ages." },
              { icon: Church, title: "Worship", text: "Spirit-led worship encounters centered on Christ." },
              { icon: Users, title: "Youth & Kids", text: "Raising a generation that knows and follows God." },
              { icon: HandHeart, title: "Compassion", text: "Feeding programs and practical care to the needy." },
              { icon: Shield, title: "Prayer", text: "Intercession, counseling, and healing ministry." },
            ].map((m, i) => (
              <motion.div key={m.title} variants={itemFadeUp} whileHover={{ y: -6 }} className="p-6 bg-white rounded-xl border border-gray-100 shadow hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <m.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{m.title}</h3>
                <p className="text-gray-600">{m.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Church Journey Process */}
      <section className="section-padding skincare-gradient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Journey With Us
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our family of believers and experience transformation through Christ's love and community fellowship.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                step: "01",
                title: "Visit Us",
                description: "Come as you are to experience authentic worship",
                icon: "�️",
                duration: "Sunday"
              },
              {
                step: "02", 
                title: "Connect",
                description: "Meet our community and share your journey with us",
                icon: "🤝",
                duration: "Fellowship"
              },
              {
                step: "03",
                title: "Grow",
                description: "Participate in ministry, healing, and leadership development",
                icon: "�",
                duration: "Weekly"
              },
              {
                step: "04",
                title: "Serve",
                description: "Join our outreach and help change lives in the community",
                icon: "❤️",
                duration: "Ministry"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                variants={itemFadeUp}
                className="text-center relative"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Animated Connecting Line */}
                {index < 3 && (
                  <motion.div 
                    className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-emerald-300 to-teal-200 z-0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                    style={{ originX: 0 }}
                  />
                )}
                
                <div className="relative z-10">
                  {/* Enhanced Step Circle */}
                  <motion.div 
                    className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-lg relative overflow-hidden group cursor-pointer"
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 10,
                      boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 15 
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    style={{ 
                      transitionDelay: `${index * 150}ms` 
                    }}
                  >
                    {/* Pulsing background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-emerald-200 to-teal-200 rounded-full"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                    
                    {/* Icon with bounce */}
                    <motion.span 
                      className="text-2xl mb-1 relative z-10"
                      animate={{ 
                        y: [0, -2, 0] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    >
                      {step.icon}
                    </motion.span>
                    
                    {/* Step number badge */}
                    <motion.div 
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 360
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.step}
                    </motion.div>
                    
                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 border-2 border-emerald-300 rounded-full opacity-0"
                      animate={{ 
                        scale: [1, 2], 
                        opacity: [0.5, 0] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.4
                      }}
                    />
                  </motion.div>
                  
                  {/* Step content with enhanced animations */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.h3 
                      className="text-xl font-semibold text-gray-900 mb-3"
                      whileInView={{ 
                        color: ["#111827", "#059669", "#111827"]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                      viewport={{ once: true }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 mb-3 leading-relaxed"
                      whileHover={{ color: "#374151" }}
                      transition={{ duration: 0.2 }}
                    >
                      {step.description}
                    </motion.p>
                    <motion.div 
                      className="text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full inline-block"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "#ecfdf5"
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      ⏱️ {step.duration}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600">
              Everything you need to know about visiting Elijah Church of Christ
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            {[ 
              {
                q: "What time are services?",
                a: "Sunday Service 10:00 AM. Midweek Prayer Wednesday 6:00 PM. Youth & Teens Saturday 10:00 AM. Join us a few minutes early to connect."
              },
              {
                q: "What should I wear?",
                a: "Come as you are. Some dress casual, some dress formal—everyone is welcome."
              },
              {
                q: "Is there children’s ministry?",
                a: "Yes. Children’s Church runs during the main service. Check‑in opens 15 minutes before service."
              },
              {
                q: "Is parking available?",
                a: "Yes, free on‑site parking with volunteer assistance. Please follow the directions when you arrive."
              },
              {
                q: "How can I receive prayer or counseling?",
                a: "Our prayer team is available after every service. You can also request a confidential appointment via our Contact page."
              },
              {
                q: "How can I give or partner with the church?",
                a: "You can give during service, online, or via WhatsApp. We appreciate your partnership in advancing the Gospel."
              }
            ].map((faq, index) => (
              <motion.div key={index} variants={itemFadeUp}>
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-sm font-bold mr-3">
                        Q
                      </span>
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 ml-11 leading-relaxed">
                      {faq.a}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonies */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.div
              variants={itemFadeUp}
              className="inline-flex items-center space-x-3 mb-8"
            >
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Praise Reports</span>
              </div>
            </motion.div>
            
            <motion.h2 
              variants={itemFadeUp} 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Testimonies
            </motion.h2>
            <motion.p 
              variants={itemFadeUp} 
              className="text-lg text-gray-600"
            >
              Stories of healing and transformation at Elijah Church of Christ
            </motion.p>
          </motion.div>
          {/* Google-style Reviews Grid */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            {[
              {
                name: "Thandi M.",
                avatar: "TM",
                rating: 5,
                date: "2 weeks ago",
                review: "I came heavy‑hearted and left with peace. The prayer team stood with me, and I witnessed God’s hand restoring my family.",
                helpful: 9
              },
              {
                name: "James R.", 
                avatar: "JR", 
                rating: 5,
                date: "1 month ago",
                review: "Powerful worship and practical teaching. I felt welcomed from the moment I walked in—this church has become my family.",
                helpful: 6
              },
              {
                name: "Ayesha P.",
                avatar: "AP",
                rating: 5,
                date: "3 weeks ago", 
                review: "My child loves the Children’s Church and looks forward to Sundays. We’ve seen real growth in our home since coming to ECC.",
                helpful: 11
              }
            ].map((review, index) => (
              <motion.div
                key={review.name}
                variants={itemFadeUp}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 group max-w-4xl mx-auto"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* User Avatar */}
                    <motion.div 
                      className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {review.avatar}
                    </motion.div>
                    <div>
                      <motion.h4 
                        className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                        whileHover={{ x: 2 }}
                      >
                        {review.name}
                      </motion.h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{review.date}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          <span>Johannesburg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* More options button */}
                  <motion.button 
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                    </svg>
                  </motion.button>
                </div>

                {/* Star Rating */}
                <motion.div 
                  className="flex items-center space-x-1 mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {[...Array(review.rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: index * 0.1 + i * 0.05 + 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </motion.svg>
                  ))}
                </motion.div>

                {/* Review Text */}
                <motion.p 
                  className="text-gray-700 leading-relaxed mb-4 text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                >
                  {review.review}
                </motion.p>

                {/* Review Actions */}
                <motion.div 
                  className="flex items-center justify-between pt-3 border-t border-gray-100"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                >
                  <div className="flex items-center space-x-4">
                    {/* Helpful button */}
                    <motion.button 
                      className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 6v11.5m0 0L7 20"/>
                      </svg>
                      <span>Helpful ({review.helpful})</span>
                    </motion.button>

                    {/* Share button */}
                    <motion.button 
                      className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                      </svg>
                      <span>Share</span>
                    </motion.button>
                  </div>

                  {/* Google verified checkmark */}
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Verified</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-white mb-8"
              animate={{ textShadow: ["0 0 18px rgba(255,255,255,0.4)", "0 0 36px rgba(255,255,255,0.7)", "0 0 18px rgba(255,255,255,0.4)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to Visit or Need Prayer?
            </motion.h2>
            
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              We’d love to meet you. Reach out for prayer, plan your visit, or ask about ministries and serving opportunities.
            </p>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center space-x-8 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">3 Services</div>
                  <div className="text-sm opacity-80">Sunday • Midweek • Youth</div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Prayer</div>
                  <div className="text-sm opacity-80">Confidential Support</div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Family</div>
                  <div className="text-sm opacity-80">Welcoming Community</div>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <Link href="https://wa.me/27762073299?text=Hi%20Elijah%20Church%20of%20Christ%2C%20I'd%20like%20to%20plan%20a%20visit%20and%20request%20prayer." target="_blank">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50 text-lg px-12 py-6 rounded-full group shadow-2xl">
        <Calendar className="mr-2 h-5 w-5" />
        WhatsApp Us
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="inline-block w-5">→</span>
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              
      <Link href="/services">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-12 py-6 rounded-full">
        Explore Ministries
                  </Button>
                </motion.div>
              </Link>
            </div>

            <motion.div 
              className="text-white/80 text-sm mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p>✓ Warm welcome • ✓ Confidential prayer • ✓ Christ-centered community</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
