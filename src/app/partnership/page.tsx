"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart,
  Calendar,
  ArrowRight,
  Users,
  Cross,
  Hand,
  Gift,
  Crown,
  Check
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

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

const donationOptions = [
  {
    id: "weekly",
    title: "Weekly Partner",
    amount: "R100 - R500",
    description: "Support our ongoing street outreach and weekly ministry activities",
    features: ["Weekly prayer support", "Ministry updates", "Community fellowship"],
    popular: false,
    icon: Calendar,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "monthly",
    title: "Monthly Partner",
    amount: "R200 - R1000",
    description: "Help sustain our healing ministry and leadership development programs",
    features: ["Monthly ministry reports", "Special prayer requests", "Exclusive fellowship events", "Leadership training access"],
    popular: true,
    icon: Heart,
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: "yearly",
    title: "Annual Partner",
    amount: "R2000 - R10000",
    description: "Make a lasting impact on our church's vision to change lives and produce future leaders",
    features: ["Annual impact report", "Personal meeting with Apostle Elijah", "Priority prayer ministry", "Leadership development mentorship", "Special recognition"],
    popular: false,
    icon: Crown,
    color: "from-purple-500 to-purple-600"
  }
];

export default function PartnershipPage() {
  const [selectedOption, setSelectedOption] = useState("monthly");
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedPlan = donationOptions.find(option => option.id === selectedOption);
    const amount = customAmount || selectedPlan?.amount || "Custom amount";
    
    const whatsappMessage = `Hi Elijah Church of Christ, I want to become a ${selectedPlan?.title}!

📝 **Partnership Details:**
Plan: ${selectedPlan?.title}
Amount: ${amount}

👤 **My Information:**
Name: ${donorInfo.name}
Email: ${donorInfo.email}
Phone: ${donorInfo.phone}

💬 **Message:**
${donorInfo.message || "I want to support the ministry and help change lives."}

🙏 Looking forward to partnering with you in God's work!`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/27762073299?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
  <section className="relative py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Cross className="w-5 h-5 text-emerald-200" />
              <span className="text-sm tracking-wide font-medium">PARTNERSHIP MINISTRY</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-8"
              animate={{ textShadow: ["0 0 20px rgba(255,255,255,0.5)", "0 0 40px rgba(255,255,255,0.8)", "0 0 20px rgba(255,255,255,0.5)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Partner With Us
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              "DON'T WAIT FOR SOMEBODY ELSE TO DO IT, PLAY YOUR PART IN SOMEONE'S LIFE." - Matthew 25:35-40. 
              Join us in changing lives through your faithful partnership.
            </motion.p>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center space-x-8 text-white">
                <div className="text-center">
                  <div className="text-3xl font-bold">100+</div>
                  <div className="text-sm opacity-80">Lives Changed</div>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">Weekly</div>
                  <div className="text-sm opacity-80">Street Outreach</div>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm opacity-80">Prayer Support</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Options */}
  <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your Partnership
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select a partnership level that aligns with your heart to support our ministry and change lives in the community.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {donationOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <motion.div
                  key={option.id}
                  variants={itemFadeUp}
                  className="relative"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card 
                    className={`h-full cursor-pointer transition-all duration-300 ${
                      selectedOption === option.id 
                        ? 'ring-2 ring-emerald-500 shadow-xl' 
                        : 'hover:shadow-lg'
                    } ${option.popular ? 'border-emerald-300' : ''}`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    {option.popular && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                      >
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
                          🌟 Most Popular
                        </Badge>
                      </motion.div>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-2xl font-bold text-gray-900">{option.title}</CardTitle>
                      <div className="text-3xl font-bold text-emerald-600 mt-2">{option.amount}</div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <p className="text-gray-600 text-center">{option.description}</p>
                      
                      <ul className="space-y-3">
                        {option.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Your Partnership
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600">
              Fill in your details below and we'll connect with you to set up your partnership.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-emerald-50">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Custom Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Amount (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter custom amount (e.g., R150)"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={donorInfo.name}
                        onChange={(e) => setDonorInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={donorInfo.email}
                        onChange={(e) => setDonorInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+27 76 207 3299"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your heart for the ministry or any special prayer requests..."
                      value={donorInfo.message}
                      onChange={(e) => setDonorInfo(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  {/* Scripture & Submit */}
                  <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                    <div className="flex items-start space-x-3">
                      <Hand className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Matthew 25:35-40</h3>
                        <p className="text-gray-700 text-sm italic">
                          "For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink... 
                          Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me."
                        </p>
                      </div>
                    </div>
                  </div>

                  <motion.div 
                    className="pt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit"
                      size="lg" 
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Gift className="w-5 h-5 mr-2" />
                      Complete Partnership via WhatsApp
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Ministry Impact */}
  <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Partnership Impact
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how your faithful giving is transforming lives and building God's kingdom.
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
                icon: Users,
                title: "Street Outreach",
                description: "Reaching the homeless and vulnerable with meals, prayer, and hope",
                impact: "50+ people served weekly"
              },
              {
                icon: Heart,
                title: "Healing Ministry", 
                description: "Prayer for the sick, broken, and those seeking God's restoration",
                impact: "Countless testimonies"
              },
              {
                icon: Crown,
                title: "Leadership Training",
                description: "Developing future leaders with godly character and biblical foundation",
                impact: "Next generation equipped"
              },
              {
                icon: Cross,
                title: "Church Building",
                description: "Establishing a strong foundation for worship and community fellowship",
                impact: "Matthew 7:24 fulfilled"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemFadeUp}
                className="text-center"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="h-full p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="space-y-4">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {item.description}
                    </p>
                    
                    <div className="bg-emerald-100 rounded-lg px-3 py-2 text-emerald-800 text-sm font-medium">
                      {item.impact}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-emerald-200 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Apostle Elijah's Heart</h3>
              <p className="text-gray-600 italic leading-relaxed">
                "God changed my life from the streets, and now He can change others too. 
                Through your partnership, we return to those same streets not just to remember our journey, 
                but to lift others up and show them the same love Christ showed us. 
                Without being kind to one another, we can't please God."
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}