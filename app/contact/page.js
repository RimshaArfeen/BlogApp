
"use client"
import React, { useState } from "react";
import { Mail, Locate, Twitter, Facebook, Github } from "lucide-react";
import "../globals.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      console.log("Form Submitted:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setFormData({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-3">Let’s Start a Conversation</h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Have a question, idea, or just want to share your thoughts? We’d love to
          hear from you — and we’ll get back within 24 hours.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Reach Out Anytime</h2>
          <p className="mb-8 leading-relaxed">
            From collaboration proposals to feedback on our content, our inbox is
            always open. Your voice matters here at <strong>EchoJournal</strong>.
          </p>

          <div className="space-y-4">
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              hello@echojournal.com
            </p>
            <p className="flex items-center gap-3">
              <Locate className="w-5 h-5 text-blue-600" />
              Karachi, Pakistan
            </p>
            <div className="flex gap-4 mt-4">
              <Twitter className="cursor-pointer hover:text-blue-500" />
              <Facebook className="cursor-pointer hover:text-blue-700" />
              <Github className="cursor-pointer hover:text-gray-800" />
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              We’ll only use this to reply to you.
            </p>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 h-32 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Sending..." : "Send Message 🚀"}
          </button>

          {/* Status Messages */}
          {status === "success" && (
            <p className="text-green-600 text-sm mt-2">
              ✅ Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm mt-2">
              ❌ Something went wrong. Try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
