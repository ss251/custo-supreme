import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { JSX, SVGProps } from "react";
import Image from "next/image";

export function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="#"
            className="flex items-center space-x-2"
            prefetch={false}
          >
            <Image src="/logo.png" alt="Custo-Supreme" width={32} height={32} />
            <span className="font-bold text-xl text-primary">
              Custo-Supreme
            </span>
          </Link>
          <nav className="hidden md:flex md:space-x-8">
            <Link
              href="#services"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              prefetch={false}
            >
              Services
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              prefetch={false}
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get a Quote
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative h-[80vh] w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute h-full w-full object-cover"
          >
            <source src="/cleaning-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-3xl space-y-8 px-4 animate-fade-in">
              <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
                Professional Cleaning Services
              </h1>
              <p className="text-xl text-white/90">
                Trusted by businesses and homeowners. We take care of the
                cleaning so you can focus on what matters.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Get a Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-primary border-white hover:bg-white/90 hover:text-primary"
                >
                  Explore Services
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We offer a wide range of cleaning services to meet your needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                icon={<HomeIcon className="h-8 w-8 text-primary" />}
                title="Residential Cleaning"
                description="Keep your home spotless with our professional cleaning services."
              />
              <ServiceCard
                icon={<BuildingIcon className="h-8 w-8 text-primary" />}
                title="Commercial Cleaning"
                description="Maintain a clean and professional workspace for your business."
              />
              <ServiceCard
                icon={<AppWindowIcon className="h-8 w-8 text-primary" />}
                title="Window Cleaning"
                description="Let the sunshine in with our expert window cleaning services."
              />
            </div>
          </div>
        </section>
        <section id="testimonials" className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See what our satisfied customers have to say about our cleaning
                services.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                name="John Doe"
                role="Homeowner"
                content="Custo-Supreme has been a lifesaver for our family. Their cleaning services are top-notch, and their team is always professional and courteous."
              />
              <TestimonialCard
                name="Jane Smith"
                role="Business Owner"
                content="As a busy business owner, I don't have time to worry about cleaning. Custo-Supreme takes care of everything, allowing me to focus on running my company."
              />
              <TestimonialCard
                name="Bob Wilson"
                role="Homeowner"
                content="I've tried several cleaning services in the past, but Custo-Supreme is by far the best. Their attention to detail is unmatched, and my home has never looked better."
              />
            </div>
          </div>
        </section>
        <section id="contact" className="py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have a question or ready to book our services? Contact us today.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <form className="space-y-6">
                <Input type="text" placeholder="Name" required />
                <Input type="email" placeholder="Email" required />
                <Textarea placeholder="Message" rows={4} required />
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Send Message
                </Button>
              </form>
              <div className="space-y-8">
                <ContactInfo
                  icon={<LocateIcon className="h-6 w-6 text-primary" />}
                  title="Address"
                  content="123 Main Street, City, State 12345"
                />
                <ContactInfo
                  icon={<PhoneIcon className="h-6 w-6 text-primary" />}
                  title="Phone"
                  content="(123) 456-7890"
                />
                <ContactInfo
                  icon={<MailIcon className="h-6 w-6 text-primary" />}
                  title="Email"
                  content="info@custosupreme.com"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Image
                src="/logo.png"
                alt="Custo-Supreme"
                width={24}
                height={24}
              />
              <span className="font-bold text-lg">Custo-Supreme</span>
            </div>
            <p className="text-sm text-secondary-foreground/80 mb-4 md:mb-0">
              &copy; 2024 Custo-Supreme. All rights reserved.
            </p>
            <nav className="flex space-x-4">
              <Link
                href="#"
                className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground"
                prefetch={false}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground"
                prefetch={false}
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <Card className="bg-background hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function TestimonialCard({ name, role, content }) {
  return (
    <Card className="bg-background hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-4">{content}</p>
        <div className="flex items-center">
          <Avatar className="mr-3">
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactInfo({ icon, title, content }) {
  return (
    <div className="flex items-start">
      <div className="mr-4 mt-1">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground">{content}</p>
      </div>
    </div>
  );
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function BuildingIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function AppWindowIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M10 4v4" />
      <path d="M2 8h20" />
      <path d="M6 4v4" />
    </svg>
  );
}

function LocateIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function PhoneIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
