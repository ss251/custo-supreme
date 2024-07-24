// app/components/ContactSection.tsx

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ContactInfo } from "./ContactInfo";
import { LocateIcon, PhoneIcon, MailIcon } from "@/components/Icons";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
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
              icon={<PhoneIcon className="h-6 w-6 text-primary" />}
              title="Phone"
              content="(877) 819-2351"
            />
            <ContactInfo
              icon={<MailIcon className="h-6 w-6 text-primary" />}
              title="Email"
              content="customsupreme@gmail.com"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
