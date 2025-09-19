"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Leaf, Sparkles, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const treatments = [
  {
    title: "Youth Ministry Program",
    summary:
      "Dynamic program designed to engage young people with faith, fellowship, and leadership development through worship, Bible study, and community service.",
    bullets: [
      "Weekly youth gatherings with worship and teaching",
      "Leadership training and mentorship opportunities",
      "Community outreach and service projects",
      "Sports and recreational activities",
      "College and career guidance",
      "Small group Bible studies"
    ],
  },
  {
    title: "Children's Ministry",
    summary:
      "Nurturing environment where children learn about God's love through age-appropriate Bible stories, songs, crafts, and interactive activities.",
    bullets: [
      "Sunday school classes for all ages",
      "Vacation Bible School programs",
      "Children's church services",
      "Music and arts programs",
      "Character development activities",
      "Parent-child fellowship events"
    ],
  },
  {
    title: "Prayer Ministry",
    summary:
      "Dedicated ministry focused on intercessory prayer, spiritual warfare, and developing a deeper prayer life through various prayer formats and teachings.",
    bullets: [
      "Weekly prayer meetings",
      "24/7 prayer room availability",
      "Prayer counseling and support",
      "Prayer walking and community outreach",
      "Teaching on prayer principles",
      "Prayer partner matching"
    ],
  },
];

export default function TreatmentsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-orbitron font-extrabold text-gray-900"
          >
            Ministry Programs & Activities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Life-changing programs designed to nurture faith, build community, and serve others. 
            Explore our ministry activities tailored to spiritual growth and service.
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="rounded-2xl border border-gray-200 shadow-sm p-6 bg-white"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{item.summary}</p>
              <ul className="space-y-2">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3">
                <Button className="bg-green-500 hover:bg-green-600">Join Program</Button>
                <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">Learn more</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Before & After gallery */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-orbitron font-bold text-gray-900 text-center mb-10"
          >
            Lives Transformed by Faith
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-green-600">
                  <span className="text-sm">Testimony</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">Life changed through ministry participation and spiritual growth.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="py-12 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {["Free introductory sessions","Personalized spiritual growth plans","Life-changing impact from day one"].map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl bg-white border border-gray-200 p-5 flex items-start gap-3"
            >
              <Sparkles className="h-5 w-5 text-green-500" />
              <p className="text-gray-700">{t}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-orbitron font-bold text-gray-900 text-center"
          >
            Frequently asked questions
          </motion.h2>
          <div className="mt-8 space-y-4">
            {[{
              q: "How do I get involved in a ministry program?",
              a: "Contact us to schedule an introductory meeting where we can discuss your interests and help you find the right program for your spiritual journey.",
            },{
              q: "Are there any requirements to join?",
              a: "Most programs are open to anyone seeking spiritual growth. Some leadership programs may have specific prerequisites, but we welcome everyone to participate.",
            },{
              q: "Can I try a program before committing?",
              a: "Yes! We offer introductory sessions for most programs so you can experience our community and see if it's a good fit for you.",
            }].map((f, i) => (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-gray-200 rounded-xl p-5 bg-white"
              >
                <p className="font-medium text-gray-900">{f.q}</p>
                <p className="mt-2 text-gray-600">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-orbitron font-bold text-gray-900"
          >
            Get Involved Today
          </motion.h2>
          <p className="mt-3 text-gray-600">Contact: <span className="font-semibold">072 7389 214</span> or <span className="font-semibold">info@eccchurch.org</span></p>
          <div className="mt-6 flex justify-center gap-4">
            <Button className="bg-green-500 hover:bg-green-600"><Phone className="mr-2 h-4 w-4"/>Call now</Button>
            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50"><Mail className="mr-2 h-4 w-4"/>Email us</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
