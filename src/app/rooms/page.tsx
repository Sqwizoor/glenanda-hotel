"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wifi, 
  Zap, 
  Star, 
  Users, 
  Bed, 
  Monitor, 
  Sparkles,
  ArrowRight,
  Eye,
  Calendar,
  Check
} from "lucide-react";
import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// Motion Variants (typed for TS compatibility)
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

// Church facilities and spaces for events and ministry
const roomTypes = [
  {
    id: 1,
    name: "Main Sanctuary",
    price: 0,
    originalPrice: 0,
  image: "/poolpit.jpeg",
    category: "Worship",
    size: "200 m²",
    guests: 300,
    beds: 0,
    description: "Our beautiful main sanctuary for worship services, weddings, and special events with state-of-the-art sound and lighting.",
    features: [
      "Professional Sound System",
      "Stage Lighting & AV Equipment",
      "Comfortable Seating for 300",
      "Air Conditioning & Heating",
      "Accessible Design",
      "Parking Available"
    ],
    amenities: [
      { icon: Users, name: "300 Capacity" },
      { icon: Monitor, name: "AV Equipment" },
      { icon: Zap, name: "Sound System" },
      { icon: Star, name: "Premium Venue" }
    ],
    rating: 4.9,
    reviews: 847
  },
  {
    id: 2,
    name: "Fellowship Hall",
    price: 150,
    originalPrice: 200,
  image: "/croud6.jpeg",
    category: "Events",
    size: "150 m²",
    guests: 150,
    beds: 0,
    description: "Perfect for community meals, meetings, workshops, and fellowship gatherings with full kitchen access.",
    features: [
      "Commercial Kitchen Access",
      "Flexible Seating Arrangements",
      "Sound System Included",
      "Tables & Chairs Available",
      "Parking & Easy Access",
      "Restroom Facilities"
    ],
    amenities: [
      { icon: Users, name: "150 Capacity" },
      { icon: Monitor, name: "Presentation Ready" },
      { icon: Zap, name: "Kitchen Access" },
      { icon: Star, name: "Community Space" }
    ],
    rating: 5.0,
    reviews: 423
  },
  {
    id: 3,
    name: "Children's Ministry Room",
    price: 75,
    originalPrice: 100,
  image: "/helping6.jpeg",
    category: "Ministry",
    size: "80 m²",
    guests: 50,
    beds: 0,
    description: "Dedicated space for children's programs, Sunday school, and youth activities with age-appropriate facilities.",
    features: [
      "Child-Safe Environment",
      "Educational Materials",
      "Play Area & Toys",
      "Restroom Facilities",
      "Supervision Areas",
      "Activity Stations"
    ],
    amenities: [
      { icon: Users, name: "50 Children" },
      { icon: Monitor, name: "Educational Tools" },
      { icon: Zap, name: "Safe Environment" },
      { icon: Star, name: "Family Friendly" }
    ],
    rating: 4.7,
    reviews: 1205
  },
  {
    id: 4,
    name: "Prayer Room",
    price: 0,
    originalPrice: 0,
  image: "/pastor3.jpeg",
    category: "Prayer",
    size: "30 m²",
    guests: 20,
    beds: 0,
    description: "Quiet sanctuary for personal prayer, counseling sessions, and small group meetings.",
    features: [
      "Peaceful Atmosphere",
      "Comfortable Seating",
      "Bible & Study Materials",
      "Sound Privacy",
      "Natural Lighting",
      "Accessible Entry"
    ],
    amenities: [
      { icon: Users, name: "Intimate Setting" },
      { icon: Monitor, name: "Study Resources" },
      { icon: Zap, name: "Quiet Space" },
      { icon: Star, name: "Spiritual Focus" }
    ],
    rating: 4.5,
    reviews: 892
  },
  {
    id: 5,
    name: "Conference Room",
    price: 100,
    originalPrice: 125,
  image: "/board2.jpeg",
    category: "Business",
    size: "60 m²",
    guests: 25,
    beds: 0,
    description: "Professional meeting space perfect for business meetings, training sessions, and community gatherings.",
    features: [
      "Conference Table Setup",
      "Presentation Equipment",
      "Whiteboard & Flipchart",
      "High-Speed Internet",
      "Refreshment Area",
      "Business Parking"
    ],
    amenities: [
      { icon: Users, name: "25 Person Boardroom" },
      { icon: Monitor, name: "Presentation Ready" },
      { icon: Zap, name: "Business Internet" },
      { icon: Star, name: "Professional Space" }
    ],
    rating: 4.8,
    reviews: 634
  },
  {
    id: 6,
    name: "Community Garden",
    price: 50,
    originalPrice: 75,
  image: "/general3.jpeg",
    category: "Outdoor",
    size: "500 m²",
    guests: 100,
    beds: 0,
    description: "Beautiful outdoor space for community events, picnics, and outdoor ministry activities.",
    features: [
      "Scenic Garden Setting",
      "Outdoor Pavilion",
      "BBQ Facilities",
      "Playground Area",
      "Accessible Pathways",
      "Parking Available"
    ],
    amenities: [
      { icon: Users, name: "100 Person Capacity" },
      { icon: Monitor, name: "Outdoor Events" },
      { icon: Zap, name: "BBQ Facilities" },
      { icon: Star, name: "Natural Beauty" }
    ],
    rating: 4.9,
    reviews: 721
  }
];

const filterOptions = [
  { value: "all", label: "All Facilities" },
  { value: "worship", label: "Worship" },
  { value: "events", label: "Events" },
  { value: "ministry", label: "Ministry" },
  { value: "prayer", label: "Prayer" },
  { value: "business", label: "Business" },
  { value: "outdoor", label: "Outdoor" }
];

export default function RoomsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const filteredRooms = useMemo(() => roomTypes.filter(room => 
    selectedFilter === "all" || room.category.toLowerCase() === selectedFilter
  ), [selectedFilter]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-32 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gradient font-['Orbitron'] mb-6">
              CHURCH FACILITIES
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Discover our beautiful facilities designed for worship, fellowship, and community service. 
              Each space is thoughtfully prepared to serve our congregation and community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {filterOptions.map((option) => (
              <motion.div variants={fadeUp} key={option.value}>
                <Button
                  variant={selectedFilter === option.value ? "default" : "outline"}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`cyber-button relative overflow-hidden group ${
                    selectedFilter === option.value 
                      ? "bg-blue-500/20 border-blue-400" 
                      : ""
                  }`}
                >
                  <span className="relative z-10">{option.label}</span>
                  <motion.span
                    layoutId="pill-highlight"
                    className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                onHoverStart={() => setHoveredRoom(room.id)}
                onHoverEnd={() => setHoveredRoom(null)}
                className="group relative"
              >
                <Card className="glass-morphism neon-border h-full hover:bg-white/10 transition-all duration-500 overflow-hidden">
                  {/* Room Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.div className="absolute inset-0" initial={{ scale: 1 }} whileHover={{ scale: 1.06 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        priority={index < 3}
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        className="object-cover object-center brightness-[0.85] group-hover:brightness-100 transition-all duration-700"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

                    {/* Floating specs */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: hoveredRoom === room.id ? 1 : 0, y: hoveredRoom === room.id ? 0 : 20 }}
                      transition={{ duration: 0.4 }}
                      className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-medium tracking-wide"
                    >
                      <span className="px-2 py-1 rounded-md bg-black/50 backdrop-blur text-white/80">{room.size}</span>
                      <span className="px-2 py-1 rounded-md bg-black/50 backdrop-blur text-white/80">{room.guests} Capacity</span>
                      <span className="px-2 py-1 rounded-md bg-black/50 backdrop-blur text-white/80">{room.category}</span>
                    </motion.div>

                    {/* Category Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-4 left-4"
                    >
                      <span className="bg-blue-500/30 backdrop-blur border border-blue-400/50 text-blue-200 px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-lg">
                        {room.category}
                      </span>
                    </motion.div>

                    {/* View Button */}
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: hoveredRoom === room.id ? 1 : 0, scale: hoveredRoom === room.id ? 1 : 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button size="sm" variant="outline" className="cyber-button">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </motion.div>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="flex justify-between items-start">
                      <div>
                        <motion.h3
                          className="text-xl font-semibold text-white font-['Orbitron'] mb-2"
                          variants={scaleIn}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true }}
                        >
                          {room.name}
                        </motion.h3>
                        <div className="flex items-center space-x-2 text-sm text-white/70">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{room.rating}</span>
                          <span>({room.reviews} reviews)</span>
                        </div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-right"
                      >
                        <div className="text-2xl font-bold text-gradient">
                          {room.price === 0 ? "FREE" : `R${room.price}`}
                        </div>
                        <div className="text-sm text-white/50 line-through">
                          {room.originalPrice > 0 ? `R${room.originalPrice}` : ""}
                        </div>
                        <div className="text-xs text-white/60">{room.price === 0 ? "Community Use" : "per hour"}</div>
                      </motion.div>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-white/70 leading-relaxed"
                    >
                      {room.description}
                    </motion.p>

                    {/* Amenities */}
                    <motion.div
                      className="grid grid-cols-2 gap-3"
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      variants={staggerContainer}
                    >
                      {room.amenities.map((amenity, i) => (
                        <motion.div
                          key={i}
                          variants={fadeUp}
                          className="flex items-center space-x-2 text-sm text-white/70"
                        >
                          <amenity.icon className="w-4 h-4 text-blue-400" />
                          <span>{amenity.name}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Features Preview */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white/80">Key Features:</h4>
                      <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-1"
                      >
                        {room.features.slice(0, 3).map((feature, i) => (
                          <motion.div
                            key={i}
                            variants={fadeUp}
                            className="flex items-center space-x-2 text-sm text-white/60"
                          >
                            <Check className="w-3 h-3 text-green-400" />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                        {room.features.length > 3 && (
                          <motion.div variants={fadeUp} className="text-xs text-blue-400">
                            +{room.features.length - 3} more features
                          </motion.div>
                        )}
                      </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                      className="flex space-x-3 pt-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    >
                      <Link href={`/booking?event=${room.id}`} className="flex-1">
                        <Button className="w-full cyber-button group">
                          <Calendar className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                          {room.price === 0 ? "Reserve" : "Book Now"}
                        </Button>
                      </Link>
                      <Button variant="outline" className="cyber-button group">
                        Details
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] mb-8">
              ADDITIONAL SERVICES
            </h2>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
              Enhance your event with our additional services designed to make your gathering 
              more comfortable and spiritually enriching.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
                {
                  title: "Catering Services",
                  description: "Professional meal preparation and service",
          price: "+R25/person"
                },
                {
                  title: "Audio/Visual Support",
                  description: "Technical support for presentations and events",
          price: "+R150/hour"
                },
                {
                  title: "Event Coordination",
                  description: "Professional planning and setup assistance",
          price: "+R200/event"
                }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="glass-morphism neon-border hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-6 text-center space-y-4">
                      <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                      <p className="text-white/70">{service.description}</p>
                      <div className="text-blue-400 font-semibold">{service.price}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Link href="/booking">
              <Button size="lg" className="cyber-button text-lg px-12 py-6 group">
                <Calendar className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Plan Your Event
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
