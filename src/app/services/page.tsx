"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Wifi, Coffee, BedDouble, UtensilsCrossed, Shield, Car, Dumbbell, Leaf, Clock, ArrowRight, Calendar, Check } from "lucide-react";
import Link from "next/link";

const amenityGroups = [
  {
    icon: Wifi,
    title: "Fast Fibre Wi‑Fi",
    description: "Uncapped, stable connectivity in rooms & shared spaces—ideal for streaming or remote work.",
    features: ["Multiple devices", "Secure network", "Lounge coverage", "No throttling"]
  },
  {
    icon: Coffee,
    title: "Complimentary Breakfast",
    description: "Fresh fruit, baked items, eggs to order and quality coffee served daily.",
    features: ["Local produce", "Barista style", "Early start option", "Herbal selection"]
  },
  {
    icon: BedDouble,
    title: "Restful Bedding",
    description: "Premium mattresses, blackout curtains and quiet ventilation for deeper sleep.",
    features: ["Anti‑allergy pillows", "Daily refresh", "Ambient lighting", "Extra blankets"]
  },
  {
    icon: UtensilsCrossed,
    title: "Casual Dining",
    description: "Simple, seasonal evening meals and light room service items.",
    features: ["Chef special", "Balanced plates", "Comfort seating", "House dessert"]
  },
  {
    icon: Car,
    title: "Secure Parking",
    description: "On‑site gated parking with CCTV coverage and nighttime supervision.",
    features: ["Monitored access", "Well lit", "Assistance on request", "EV readiness (soon)"]
  },
  {
    icon: Dumbbell,
    title: "Wellness Access",
    description: "Stretch area on property plus partner gym within short walking distance.",
    features: ["Daily passes", "Towels supplied", "Hydration station", "Route map"]
  }
];

const support = [
  { icon: Shield, title: "24/7 Assistance", text: "Responsive front desk & after‑hours support." },
  { icon: Leaf, title: "Eco Practices", text: "Towel reuse & efficient lighting reduce footprint." },
  { icon: Clock, title: "Flexible Check‑In", text: "Early arrival / late departure when available." }
];

const journey = [
  { step: "01", title: "Arrival", desc: "Swift check‑in & orientation" },
  { step: "02", title: "Settle In", desc: "Connect, refresh, explore spaces" },
  { step: "03", title: "Unwind / Work", desc: "Restful sleep or productive desk" },
  { step: "04", title: "Departure", desc: "Express checkout & onward help" }
];

export default function AmenitiesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center"
        >
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow border border-emerald-200 text-emerald-700 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" /> Amenities & Comfort
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
              Everything You Need<br />For A Comfortable Stay
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              We focus on the essentials done well—reliable connectivity, quality sleep, welcoming spaces and thoughtful everyday service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/rooms">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-5 rounded-xl">
                  <Calendar className="w-5 h-5 mr-2" /> View Rooms
                </Button>
              </Link>
              <Link href="/booking">
                <Button variant="outline" size="lg" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-5 rounded-xl">
                  Book Direct <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6">
            {amenityGroups.slice(0,4).map(a => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl p-6 bg-white border border-emerald-100 shadow-sm hover:shadow-md transition"
              >
                <a.icon className="w-8 h-8 text-emerald-600 mb-4" />
                <div className="font-semibold text-gray-900 mb-1">{a.title}</div>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{a.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Amenity Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Core Amenities
            </motion.h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Practical comforts designed around rest, productivity and relaxed downtime.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenityGroups.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition rounded-2xl">
                  <CardContent className="p-7 space-y-5">
                    <div className="flex items-center gap-3">
                      <a.icon className="w-8 h-8 text-emerald-600" />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{a.title}</h3>
                        <p className="text-sm text-emerald-600 font-medium">{a.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2 pt-2">
                      {a.features.slice(0,4).map(f => (
                        <div key={f} className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 text-emerald-500 mr-2" /> {f}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting Services */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Supporting Services</h2>
            <p className="text-gray-600 text-lg">Quiet layers of service that keep your stay effortless.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {support.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition rounded-2xl h-full">
                  <CardContent className="p-7 space-y-4 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                      <s.icon className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Journey */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Stay Flow</h2>
            <p className="text-gray-600 text-lg">Simple touchpoints from arrival to departure.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-10">
            {journey.map((j, i) => (
              <motion.div
                key={j.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-emerald-600">{j.step}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{j.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{j.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold"
          >
            Ready For A Comfortable Stay?
          </motion.h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Explore our room types then book directly for personal assistance and flexible arrangements.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/rooms">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 px-10 py-6 rounded-xl font-semibold">
                View Rooms <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/booking">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-10 py-6 rounded-xl font-semibold">
                Book Direct
              </Button>
            </Link>
          </div>
          <div className="pt-4 text-sm text-white/70">Need help? Call <span className="font-semibold text-white">+27 76 207 3299</span> or WhatsApp us anytime.</div>
        </div>
      </section>
    </div>
  );
}
