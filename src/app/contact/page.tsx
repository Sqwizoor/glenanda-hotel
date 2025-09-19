"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Heart,
  Users,
  Church,
  Calendar,
  ArrowRight,
  CheckCircle,
  Cross,
  HandHeart
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our church office for immediate assistance",
    contact: "+27 76 207 3299",
    availability: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM"
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a message and we'll respond within 24 hours",
    contact: "info@elijahchurchofchrist.org",
    availability: "Response within 24 hours"
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    description: "Connect with us instantly through WhatsApp for prayer requests",
    contact: "+27 76 207 3299",
    availability: "Available 24/7"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come worship with us at our church location",
    contact: "Johannesburg, South Africa",
    availability: "Sunday Service: 10:00 AM"
  }
];

const ministries = [
  {
    name: "Prayer Ministry",
    description: "Need prayer? We're here to pray with you and for you.",
    icon: Heart,
    contact: "prayer@elijahchurchofchrist.org"
  },
  {
    name: "Pastoral Care",
    description: "Connect with our pastors for spiritual guidance and counseling",
    icon: Heart,
    contact: "pastor@elijahchurchofchrist.org"
  },
  {
    name: "Outreach Ministry",
    description: "Join our street ministry and community service programs",
    icon: Users,
    contact: "outreach@elijahchurchofchrist.org"
  },
  {
    name: "Youth Ministry",
    description: "Youth programs, leadership development, and mentorship",
    icon: Church,
    contact: "youth@elijahchurchofchrist.org"
  }
];

const serviceSchedule = [
  {
    day: "Sunday",
    time: "10:00 AM",
    service: "Main Worship Service",
    description: "Life-changing worship, powerful preaching, and healing prayer"
  },
  {
    day: "Wednesday",
    time: "7:00 PM",
    service: "Bible Study & Prayer",
    description: "Deep dive into God's Word and intercessory prayer"
  },
  {
    day: "Friday",
    time: "6:00 PM",
    service: "Youth Ministry",
    description: "Leadership development and fellowship for young people"
  },
  {
    day: "Saturday",
    time: "9:00 AM",
    service: "Street Outreach",
    description: "Serving the homeless and vulnerable in our community"
  }
];

const faqs = [
  {
    question: "How can I become a member of Elijah Church of Christ?",
    answer: "We welcome everyone! Attend our Sunday service, complete our membership class, and commit to our church covenant. Contact us to learn more about the process."
  },
  {
    question: "Do you offer counseling services?",
    answer: "Yes, our pastoral care team provides biblical counseling for various life challenges including marriage, family issues, addiction, and spiritual growth."
  },
  {
    question: "How can I get involved in ministry?",
    answer: "We have various ministry opportunities including outreach, youth ministry, worship team, and community service. Contact our ministry coordinators to get involved."
  },
  {
    question: "What should I expect at a Sunday service?",
    answer: "Our services include powerful worship, biblical preaching, prayer ministry, and fellowship. We focus on life transformation through God's Word and the Holy Spirit."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    ministry: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
  <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow border border-emerald-200 text-emerald-700 text-sm font-medium">
              <Church className="w-4 h-4 mr-2" /> Connect With Us
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Get In Touch With
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Elijah Church</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're here to pray with you, support you, and help you grow in your relationship with Jesus Christ.
              Reach out to us through any of our contact methods below.
            </p>

            <div className="bg-emerald-100 border-l-4 border-emerald-500 p-6 rounded-r-lg max-w-2xl mx-auto">
              <p className="text-gray-800 italic text-center">
                "Come to me, all you who are weary and burdened, and I will give you rest."
              </p>
              <p className="text-emerald-700 font-semibold text-center mt-2">- Matthew 11:28</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Ways to Connect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the best way to reach us. We're always ready to listen and help.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                      <method.icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {method.description}
                    </p>
                    <div className="space-y-2">
                      <div className="text-emerald-600 font-semibold">{method.contact}</div>
                      <div className="text-gray-500 text-xs">{method.availability}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Ministries */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-gray-900 text-center">
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Full Name
                          </label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Email Address
                          </label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Ministry Interest
                        </label>
                        <select
                          name="ministry"
                          value={formData.ministry}
                          onChange={handleInputChange}
                          className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="prayer">Prayer Request</option>
                          <option value="pastoral">Pastoral Care</option>
                          <option value="outreach">Outreach Ministry</option>
                          <option value="youth">Youth Ministry</option>
                          <option value="membership">Church Membership</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Subject
                        </label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Brief subject line"
                          className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Share your prayer request, question, or message..."
                          rows={6}
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-6 group"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            Send Message
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-6 py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                      <p className="text-gray-600">
                        Thank you for reaching out. We'll respond to your message within 24 hours.
                        If this is a prayer request, know that we're praying for you right now.
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        variant="outline"
                        className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Ministries & Service Times */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Ministries */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <Heart className="w-6 h-6 mr-2 text-emerald-600" />
                    Connect With Ministries
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ministries.map((ministry, index) => (
                    <motion.div
                      key={ministry.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      <ministry.icon className="w-6 h-6 text-emerald-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{ministry.name}</h4>
                        <p className="text-gray-600 text-sm mb-2">{ministry.description}</p>
                        <a
                          href={`mailto:${ministry.contact}`}
                          className="text-emerald-600 text-sm hover:text-emerald-700 transition-colors"
                        >
                          {ministry.contact}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Service Schedule */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-emerald-600" />
                    Service Times
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {serviceSchedule.map((service, index) => (
                    <motion.div
                      key={service.service}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-4 rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{service.service}</h4>
                        <div className="text-right">
                          <div className="text-emerald-600 font-semibold">{service.day}</div>
                          <div className="text-gray-600 text-sm">{service.time}</div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about our church and ministries.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
  <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Join Our Church Family?
            </h2>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Come experience the transforming power of God's love. Join us this Sunday for worship,
              fellowship, and life-changing ministry.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/services">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-10 py-6 rounded-xl font-semibold">
                  <Calendar className="mr-2 h-5 w-5" />
                  View Service Times
                </Button>
              </Link>

              <Link href="/partnership">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-10 py-6 rounded-xl font-semibold">
                  <HandHeart className="mr-2 h-5 w-5" />
                  Support Our Ministry
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="pt-8 space-y-4 text-white/80">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
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
              <p className="text-sm">
                We love hearing from you! Reach out anytime for prayer, support, or to learn more about our church.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
