import React, { useState } from "react";
import { Check, MessageCircle, BookOpen, X, QrCode, Copy } from "lucide-react";

interface PricingProps {
  email: string;
  onSimulatePayment: () => void;
}

const COURSES = [
  { name: "Full Stack Web Development", lessons: 20 },
  { name: "Python & Data Science", lessons: 20 },
  { name: "React & Next.js Mastery", lessons: 20 },
  { name: "Backend with Node.js", lessons: 20 },
];

export function Pricing({ email, onSimulatePayment }: PricingProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    amount: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const whatsappNumber = "919625712486";
  const upiId = "8409709338@ibl";

  const handleSelectPlan = (name: string, price: string, amount: number) => {
    setSelectedPlan({ name, price, amount });
    setShowPayment(true);
  };

  const handleWhatsAppConfirm = () => {
    if (!selectedPlan) return;
    const message = `Hi, I have made the payment for CodeMaster Pro (${selectedPlan.name} plan - ${selectedPlan.price}). My registered email is: ${email}. Please verify and grant me access.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (showPayment && selectedPlan) {
    // Generate UPI QR Code URL
    const upiUrl = `upi://pay?pa=${upiId}&pn=CodeMaster&am=${selectedPlan.amount}&cu=INR`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

    return (
      <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
            <h2 className="text-xl font-bold text-white">Complete Payment</h2>
            <button
              onClick={() => setShowPayment(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="text-center">
              <p className="text-zinc-400 text-sm">Selected Plan</p>
              <p className="text-2xl font-bold text-emerald-400">
                {selectedPlan.name} - {selectedPlan.price}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl flex justify-center items-center">
              <img
                src={qrCodeUrl}
                alt="UPI QR Code"
                className="w-48 h-48"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
              <p className="text-sm text-zinc-400 mb-2">Or pay using UPI ID:</p>
              <div className="flex items-center justify-between bg-zinc-950 rounded p-3 border border-zinc-800">
                <span className="text-white font-mono">{upiId}</span>
                <button
                  onClick={copyUpiId}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-sm"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <p className="text-sm text-zinc-400 text-center">
                After making the payment, click below to send a screenshot on
                WhatsApp for activation.
              </p>
              <button
                onClick={handleWhatsAppConfirm}
                className="w-full rounded-md bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />I have paid, send
                screenshot
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 py-12 sm:py-24 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-400">
            Pricing & Courses
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Unlock Premium Coding Features
          </p>
        </div>

        {/* Courses Included Section */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            What's Included in Premium
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COURSES.map((course, idx) => (
              <div
                key={idx}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex items-start gap-4"
              >
                <div className="bg-emerald-500/10 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {course.name}
                  </h4>
                  <p className="text-zinc-400 text-sm mt-1">
                    {course.lessons} Comprehensive Lessons
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 xl:gap-x-12">
          {/* Monthly Plan */}
          <div className="rounded-3xl p-8 ring-1 ring-zinc-800 xl:p-10 bg-zinc-900/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-white">
                  Monthly
                </h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-300">
                Perfect for short-term learning and practice.
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">
                  ₹500
                </span>
                <span className="text-sm font-semibold leading-6 text-zinc-300">
                  /month
                </span>
              </p>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-zinc-300"
              >
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-emerald-400" /> Full
                  access to code editor
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-emerald-400" /> AI
                  Chatbot (Gemini 3.1 Pro)
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-emerald-400" /> All
                  premium courses ({COURSES.length * 20} lessons)
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectPlan("Monthly", "₹500", 500)}
              className="mt-8 block w-full rounded-md bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              Pay Now
            </button>
          </div>

          {/* Yearly Plan */}
          <div className="rounded-3xl p-8 ring-2 ring-emerald-500 xl:p-10 bg-zinc-900 flex flex-col justify-between relative">
            <div className="absolute top-0 right-6 -translate-y-1/2 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
              Best Value
            </div>
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-white">
                  Yearly
                </h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-300">
                Save big with our annual commitment plan.
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">
                  ₹1200
                </span>
                <span className="text-sm font-semibold leading-6 text-zinc-300">
                  /year
                </span>
              </p>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-zinc-300"
              >
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-emerald-400" /> Full
                  access to code editor
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-emerald-400" /> AI
                  Chatbot (Gemini 3.1 Pro)
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-emerald-400" /> All
                  premium courses ({COURSES.length * 20} lessons)
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-emerald-400" />{" "}
                  Priority support
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectPlan("Yearly", "₹1200", 1200)}
              className="mt-8 block w-full rounded-md bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              Pay Now
            </button>
          </div>
        </div>

        {/* Demo bypass button */}
        <div className="mt-16 text-center">
          <p className="text-sm text-zinc-500 mb-4">
            For testing purposes, you can simulate admin approval:
          </p>
          <button
            onClick={onSimulatePayment}
            className="text-sm text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
          >
            Simulate Admin Approval (Bypass Payment)
          </button>
        </div>
      </div>
    </div>
  );
}
