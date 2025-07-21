import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Home, MessageSquare, Plus, Edit, Trash2, LogOut, CheckCircle, Clock, Phone, Eye, Trophy, BookOpen, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import * as LucideIcons from "lucide-react";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead?: boolean;
}

interface ServiceRequest {
  id: number;
  clientName: string;
  email: string;
  phone: string;
  serviceType: string;
  projectType: string;
  propertyType: string;
  budget: string;
  timeline: string;
  description: string;
  location: string;
  images: string[];
  submissionDate: string;
  isRead?: boolean;
}

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  type: 'buy' | 'rent';
  image: string;
  phone: string;
  status: 'active' | 'inactive';
}

interface PendingProperty {
  id: number;
  title: string;
  location: string;
  price: string;
  description: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  sqft: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  image: string;
}

interface Project {
  id: number;
  title: string;
  location: string;
  completedDate: string;
  projectType: string;
  client: string;
  size: string;
  duration: string;
  status: 'completed';
  image: string; // Keep single image for display in table
  keyFeatures: string[];
  challenges: string[];
  outcomes: string[];
  projectImages: string[]; // New field for multiple images
}


const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  
  const [contacts, setContacts] = useState<ContactMessage[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      subject: "Property Inquiry",
      message: "I'm interested in the downtown apartment listing.",
      date: "2024-01-15",
      isRead: false
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Selling Property",
      message: "I want to list my house for sale.",
      date: "2024-01-14",
      isRead: true
    }
  ]);

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    {
      id: 1,
      clientName: "Michael Johnson",
      email: "michael@example.com",
      phone: "(555) 123-4567",
      serviceType: "renovation",
      projectType: "Kitchen Renovation",
      propertyType: "house",
      budget: "15000-25000",
      timeline: "2-3 months",
      description: "Looking to completely renovate the kitchen with modern appliances and cabinets.",
      location: "Downtown, City Center",
      images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136", "https://images.unsplash.com/photo-1556909002-f90a3c292e3e"],
      submissionDate: "2024-01-16",
      isRead: false
    },
    {
      id: 2,
      clientName: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "(555) 987-6543",
      serviceType: "repair",
      projectType: "Bathroom Repair",
      propertyType: "apartment",
      budget: "5000-10000",
      timeline: "1 month",
      description: "Need to fix plumbing issues and replace tiles in the bathroom.",
      location: "Uptown District",
      images: ["https://images.unsplash.com/photo-1620626011761-996317b8d101"],
      submissionDate: "2024-01-15",
      isRead: true
    }
  ]);

  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "Beautiful Family Home",
      location: "123 Oak Street, Downtown",
      price: "$450,000",
      beds: 4,
      baths: 3,
      sqft: "2,400 sq ft",
      type: 'buy',
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      phone: "(555) 123-4567",
      status: 'active'
    },
    {
      id: 2,
      title: "Modern Luxury Condo",
      location: "456 Pine Avenue, Uptown",
      price: "$680,000",
      beds: 2,
      baths: 2,
      sqft: "1,800 sq ft",
      type: 'buy',
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
      phone: "(555) 234-5678",
      status: 'active'
    },
    {
      id: 3,
      title: "Downtown Luxury Apartment",
      location: "789 Main Street, City Center",
      price: "$2,500/month",
      beds: 2,
      baths: 2,
      sqft: "1,200 sq ft",
      type: 'rent',
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      phone: "(555) 345-6789",
      status: 'active'
    },
    {
      id: 4,
      title: "Cozy Studio Apartment",
      location: "321 Elm Street, Midtown",
      price: "$1,800/month",
      beds: 1,
      baths: 1,
      sqft: "800 sq ft",
      type: 'rent',
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      phone: "(555) 456-7890",
      status: 'active'
    }
  ]);

  const [pendingProperties, setPendingProperties] = useState<PendingProperty[]>([
    {
      id: 1,
      title: "Beautiful Family Home",
      location: "123 Main Street, Springfield",
      price: "450000",
      description: "This stunning family home features modern amenities and a great location.",
      propertyType: "house",
      bedrooms: 3,
      bathrooms: 2,
      sqft: "2400",
      contactName: "Alice Johnson",
      contactEmail: "alice@example.com",
      contactPhone: "(555) 123-4567",
      submissionDate: "2024-01-16",
      status: 'pending',
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
    },
    {
      id: 2,
      title: "Cozy Downtown Apartment",
      location: "456 Oak Avenue, Downtown",
      price: "1800",
      description: "Perfect apartment for young professionals in the heart of the city.",
      propertyType: "apartment",
      bedrooms: 1,
      bathrooms: 1,
      sqft: "800",
      contactName: "Bob Wilson",
      contactEmail: "bob@example.com",
      contactPhone: "(555) 987-6543",
      submissionDate: "2024-01-15",
      status: 'pending',
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Skyline Business Complex",
      location: "Downtown Financial District",
      completedDate: "March 2024",
      projectType: "commercial",
      client: "Metro Corporation",
      size: "250,000 sq ft",
      duration: "24 months",
      status: "completed",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      keyFeatures: ["Modern design", "Energy efficient", "Prime location"],
      challenges: ["Tight deadline", "Material sourcing"],
      outcomes: ["Delivered on time", "High client satisfaction"],
      projectImages: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
        "https://images.unsplash.com/photo-1582234007127-14e3006a8e84",
        "https://images.unsplash.com/photo-1600877983636-f00e99e82c5f"
      ]
    },
    {
      id: 2,
      title: "Green Valley Residential",
      location: "Suburb Hills, North Side",
      completedDate: "January 2024",
      projectType: "residential",
      client: "Valley Homes Ltd",
      size: "150 units",
      duration: "18 months",
      status: "completed",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      keyFeatures: ["Sustainable materials", "Community amenities", "Spacious layouts"],
      challenges: ["Weather delays", "Permitting issues"],
      outcomes: ["Eco-friendly certification", "Strong sales"],
      projectImages: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
        "https://images.unsplash.com/photo-1564078564-e1d9d7e5d8a0",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
      ]
    },
    {
      id: 3,
      title: "Modern Office Tower",
      location: "Central Business District",
      completedDate: "November 2023",
      projectType: "commercial",
      client: "Tech Solutions Inc",
      size: "180,000 sq ft",
      duration: "30 months",
      status: "completed",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      keyFeatures: ["Smart building technology", "Flexible workspaces", "Rooftop garden"],
      challenges: ["Complex foundation work", "Integration of new tech"],
      outcomes: ["Award-winning design", "Increased tenant occupancy"],
      projectImages: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c",
        "https://images.unsplash.com/photo-1506748687-bb4f5766b3f9",
        "https://images.unsplash.com/photo-1524148417534-111ad7a25039"
      ]
    }
  ]);


  const initialNewPropertyState = {
    title: "",
    location: "",
    price: "",
    beds: 1,
    baths: 1,
    sqft: "",
    type: 'buy' as 'buy' | 'rent',
    image: "",
    phone: "",
    status: 'active' as 'active' | 'inactive'
  };
  const [newProperty, setNewProperty] = useState<typeof initialNewPropertyState>(initialNewPropertyState);
  const [propertyImagePreview, setPropertyImagePreview] = useState<string | null>(null);

  const initialNewPendingPropertyState = {
    title: "",
    location: "",
    price: "",
    description: "",
    propertyType: "house",
    bedrooms: 1,
    bathrooms: 1,
    sqft: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    image: ""
  };
  const [newPendingProperty, setNewPendingProperty] = useState<Omit<PendingProperty, 'id' | 'status' | 'submissionDate'>>(initialNewPendingPropertyState);
  const [pendingPropertyImagePreview, setPendingPropertyImagePreview] = useState<string | null>(null);

  const [newProject, setNewProject] = useState<Omit<Project, 'id' | 'status' | 'image'>>({
    title: "",
    location: "",
    completedDate: "",
    projectType: "",
    client: "",
    size: "",
    duration: "",
    keyFeatures: [],
    challenges: [],
    outcomes: [],
    projectImages: []
  });

  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [showProjectPreviewDialog, setShowProjectPreviewDialog] = useState(false);

  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editingPendingProperty, setEditingPendingProperty] = useState<PendingProperty | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [showPropertyDialog, setShowPropertyDialog] = useState(false);
  const [showPendingPropertyDialog, setShowPendingPropertyDialog] = useState(false);
  const [showAddPendingPropertyDialog, setShowAddPendingPropertyDialog] = useState(false);
  const [showProjectDialog, setShowProjectDialog] = useState(false);

  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showViewPropertyDialog, setShowViewPropertyDialog] = useState(false);
  const [showViewPendingDialog, setShowViewPendingDialog] = useState(false);
  const [showViewProjectDialog, setShowViewProjectDialog] = useState(false);
  const [showViewServiceRequestDialog, setShowViewServiceRequestDialog] = useState(false);

  const [viewingContact, setViewingContact] = useState<ContactMessage | null>(null);
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null);
  const [viewingPendingProperty, setViewingPendingProperty] = useState<PendingProperty | null>(null);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [viewingServiceRequest, setViewingServiceRequest] = useState<ServiceRequest | null>(null);

  const availableIcons = [
    'Home', 'Calculator', 'Hammer', 'PaintBucket', 'Shield', 
    'Key', 'MapPin', 'Phone', 'Mail', 'Users', 'Building', 'Cog', 'Star', 
    'Heart', 'CheckCircle', 'Award', 'Target', 'Zap', 'Lightbulb', 'Camera',
    'FileText', 'Clock', 'Calendar', 'TrendingUp', 'DollarSign', 'CreditCard'
  ] as (keyof typeof LucideIcons)[];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast({
      title: "Contact Deleted",
      description: "Contact message has been removed.",
    });
  };

  const handleMarkContactAsRead = (id: number) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, isRead: true } : contact
    ));
    toast({
      title: "Message Marked as Read",
      description: "Contact message has been marked as read.",
    });
  };

  const handleDeleteServiceRequest = (id: number) => {
    setServiceRequests(serviceRequests.filter(request => request.id !== id));
    toast({
      title: "Service Request Deleted",
      description: "Service request has been removed.",
    });
  };

  const handleMarkServiceRequestAsRead = (id: number) => {
    setServiceRequests(serviceRequests.map(request => 
      request.id === id ? { ...request, isRead: true } : request
    ));
    toast({
      title: "Service Request Marked as Read",
      description: "Service request has been marked as read.",
    });
  };

  const handlePropertyImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPropertyImagePreview(reader.result);
          setNewProperty(prev => ({ ...prev, image: reader.result })); // Set image directly
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPropertyImagePreview(null);
      setNewProperty(prev => ({ ...prev, image: "" }));
    }
  };

  const handlePendingPropertyImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPendingPropertyImagePreview(reader.result);
          setNewPendingProperty(prev => ({ ...prev, image: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPendingPropertyImagePreview(null);
      setNewPendingProperty(prev => ({ ...prev, image: "" }));
    }
  };

  const handleUpdateProperty = () => {
    if (editingProperty) {
      setProperties(properties.map(p => p.id === editingProperty.id ? { ...newProperty, id: editingProperty.id } : p));
      toast({ title: "Property Updated", description: "Property has been updated successfully." });
    } else {
      // Logic for adding a new property if this dialog is used for adding
      const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
      setProperties([...properties, { ...newProperty, id: newId }]);
      toast({ title: "Property Added", description: "New property has been added successfully." });
    }
    setEditingProperty(null);
    setShowPropertyDialog(false);
    setPropertyImagePreview(null); // Clear preview after update/add
  };

  const handleEditProperty = (property: Property) => {
    setNewProperty(property);
    setEditingProperty(property);
    setPropertyImagePreview(property.image); // Set preview for existing image
    setShowPropertyDialog(true);
  };

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter(property => property.id !== id));
    toast({
      title: "Property Deleted",
      description: "Property has been removed.",
    });
  };

  const handleTogglePropertyStatus = (id: number) => {
    setProperties(properties.map(p => 
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
    toast({
      title: "Status Updated",
      description: "Property status has been changed.",
    });
  };

  const handleApprovePendingProperty = (pendingProperty: PendingProperty) => {
    const newProperty: Property = {
      id: properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1,
      title: pendingProperty.title,
      location: pendingProperty.location,
      price: pendingProperty.propertyType === 'apartment' ? `$${pendingProperty.price}/month` : `$${pendingProperty.price}`,
      beds: pendingProperty.bedrooms,
      baths: pendingProperty.bathrooms,
      sqft: `${pendingProperty.sqft} sq ft`,
      type: pendingProperty.propertyType === 'apartment' ? 'rent' : 'buy',
      image: pendingProperty.image,
      phone: pendingProperty.contactPhone,
      status: 'active'
    };

    setProperties([...properties, newProperty]);
    setPendingProperties(pendingProperties.filter(p => p.id !== pendingProperty.id));
    
    toast({
      title: "Property Approved",
      description: "Property has been approved and added to listings.",
    });
  };

  const handleRejectPendingProperty = (id: number) => {
    setPendingProperties(pendingProperties.filter(p => p.id !== id));
    toast({
      title: "Property Rejected",
      description: "Property submission has been rejected.",
    });
  };

  const handleEditPendingProperty = (property: PendingProperty) => {
    setEditingPendingProperty(property);
    setNewPendingProperty({ 
      title: property.title,
      location: property.location,
      price: property.price,
      description: property.description,
      propertyType: property.propertyType,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      sqft: property.sqft,
      contactName: property.contactName,
      contactEmail: property.contactEmail,
      contactPhone: property.contactPhone,
      image: property.image
    });
    setPendingPropertyImagePreview(property.image);
    setShowPendingPropertyDialog(true);
  };

  const handleAddPendingProperty = () => {
    const newId = pendingProperties.length > 0 ? Math.max(...pendingProperties.map(p => p.id)) + 1 : 1;
    const currentDate = new Date().toISOString().split('T')[0];
    setPendingProperties([...pendingProperties, { 
        ...newPendingProperty, 
        id: newId, 
        status: 'pending', 
        submissionDate: currentDate 
    }]);
    toast({ title: "Pending Property Added", description: "New pending property has been added for review." });
    setNewPendingProperty(initialNewPendingPropertyState);
    setPendingPropertyImagePreview(null);
    setShowAddPendingPropertyDialog(false);
  };

  const handleUpdatePendingProperty = () => {
    if (editingPendingProperty) {
      setPendingProperties(pendingProperties.map(p => 
        p.id === editingPendingProperty.id ? { 
          ...p,
          title: newPendingProperty.title,
          location: newPendingProperty.location,
          price: newPendingProperty.price,
          description: newPendingProperty.description,
          propertyType: newPendingProperty.propertyType,
          bedrooms: newPendingProperty.bedrooms,
          bathrooms: newPendingProperty.bathrooms,
          sqft: newPendingProperty.sqft,
          contactName: newPendingProperty.contactName,
          contactEmail: newPendingProperty.contactEmail,
          contactPhone: newPendingProperty.contactPhone,
          image: newPendingProperty.image
        } : p
      ));
      toast({
        title: "Property Updated",
        description: "Pending property has been updated.",
      });
    }
    setEditingPendingProperty(null);
    setShowPendingPropertyDialog(false);
    setPendingPropertyImagePreview(null);
  };

  const handleCallProperty = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleViewContact = (contact: ContactMessage) => {
    setViewingContact(contact);
    setShowContactDialog(true);
  };

  const handleViewProperty = (property: Property) => {
    setViewingProperty(property);
    setShowViewPropertyDialog(true);
  };

  const handleViewPendingProperty = (property: PendingProperty) => {
    setViewingPendingProperty(property);
    setShowViewPendingDialog(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageUrls: string[] = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          imageUrls.push(reader.result);
          if (imageUrls.length === files.length) {
            setProjectImages(prev => [...prev, ...imageUrls]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
    event.target.value = '';
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setProjectImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const validateProjectForm = () => {
    if (newProject.title.trim() === "" || newProject.location.trim() === "" || newProject.completedDate.trim() === "" ||
        newProject.projectType.trim() === "" || newProject.client.trim() === "" || newProject.size.trim() === "" ||
        newProject.duration.trim() === "") {
      toast({
        title: "Missing Information",
        description: "Please fill in all general project details.",
        variant: "destructive",
      });
      return false;
    }
    if (newProject.keyFeatures.filter(f => f.trim() !== '').length === 0 || 
        newProject.challenges.filter(c => c.trim() !== '').length === 0 || 
        newProject.outcomes.filter(o => o.trim() !== '').length === 0) {
      toast({
        title: "Missing Information",
        description: "Please add at least one key feature, challenge, and outcome.",
        variant: "destructive",
      });
      return false;
    }
    if (projectImages.length < 3) {
      toast({
        title: "Missing Images",
        description: "Please upload at least 3 project images.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleAddOrUpdateProject = () => {
    if (!validateProjectForm()) {
      return;
    }

    const finalNewProject: Project = {
      ...newProject,
      id: editingProject ? editingProject.id : (projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1),
      status: 'completed',
      image: projectImages[0] || "",
      projectImages: projectImages,
      keyFeatures: newProject.keyFeatures.filter(f => f.trim() !== ''),
      challenges: newProject.challenges.filter(c => c.trim() !== ''),
      outcomes: newProject.outcomes.filter(o => o.trim() !== '')
    };

    if (editingProject) {
      setProjects(projects.map(p => p.id === finalNewProject.id ? finalNewProject : p));
      toast({ title: "Project Updated", description: "Project has been updated successfully." });
    } else {
      setProjects([...projects, finalNewProject]);
      toast({ title: "Project Added", description: "New project has been added successfully." });
    }
    
    setNewProject({ 
      title: "", 
      location: "", 
      completedDate: "", 
      projectType: "", 
      client: "", 
      size: "", 
      duration: "", 
      keyFeatures: [], 
      challenges: [], 
      outcomes: [], 
      projectImages: []
    });
    setProjectImages([]);
    setEditingProject(null);
    setShowProjectDialog(false);
    setShowProjectPreviewDialog(false);
  };

  const handlePreviewProject = () => {
    if (!validateProjectForm()) {
      return;
    }
    setShowProjectDialog(false);
    setShowProjectPreviewDialog(true);
  };

  const handleEditProject = (project: Project) => {
    setNewProject({
      title: project.title,
      location: project.location,
      completedDate: project.completedDate,
      projectType: project.projectType,
      client: project.client,
      size: project.size,
      duration: project.duration,
      keyFeatures: project.keyFeatures,
      challenges: project.challenges,
      outcomes: project.outcomes,
      projectImages: project.projectImages
    });
    setProjectImages(project.projectImages);
    setEditingProject(project);
    setShowProjectDialog(true);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({
      title: "Project Deleted",
      description: "Project has been removed.",
    });
  };

  const handleViewProject = (project: Project) => {
    setViewingProject(project);
    setShowViewProjectDialog(true);
  };

  const handleViewServiceRequest = (request: ServiceRequest) => {
    setViewingServiceRequest(request);
    setShowViewServiceRequestDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your real estate platform</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeTab === 'listings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('listings')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'listings' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">All Listings</span>
            <span className="sm:hidden">Listings</span>
          </Button>
          <Button
            variant={activeTab === 'pending' ? 'default' : 'outline'}
            onClick={() => setActiveTab('pending')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'pending' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <Clock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Pending Properties</span>
            <span className="sm:hidden">Pending</span>
          </Button>
          <Button
            variant={activeTab === 'projects' ? 'default' : 'outline'}
            onClick={() => setActiveTab('projects')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'projects' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <Trophy className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Projects</span>
            <span className="sm:hidden">Projects</span>
          </Button>
          
          <Button
            variant={activeTab === 'contacts' ? 'default' : 'outline'}
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'contacts' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <MessageSquare className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Contact Messages</span>
            <span className="sm:hidden">Contacts</span>
          </Button>
          <Button
            variant={activeTab === 'service-requests' ? 'default' : 'outline'}
            onClick={() => setActiveTab('service-requests')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'service-requests' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <BookOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Service Requests</span>
            <span className="sm:hidden">Requests</span>
          </Button>
        </div>

        {/* All Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">All Property Listings</h2>
              <Dialog open={showPropertyDialog} onOpenChange={setShowPropertyDialog}>
                <Button onClick={() => { setNewProperty({ ...initialNewPropertyState, type: 'rent' }); setEditingProperty(null); setPropertyImagePreview(null); setShowPropertyDialog(true); }} className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90" >
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Add Property For Rent</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProperty ? 'Edit Property' : 'Add New Property'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" value={newProperty.title} onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })} placeholder="Property title" />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={newProperty.location} onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })} placeholder="Property location" />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input id="price" value={newProperty.price} onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })} placeholder="$450,000 or $2,500/month" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="beds">Bedrooms</Label>
                        <Input id="beds" type="number" value={newProperty.beds} onChange={(e) => setNewProperty({ ...newProperty, beds: parseInt(e.target.value) })} />
                      </div>
                      <div>
                        <Label htmlFor="baths">Bathrooms</Label>
                        <Input id="baths" type="number" value={newProperty.baths} onChange={(e) => setNewProperty({ ...newProperty, baths: parseInt(e.target.value) })} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="sqft">Square Feet</Label>
                      <Input id="sqft" value={newProperty.sqft} onChange={(e) => setNewProperty({ ...newProperty, sqft: e.target.value })} placeholder="2,100 sq ft" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Contact Phone</Label>
                      <Input id="phone" value={newProperty.phone} onChange={(e) => setNewProperty({ ...newProperty, phone: e.target.value })} placeholder="(555) 123-4567" />
                    </div>
                    {newProperty.type === 'buy' && ( // Only show type selection if adding for buy
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select value={newProperty.type} onValueChange={(value: 'buy' | 'rent') => setNewProperty({ ...newProperty, type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">Buy</SelectItem>
                          <SelectItem value="rent">Rent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    )}
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={newProperty.status} onValueChange={(value: 'active' | 'inactive') => setNewProperty({ ...newProperty, status: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="image">Property Image</Label>
                      <Input id="image" type="file" accept="image/*" onChange={handlePropertyImageUpload} className="mb-2" />
                      {propertyImagePreview && (
                        <div className="mt-2 w-32 h-32 border rounded overflow-hidden">
                          <img src={propertyImagePreview} alt="Property Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <Button onClick={handleUpdateProperty} className="w-full bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                      {editingProperty ? 'Update Property' : 'Add Property'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden sm:table-cell">Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden sm:table-cell">Beds/Baths</TableHead>
                      <TableHead className="hidden lg:table-cell">Type</TableHead>
                      <TableHead className="hidden lg:table-cell">Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="hidden sm:table-cell">
                          <img src={property.image} alt={property.title} className="w-16 h-16 object-cover rounded-md" />
                        </TableCell>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{property.location}</TableCell>
                        <TableCell>{property.price}</TableCell>
                        <TableCell className="hidden sm:table-cell">{property.beds} / {property.baths}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            property.type === 'buy' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {property.type}
                          </span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {property.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewProperty(property)} className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditProperty(property)}>
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleCallProperty(property.phone)}>
                              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleTogglePropertyStatus(property.id)} className={property.status === 'active' ? 'text-gray-600' : 'text-green-600'}>
                              {property.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteProperty(property.id)}>
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View Property Dialog */}
        <Dialog open={showViewPropertyDialog} onOpenChange={setShowViewPropertyDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Property Details</DialogTitle>
            </DialogHeader>
            {viewingProperty && (
              <div className="space-y-4">
                <img src={viewingProperty.image} alt={viewingProperty.title} className="w-full h-64 object-cover rounded-md" />
                <h3 className="text-2xl font-bold">{viewingProperty.title}</h3>
                <p className="text-lg text-gray-700">{viewingProperty.price}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Location</Label>
                    <p className="text-gray-700">{viewingProperty.location}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Type</Label>
                    <p className="text-gray-700">{viewingProperty.type}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Bedrooms</Label>
                    <p className="text-gray-700">{viewingProperty.beds}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Bathrooms</Label>
                    <p className="text-gray-700">{viewingProperty.baths}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Square Feet</Label>
                    <p className="text-gray-700">{viewingProperty.sqft}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Contact Phone</Label>
                    <p className="text-gray-700">{viewingProperty.phone}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Status</Label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      viewingProperty.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {viewingProperty.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={() => { handleEditProperty(viewingProperty); setShowViewPropertyDialog(false); }} variant="outline">
                    <Edit className="mr-2 h-4 w-4" /> Edit Property
                  </Button>
                  <Button onClick={() => handleCallProperty(viewingProperty.phone)} variant="outline">
                    <Phone className="mr-2 h-4 w-4" /> Call
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Pending Properties Tab */}
        {activeTab === 'pending' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">Pending Property Submissions</h2>
              <Dialog open={showAddPendingPropertyDialog} onOpenChange={setShowAddPendingPropertyDialog}>
                <Button onClick={() => { setNewPendingProperty(initialNewPendingPropertyState); setPendingPropertyImagePreview(null); setShowAddPendingPropertyDialog(true); }} className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90" >
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Add Property For Sale</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Property For Sale</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pending-title">Title</Label>
                      <Input id="pending-title" value={newPendingProperty.title} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, title: e.target.value })} placeholder="Property title" />
                    </div>
                    <div>
                      <Label htmlFor="pending-location">Location</Label>
                      <Input id="pending-location" value={newPendingProperty.location} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, location: e.target.value })} placeholder="Property location" />
                    </div>
                    <div>
                      <Label htmlFor="pending-price">Price</Label>
                      <Input id="pending-price" value={newPendingProperty.price} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, price: e.target.value })} placeholder="e.g., 450000 or 1800" />
                    </div>
                    <div>
                      <Label htmlFor="pending-propertyType">Property Type</Label>
                      <Select value={newPendingProperty.propertyType} onValueChange={(value) => setNewPendingProperty({ ...newPendingProperty, propertyType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pending-bedrooms">Bedrooms</Label>
                        <Input id="pending-bedrooms" type="number" value={newPendingProperty.bedrooms} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, bedrooms: parseInt(e.target.value) })} />
                      </div>
                      <div>
                        <Label htmlFor="pending-bathrooms">Bathrooms</Label>
                        <Input id="pending-bathrooms" type="number" value={newPendingProperty.bathrooms} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, bathrooms: parseInt(e.target.value) })} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="pending-sqft">Square Feet</Label>
                      <Input id="pending-sqft" value={newPendingProperty.sqft} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, sqft: e.target.value })} placeholder="e.g., 2400" />
                    </div>
                    <div>
                      <Label htmlFor="pending-contactName">Contact Name</Label>
                      <Input id="pending-contactName" value={newPendingProperty.contactName} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, contactName: e.target.value })} placeholder="Contact person's name" />
                    </div>
                    <div>
                      <Label htmlFor="pending-contactEmail">Contact Email</Label>
                      <Input id="pending-contactEmail" type="email" value={newPendingProperty.contactEmail} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, contactEmail: e.target.value })} placeholder="Contact person's email" />
                    </div>
                    <div>
                      <Label htmlFor="pending-contactPhone">Contact Phone</Label>
                      <Input id="pending-contactPhone" value={newPendingProperty.contactPhone} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, contactPhone: e.target.value })} placeholder="Contact person's phone" />
                    </div>
                    <div>
                      <Label htmlFor="pending-image">Property Image</Label>
                      <Input id="pending-image" type="file" accept="image/*" onChange={handlePendingPropertyImageUpload} className="mb-2" />
                      {pendingPropertyImagePreview && (
                        <div className="mt-2 w-32 h-32 border rounded overflow-hidden">
                          <img src={pendingPropertyImagePreview} alt="Property Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <Button onClick={handleAddPendingProperty} className="w-full bg-[#006d4e] text-white hover:bg-[#006d4e]/90">Add Property</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showPendingPropertyDialog} onOpenChange={setShowPendingPropertyDialog}>
                <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Pending Property</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-pending-title">Title</Label>
                      <Input id="edit-pending-title" value={newPendingProperty.title} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, title: e.target.value })} placeholder="Property title" />
                    </div>
                    <div>
                      <Label htmlFor="edit-pending-location">Location</Label>
                      <Input id="edit-pending-location" value={newPendingProperty.location} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, location: e.target.value })} placeholder="Property location" />
                    </div>
                    <div>
                      <Label htmlFor="edit-pending-price">Price</Label>
                      <Input id="edit-pending-price" value={newPendingProperty.price} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, price: e.target.value })} placeholder="e.g., 450000 or 1800" />
                    </div>
                    <div>
                      <Label htmlFor="edit-pending-description">Description</Label>
                      <Textarea id="edit-pending-description" value={newPendingProperty.description} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, description: e.target.value })} placeholder="Detailed description of the property" rows={3} />
                    </div>
                    <div>
                      <Label htmlFor="edit-pending-propertyType">Property Type</Label>
                      <Select value={newPendingProperty.propertyType} onValueChange={(value) => setNewPendingProperty({ ...newPendingProperty, propertyType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-pending-bedrooms">Bedrooms</Label>
                        <Input id="edit-pending-bedrooms" type="number" value={newPendingProperty.bedrooms} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, bedrooms: parseInt(e.target.value) })} />
                      </div>
                      <div>
                        <Label htmlFor="edit-pending-bathrooms">Bathrooms</Label>
                        <Input id="edit-pending-bathrooms" type="number" value={newPendingProperty.bathrooms} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, bathrooms: parseInt(e.target.value) })} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="edit-pending-sqft">Square Feet</Label>
                      <Input id="edit-pending-sqft" value={newPendingProperty.sqft} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, sqft: e.target.value })} placeholder="e.g., 2400" />
                    </div>
                    <div>
                      <Label htmlFor="edit-pending-contactName">Contact Name</Label>
                      <Input id="edit-pending-contactName" value={newPendingProperty.contactName} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, contactName: e.target.value })} placeholder="Contact person's name" />
                    </div>
                    <div>
                      <Label htmlFor="edit-pending-contactEmail">Contact Email</Label>
                      <Input id="edit-pending-contactEmail" type="email" value={newPendingProperty.contactEmail} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, contactEmail: e.target.value })} placeholder="Contact person's email" />
                    </div>
                    <div>
                      <Label htmlFor="edit-pending-contactPhone">Contact Phone</Label>
                      <Input id="edit-pending-contactPhone" value={newPendingProperty.contactPhone} onChange={(e) => setNewPendingProperty({ ...newPendingProperty, contactPhone: e.target.value })} placeholder="Contact person's phone" />
                    </div>
                    <div>
                      <Label htmlFor="edit-pending-image">Property Image</Label>
                      <Input id="edit-pending-image" type="file" accept="image/*" onChange={handlePendingPropertyImageUpload} className="mb-2" />
                      {pendingPropertyImagePreview && (
                        <div className="mt-2 w-32 h-32 border rounded overflow-hidden">
                          <img src={pendingPropertyImagePreview} alt="Property Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <Button onClick={handleUpdatePendingProperty} className="w-full bg-[#006d4e] text-white hover:bg-[#006d4e]/90">Update Pending Property</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden sm:table-cell">Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden lg:table-cell">Type</TableHead>
                      <TableHead className="hidden sm:table-cell">Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="hidden sm:table-cell">
                          <img src={property.image} alt={property.title} className="w-16 h-16 object-cover rounded-md" />
                        </TableCell>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{property.location}</TableCell>
                        <TableCell>${property.price}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}>
                            {property.propertyType}
                          </span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{property.submissionDate}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            property.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {property.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewPendingProperty(property)} className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditPendingProperty(property)}>
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="default" size="sm" onClick={() => handleApprovePendingProperty(property)} className="bg-green-600 text-white hover:bg-green-600/90">
                              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" /> Approve
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleRejectPendingProperty(property.id)}>
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" /> Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View Pending Property Dialog */}
        <Dialog open={showViewPendingDialog} onOpenChange={setShowViewPendingDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Pending Property Details</DialogTitle>
            </DialogHeader>
            {viewingPendingProperty && (
              <div className="space-y-4">
                <img src={viewingPendingProperty.image} alt={viewingPendingProperty.title} className="w-full h-64 object-cover rounded-md" />
                <h3 className="text-2xl font-bold">{viewingPendingProperty.title}</h3>
                <p className="text-lg text-gray-700">Price: ${viewingPendingProperty.price}</p>
                <p className="text-gray-700">{viewingPendingProperty.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Location</Label>
                    <p className="text-gray-700">{viewingPendingProperty.location}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Property Type</Label>
                    <p className="text-gray-700">{viewingPendingProperty.propertyType}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Bedrooms</Label>
                    <p className="text-gray-700">{viewingPendingProperty.bedrooms}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Bathrooms</Label>
                    <p className="text-gray-700">{viewingPendingProperty.bathrooms}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Square Feet</Label>
                    <p className="text-gray-700">{viewingPendingProperty.sqft} sq ft</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Contact Name</Label>
                    <p className="text-gray-700">{viewingPendingProperty.contactName}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Contact Email</Label>
                    <p className="text-gray-700">{viewingPendingProperty.contactEmail}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Contact Phone</Label>
                    <p className="text-gray-700">{viewingPendingProperty.contactPhone}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Submission Date</Label>
                    <p className="text-gray-700">{viewingPendingProperty.submissionDate}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Status</Label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      viewingPendingProperty.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      viewingPendingProperty.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {viewingPendingProperty.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={() => { handleApprovePendingProperty(viewingPendingProperty); setShowViewPendingDialog(false); }} variant="default" className="bg-green-600 text-white hover:bg-green-600/90">
                    <CheckCircle className="mr-2 h-4 w-4" /> Approve
                  </Button>
                  <Button onClick={() => { handleEditPendingProperty(viewingPendingProperty); setShowViewPendingDialog(false); }} variant="outline">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button onClick={() => { handleRejectPendingProperty(viewingPendingProperty.id); setShowViewPendingDialog(false); }} variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Reject
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">All Projects</h2>
              <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
                <Button onClick={() => { setNewProject({title: "", location: "", completedDate: "", projectType: "", client: "", size: "", duration: "", keyFeatures: [], challenges: [], outcomes: [], projectImages: []}); setProjectImages([]); setEditingProject(null); setShowProjectDialog(true); }} className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Add New Project</span>
                  <span className="sm:hidden">Add</span>
                </Button>
                <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">General Details</h3>
                    <div>
                      <Label htmlFor="project-title">Project Title</Label>
                      <Input id="project-title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} placeholder="e.g., Grand Commercial Tower" />
                    </div>
                    <div>
                      <Label htmlFor="project-location">Location</Label>
                      <Input id="project-location" value={newProject.location} onChange={(e) => setNewProject({ ...newProject, location: e.target.value })} placeholder="e.g., Downtown Financial District" />
                    </div>
                    <div>
                      <Label htmlFor="project-completedDate">Completed Date</Label>
                      <Input id="project-completedDate" value={newProject.completedDate} onChange={(e) => setNewProject({ ...newProject, completedDate: e.target.value })} placeholder="e.g., March 2024" />
                    </div>
                    <div>
                      <Label htmlFor="project-type">Project Type</Label>
                      <Select value={newProject.projectType} onValueChange={(value) => setNewProject({ ...newProject, projectType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="project-client">Client</Label>
                      <Input id="project-client" value={newProject.client} onChange={(e) => setNewProject({ ...newProject, client: e.target.value })} placeholder="e.g., Tech Solutions Inc" />
                    </div>
                    <div>
                      <Label htmlFor="project-size">Size</Label>
                      <Input id="project-size" value={newProject.size} onChange={(e) => setNewProject({ ...newProject, size: e.target.value })} placeholder="e.g., 250,000 sq ft or 150 units" />
                    </div>
                    <div>
                      <Label htmlFor="project-duration">Duration</Label>
                      <Input id="project-duration" value={newProject.duration} onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })} placeholder="e.g., 24 months" />
                    </div>

                    <h3 className="text-lg font-semibold mt-6">Project Narratives</h3>
                    <div>
                      <Label htmlFor="keyFeatures">Key Features (one per line)</Label>
                      <Textarea id="keyFeatures" value={newProject.keyFeatures.join('\n')} onChange={(e) => setNewProject({ ...newProject, keyFeatures: e.target.value.split('\n') })} placeholder="Feature 1&#10;Feature 2" rows={3} />
                    </div>
                    <div>
                      <Label htmlFor="challenges">Challenges (one per line)</Label>
                      <Textarea id="challenges" value={newProject.challenges.join('\n')} onChange={(e) => setNewProject({ ...newProject, challenges: e.target.value.split('\n') })} placeholder="Challenge 1&#10;Challenge 2" rows={3} />
                    </div>
                    <div>
                      <Label htmlFor="outcomes">Outcomes (one per line)</Label>
                      <Textarea id="outcomes" value={newProject.outcomes.join('\n')} onChange={(e) => setNewProject({ ...newProject, outcomes: e.target.value.split('\n') })} placeholder="Outcome 1&#10;Outcome 2" rows={3} />
                    </div>

                    <h3 className="text-lg font-semibold mt-6">Project Images</h3>
                    <div>
                      <Label htmlFor="project-images">Upload Images (min 3)</Label>
                      <Input id="project-images" type="file" accept="image/*" multiple onChange={handleImageUpload} className="mb-2" />
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {projectImages.map((image, index) => (
                          <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
                            <img src={image} alt={`Project ${index + 1}`} className="w-full h-full object-cover" />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button onClick={handlePreviewProject} variant="outline">Preview Project</Button>
                      <Button onClick={handleAddOrUpdateProject} className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                        {editingProject ? 'Update Project' : 'Add Project'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden sm:table-cell">Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead className="hidden lg:table-cell">Client</TableHead>
                      <TableHead className="hidden lg:table-cell">Completed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="hidden sm:table-cell">
                          <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded-md" />
                        </TableCell>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{project.location}</TableCell>
                        <TableCell className="hidden md:table-cell">{project.projectType}</TableCell>
                        <TableCell className="hidden lg:table-cell">{project.client}</TableCell>
                        <TableCell className="hidden lg:table-cell">{project.completedDate}</TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewProject(project)} className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditProject(project)}>
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}>
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Project Preview Dialog */}
        <Dialog open={showProjectPreviewDialog} onOpenChange={setShowProjectPreviewDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Project Preview</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{newProject.title}</h3>
              <p className="text-gray-600">{newProject.projectType} Project in {newProject.location}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold">Client:</p>
                  <p>{newProject.client}</p>
                </div>
                <div>
                  <p className="font-semibold">Size:</p>
                  <p>{newProject.size}</p>
                </div>
                <div>
                  <p className="font-semibold">Duration:</p>
                  <p>{newProject.duration}</p>
                </div>
                <div>
                  <p className="font-semibold">Completed Date:</p>
                  <p>{newProject.completedDate}</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold mt-6">Key Features</h4>
              <ul className="list-disc list-inside space-y-1">
                {newProject.keyFeatures.filter(f => f.trim() !== '').map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold mt-6">Challenges</h4>
              <ul className="list-disc list-inside space-y-1">
                {newProject.challenges.filter(c => c.trim() !== '').map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold mt-6">Outcomes</h4>
              <ul className="list-disc list-inside space-y-1">
                {newProject.outcomes.filter(o => o.trim() !== '').map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold mt-6">Project Gallery</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {projectImages.map((image, index) => (
                  <img key={index} src={image} alt={`Project Image ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => { setShowProjectPreviewDialog(false); setShowProjectDialog(true); }} variant="outline">Edit</Button>
              <Button onClick={handleAddOrUpdateProject} className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                {editingProject ? 'Update Project' : 'Add Project'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Project Dialog */}
        <Dialog open={showViewProjectDialog} onOpenChange={setShowViewProjectDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Project Details</DialogTitle>
            </DialogHeader>
            {viewingProject && (
              <div className="space-y-4">
                <img src={viewingProject.image} alt={viewingProject.title} className="w-full h-64 object-cover rounded-md" />
                <h3 className="text-2xl font-bold">{viewingProject.title}</h3>
                <p className="text-gray-600">{viewingProject.projectType} Project in {viewingProject.location}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Client:</p>
                    <p>{viewingProject.client}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Size:</p>
                    <p>{viewingProject.size}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Duration:</p>
                    <p>{viewingProject.duration}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Completed Date:</p>
                    <p>{viewingProject.completedDate}</p>
                  </div>
                </div>

                <h4 className="text-lg font-semibold mt-6">Key Features</h4>
                <ul className="list-disc list-inside space-y-1">
                  {viewingProject.keyFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

                <h4 className="text-lg font-semibold mt-6">Challenges</h4>
                <ul className="list-disc list-inside space-y-1">
                  {viewingProject.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>

                <h4 className="text-lg font-semibold mt-6">Outcomes</h4>
                <ul className="list-disc list-inside space-y-1">
                  {viewingProject.outcomes.map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>

                <h4 className="text-lg font-semibold mt-6">Project Gallery</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {viewingProject.projectImages.map((image, index) => (
                    <img key={index} src={image} alt={`Project Image ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                  ))}
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={() => { handleEditProject(viewingProject); setShowViewProjectDialog(false); }} variant="outline">
                    <Edit className="mr-2 h-4 w-4" /> Edit Project
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>


        {/* Contact Messages Tab */}
        {activeTab === 'contacts' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Contact Messages</h2>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden sm:table-cell">Email</TableHead>
                      <TableHead className="hidden md:table-cell">Subject</TableHead>
                      <TableHead className="hidden lg:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id} className={contact.isRead ? 'bg-gray-50' : 'bg-white font-semibold'}>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell className="hidden sm:table-cell">{contact.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{contact.subject}</TableCell>
                        <TableCell className="hidden lg:table-cell">{contact.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            contact.isRead ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {contact.isRead ? 'Read' : 'New'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewContact(contact)} className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            {!contact.isRead && (
                              <Button variant="outline" size="sm" onClick={() => handleMarkContactAsRead(contact.id)} className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white">
                                <MailCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            )}
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteContact(contact.id)}>
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View Contact Dialog */}
        <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
          <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Contact Message Details</DialogTitle>
            </DialogHeader>
            {viewingContact && (
              <div className="space-y-4">
                <div>
                  <Label className="font-semibold">Name</Label>
                  <p className="text-gray-700">{viewingContact.name}</p>
                </div>
                <div>
                  <Label className="font-semibold">Email</Label>
                  <p className="text-gray-700">{viewingContact.email}</p>
                </div>
                <div>
                  <Label className="font-semibold">Subject</Label>
                  <p className="text-gray-700">{viewingContact.subject}</p>
                </div>
                <div>
                  <Label className="font-semibold">Message</Label>
                  <p className="text-gray-700">{viewingContact.message}</p>
                </div>
                <div>
                  <Label className="font-semibold">Date</Label>
                  <p className="text-gray-700">{viewingContact.date}</p>
                </div>
                <div>
                  <Label className="font-semibold">Status</Label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    viewingContact.isRead ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {viewingContact.isRead ? 'Read' : 'New'}
                  </span>
                </div>
                <DialogFooter>
                  {!viewingContact.isRead && (
                    <Button onClick={() => { handleMarkContactAsRead(viewingContact.id); setShowContactDialog(false); }} className="bg-green-600 text-white hover:bg-green-600/90">
                      Mark as Read
                    </Button>
                  )}
                  <Button onClick={() => { handleDeleteContact(viewingContact.id); setShowContactDialog(false); }} variant="destructive">
                    Delete
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Service Requests Tab */}
        {activeTab === 'service-requests' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Service Requests</h2>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client Name</TableHead>
                      <TableHead className="hidden sm:table-cell">Service Type</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead className="hidden lg:table-cell">Submission Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceRequests.map((request) => (
                      <TableRow key={request.id} className={request.isRead ? 'bg-gray-50' : 'bg-white font-semibold'}>
                        <TableCell>{request.clientName}</TableCell>
                        <TableCell className="hidden sm:table-cell">{request.serviceType}</TableCell>
                        <TableCell className="hidden md:table-cell">{request.location}</TableCell>
                        <TableCell className="hidden lg:table-cell">{request.submissionDate}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.isRead ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {request.isRead ? 'Read' : 'New'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewServiceRequest(request)} className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            {!request.isRead && (
                              <Button variant="outline" size="sm" onClick={() => handleMarkServiceRequestAsRead(request.id)} className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white">
                                <MailCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            )}
                            
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteServiceRequest(request.id)}>
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View Service Request Dialog */}
        <Dialog open={showViewServiceRequestDialog} onOpenChange={setShowViewServiceRequestDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Service Request Details</DialogTitle>
            </DialogHeader>
            {viewingServiceRequest && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Client Name</Label>
                    <p className="text-gray-700">{viewingServiceRequest.clientName}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Email</Label>
                    <p className="text-gray-700">{viewingServiceRequest.email}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Phone</Label>
                    <p className="text-gray-700">{viewingServiceRequest.phone}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Service Type</Label>
                    <p className="text-gray-700">{viewingServiceRequest.serviceType}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Project Type</Label>
                    <p className="text-gray-700">{viewingServiceRequest.projectType}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Property Type</Label>
                    <p className="text-gray-700">{viewingServiceRequest.propertyType}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Budget</Label>
                    <p className="text-gray-700">{viewingServiceRequest.budget}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Timeline</Label>
                    <p className="text-gray-700">{viewingServiceRequest.timeline}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Location</Label>
                    <p className="text-gray-700">{viewingServiceRequest.location}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Submission Date</Label>
                    <p className="text-gray-700">{viewingServiceRequest.submissionDate}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Description</Label>
                  <p className="text-gray-700">{viewingServiceRequest.description}</p>
                </div>
                <div>
                  <Label className="font-semibold">Images</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                    {viewingServiceRequest.images.map((img, index) => (
                      <img key={index} src={img} alt={`Service Request Image ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  {!viewingServiceRequest.isRead && (
                    <Button onClick={() => { handleMarkServiceRequestAsRead(viewingServiceRequest.id); setShowViewServiceRequestDialog(false); }} className="bg-green-600 text-white hover:bg-green-600/90">
                      Mark as Read
                    </Button>
                  )}
                  <Button onClick={() => window.location.href = `tel:${viewingServiceRequest.phone}`} variant="outline">
                    <Phone className="mr-2 h-4 w-4" /> Call Client
                  </Button>
                  <Button onClick={() => { handleDeleteServiceRequest(viewingServiceRequest.id); setShowViewServiceRequestDialog(false); }} variant="destructive">
                    Delete Request
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;