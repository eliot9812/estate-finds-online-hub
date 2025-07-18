import { useState, useRef } from "react"; // Import useRef
import { Paintbrush, Hammer, Wrench, Palette, Home, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";

const Others = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    serviceType: "",
    description: "",
    urgency: "",
    preferredDate: ""
  });

  // State for selected files
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const services = [
    {
      icon: Hammer,
      title: t('others.services.houseRenovation'),
      description: t('others.services.houseRenovationDesc'),
      color: "bg-[#006d4e]"
    },
    {
      icon: Paintbrush,
      title: t('others.services.interiorPainting'),
      description: t('others.services.interiorPaintingDesc'),
      color: "bg-[#006d4e]"
    },
    {
      icon: Palette,
      title: t('others.services.exteriorPainting'),
      description: t('others.services.exteriorPaintingDesc'),
      color: "bg-[#006d4e]"
    },
    {
      icon: Wrench,
      title: t('others.services.kitchenRenovation'),
      description: t('others.services.kitchenRenovationDesc'),
      color: "bg-[#006d4e]"
    },
    {
      icon: Home,
      title: t('others.services.bathroomRenovation'),
      description: t('others.services.bathroomRenovationDesc'),
      color: "bg-[#006d4e]"
    },
    {
      icon: Hammer,
      title: t('others.services.flooring'),
      description: t('others.services.flooringDesc'),
      color: "bg-[#006d4e]"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handler for file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  // Function to trigger the hidden file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real application, you would send formData and selectedFiles to your backend
    console.log("Service request submitted:", formData);
    console.log("Selected Files:", selectedFiles);

    // Example of how to send files with FormData (for a real API call)
    const submitFormData = new FormData();
    for (const key in formData) {
      submitFormData.append(key, formData[key as keyof typeof formData]);
    }
    selectedFiles.forEach((file) => {
      submitFormData.append("images", file); // 'images' would be the field name your backend expects
    });

    // You would typically use fetch or axios here:
    // fetch('/api/submit-service-request', {
    //   method: 'POST',
    //   body: submitFormData,
    // })
    // .then(response => response.json())
    // .then(data => {
    //   toast({ title: t('others.toast.title'), description: t('others.toast.description') });
    //   console.log(data);
    //   // Optionally reset form and files
    //   setFormData({
    //     name: "", address: "", phone: "", email: "",
    //     serviceType: "", description: "", urgency: "", preferredDate: ""
    //   });
    //   setSelectedFiles([]);
    // })
    // .catch(error => {
    //   console.error("Error submitting form:", error);
    //   toast({ title: "Submission Failed", description: "There was an error submitting your request.", variant: "destructive" });
    // });

    // For now, just show the toast and log
    toast({
      title: t('others.toast.title'),
      description: t('others.toast.description'),
    });

    // Optionally reset form and files after successful submission (or mock success)
    setFormData({
      name: "", address: "", phone: "", email: "",
      serviceType: "", description: "", urgency: "", preferredDate: ""
    });
    setSelectedFiles([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Animated Background Elements (Existing, keep if distinct, remove if replaced by hero animations) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-shape floating-shape-1">
          <Hammer className="w-20 h-20 text-green-500 animate-float" />
        </div>
        <div className="floating-shape floating-shape-2">
          <Paintbrush className="w-16 h-16 text-blue-500 animate-pulse-glow" />
        </div>
        <div className="floating-shape floating-shape-3">
          <Wrench className="w-24 h-24 text-orange-500 animate-rotate-float" />
        </div>
        <div className="floating-shape floating-shape-4">
          <Home className="w-18 h-18 text-purple-500 animate-float" style={{ animationDelay: '-2s' }} />
        </div>

        {/* Additional floating elements */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-green-400 rounded-full animate-pulse-glow" style={{ animationDelay: '-1s' }}></div>
        <div className="absolute bottom-32 left-16 w-6 h-6 bg-blue-400 rounded-full animate-float" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-1/2 left-10 w-3 h-3 bg-orange-400 rounded-full animate-pulse-glow" style={{ animationDelay: '-0.5s' }}></div>
        <div className="absolute bottom-20 right-32 w-5 h-5 bg-purple-400 rounded-full animate-float" style={{ animationDelay: '-4s' }}></div>
      </div>

      <Navigation />

      {/* Hero Section with Animations (Updated) */}
      <section className="bg-[#006d4e] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006d4e] via-[#005a41] to-[#004d37]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-white rounded-full animate-pulse delay-3000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <Hammer className="mx-auto h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mb-4 sm:mb-6 animate-fade-in opacity-0 animation-delay-300" /> {/* Changed to fade-in */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in opacity-0 animation-delay-300">{t('others.hero.title')}</h1> {/* Changed to fade-in */}
          <p className="text-base sm:text-lg lg:text-xl animate-fade-in opacity-0 animation-delay-600">{t('others.hero.subtitle')}</p> {/* Changed to fade-in */}
        </div>

        {/* Floating Animation Elements (New) */}
        <div className="absolute top-1/2 left-0 w-4 h-4 bg-green-300 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-1/3 right-0 w-6 h-6 bg-green-200 rounded-full animate-bounce opacity-40 delay-500"></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-50 delay-1000"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        {/* Services Grid */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up animate-delay-200">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{t('others.services.title')}</h2>
            <p className="text-gray-600 text-base sm:text-lg">{t('others.services.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover-lift animate-scale-in animate-delay-${300 + index * 100}`}>
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className={`${service.color} w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 animate-pulse-glow`}>
                    <service.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Request Form */}
        <Card className="shadow-xl max-w-4xl mx-auto hover-lift animate-fade-in-up animate-delay-500">
          <CardHeader className="bg-[#006D4E] text-white p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl flex items-center">
              <Hammer className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-bounce" />
              {t('others.form.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="animate-fade-in-left animate-delay-100">
                  <Label htmlFor="name" className="text-sm font-medium">{t('others.form.name')} *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    className="mt-1 text-sm sm:text-base smooth-transition"
                  />
                </div>

                <div className="animate-fade-in-right animate-delay-200">
                  <Label htmlFor="phone" className="text-sm font-medium">{t('others.form.phone')} *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    required
                    className="mt-1 text-sm sm:text-base smooth-transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="animate-fade-in-left animate-delay-300">
                  <Label htmlFor="email" className="text-sm font-medium">{t('others.form.email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="mt-1 text-sm sm:text-base smooth-transition"
                  />
                </div>

                <div className="animate-fade-in-right animate-delay-400">
                  <Label htmlFor="address" className="text-sm font-medium">{t('others.form.address')} *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Full property address"
                    required
                    className="mt-1 text-sm sm:text-base smooth-transition"
                  />
                </div>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="animate-fade-in-left animate-delay-500">
                  <Label htmlFor="serviceType" className="text-sm font-medium">{t('others.form.serviceType')} *</Label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full h-9 sm:h-10 px-3 border border-gray-300 rounded-md text-sm sm:text-base smooth-transition"
                  >
                    <option value="">Select Service</option>
                    <option value="house-renovation">{t('others.services.houseRenovation')}</option>
                    <option value="interior-painting">{t('others.services.interiorPainting')}</option>
                    <option value="exterior-painting">{t('others.services.exteriorPainting')}</option>
                    <option value="kitchen-renovation">{t('others.services.kitchenRenovation')}</option>
                    <option value="bathroom-renovation">{t('others.services.bathroomRenovation')}</option>
                    <option value="flooring">{t('others.services.flooring')}</option>
                  </select>
                </div>

                <div className="animate-fade-in-right animate-delay-600">
                  <Label htmlFor="urgency" className="text-sm font-medium">{t('others.form.urgency')} *</Label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full h-9 sm:h-10 px-3 border border-gray-300 rounded-md text-sm sm:text-base smooth-transition"
                  >
                    <option value="">Select Urgency</option>
                    <option value="urgent">Urgent (1-2 weeks)</option>
                    <option value="normal">Normal (1 month)</option>
                    <option value="flexible">Flexible (2+ months)</option>
                  </select>
                </div>
              </div>

              <div className="animate-fade-in-up animate-delay-700">
                <Label htmlFor="preferredDate" className="text-sm font-medium">{t('others.form.preferredDate')}</Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  className="mt-1 text-sm sm:text-base smooth-transition"
                />
              </div>

              <div className="animate-fade-in-up animate-delay-800">
                <Label htmlFor="description" className="text-sm font-medium">{t('others.form.description')} *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Please describe your renovation or painting project in detail..."
                  required
                  rows={5}
                  className="mt-1 text-sm sm:text-base resize-none smooth-transition"
                />
              </div>

              {/* Image Upload */}
              <div className="animate-scale-in animate-delay-900">
                <Label className="text-sm font-medium">{t('others.form.upload')}</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-orange-400 transition-colors smooth-transition hover-lift">
                  <Upload className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-gray-400 mb-3 animate-bounce" />
                  <p className="text-gray-500 mb-2 text-sm sm:text-base">{t('others.form.uploadDesc')}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{t('others.form.uploadFormat')}</p>

                  {/* Hidden file input */}
                  <Input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple // Allow multiple files
                    accept="image/*" // Restrict to image files
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden" // Keep it hidden
                  />

                  <Button
                    type="button"
                    variant="outline"
                    className="mt-3 text-sm sm:text-base smooth-transition hover-lift"
                    onClick={triggerFileInput} // Trigger click on the hidden input
                  >
                    {t('others.form.chooseImages')}
                  </Button>

                  {/* Display selected file names */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-4 text-left text-gray-700">
                      <p className="font-semibold text-sm">{t('others.form.selectedFiles')}:</p>
                      <ul className="list-disc list-inside text-xs text-gray-600">
                        {selectedFiles.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6 animate-fade-in-up animate-delay-1000">
                <Button type="submit" className="w-full bg-[#006D4E] hover:bg-[#006D4E] text-base sm:text-lg py-2 sm:py-3 smooth-transition hover-lift">
                  {t('others.form.submit')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Others;