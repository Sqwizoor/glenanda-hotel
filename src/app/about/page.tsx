"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Cross, 
  Users, 
  Heart, 
  Crown,
  Shield,
  ArrowRight,
  Star,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  BookOpen,
  Hand,
  Church,
  Target,
  Globe
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Apostle Elijah's journey timeline
const milestones = [
  {
    year: "Early Life",
    title: "Life on the Streets",
    description: "Apostle Elijah lived on the streets, experiencing firsthand the struggles of homelessness, hunger, and desperation. These were his wilderness years.",
    icon: Target
  },
  {
    year: "Divine Encounter",
    title: "God's Calling",
    description: "Through years of hardship, God began to change Elijah's life. He received the calling to serve the Lord and minister to others.",
    icon: Cross
  },
  {
    year: "Transformation",
    title: "New Life in Christ",
    description: "Elijah's life was completely transformed by God's grace. He discovered his purpose: if God changed him, He can change others too.",
    icon: Star
  },
  {
    year: "Ministry Begins",
    title: "Return to the Streets",
    description: "With a heart of compassion, Apostle Elijah returned to the streets - not as one needing help, but as one bringing hope.",
    icon: Users
  },
  {
    year: "Today",
    title: "Elijah Church of Christ",
    description: "Founded on Matthew 7:24, the church focuses on changing lives, healing, and producing future leaders for a godly world.",
    icon: Church
  }
];

// Ministry leadership team
const team = [
  {
    name: "Apostle Elijah",
    role: "Founder & Senior Pastor",
    description: "Called by God to change lives. Believes deeply that kindness to one another is essential to pleasing God.",
    image: "/room4.jpeg"
  },
  {
    name: "Pastor Grace Mthembu",
    role: "Associate Pastor",
    description: "Leads worship and women's ministry. Passionate about healing prayer and community outreach.",
    image: "/room6.jpeg"
  },
  {
    name: "Minister David Khumalo",
    role: "Youth & Leadership",
    description: "Develops future leaders through biblical teaching and character building programs.",
    image: "/room7.jpeg"
  },
  {
    name: "Sister Mary Ndlovu",
    role: "Outreach Coordinator",
    description: "Organizes street ministry and community service. Ensures no one is forgotten or left behind.",
    image: "/dining.jpeg"
  }
];

const values = [
  {
    icon: Heart,
    title: "Kindness & Compassion",
    description: "\"Without being kind to one another we can't please God\" - Apostle Elijah's core belief."
  },
  {
    icon: Cross,
    title: "Biblical Foundation",
    description: "Built on Matthew 7:24 - the solid rock of Jesus Christ who died for our sins."
  },
  {
    icon: Hand,
    title: "Healing Ministry",
    description: "Focused on changing lives, healing hearts, and demonstrating God's restorative power."
  },
  {
    icon: Crown,
    title: "Leadership Development",
    description: "Producing future leaders of tomorrow for a better godly world."
  }
];

const stats = [
  { number: "100", suffix: "+", label: "Lives Changed" },
  { number: "50", suffix: "+", label: "Weekly Outreach" },
  { number: "24", suffix: "/7", label: "Prayer Support" },
  { number: "∞", suffix: "", label: "God's Love" }
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                About
                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"> Apostle Elijah</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Once homeless on the streets, now a vessel of God's love and transformation. Apostle Elijah's journey from desperation to divine calling demonstrates that God can change anyone.
              </p>

              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <p className="text-gray-800 italic">
                  "Without being kind to one another we can't please God. If we are to serve the Lord, we have to start with our own deeds, how we treat each other - that speaks volumes to God."
                </p>
                <p className="text-yellow-700 font-semibold mt-2">- Apostle Elijah</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl">
                    <Church className="w-5 h-5 mr-2" />
                    Our Ministry
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="border-yellow-200 text-yellow-700 hover:bg-yellow-50 px-8 py-4 rounded-xl">
                    <Phone className="w-5 h-5 mr-2" />
                    Connect With Us
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/room14.jpeg"
                  alt="Apostle Elijah Ministry"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/20 to-transparent" />
                
                {/* Scripture overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white text-sm font-medium">Matthew 7:24</p>
                  <p className="text-white/90 text-xs">"Built on the Rock of Jesus Christ"</p>
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">100+</div>
                  <div className="text-sm text-gray-600">Lives Transformed</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
            
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-12">
                <div className="space-y-6">
                  <div className="flex items-center justify-center mb-6">
                    <Cross className="w-12 h-12 text-yellow-600" />
                  </div>
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                    Our ministry focuses on changing lives, healing, and producing future leaders of tomorrow for a better Godly world.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Giving, healing and serving is at the heart of our ministry as the key responsibilities of our saviour Jesus Christ we are believing in.
                  </p>
                  <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <p className="text-gray-800 text-center italic">
                      "DON'T WAIT FOR SOMEBODY ELSE TO DO IT, PLAY YOUR PART IN SOMEONE'S LIFE."
                    </p>
                    <p className="text-sm text-yellow-700 text-center mt-2">Matthew 25:35-40</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on the solid rock of Jesus Christ, these principles guide everything we do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Apostle Elijah's Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From the streets to the sanctuary - a testimony of God's transforming power.
            </p>
          </motion.div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex-1">
                  <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                          <milestone.icon className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {milestone.title}
                          </h3>
                          <div className="text-yellow-600 font-semibold">{milestone.year}</div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Ministry Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Called and committed servants dedicated to changing lives and building God's kingdom.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <div className="text-yellow-600 font-medium mb-3">{member.role}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              Matthew 25:35-40
            </h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
              <p className="text-lg md:text-xl leading-relaxed italic mb-6">
                "For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink, 
                I was a stranger and you invited me in, I needed clothes and you clothed me, I was sick and you looked after me, 
                I was in prison and you came to visit me."
              </p>
              <p className="text-lg font-semibold">
                "Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me."
              </p>
            </div>

            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              This passage highlights that acts of help and compassion towards others are seen as acts of service to Jesus himself, 
              promising a great reward for those who care for the vulnerable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Join Our Church Family
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Come experience the transforming power of God's love. Be part of a community that changes lives.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/services">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-semibold">
                  <Calendar className="mr-2 h-5 w-5" />
                  Join Sunday Service
                </Button>
              </Link>

              <Link href="/partnership">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl">
                  <Heart className="mr-2 h-5 w-5" />
                  Become a Partner
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+27 76 207 3299</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@elijahchurchofchrist.org</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Johannesburg, South Africa</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
