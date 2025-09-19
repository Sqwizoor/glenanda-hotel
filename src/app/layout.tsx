import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Exo_2 } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import FloatingActions from "@/components/FloatingActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
});

export const metadata: Metadata = {
  title: "Elijah Church of Christ | Changing Lives Through Faith",
  description: "Elijah Church of Christ – founded by Apostle Elijah. Healing ministry, street outreach, leadership development. Join us: +27 76 207 3299",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${exo2.variable}`}>
      <body className={"antialiased bg-white text-gray-900"}>
        <Navigation />
        <main className="min-h-screen">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
  <FloatingActions />
        <footer className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/loggi.png"
                  alt="Elijah Church of Christ Logo"
                  width={130}
                  height={130}
                  className="h-24 w-24 object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">Elijah Church of Christ</h3>
                  <p className="text-xs uppercase tracking-wide text-emerald-600 font-medium">Faith • Hope • Love</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">Built on the foundation of Jesus Christ. Changing lives through healing ministry, street outreach, and leadership development for a godly world.</p>
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              <h4 className="font-semibold text-gray-900 mb-3 tracking-wide">Contact</h4>
              <p><span className="text-gray-500">Phone:</span> <a href="tel:+27762073299" className="font-medium hover:text-emerald-600 transition-colors">+27 76 207 3299</a></p>
              <p><span className="text-gray-500">WhatsApp:</span> <a href="https://wa.me/27762073299" target="_blank" rel="noopener" className="font-medium hover:text-emerald-600">Join Service</a></p>
              <p><span className="text-gray-500">Email:</span> <a href="mailto:info@elijahchurchofchrist.org" className="font-medium hover:text-emerald-600">info@elijahchurchofchrist.org</a></p>
              <p><span className="text-gray-500">Location:</span> Johannesburg, South Africa</p>
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              <h4 className="font-semibold text-gray-900 mb-3 tracking-wide">Quick Links</h4>
              <ul className="space-y-1">
                <li><a className="hover:text-emerald-600 transition-colors" href="/services">Ministry</a></li>
                <li><a className="hover:text-emerald-600 transition-colors" href="/gallery">Gallery</a></li>
                <li><a className="hover:text-emerald-600 transition-colors" href="/partnership">Partnership</a></li>
                <li><a className="hover:text-emerald-600 transition-colors" href="/about">About Apostle Elijah</a></li>
                <li><a className="hover:text-emerald-600 transition-colors" href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="text-sm text-gray-700 space-y-4">
              <h4 className="font-semibold text-gray-900 mb-3 tracking-wide">Stay Connected</h4>
              <p className="text-sm text-gray-600">Join our church family and receive spiritual updates.</p>
              <form className="flex items-center space-x-2">
                <input type="email" required placeholder="Email address" className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <button type="submit" className="text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors">Join</button>
              </form>
              <p className="text-xs text-gray-400">Your spiritual journey awaits. Unsubscribe anytime.</p>
            </div>
          </div>
          <div className="border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
              <p>&copy; {new Date().getFullYear()} Elijah Church of Christ. All rights reserved.</p>
              <p className="mt-2 md:mt-0">Built on the foundation of Jesus Christ - Matthew 7:24</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
