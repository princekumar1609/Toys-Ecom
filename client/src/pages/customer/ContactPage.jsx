import React, { useState } from 'react';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { contactApi } from '../../services/api';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name || !email || !message) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await contactApi.submitMessage({ name, email, phone, subject, message });
      if (res.success) {
        setSuccessMessage('Thank you! Your message has been received. Our concierge team will respond within 24 hours.');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 space-y-12">
      <Container>
        <Breadcrumb items={[{ label: 'Customer Concierge' }]} />

        {/* HEADER */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block">
            Customer Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-medium text-[#292A26]">
            Get In Touch
          </h1>
          <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
            Have questions regarding toy safety specifications, bespoke gifting, or order inquiries? We welcome your message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* CONTACT INFO DETAILS (4 cols on laptop/desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 bg-white border border-[#E8E4DC] rounded-lg space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A8B5A0] block">
                Store Headquarters
              </span>
              <h4 className="font-medium text-[#292A26] text-sm">Toys Ecom Retail Pvt Ltd</h4>
              <p className="text-xs text-[#77766F] leading-relaxed">
                MG Road, Bengaluru, Karnataka 560001, India
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E4DC] rounded-lg space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A8B5A0] block">
                Helpline &amp; Support
              </span>
              <h4 className="font-medium text-[#292A26] text-sm">+91 1800-TOYS-ECOM</h4>
              <p className="text-xs text-[#77766F]">
                +91 1800 869 7326 (Toll Free)
              </p>
              <span className="text-[11px] text-[#3B5135] font-medium block pt-1">
                Monday – Saturday (9:00 AM – 7:00 PM IST)
              </span>
            </div>

            <div className="p-6 bg-white border border-[#E8E4DC] rounded-lg space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A8B5A0] block">
                Direct Electronic Mail
              </span>
              <h4 className="font-medium text-[#292A26] text-sm">care@toysecom.com</h4>
              <p className="text-xs text-[#77766F]">
                Average response turnaround within 12 business hours.
              </p>
            </div>
          </div>

          {/* CONTACT FORM (8 cols on laptop/desktop) */}
          <div className="lg:col-span-8">
            <div className="p-6 sm:p-10 bg-white border border-[#E8E4DC] rounded-lg space-y-6">
              <div className="border-b border-[#E8E4DC] pb-3">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block mb-0.5">
                  Direct Dispatch
                </span>
                <h3 className="font-display font-medium text-xl text-[#292A26]">
                  Send Us A Message
                </h3>
              </div>

              {errorMessage && (
                <div className="p-3 bg-[#C98268]/15 border border-[#C98268]/30 text-[#A35338] text-xs rounded-md font-medium">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="p-4 bg-[#A8B5A0]/20 border border-[#A8B5A0]/40 text-[#2E4229] text-xs rounded-md font-medium leading-relaxed">
                  ✓ {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Full Name"
                    placeholder="E.g. Clara Dupont"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone Contact (Optional)"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Select
                    label="Inquiry Topic"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    options={[
                      'General Inquiry',
                      'Order Status & Tracking',
                      'Product & Safety Questions',
                      'Returns & Refund Request',
                      'Bespoke & Bulk Orders',
                    ]}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#292A26]">
                    Your Message <span className="text-[#C98268]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe your inquiry with as much detail as convenient..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E8E4DC] rounded-md text-[#292A26] placeholder:text-[#77766F]/60 focus:outline-none focus:border-[#292A26] focus:ring-1 focus:ring-[#292A26] transition-all"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full py-3" isLoading={isLoading}>
                  Submit Inquiry →
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
