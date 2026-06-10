"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { SectionHeader } from "@/components/SectionHeader";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="flex-grow">
      {/* Hero */}
      <PageHero
        title="Get in Touch with Us"
        description="Have questions about our programs, partnership inquiries, or need support? Reach out today. Our team is here to walk with you."
        imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCul8xnJqBNWlldmaqd2ZayKND4q-Fm2Yi6E68SBo2PeiJ51zt5z9xI3a_3YmCUr5BzvvFbi7QIiv7uKYwlELo5Ka_gs1L4j5T0ZO8Nlf9kT_M_6x6uBnW5LIXvf1ttadrrRoQ3S63o4ol2SVxMObeFaYFzjGOxELisfYBNVus4OPjyke912ka1D_Ri1cA1czvoUTVQCen19Qn_lpNMuxZRqt7g1mfGTWO2rn-AuM3HR2ID1ueUXYOQ5_j0quFEytrVzbDeeVi95dM"
        imageAlt="NGO ministry center outreach activity"
      />

      <section className="py-xl px-4 md:px-margin-desktop max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start mt-6">
          {/* Contact Form Panel */}
          <div className="lg:col-span-7 space-y-md">
            <Card padding="lg" className="border border-outline-variant/10 shadow-md">
              <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface mb-2">
                Send Us a Message
              </h3>
              <p className="text-sm text-on-surface-variant mb-6">
                Fill in the form below, and we will get back to you within 24 to 48 hours.
              </p>

              {submitted ? (
                <div className="p-lg bg-green-50 text-green-800 rounded-xl border border-green-200 text-center space-y-md">
                  <div className="flex justify-center">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h4 className="font-bold text-lg">Message Sent Successfully!</h4>
                  <p className="text-sm max-w-md mx-auto">
                    Thank you for reaching out to YOKM Ministry. A representative has received your message and will contact you soon. May God bless you.
                  </p>
                  <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-500 hover:text-white" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant block">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-2 focus:ring-primary/20 outline-none text-sm text-on-surface"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant block">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-2 focus:ring-primary/20 outline-none text-sm text-on-surface"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant block">Subject (Optional)</label>
                    <input
                      type="text"
                      placeholder="Subject of message"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-2 focus:ring-primary/20 outline-none text-sm text-on-surface"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant block">Message</label>
                    <textarea
                      required
                      placeholder="Write your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low h-32 focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none text-on-surface"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={loading}
                    icon={<Send className="w-4 h-4" />}
                  >
                    {loading ? "Sending message..." : "Send Message"}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Contact Details Panel */}
          <aside className="lg:col-span-5 space-y-gutter">
            <Card padding="lg" className="border border-outline-variant/10 shadow-md space-y-md">
              <h3 className="font-headline text-xl font-bold text-on-surface border-b border-outline-variant/10 pb-3">
                Contact Information
              </h3>
              
              <ul className="space-y-lg text-sm">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Call Us</h4>
                    <a href="tel:08033173193" className="text-on-surface-variant hover:text-primary transition-colors text-sm mt-0.5 block">
                      08033173193
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Email Us</h4>
                    <a href="mailto:contact@yokm.org" className="text-on-surface-variant hover:text-primary transition-colors text-sm mt-0.5 block">
                      contact@yokm.org
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Ministry Center Address</h4>
                    <span className="text-on-surface-variant text-sm mt-0.5 block leading-relaxed">
                      Plot 415, Cathedral Road, Phase 2, Garki, Abuja, Nigeria
                    </span>
                  </div>
                </li>
              </ul>
            </Card>

            {/* Legal Status Notice */}
            <div className="p-md rounded-xl border border-secondary/25 bg-secondary/5 flex gap-3 text-xs leading-relaxed text-on-surface-variant">
              <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-on-surface mb-0.5">NGO Regulatory Compliance</span>
                Yendel Ocha Kpeling Ministry (YOKM) is fully registered with the Corporate Affairs Commission (CAC) of Nigeria. Registration No. CAC/NGO/78291. All gifts are tax deductible under local NGO rules.
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
