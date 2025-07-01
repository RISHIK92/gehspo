"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Globe,
  MessageSquare,
} from "lucide-react";

export default function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        category: "",
        message: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@gehspo.org", "support@gehspo.org"],
      description: "Get in touch via email for general inquiries and support",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    },
  ];

  const categories = [
    "General Inquiry",
    "Membership Information",
    "Training & Certification",
    "Technical Support",
    "Partnership Opportunities",
    "Media & Press",
    "Compliance Questions",
    "Career Services",
    "Other",
  ];

  if (isSubmitted) {
    return (
      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-900 bg-opacity-90 border border-green-700 rounded-2xl p-12 shadow-xl">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-green-400 mb-4">
              Thank You!
            </h2>
            <p className="text-lg text-green-300 mb-6">
              Your message has been sent successfully. We'll get back to you
              within 24 hours.
            </p>
            <Badge className="bg-white bg-opacity-10 text-green-200 border border-white border-opacity-20 px-4 py-2">
              <Mail className="h-4 w-4 mr-2" />
              Confirmation sent to your email
            </Badge>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-white bg-opacity-10 text-white border border-white border-opacity-20 px-4 py-2">
            <MessageSquare className="h-4 w-4 mr-2" />
            Get In Touch
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 drop-shadow-lg">
            Contact Us
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about GEHSPO? We're here to help you advance your EHS
            career and connect with our global community.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-100 mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                Whether you're looking to join our community, need support, or
                want to explore partnership opportunities, we'd love to hear
                from you.
              </p>
            </div>

            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-900 bg-opacity-90 border border-gray-700"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-900 bg-opacity-40 rounded-xl">
                        <Icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-100 mb-2">
                          {info.title}
                        </h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-300 font-medium">
                            {detail}
                          </p>
                        ))}
                        <p className="text-sm text-gray-400 mt-2">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-gray-900 bg-opacity-90 border border-gray-700">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl flex items-center space-x-2 text-gray-100">
                  <Send className="h-6 w-6 text-blue-400" />
                  <span>Send us a Message</span>
                </CardTitle>
                <p className="text-gray-300">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full bg-gray-800 text-gray-100 border border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full bg-gray-800 text-gray-100 border border-gray-700"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full bg-gray-800 text-gray-100 border border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company/Organization
                      </label>
                      <Input
                        placeholder="Your Company Name"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        className="w-full bg-gray-800 text-gray-100 border border-gray-700"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <Input
                        required
                        placeholder="Brief subject of your inquiry"
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        className="w-full bg-gray-800 text-gray-100 border border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category *
                      </label>
                      <Select
                        required
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger className="w-full bg-gray-800 text-gray-100 border border-gray-700">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      required
                      placeholder="Please provide details about your inquiry..."
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      rows={6}
                      className="w-full bg-gray-800 text-gray-100 border border-gray-700"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                    <p className="text-sm text-gray-400">
                      * Required fields. We'll respond within 24 hours.
                    </p>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
