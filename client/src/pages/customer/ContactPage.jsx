import React, { useState } from 'react';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import Card from '../../components/common/Card';
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
        setSuccessMessage('Thank you! Your message has been sent successfully. Our support team will respond within 24 hours.');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit contact inquiry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-6 space-y-8">
      <Container>
        <Breadcrumb items={[{ label: 'Contact Support' }]} />

        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-gray-900">
            Get In Touch With Us 💬
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Have questions about an order, toy specifications, or bulk inquiries? We’d love to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Card className="p-6 border border-gray-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl flex-shrink-0">
                📍
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Store Headquarters</h4>
                <p className="text-xs text-gray-500 mt-0.5">ToyNest Retail Pvt Ltd, MG Road, Bengaluru, Karnataka 560001</p>
              </div>
            </Card>

            <Card className="p-6 border border-gray-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl flex-shrink-0">
                📞
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Customer Helpline</h4>
                <p className="text-xs text-gray-500 mt-0.5">+91 1800-TOY-NEST (+91 1800 869 6378)</p>
                <span className="text-[10px] text-emerald-600 font-semibold">Mon - Sat (9:00 AM - 7:00 PM)</span>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-8 border border-gray-200 shadow-sm bg-white rounded-3xl space-y-6">
              <h3 className="text-xl font-bold font-display text-gray-900 border-b border-gray-100 pb-3">
                Send Us A Message
              </h3>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                  ⚠️ {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-semibold leading-relaxed">
                  ✨ {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Your Name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                  <Input label="Email Address" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Phone Number" type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <Select
                    label="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    options={[
                      'General Inquiry',
                      'Order Status & Tracking',
                      'Product & Safety Questions',
                      'Returns & Refund Request',
                    ]}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Message *</label>
                  <textarea
                    rows={4}
                    placeholder="How can we assist you today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
