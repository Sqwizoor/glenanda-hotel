"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Shield,
  Clock,
  MapPin,
  Phone,
  Mail,
  Plus,
  Minus,
  AlertCircle,
  Gift
} from "lucide-react";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Church events and services for booking
const events = [
  {
    id: 1,
    name: "Sunday Worship Service",
    price: 0,
    originalPrice: 0,
    duration: "2 hours",
    capacity: 200,
    attendees: 1,
    image: "/room14.jpeg",
    features: ["Live Worship Music", "Sermon by Apostle Elijah", "Community Fellowship"],
    amenities: [
      { icon: Users, name: "Community Gathering" },
      { icon: Clock, name: "Weekly Service" },
      { icon: MapPin, name: "Main Sanctuary" }
    ]
  },
  {
    id: 2,
    name: "Prayer & Healing Service",
    price: 0,
    originalPrice: 0,
    duration: "1.5 hours",
    capacity: 100,
    attendees: 1,
    image: "/room11.jpeg",
    features: ["Intercessory Prayer", "Healing Ministry", "Anointing Service"],
    amenities: [
      { icon: Users, name: "Prayer Ministry" },
      { icon: Clock, name: "Monthly Service" },
      { icon: MapPin, name: "Prayer Hall" }
    ]
  },
  {
    id: 3,
    name: "Bible Study Workshop",
    price: 50,
    originalPrice: 75,
    duration: "3 hours",
    capacity: 50,
    attendees: 1,
    image: "/room6.jpeg",
    features: ["In-depth Bible Teaching", "Group Discussion", "Q&A Session"],
    amenities: [
      { icon: Users, name: "Study Group" },
      { icon: Clock, name: "Weekly Workshop" },
      { icon: MapPin, name: "Fellowship Hall" }
    ]
  }
];

const addOns = [
  {
    id: "meal-service",
    name: "Community Meal",
    description: "Join us for fellowship dinner after the service",
    price: 25,
    unit: "per person"
  },
  {
    id: "childcare",
    name: "Children's Ministry",
    description: "Professional childcare during adult services",
    price: 15,
    unit: "per child"
  },
  {
    id: "transport",
    name: "Transportation Service",
    description: "Pickup and drop-off service for elderly and disabled",
    price: 20,
    unit: "per person"
  },
  {
    id: "materials",
    name: "Study Materials",
    description: "Bible study guides and worship resources",
    price: 10,
    unit: "per person"
  },
  {
    id: "donation",
    name: "Special Donation",
    description: "Support our ministry work and community outreach",
    price: 0,
    unit: "suggested donation"
  }
];

const steps = [
  { id: 1, title: "Select Event", description: "Choose your service or program" },
  { id: 2, title: "Event Details", description: "Date, time, and attendance" },
  { id: 3, title: "Additional Services", description: "Meals, childcare, transport" },
  { id: 4, title: "Guest Information", description: "Your details and needs" },
  { id: 5, title: "Registration", description: "Complete your registration" },
  { id: 6, title: "Confirmation", description: "Registration complete" }
];

function BookingPageContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [attendees, setAttendees] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    prayerRequests: ""
  });
  const [donationAmount, setDonationAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const heroRef = useRef(null);
  const searchParams = useSearchParams();
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Pre-select event from URL params
  useEffect(() => {
    const eventId = searchParams.get('event');
    if (eventId) {
      setSelectedEvent(parseInt(eventId));
      setCurrentStep(2);
    }
  }, [searchParams]);

  // Calculate totals for church event registration
  const selectedEventData = events.find(event => event.id === selectedEvent);
  
  const baseEventCost = selectedEventData ? selectedEventData.price * attendees : 0;
  const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
    const addOn = addOns.find(a => a.id === addOnId);
    if (addOn) {
      if (addOn.id === "childcare") {
        return total + (addOn.price * children);
      } else if (addOn.id === "meal-service" || addOn.id === "transport" || addOn.id === "materials") {
        return total + (addOn.price * attendees);
      } else {
        return total + addOn.price;
      }
    }
    return total;
  }, 0);
  const subtotal = baseEventCost + addOnTotal + donationAmount;
  const processingFee = subtotal > 0 ? 5 : 0; // Small processing fee for paid events
  const total = subtotal + processingFee;

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleBooking = async () => {
    setIsProcessing(true);
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    nextStep();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedEvent !== null;
      case 2: return eventDate && eventTime && attendees > 0;
      case 3: return true; // Add-ons are optional
      case 4: return guestInfo.firstName && guestInfo.lastName && guestInfo.email && guestInfo.phone;
      case 5: return true; // Registration is always possible, payment optional
      default: return true;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] mb-4">
              EVENT REGISTRATION
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Join us in worship, fellowship, and spiritual growth. Register for our upcoming services and events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`flex items-center space-x-4 ${
                    index < steps.length - 1 ? "flex-1" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all duration-300 ${
                    currentStep === step.id 
                      ? "border-blue-400 bg-blue-400/20 text-blue-300 neon-border" 
                      : currentStep > step.id 
                        ? "border-green-400 bg-green-400/20 text-green-300"
                        : "border-white/30 text-white/60"
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className={`font-semibold text-sm ${
                      currentStep >= step.id ? "text-white" : "text-white/60"
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-white/50">{step.description}</div>
                  </div>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? "bg-green-400" : "bg-white/20"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Select Room */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold text-gradient font-['Orbitron']">
                      Choose Your Event
                    </h2>
                    
                    <div className="space-y-6">
                      {events.map((event) => (
                        <motion.div
                          key={event.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedEvent(event.id)}
                          className={`cursor-pointer transition-all duration-300 ${
                            selectedEvent === event.id ? "ring-2 ring-blue-400" : ""
                          }`}
                        >
                          <Card className={`glass-morphism hover:bg-white/10 transition-all duration-300 ${
                            selectedEvent === event.id ? "neon-border" : "border-white/20"
                          }`}>
                            <CardContent className="p-6">
                              <div className="grid md:grid-cols-3 gap-6 items-center">
                                <div className="md:col-span-1">
                                  <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                                    <Users className="w-16 h-16 text-blue-400 animate-pulse" />
                                  </div>
                                </div>
                                
                                <div className="md:col-span-2 space-y-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="text-xl font-bold text-white font-['Orbitron'] mb-2">
                                        {event.name}
                                      </h3>
                                      <div className="flex items-center space-x-4 text-sm text-white/60">
                                        <span className="flex items-center space-x-1">
                                          <Clock className="w-4 h-4" />
                                          <span>{event.duration}</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                          <Users className="w-4 h-4" />
                                          <span>{event.capacity} capacity</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                          <MapPin className="w-4 h-4" />
                                          <span>Church Facility</span>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-2xl font-bold text-gradient">
                                        {event.price === 0 ? "FREE" : `R${event.price}`}
                                      </div>
                                      {event.originalPrice > 0 && (
                                        <div className="text-sm text-white/50 line-through">
                                          R{event.originalPrice}
                                        </div>
                                      )}
                                      <div className="text-xs text-white/60">per person</div>
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-white/80">Features:</h4>
                                    <div className="grid md:grid-cols-2 gap-2">
                                      {event.features.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-2 text-sm text-white/60">
                                          <CheckCircle className="w-3 h-3 text-green-400" />
                                          <span>{feature}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="flex space-x-3">
                                    {event.amenities.map((amenity, index) => (
                                      <div key={index} className="flex items-center space-x-1 text-xs text-blue-400">
                                        <amenity.icon className="w-3 h-3" />
                                        <span>{amenity.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Dates & Guests */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold text-gradient font-['Orbitron']">
                      Event Details
                    </h2>
                    
                    <Card className="glass-morphism neon-border">
                      <CardContent className="p-8 space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              Event Date
                            </label>
                            <Input
                              type="date"
                              value={eventDate}
                              onChange={(e) => setEventDate(e.target.value)}
                              className="glass-morphism border-white/20 text-white"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              Preferred Time
                            </label>
                            <select
                              value={eventTime}
                              onChange={(e) => setEventTime(e.target.value)}
                              className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                            >
                              <option value="" className="bg-gray-800">Select time</option>
                              <option value="09:00" className="bg-gray-800">9:00 AM</option>
                              <option value="10:00" className="bg-gray-800">10:00 AM</option>
                              <option value="11:00" className="bg-gray-800">11:00 AM</option>
                              <option value="14:00" className="bg-gray-800">2:00 PM</option>
                              <option value="15:00" className="bg-gray-800">3:00 PM</option>
                              <option value="18:00" className="bg-gray-800">6:00 PM</option>
                              <option value="19:00" className="bg-gray-800">7:00 PM</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-4">
                            Number of Attendees
                          </label>
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setAttendees(Math.max(1, attendees - 1))}
                              className="cyber-button"
                              disabled={attendees <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-2xl font-bold text-white w-16 text-center">
                              {attendees}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setAttendees(Math.min(selectedEventData?.capacity || 1, attendees + 1))}
                              className="cyber-button"
                              disabled={attendees >= (selectedEventData?.capacity || 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-white/60 mt-2">
                            Maximum {selectedEventData?.capacity} attendees for this event
                          </p>
                        </div>

                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-4">
                            Children (under 12)
                          </label>
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setChildren(Math.max(0, children - 1))}
                              className="cyber-button"
                              disabled={children <= 0}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-2xl font-bold text-white w-16 text-center">
                              {children}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setChildren(children + 1)}
                              className="cyber-button"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-white/60 mt-2">
                            Children under 12 qualify for childcare services
                          </p>
                        </div>

                        {eventDate && eventTime && (
                          <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                            <div className="flex items-center space-x-2 text-blue-300">
                              <Calendar className="w-5 h-5" />
                              <span className="font-semibold">
                                {attendees} attendee{attendees > 1 ? 's' : ''} registered for {eventDate} at {eventTime}
                              </span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 3: Add-ons */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold text-gradient font-['Orbitron']">
                      Additional Services
                    </h2>
                    
                    <div className="space-y-4">
                      {addOns.map((addOn) => (
                        <motion.div
                          key={addOn.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => toggleAddOn(addOn.id)}
                          className={`cursor-pointer transition-all duration-300 ${
                            selectedAddOns.includes(addOn.id) ? "ring-2 ring-blue-400" : ""
                          }`}
                        >
                          <Card className={`glass-morphism hover:bg-white/10 transition-all duration-300 ${
                            selectedAddOns.includes(addOn.id) ? "neon-border" : "border-white/20"
                          }`}>
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                                    selectedAddOns.includes(addOn.id) 
                                      ? "border-blue-400 bg-blue-400/20" 
                                      : "border-white/30"
                                  }`}>
                                    {selectedAddOns.includes(addOn.id) && (
                                      <CheckCircle className="w-4 h-4 text-blue-400" />
                                    )}
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold text-white">{addOn.name}</h3>
                                    <p className="text-white/60 text-sm">{addOn.description}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-gradient">
                                    {addOn.price === 0 ? "FREE" : `+R${addOn.price}`}
                                  </div>
                                  <div className="text-xs text-white/60">{addOn.unit}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-4">
                      <div className="flex items-start space-x-2 text-emerald-300">
                        <Gift className="w-5 h-5 mt-0.5" />
                        <div>
                          <p className="font-semibold">Blessing Opportunity</p>
                          <p className="text-sm text-emerald-300/80">
                            Your participation helps support our community outreach and ministry work.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Guest Details */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold text-gradient font-['Orbitron']">
                      Guest Information
                    </h2>
                    
                    <Card className="glass-morphism neon-border">
                      <CardContent className="p-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              First Name *
                            </label>
                            <Input
                              value={guestInfo.firstName}
                              onChange={(e) => setGuestInfo(prev => ({...prev, firstName: e.target.value}))}
                              className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                              placeholder="Enter first name"
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              Last Name *
                            </label>
                            <Input
                              value={guestInfo.lastName}
                              onChange={(e) => setGuestInfo(prev => ({...prev, lastName: e.target.value}))}
                              className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                              placeholder="Enter last name"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              Email Address *
                            </label>
                            <Input
                              type="email"
                              value={guestInfo.email}
                              onChange={(e) => setGuestInfo(prev => ({...prev, email: e.target.value}))}
                              className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                              placeholder="your@email.com"
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              Phone Number *
                            </label>
                            <Input
                              type="tel"
                              value={guestInfo.phone}
                              onChange={(e) => setGuestInfo(prev => ({...prev, phone: e.target.value}))}
                              className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">
                            Prayer Requests
                          </label>
                          <textarea
                            value={guestInfo.prayerRequests}
                            onChange={(e) => setGuestInfo(prev => ({...prev, prayerRequests: e.target.value}))}
                            className="w-full h-24 rounded-md border border-white/20 bg-transparent px-3 py-2 text-white text-sm placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                            placeholder="Share any prayer requests or special intentions..."
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 5: Payment */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold text-gradient font-['Orbitron']">
                      Complete Registration
                    </h2>
                    
                    <Card className="glass-morphism neon-border">
                      <CardContent className="p-8 space-y-6">
                        <div className="flex items-center space-x-2 text-green-400 mb-6">
                          <Shield className="w-5 h-5" />
                          <span className="text-sm">Secure registration and donation processing</span>
                        </div>

                        {total > 0 && (
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              Donation Amount (Optional)
                            </label>
                            <div className="grid grid-cols-4 gap-2 mb-4">
                              {[25, 50, 100, 200].map((amount) => (
                                <Button
                                  key={amount}
                                  variant={donationAmount === amount ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setDonationAmount(amount)}
                                  className="cyber-button"
                                >
                                  R{amount}
                                </Button>
                              ))}
                            </div>
                            <Input
                              type="number"
                              value={donationAmount || ""}
                              onChange={(e) => setDonationAmount(Number(e.target.value) || 0)}
                              className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                              placeholder="Custom amount"
                              min="0"
                            />
                          </div>
                        )}

                        <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                          <div className="flex items-start space-x-2 text-blue-300">
                            <AlertCircle className="w-5 h-5 mt-0.5" />
                            <div>
                              <p className="font-semibold">Registration Information</p>
                              <p className="text-sm text-blue-300/80">
                                Your information helps us serve you better and follow up on your spiritual journey.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 6: Confirmation */}
                {currentStep === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center space-y-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
                    </motion.div>
                    
                    <h2 className="text-4xl font-bold text-gradient font-['Orbitron']">
                      BOOKING CONFIRMED
                    </h2>
                    
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                      Thank you for registering! Your spot has been reserved and a confirmation has been sent to your email.
                    </p>

                    <Card className="glass-morphism neon-border max-w-md mx-auto">
                      <CardContent className="p-6 space-y-4">
                        <div className="text-center">
                          <div className="text-sm text-white/60">Registration Reference</div>
                          <div className="text-2xl font-bold text-gradient font-mono">
                            ECC{Date.now().toString().slice(-6)}
                          </div>
                        </div>
                        <div className="border-t border-white/20 pt-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/60">Event:</span>
                            <span className="text-white">{selectedEventData?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Date & Time:</span>
                            <span className="text-white">{eventDate} at {eventTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Attendees:</span>
                            <span className="text-white">{attendees} adult{attendees > 1 ? 's' : ''}{children > 0 ? ` + ${children} child${children > 1 ? 'ren' : ''}` : ''}</span>
                          </div>
                          {total > 0 && (
                            <div className="flex justify-between font-bold text-lg">
                              <span className="text-white">Total:</span>
                              <span className="text-gradient">R{total.toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="cyber-button">
                        <Mail className="mr-2 h-4 w-4" />
                        View Confirmation
                      </Button>
                      <Button variant="outline" className="cyber-button">
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              {currentStep < 6 && (
                <div className="flex justify-between pt-8">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="cyber-button"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  
                  {currentStep === 5 ? (
                    <Button
                      onClick={handleBooking}
                      disabled={!canProceed() || isProcessing}
                      className="cyber-button"
                    >
                      {isProcessing ? (
                        <>
                          <Shield className="mr-2 h-4 w-4 animate-pulse" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Complete Registration
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="cyber-button"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="glass-morphism neon-border">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gradient font-['Orbitron']">
                      Booking Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedEventData && (
                      <div>
                        <h3 className="font-semibold text-white mb-2">{selectedEventData.name}</h3>
                        <div className="text-sm space-y-1 text-white/60">
                          <div>Duration: {selectedEventData.duration}</div>
                          <div>Capacity: {selectedEventData.capacity}</div>
                          {attendees > 0 && <div>Attendees: {attendees}</div>}
                          {children > 0 && <div>Children: {children}</div>}
                        </div>
                      </div>
                    )}

                    {eventDate && eventTime && (
                      <div className="border-t border-white/20 pt-4">
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-white/60">Date:</span>
                            <span className="text-white">{eventDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Time:</span>
                            <span className="text-white">{eventTime}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedAddOns.length > 0 && (
                      <div className="border-t border-white/20 pt-4">
                        <h4 className="font-semibold text-white mb-2">Additional Services:</h4>
                        <div className="space-y-2 text-sm">
                          {selectedAddOns.map(addOnId => {
                            const addOn = addOns.find(a => a.id === addOnId);
                            return addOn ? (
                              <div key={addOnId} className="flex justify-between text-white/80">
                                <span>{addOn.name}</span>
                                <span>{addOn.price === 0 ? "FREE" : `R${addOn.price}`}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {total > 0 && (
                      <div className="border-t border-white/20 pt-4 space-y-2 text-sm">
                        <div className="flex justify-between text-white/80">
                          <span>Event Registration</span>
                          <span>R{baseEventCost.toFixed(2)}</span>
                        </div>
                        {addOnTotal > 0 && (
                          <div className="flex justify-between text-white/80">
                            <span>Additional Services</span>
                            <span>R{addOnTotal.toFixed(2)}</span>
                          </div>
                        )}
                        {donationAmount > 0 && (
                          <div className="flex justify-between text-white/80">
                            <span>Donation</span>
                            <span>R{donationAmount.toFixed(2)}</span>
                          </div>
                        )}
                        {processingFee > 0 && (
                          <div className="flex justify-between text-white/80">
                            <span>Processing Fee</span>
                            <span>R{processingFee.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="border-t border-white/20 pt-2 flex justify-between text-lg font-bold">
                          <span className="text-white">Total</span>
                          <span className="text-gradient">R{total.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    {currentStep < 6 && (
                      <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 text-blue-300 text-sm">
                          <Shield className="w-4 h-4" />
                          <span>Free registration updates until event date</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BookingPage() {
  // Wrap the content in Suspense so hooks like useSearchParams are allowed
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center text-white/70">Loading booking…</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
