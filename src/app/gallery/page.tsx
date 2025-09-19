"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

// Church gallery media showcasing ministry work and community
const mediaData: Array<{ id: string; type: "image"; src: string; alt: string; tags: string[] }> = [
  { id: "g1", type: "image", src: "/poolpit.jpeg", alt: "Sunday worship at the pulpit", tags: ["worship", "sanctuary"] },
  { id: "g2", type: "image", src: "/croud2.jpeg", alt: "Congregation in praise", tags: ["worship", "community"] },
  { id: "g3", type: "image", src: "/helping6.jpeg", alt: "Children's ministry and serving together", tags: ["children", "ministry"] },
  { id: "g4", type: "image", src: "/board2.jpeg", alt: "Leadership and discipleship meeting", tags: ["leadership", "fellowship"] },
  { id: "g5", type: "image", src: "/helping9.jpeg", alt: "Street outreach ministry in action", tags: ["outreach", "ministry"] },
  { id: "g6", type: "image", src: "/general3.jpeg", alt: "Fellowship after service", tags: ["fellowship", "events"] },
  { id: "g7", type: "image", src: "/helping4.jpeg", alt: "Community meal service blessing families", tags: ["service", "outreach"] },
  { id: "g8", type: "image", src: "/board.jpeg", alt: "Bible study group gathering", tags: ["bible", "study"] },
  { id: "g9", type: "image", src: "/pastor3.jpeg", alt: "Counseling and prayer support", tags: ["restoration", "ministry", "counseling"] },
  { id: "g10", type: "image", src: "/past1.jpeg", alt: "Prayer time and intercession", tags: ["prayer", "counseling"] },
  { id: "g11", type: "image", src: "/main-pasto.jpeg", alt: "Healing prayer service", tags: ["healing", "prayer"] },
  { id: "g12", type: "image", src: "/croud3.jpeg", alt: "Community worship and celebration", tags: ["community", "worship"] },
  { id: "g13", type: "image", src: "/poolpit.jpeg", alt: "Apostle Elijah leading worship", tags: ["leadership", "worship"] },
];

const allTags = ["all", "worship", "ministry", "outreach", "community", "prayer", "fellowship", "youth", "children", "bible", "healing", "service", "events", "leadership", "study", "counseling", "restoration", "sanctuary"] as const;

type Tag = typeof allTags[number];

export default function GalleryPage() {
  const [tag, setTag] = useState<Tag>("all");
  const [lightbox, setLightbox] = useState<null | { id: string }>(null);

  const filtered = useMemo(() => {
    if (tag === "all") return mediaData;
    return mediaData.filter((m) => m.tags.includes(tag));
  }, [tag]);

  const openLightbox = useCallback((id: string) => setLightbox({ id }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  // Disable page scroll when lightbox is open
  useEffect(() => {
    if (lightbox) {
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
      };
    }
  }, [lightbox]);

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <section className="section-padding pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 mb-4"
            >
              <Filter className="w-4 h-4 mr-2" /> Our Ministry
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl sm:text-6xl font-bold tracking-tight"
            >
              Gallery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-gray-600 max-w-2xl mx-auto"
            >
              Witness the transformative power of faith through our ministry work, community outreach, and spiritual growth at Elijah Church of Christ.
            </motion.p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {allTags.map((t) => (
              <motion.button
                key={t}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTag(t)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  tag === t
                    ? "bg-emerald-500 text-white border-emerald-500 shadow"
                    : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:text-emerald-700"
                }`}
              >
                {t === "all" ? "All" : t[0].toUpperCase() + t.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry-ish responsive grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            transition={{ layout: { duration: 0.3 } }}
          >
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <Card className="overflow-hidden bg-white border border-gray-100 shadow hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
                    <CardContent className="p-0 relative">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                          priority={false}
                        />
                      </div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <Badge className="bg-emerald-500/90 text-white shadow">
                          Ministry
                        </Badge>
                        <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100" onClick={(e) => { e.preventDefault(); openLightbox(item.id); }}>
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0" onClick={closeLightbox} />
            <motion.button
              className="absolute top-6 right-6 text-white/90 hover:text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="w-7 h-7" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="relative max-w-5xl w-full"
            >
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden ring-1 ring-white/10">
                {(() => {
                  const active = mediaData.find((m) => m.id === lightbox.id)!;
                  return (
                    <Image
                      src={active.src}
                      alt={active.alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
