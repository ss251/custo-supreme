import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="CustoSupreme" width={32} height={32} />
              <span className="font-bold text-xl">CustoSupreme</span>
            </div>
            <p className="text-sm">
              Chattanooga&apos;s premier commercial cleaning service, providing top-notch solutions for businesses since 2015.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Services', 'Product Guarantee', 'Inspections', 'Testimonials', 'FAQs', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-secondary-foreground/80 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              {['Corporate Office Cleaning', 'Medical Facility Cleaning', 'Educational Institution Cleaning', 'Industrial Cleaning', 'Retail Space Cleaning', 'Floor Revival Services'].map((item) => (
                <li key={item}>
                  <Link href="#services" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-sm mb-4">Stay updated with our latest offers and cleaning tips for Chattanooga businesses.</p>
            <form className="space-y-2">
              <Input type="email" placeholder="Your email address" className="bg-secondary-foreground text-secondary" />
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm text-secondary-foreground/80">
                  I agree to receive marketing emails
                </label>
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="mt-8 w-full h-64">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13076.92818889212!2d-85.31144735!3d35.045852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88605e7f9aaaaaab%3A0x6e0bcec1c7de8cd1!2sChattanooga%2C%20TN%2C%20USA!5e0!3m2!1sen!2s!4v1652345678901!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-secondary-foreground/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-secondary-foreground/80 mb-4 md:mb-0">
            &copy; 2024 CustoSupreme. All rights reserved.
          </p>
          <nav className="flex space-x-4">
            <Link href="#" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}