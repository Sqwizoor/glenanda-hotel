"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Cross, 
  Heart, 
  Users, 
  Crown, 
  BookOpen, 
  Hand, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Calendar, 
  Check,
  Target,
  Globe,
  Shield,
  Star,
  Sparkles,
  Church,
  UserPlus,
  HeartHandshake,
  GraduationCap,
  Home,
  Gift
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Church Ministries
const ministries = [
  {
    icon: Heart,
    title: "Street Outreach Ministry",
    description: "Reaching the homeless and vulnerable with food, clothing, and the love of Christ. Every person matters to God.",
    features: ["Weekly street visits", "Food distribution", "Clothing drives", "Prayer & counseling"],
    image: "/helping9.jpeg"
  },
  {
    icon: Hand,
    title: "Healing & Prayer Ministry",
    description: "Focused on changing lives through healing prayer, deliverance, and demonstrating God's restorative power.",
    features: ["Healing prayer sessions", "Deliverance ministry", "Hospital visits", "Home prayer visits"],
    image: "/pastor-action.jpeg"
  },
  {
    icon: Crown,
    title: "Leadership Development",
    description: "Producing future leaders of tomorrow for a better godly world through biblical teaching and character building.",
    features: ["Leadership training", "Biblical studies", "Mentorship programs", "Character development"],
    image: "/board2.jpeg"
  },
  {
    icon: Users,
    title: "Community Outreach",
    description: "Serving our community with practical help, showing God's love through action and kindness.",
    features: ["Community service", "Elderly care visits", "Youth programs", "Family support"],
    image: "/general3.jpeg"
  },
  {
    icon: BookOpen,
    title: "Bible Study & Teaching",
    description: "Grounded in Matthew 7:24 - building lives on the solid foundation of God's Word and Jesus Christ.",
    features: ["Weekly Bible study", "Sunday school", "Youth Bible classes", "Adult discipleship"],
    image: "/board.jpeg"
  },
  {
    icon: Church,
    title: "Sunday Worship Services",
    description: "Life-changing worship experiences with powerful preaching, healing prayer, and fellowship.",
    features: ["Sunday morning service", "Evening worship", "Special events", "Communion services"],
    image: "/croud3.jpeg"
  }
];

const coreValues = [
  { 
    icon: Heart, 
    title: "Kindness & Compassion", 
    text: "\"Without being kind to one another we can't please God\" - Our foundational belief." 
  },
  { 
    icon: Cross, 
    title: "Biblical Foundation", 
    text: "Built on Matthew 7:24 - the solid rock of Jesus Christ who died for our sins." 
  },
  { 
    icon: Target, 
    title: "Life Transformation", 
    text: "Focused on changing lives, healing hearts, and producing godly leaders." 
  }
];

const ministryJourney = [
  { step: "01", title: "Welcome", desc: "Join our church family with open arms" },
  { step: "02", title: "Connect", desc: "Find your place in ministry and fellowship" },
  { step: "03", title: "Grow", desc: "Develop spiritually through teaching & service" },
  { step: "04", title: "Lead", desc: "Become a leader making a godly difference" }
];

const serviceSchedule = [
  {
    day: "Sunday",
    time: "10:00 AM",
    service: "Main Worship Service",
    description: "Powerful preaching, worship, and healing prayer"
  },
  {
    day: "Wednesday",
    time: "7:00 PM", 
    service: "Bible Study",
    description: "Deep dive into God's Word and practical application"
  },
  {
    day: "Friday",
    time: "6:00 PM",
    service: "Youth Ministry",
    description: "Leadership development for tomorrow's leaders"
  },
  {
    day: "Saturday",
    time: "9:00 AM",
    service: "Street Outreach",
    description: "Serving the homeless and vulnerable in our community"
  }
];

export default function ServicesPage() {
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
              <Church className="w-4 h-4 mr-2" /> Church Ministries
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
              Changing Lives<br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Through Ministry
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              Our ministry focuses on changing lives, healing, and producing future leaders of tomorrow for a better godly world.
            </p>
            
            <div className="bg-emerald-100 border-l-4 border-emerald-500 p-6 rounded-r-lg">
              <p className="text-gray-800 italic">
                "DON'T WAIT FOR SOMEBODY ELSE TO DO IT, PLAY YOUR PART IN SOMEONE'S LIFE."
              </p>
              <p className="text-emerald-700 font-semibold mt-2">- Apostle Elijah</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-5 rounded-xl">
                  <Calendar className="w-5 h-5 mr-2" /> Join Sunday Service
                </Button>
              </Link>
              <Link href="/partnership">
                <Button variant="outline" size="lg" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-5 rounded-xl">
                  Support Ministry <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6">
            {ministries.slice(0,4).map(ministry => (
              <motion.div
                key={ministry.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl p-6 bg-white border border-emerald-100 shadow-sm hover:shadow-md transition"
              >
                <ministry.icon className="w-8 h-8 text-emerald-600 mb-4" />
                <div className="font-semibold text-gray-900 mb-1">{ministry.title}</div>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{ministry.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Ministry Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Our Ministry Areas
            </motion.h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Giving, healing and serving is at the heart of our ministry as the key responsibilities of our saviour Jesus Christ.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry, i) => (
              <motion.div
                key={ministry.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition rounded-2xl overflow-hidden">
                  <div className="relative h-48 bg-black">
                    <Image
                      src={ministry.image}
                      alt={ministry.title}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                      quality={90}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <ministry.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <CardContent className="p-7 space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2">{ministry.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{ministry.description}</p>
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      {ministry.features.map(feature => (
                        <div key={feature} className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 text-emerald-500 mr-2" /> {feature}
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

      {/* Service Schedule */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Service Schedule</h2>
            <p className="text-gray-600 text-lg">Join us for powerful worship and life-changing ministry.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceSchedule.map((service, i) => (
              <motion.div
                key={service.service}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition rounded-2xl h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center">
                      <div className="text-emerald-600 font-bold text-lg">{service.day}</div>
                      <div className="text-2xl font-bold text-gray-900">{service.time}</div>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">{service.service}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-emerald-100 border border-emerald-200 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-gray-800 mb-2">
                <strong>Location:</strong> Johannesburg, South Africa
              </p>
              <p className="text-gray-600 text-sm">
                Contact us for exact location details and directions to our services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
  <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Foundation</h2>
            <p className="text-gray-600 text-lg">The biblical principles that guide everything we do.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition rounded-2xl h-full">
                  <CardContent className="p-7 space-y-4 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{value.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministry Journey */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Ministry Journey</h2>
            <p className="text-gray-600 text-lg">From newcomer to leader - God has a plan for your life.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-10">
            {ministryJourney.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-emerald-600">{step.step}</span>
                  </div>
                  {i < ministryJourney.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-emerald-200 -translate-y-0.5" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture Section */}
  <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-16 h-16 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Matthew 7:24
            </h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
              <p className="text-lg md:text-xl leading-relaxed italic mb-4">
                "Therefore everyone who hears these words of mine and puts them into practice is like a wise man who built his house on the rock."
              </p>
              <p className="text-lg font-semibold">
                Our church is built on the solid foundation of Jesus Christ.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold"
          >
            Ready To Join Our Ministry?
          </motion.h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Come experience the transforming power of God's love. Be part of a community that changes lives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 rounded-xl font-semibold">
                Join Sunday Service <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/partnership">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-10 py-6 rounded-xl font-semibold">
                Become a Partner
              </Button>
            </Link>
          </div>
          
          {/* Contact Info */}
          <div className="pt-8 space-y-4 text-gray-400">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+27 76 207 3299</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Johannesburg, South Africa</span>
              </div>
            </div>
            <p className="text-sm">
              Call or WhatsApp us anytime for prayer, support, or to connect with our ministry.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}