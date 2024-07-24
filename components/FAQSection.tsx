import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "CustoSupreme currently serves the greater metropolitan area and surrounding suburbs. Please contact us for specific location information."
  },
  {
    question: "How often should I schedule a cleaning service?",
    answer: "The frequency of cleaning depends on your specific needs. We offer weekly, bi-weekly, and monthly services, as well as one-time deep cleans. We'll work with you to determine the best schedule for your home or business."
  },
  {
    question: "Are your cleaning products safe for pets and children?",
    answer: "Yes, we use eco-friendly, non-toxic cleaning products that are safe for pets, children, and the environment. If you have specific concerns or allergies, please let us know, and we can adjust our cleaning methods accordingly."
  },
  {
    question: "Do I need to be home during the cleaning service?",
    answer: "It's not necessary for you to be home during the cleaning. Many of our clients provide us with a key or access code. We ensure the security of your property and can accommodate your preferred method of entry."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We understand that plans can change. We ask for at least 24 hours' notice for any cancellations or rescheduling. Late cancellations may be subject to a fee."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our cleaning services.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}