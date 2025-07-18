import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Home, MessageSquare, Plus, Edit, Trash2, LogOut, CheckCircle, Clock, Phone, Eye, Trophy, Wrench, BookOpen, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  image: string; // Added image field
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
  image: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof LucideIcons;
  category: string;
  status: 'active' | 'inactive';
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
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9" // Placeholder image
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
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" // Placeholder image
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
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
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
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00"
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
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c"
    }
  ]);

  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: "Property Management",
      description: "Complete property management services for residential and commercial properties.",
      icon: "Home",
      category: "Management",
      status: "active"
    },
    {
      id: 2,
      title: "Property Valuation",
      description: "Professional property valuation services by certified appraisers.",
      icon: "Calculator",
      category: "Valuation",
      status: "active"
    },
    {
      id: 3,
      title: "Home Renovation",
      description: "Complete home renovation and remodeling services.",
      icon: "Wrench",
      category: "Renovation",
      status: "active"
    },
    {
      id: 4,
      title: "Legal Services",
      description: "Real estate legal services and documentation assistance.",
      icon: "Scale",
      category: "Legal",
      status: "active"
    }
  ]);

  const [newProperty, setNewProperty] = useState({
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
  });

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

  const [newProject, setNewProject] = useState({
    title: "",
    location: "",
    completedDate: "",
    projectType: "",
    client: "",
    size: "",
    duration: "",
    status: 'completed' as 'completed',
    image: ""
  });

  const [newService, setNewService] = useState({
    title: "",
    description: "",
    icon: "Home" as keyof typeof LucideIcons,
    category: "",
    status: 'active' as 'active' | 'inactive'
  });

  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editingPendingProperty, setEditingPendingProperty] = useState<PendingProperty | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [showPropertyDialog, setShowPropertyDialog] = useState(false); // For editing existing active properties
  const [showPendingPropertyDialog, setShowPendingPropertyDialog] = useState(false); // For editing existing pending properties
  const [showAddPendingPropertyDialog, setShowAddPendingPropertyDialog] = useState(false); // For adding new pending properties
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [showServiceDialog, setShowServiceDialog] = useState(false);

  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showViewPropertyDialog, setShowViewPropertyDialog] = useState(false);
  const [showViewPendingDialog, setShowViewPendingDialog] = useState(false);
  const [showViewProjectDialog, setShowViewProjectDialog] = useState(false);
  const [showViewServiceDialog, setShowViewServiceDialog] = useState(false);
  const [showViewServiceRequestDialog, setShowViewServiceRequestDialog] = useState(false);

  const [viewingContact, setViewingContact] = useState<ContactMessage | null>(null);
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null);
  const [viewingPendingProperty, setViewingPendingProperty] = useState<PendingProperty | null>(null);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [viewingService, setViewingService] = useState<Service | null>(null);
  const [viewingServiceRequest, setViewingServiceRequest] = useState<ServiceRequest | null>(null);

  // Available icons for services
  const availableIcons = [
    'Home', 'Calculator', 'Wrench', 'Scale', 'Hammer', 'PaintBucket', 'Shield', 
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

  const handleUpdateProperty = () => {
    if (editingProperty) {
      setProperties(properties.map(p => p.id === editingProperty.id ? { ...newProperty, id: editingProperty.id } : p));
      toast({ title: "Property Updated", description: "Property has been updated successfully." });
    }
    setEditingProperty(null);
    setShowPropertyDialog(false);
  };

  const handleEditProperty = (property: Property) => {
    setNewProperty(property);
    setEditingProperty(property);
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
      image: pendingProperty.image, // Use image from pending property
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
    // Populate newPendingProperty for editing purposes
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
    setShowPendingPropertyDialog(true);
  };

  const handleAddPendingProperty = () => {
    const newId = pendingProperties.length > 0 ? Math.max(...pendingProperties.map(p => p.id)) + 1 : 1;
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    setPendingProperties([...pendingProperties, { 
        ...newPendingProperty, 
        id: newId, 
        status: 'pending', 
        submissionDate: currentDate 
    }]);
    toast({ title: "Pending Property Added", description: "New pending property has been added for review." });
    setNewPendingProperty(initialNewPendingPropertyState); // Reset form
    setShowAddPendingPropertyDialog(false);
  };


  const handleUpdatePendingProperty = () => {
    if (editingPendingProperty) {
      setPendingProperties(pendingProperties.map(p => 
        p.id === editingPendingProperty.id ? { 
          ...p, // Keep existing status and submissionDate
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

  const handleAddProject = () => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...newProject, id: editingProject.id } : p));
      toast({ title: "Project Updated", description: "Project has been updated successfully." });
    } else {
      const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
      setProjects([...projects, { ...newProject, id: newId }]);
      toast({ title: "Project Added", description: "New project has been added successfully." });
    }
    
    setNewProject({ title: "", location: "", completedDate: "", projectType: "", client: "", size: "", duration: "", status: 'completed', image: "" });
    setEditingProject(null);
    setShowProjectDialog(false);
  };

  const handleEditProject = (project: Project) => {
    setNewProject(project);
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

  // Service management functions
  const handleAddService = () => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...newService, id: editingService.id } : s));
      toast({ title: "Service Updated", description: "Service has been updated successfully." });
    } else {
      const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
      setServices([...services, { ...newService, id: newId }]);
      toast({ title: "Service Added", description: "New service has been added successfully." });
    }
    
    setNewService({ title: "", description: "", icon: "Home", category: "", status: 'active' });
    setEditingService(null);
    setShowServiceDialog(false);
  };

  const handleEditService = (service: Service) => {
    setNewService(service);
    setEditingService(service);
    setShowServiceDialog(true);
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Service Deleted",
      description: "Service has been removed.",
    });
  };

  const handleToggleServiceStatus = (id: number) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s
    ));
    toast({
      title: "Status Updated",
      description: "Service status has been changed.",
    });
  };

  const handleViewService = (service: Service) => {
    setViewingService(service);
    setShowViewServiceDialog(true);
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
            variant={activeTab === 'services' ? 'default' : 'outline'}
            onClick={() => setActiveTab('services')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'services' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <Wrench className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Services</span>
            <span className="sm:hidden">Services</span>
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

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">Services Management</h2>
              <Dialog open={showServiceDialog} onOpenChange={setShowServiceDialog}>
                <Button onClick={() => { setNewService({ title: "", description: "", icon: "Home", category: "", status: 'active' }); setEditingService(null); setShowServiceDialog(true); }}
                  className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Add Service</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="service-title">Title</Label>
                      <Input
                        id="service-title"
                        value={newService.title}
                        onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                        placeholder="Service title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-description">Description</Label>
                      <Textarea
                        id="service-description"
                        value={newService.description}
                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                        placeholder="Service description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-icon">Icon</Label>
                      <Select value={newService.icon} onValueChange={(value: keyof typeof LucideIcons) => setNewService({ ...newService, icon: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="h-60">
                          {availableIcons.map((iconName) => {
                            const IconComponent = LucideIcons[iconName] as React.ComponentType<{ className?: string }>;
                            return (
                              <SelectItem key={iconName} value={iconName}>
                                <div className="flex items-center gap-2">
                                  <IconComponent className="h-4 w-4" />
                                  <span>{iconName}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="service-category">Category</Label>
                      <Input
                        id="service-category"
                        value={newService.category}
                        onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                        placeholder="Service category"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-status">Status</Label>
                      <Select value={newService.status} onValueChange={(value: 'active' | 'inactive') => setNewService({ ...newService, status: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddService} className="w-full bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                      {editingService ? 'Update Service' : 'Add Service'}
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
                      <TableHead>Icon</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead className="hidden sm:table-cell">Description</TableHead>
                      <TableHead className="hidden lg:table-cell">Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => {
                      const IconComponent = LucideIcons[service.icon] as React.ComponentType<{ className?: string }>;
                      return (
                        <TableRow key={service.id}>
                          <TableCell>
                            <IconComponent className="h-6 w-6 text-brand-green" />
                          </TableCell>
                          <TableCell className="font-medium">{service.title}</TableCell>
                          <TableCell className="hidden md:table-cell">{service.category}</TableCell>
                          <TableCell className="hidden sm:table-cell max-w-xs truncate">{service.description}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {service.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewService(service)}
                                className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                              >
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleServiceStatus(service.id)}
                                className={service.status === 'active' ? 'text-gray-600' : 'text-green-600'}
                              >
                                {service.status === 'active' ? 'Deactivate' : 'Activate'}
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteService(service.id)}>
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View Service Dialog */}
        <Dialog open={showViewServiceDialog} onOpenChange={setShowViewServiceDialog}>
          <DialogContent className="w-[95vw] max-w-2xl">
            <DialogHeader>
              <DialogTitle>Service Details</DialogTitle>
            </DialogHeader>
            {viewingService && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {(() => {
                    const IconComponent = LucideIcons[viewingService.icon] as React.ComponentType<{ className?: string }>;
                    return <IconComponent className="h-12 w-12 text-brand-green" />;
                  })()}
                  <div>
                    <h3 className="text-xl font-semibold">{viewingService.title}</h3>
                    <p className="text-gray-600">{viewingService.category}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Description</Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                    <p className="text-gray-700">{viewingService.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Status</Label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      viewingService.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {viewingService.status}
                    </span>
                  </div>
                  <div>
                    <Label className="font-semibold">Icon</Label>
                    <p className="text-gray-700">{viewingService.icon}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={() => { handleEditService(viewingService); setShowViewServiceDialog(false); }} variant="outline" >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Service
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* All Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">All Property Listings</h2>
              {/* Removed Add Property Button as per user request */}
              <Dialog open={showPropertyDialog} onOpenChange={setShowPropertyDialog}>
                {/* No button to open this dialog for "Add Property" anymore */}
                <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    {/* Title for editing remains */}
                    <DialogTitle>{editingProperty ? 'Edit Property' : 'Add New Property'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newProperty.title}
                        onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                        placeholder="Property title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newProperty.location}
                        onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                        placeholder="Property location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        value={newProperty.price}
                        onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
                        placeholder="$450,000 or $2,500/month"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="beds">Bedrooms</Label>
                        <Input
                          id="beds"
                          type="number"
                          value={newProperty.beds}
                          onChange={(e) => setNewProperty({ ...newProperty, beds: parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="baths">Bathrooms</Label>
                        <Input
                          id="baths"
                          type="number"
                          value={newProperty.baths}
                          onChange={(e) => setNewProperty({ ...newProperty, baths: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="sqft">Square Feet</Label>
                      <Input
                        id="sqft"
                        value={newProperty.sqft}
                        onChange={(e) => setNewProperty({ ...newProperty, sqft: e.target.value })}
                        placeholder="2,100 sq ft"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Contact Phone</Label>
                      <Input
                        id="phone"
                        value={newProperty.phone}
                        onChange={(e) => setNewProperty({ ...newProperty, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
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
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={newProperty.image}
                        onChange={(e) => setNewProperty({ ...newProperty, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    <Button onClick={handleUpdateProperty} className="w-full bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                      Update Property
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
                          <img src={property.image} alt={property.title} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
                        </TableCell>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{property.location}</TableCell>
                        <TableCell className="font-semibold text-brand-green">{property.price}</TableCell>
                        <TableCell className="hidden sm:table-cell">{property.beds}bed / {property.baths}bath</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            property.type === 'buy' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {property.type === 'buy' ? 'For Sale' : 'For Rent'}
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
                            <Button variant="outline" size="sm" onClick={() => handleViewProperty(property)} className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white" >
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleCallProperty(property.phone)} className="text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white" >
                              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditProperty(property)}>
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleTogglePropertyStatus(property.id)} className={property.status === 'active' ? 'text-gray-600' : 'text-green-600'} >
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

        {/* Pending Properties Tab */}
        {activeTab === 'pending' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">Pending Property Submissions</h2>
              <Dialog open={showAddPendingPropertyDialog} onOpenChange={setShowAddPendingPropertyDialog}>
                <Button onClick={() => { setNewPendingProperty(initialNewPendingPropertyState); setShowAddPendingPropertyDialog(true); }}
                  className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Add Property</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Pending Property</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pending-title">Title</Label>
                      <Input
                        id="pending-title"
                        value={newPendingProperty.title}
                        onChange={(e) => setNewPendingProperty({ ...newPendingProperty, title: e.target.value })}
                        placeholder="Property title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pending-location">Location</Label>
                      <Input
                        id="pending-location"
                        value={newPendingProperty.location}
                        onChange={(e) => setNewPendingProperty({ ...newPendingProperty, location: e.target.value })}
                        placeholder="Property location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pending-price">Price</Label>
                      <Input
                        id="pending-price"
                        value={newPendingProperty.price}
                        onChange={(e) => setNewPendingProperty({ ...newPendingProperty, price: e.target.value })}
                        placeholder="e.g., 450000 or 2500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pending-description">Description</Label>
                      <Textarea
                        id="pending-description"
                        value={newPendingProperty.description}
                        onChange={(e) => setNewPendingProperty({ ...newPendingProperty, description: e.target.value })}
                        placeholder="Property description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pending-propertyType">Property Type</Label>
                      <Select value={newPendingProperty.propertyType} onValueChange={(value) => setNewPendingProperty({ ...newPendingProperty, propertyType: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pending-bedrooms">Bedrooms</Label>
                        <Input
                          id="pending-bedrooms"
                          type="number"
                          value={newPendingProperty.bedrooms}
                          onChange={(e) => setNewPendingProperty({ ...newPendingProperty, bedrooms: parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="pending-bathrooms">Bathrooms</Label>
                        <Input
                          id="pending-bathrooms"
                          type="number"
                          value={newPendingProperty.bathrooms}
                          onChange={(e) => setNewPendingProperty({ ...newPendingProperty, bathrooms: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="pending-sqft">Square Feet</Label>
                      <Input
                        id="pending-sqft"
                        value={newPendingProperty.sqft}
                        onChange={(e) => setNewPendingProperty({ ...newPendingProperty, sqft: e.target.value })}
                        placeholder="e.g., 2400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pending-contactName">Contact Name</Label>
                      <Input
                        id="pending-contactName"
                        value={newPendingProperty.contactName}
                        onChange={(e) => setNewPendingProperty({ ...newPendingProperty, contactName: e.target.value })}
                        placeholder="Contact person's name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pending-contactEmail">Contact Email</Label>
                      <Input
                        id="pending-contactEmail"
                        value={newPendingProperty.contactEmail}
                        onChange={(e) => setNewPendingProperty({ ...newPendingProperty, contactEmail: e.target.value })}
                        placeholder="Contact person's email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pending-contactPhone">Contact Phone</Label>
                      <Input
                        id="pending-contactPhone"
                        value={newPendingProperty.contactPhone}
                        onChange={(e) => setNewPendingProperty({ ...newPendingProperty, contactPhone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                    <Label htmlFor="pending-image">Insert Image</Label>
                    <div className="space-y-4">
                      {/* Upload Input */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewPendingProperty({ ...newPendingProperty, image: reader.result as string });
                            };
                            reader.readAsDataURL(file); // convert file to base64 string
                          }
                        }}
                      />

                      {/* Image Preview Box */}
                      {newPendingProperty.image && (
                        <div className="w-full max-w-sm border border-gray-300 rounded-lg p-2">
                          <img
                            src={newPendingProperty.image}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                    </div>
                    <Button onClick={handleAddPendingProperty} className="w-full bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                      Add Pending Property
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
                      <TableHead className="hidden sm:table-cell">Image</TableHead> {/* Added image column */}
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden sm:table-cell">Contact</TableHead>
                      <TableHead className="hidden lg:table-cell">Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="hidden sm:table-cell">
                          <img src={property.image} alt={property.title} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
                        </TableCell>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{property.location}</TableCell>
                        <TableCell className="font-semibold text-brand-green">
                          ${property.price}{property.propertyType === 'apartment' ? '/month' : ''}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{property.contactName}</TableCell>
                        <TableCell className="hidden lg:table-cell">{property.submissionDate}</TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewPendingProperty(property)}
                              className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                            >
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprovePendingProperty(property)}
                              className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                            >
                              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditPendingProperty(property)}>
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRejectPendingProperty(property.id)}
                            >
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
            {/* Dialog for editing existing pending properties */}
            <Dialog open={showPendingPropertyDialog} onOpenChange={setShowPendingPropertyDialog}>
              <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Pending Property</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-pending-title">Title</Label>
                    <Input
                      id="edit-pending-title"
                      value={newPendingProperty.title}
                      onChange={(e) => setNewPendingProperty({ ...newPendingProperty, title: e.target.value })}
                      placeholder="Property title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-pending-location">Location</Label>
                    <Input
                      id="edit-pending-location"
                      value={newPendingProperty.location}
                      onChange={(e) => setNewPendingProperty({ ...newPendingProperty, location: e.target.value })}
                      placeholder="Property location"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-pending-price">Price</Label>
                    <Input
                      id="edit-pending-price"
                      value={newPendingProperty.price}
                      onChange={(e) => setNewPendingProperty({ ...newPendingProperty, price: e.target.value })}
                      placeholder="e.g., 450000 or 2500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-pending-description">Description</Label>
                    <Textarea
                      id="edit-pending-description"
                      value={newPendingProperty.description}
                      onChange={(e) => setNewPendingProperty({ ...newPendingProperty, description: e.target.value })}
                      placeholder="Property description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-pending-propertyType">Property Type</Label>
                    <Select value={newPendingProperty.propertyType} onValueChange={(value) => setNewPendingProperty({ ...newPendingProperty, propertyType: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-pending-bedrooms">Bedrooms</Label>
                      <Input
                        id="edit-pending-bedrooms"
                        type="number"
                        value={newPendingProperty.bedrooms}
                        onChange={(e) => setNewPendingProperty({ ...newPendingProperty, bedrooms: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-pending-bathrooms">Bathrooms</Label>
                      <Input
                        id="edit-pending-bathrooms"
                        type="number"
                        value={newPendingProperty.bathrooms}
                        onChange={(e) => setNewPendingProperty({ ...newPendingProperty, bathrooms: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="edit-pending-sqft">Square Feet</Label>
                    <Input
                      id="edit-pending-sqft"
                      value={newPendingProperty.sqft}
                      onChange={(e) => setNewPendingProperty({ ...newPendingProperty, sqft: e.target.value })}
                      placeholder="e.g., 2400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-pending-contactName">Contact Name</Label>
                    <Input
                      id="edit-pending-contactName"
                      value={newPendingProperty.contactName}
                      onChange={(e) => setNewPendingProperty({ ...newPendingProperty, contactName: e.target.value })}
                      placeholder="Contact person's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-pending-contactEmail">Contact Email</Label>
                    <Input
                      id="edit-pending-contactEmail"
                      value={newPendingProperty.contactEmail}
                      onChange={(e) => setNewPendingProperty({ ...newPendingProperty, contactEmail: e.target.value })}
                      placeholder="Contact person's email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-pending-contactPhone">Contact Phone</Label>
                    <Input
                      id="edit-pending-contactPhone"
                      value={newPendingProperty.contactPhone}
                      onChange={(e) => setNewPendingProperty({ ...newPendingProperty, contactPhone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-pending-image">Image URL</Label>
                    <Input
                      id="edit-pending-image"
                      value={newPendingProperty.image}
                      onChange={(e) => setNewPendingProperty({ ...newPendingProperty, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <Button onClick={handleUpdatePendingProperty} className="w-full bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                    Update Pending Property
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* View Pending Property Dialog */}
        <Dialog open={showViewPendingDialog} onOpenChange={setShowViewPendingDialog}>
          <DialogContent className="w-[95vw] max-w-2xl">
            <DialogHeader>
              <DialogTitle>Pending Property Details</DialogTitle>
            </DialogHeader>
            {viewingPendingProperty && (
              <div className="space-y-4">
                <img src={viewingPendingProperty.image} alt={viewingPendingProperty.title} className="w-full h-48 object-cover rounded-md mb-4" /> {/* Display image */}
                <h3 className="text-xl font-semibold">{viewingPendingProperty.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Location</Label>
                    <p className="text-gray-700">{viewingPendingProperty.location}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Price</Label>
                    <p className="text-gray-700">
                      ${viewingPendingProperty.price}
                      {viewingPendingProperty.propertyType === 'apartment' ? '/month' : ''}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Description</Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                    <p className="text-gray-700">{viewingPendingProperty.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Property Type</Label>
                    <p className="text-gray-700 capitalize">{viewingPendingProperty.propertyType}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Bedrooms</Label>
                    <p className="text-gray-700">{viewingPendingProperty.bedrooms}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Bathrooms</Label>
                    <p className="text-gray-700">{viewingPendingProperty.bathrooms}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Square Feet</Label>
                    <p className="text-gray-700">{viewingPendingProperty.sqft}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Contact Name</Label>
                    <p className="text-gray-700">{viewingPendingProperty.contactName}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Contact Email</Label>
                    <p className="text-gray-700">{viewingPendingProperty.contactEmail}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Contact Phone</Label>
                    <p className="text-gray-700">{viewingPendingProperty.contactPhone}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Submission Date</Label>
                    <p className="text-gray-700">{viewingPendingProperty.submissionDate}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => {
                      handleApprovePendingProperty(viewingPendingProperty);
                      setShowViewPendingDialog(false);
                    }}
                    className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                    variant="outline"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => {
                      handleEditPendingProperty(viewingPendingProperty);
                      setShowViewPendingDialog(false);
                    }}
                    variant="outline"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Pending
                  </Button>
                  <Button
                    onClick={() => {
                      handleRejectPendingProperty(viewingPendingProperty.id);
                      setShowViewPendingDialog(false);
                    }}
                    variant="destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Reject
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
              <h2 className="text-xl sm:text-2xl font-bold">Projects Management</h2>
              <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
                <Button onClick={() => { setNewProject({ title: "", location: "", completedDate: "", projectType: "", client: "", size: "", duration: "", status: 'completed', image: "" }); setEditingProject(null); setShowProjectDialog(true); }}
                  className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Add Project</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="project-title">Title</Label>
                      <Input
                        id="project-title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        placeholder="Project title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-location">Location</Label>
                      <Input
                        id="project-location"
                        value={newProject.location}
                        onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                        placeholder="Project location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-completedDate">Completed Date</Label>
                      <Input
                        id="project-completedDate"
                        value={newProject.completedDate}
                        onChange={(e) => setNewProject({ ...newProject, completedDate: e.target.value })}
                        placeholder="e.g., Jan 2023"
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-type">Project Type</Label>
                      <Input
                        id="project-type"
                        value={newProject.projectType}
                        onChange={(e) => setNewProject({ ...newProject, projectType: e.target.value })}
                        placeholder="e.g., Commercial, Residential"
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-client">Client</Label>
                      <Input
                        id="project-client"
                        value={newProject.client}
                        onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                        placeholder="Client name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-size">Size</Label>
                      <Input
                        id="project-size"
                        value={newProject.size}
                        onChange={(e) => setNewProject({ ...newProject, size: e.target.value })}
                        placeholder="e.g., 250,000 sq ft or 150 units"
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-duration">Duration</Label>
                      <Input
                        id="project-duration"
                        value={newProject.duration}
                        onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })}
                        placeholder="e.g., 24 months"
                      />
                    </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-image">Project Image</Label>
                    
                    {/* File Input */}
                    <input
                      type="file"
                      id="project-image"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setNewProject({ ...newProject, image: reader.result as string });
                          };
                          reader.readAsDataURL(file); // Convert to Base64
                        }
                      }}
                      className="block w-full border border-gray-300 rounded px-3 py-2"
                    />

                    {/* Preview Box */}
                    {newProject.image && (
                      <div className="mt-2 border border-gray-300 rounded-lg p-2 max-w-sm">
                        <img
                          src={newProject.image}
                          alt="Project Preview"
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>

                    <Button onClick={handleAddProject} className="w-full bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                      {editingProject ? 'Update Project' : 'Add Project'}
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
                      <TableHead className="hidden lg:table-cell">Client</TableHead>
                      <TableHead className="hidden lg:table-cell">Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="hidden sm:table-cell">
                          <img src={project.image} alt={project.title} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
                        </TableCell>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{project.location}</TableCell>
                        <TableCell className="hidden lg:table-cell">{project.client}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.projectType === 'commercial' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {project.projectType}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewProject(project)}
                              className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                            >
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

        {/* View Project Dialog */}
        <Dialog open={showViewProjectDialog} onOpenChange={setShowViewProjectDialog}>
          <DialogContent className="w-[95vw] max-w-2xl">
            <DialogHeader>
              <DialogTitle>Project Details</DialogTitle>
            </DialogHeader>
            {viewingProject && (
              <div className="space-y-4">
                <img src={viewingProject.image} alt={viewingProject.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold">{viewingProject.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Location</Label>
                    <p className="text-gray-700">{viewingProject.location}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Client</Label>
                    <p className="text-gray-700">{viewingProject.client}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Project Type</Label>
                    <p className="text-gray-700 capitalize">{viewingProject.projectType}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Completed Date</Label>
                    <p className="text-gray-700">{viewingProject.completedDate}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Size</Label>
                    <p className="text-gray-700">{viewingProject.size}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Duration</Label>
                    <p className="text-gray-700">{viewingProject.duration}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => {
                      handleEditProject(viewingProject);
                      setShowViewProjectDialog(false);
                    }}
                    variant="outline"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Project
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
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead className="hidden sm:table-cell">Subject</TableHead>
                      <TableHead className="hidden lg:table-cell">Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{contact.email}</TableCell>
                        <TableCell className="hidden sm:table-cell max-w-xs truncate">{contact.subject}</TableCell>
                        <TableCell className="hidden lg:table-cell">{contact.date}</TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewContact(contact)}
                              className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                            >
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            {!contact.isRead && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleMarkContactAsRead(contact.id)}
                                className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                              >
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
          <DialogContent className="w-[95vw] max-w-2xl">
            <DialogHeader>
              <DialogTitle>Contact Message Details</DialogTitle>
            </DialogHeader>
            {viewingContact && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{viewingContact.subject}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">From</Label>
                    <p className="text-gray-700">{viewingContact.name}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Email</Label>
                    <p className="text-gray-700">{viewingContact.email}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Message</Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                    <p className="text-gray-700">{viewingContact.message}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Date</Label>
                  <p className="text-gray-700">{viewingContact.date}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  {!viewingContact.isRead && (
                    <Button
                      onClick={() => handleMarkContactAsRead(viewingContact.id)}
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                    >
                      <MailCheck className="mr-2 h-4 w-4" />
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDeleteContact(viewingContact.id)}
                    variant="destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Message
                  </Button>
                </div>
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
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead className="hidden sm:table-cell">Service Type</TableHead>
                      <TableHead className="hidden lg:table-cell">Budget</TableHead>
                      <TableHead className="hidden lg:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.clientName}</TableCell>
                        <TableCell className="hidden md:table-cell">{request.email}</TableCell>
                        <TableCell className="hidden sm:table-cell capitalize">{request.serviceType}</TableCell>
                        <TableCell className="hidden lg:table-cell">${request.budget}</TableCell>
                        <TableCell className="hidden lg:table-cell">{request.submissionDate}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            request.isRead 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.isRead ? 'Read' : 'Unread'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewServiceRequest(request)}
                              className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                            >
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            {!request.isRead && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleMarkServiceRequestAsRead(request.id)}
                                className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                              >
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
          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Service Request Details</DialogTitle>
            </DialogHeader>
            {viewingServiceRequest && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Client Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#006d4e]">Client Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-semibold">Name</Label>
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
                        <Label className="font-semibold">Location</Label>
                        <p className="text-gray-700">{viewingServiceRequest.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#006d4e]">Project Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-semibold">Service Type</Label>
                        <p className="text-gray-700 capitalize">{viewingServiceRequest.serviceType}</p>
                      </div>
                      <div>
                        <Label className="font-semibold">Project Type</Label>
                        <p className="text-gray-700">{viewingServiceRequest.projectType}</p>
                      </div>
                      <div>
                        <Label className="font-semibold">Property Type</Label>
                        <p className="text-gray-700 capitalize">{viewingServiceRequest.propertyType}</p>
                      </div>
                      <div>
                        <Label className="font-semibold">Budget</Label>
                        <p className="text-gray-700">${viewingServiceRequest.budget}</p>
                      </div>
                      <div>
                        <Label className="font-semibold">Timeline</Label>
                        <p className="text-gray-700">{viewingServiceRequest.timeline}</p>
                      </div>
                      <div>
                        <Label className="font-semibold">Submission Date</Label>
                        <p className="text-gray-700">{viewingServiceRequest.submissionDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label className="font-semibold">Project Description</Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                    <p className="text-gray-700">{viewingServiceRequest.description}</p>
                  </div>
                </div>

                {/* Images */}
                {viewingServiceRequest.images && viewingServiceRequest.images.length > 0 && (
                  <div>
                    <Label className="font-semibold">Project Images ({viewingServiceRequest.images.length})</Label>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {viewingServiceRequest.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Project image ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => window.open(image, '_blank')}
                          />
                          <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  {!viewingServiceRequest.isRead && (
                    <Button
                      onClick={() => handleMarkServiceRequestAsRead(viewingServiceRequest.id)}
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                    >
                      <MailCheck className="mr-2 h-4 w-4" />
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDeleteServiceRequest(viewingServiceRequest.id)}
                    variant="destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Request
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* View Property Dialog */}
        <Dialog open={showViewPropertyDialog} onOpenChange={setShowViewPropertyDialog}>
          <DialogContent className="w-[95vw] max-w-2xl">
            <DialogHeader>
              <DialogTitle>Property Details</DialogTitle>
            </DialogHeader>
            {viewingProperty && (
              <div className="space-y-4">
                <img src={viewingProperty.image} alt={viewingProperty.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold">{viewingProperty.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Location</Label>
                    <p className="text-gray-700">{viewingProperty.location}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Price</Label>
                    <p className="text-gray-700">{viewingProperty.price}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Bedrooms</Label>
                    <p className="text-gray-700">{viewingProperty.beds}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Bathrooms</Label>
                    <p className="text-gray-700">{viewingProperty.baths}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Square Feet</Label>
                    <p className="text-gray-700">{viewingProperty.sqft}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Type</Label>
                    <p className="text-gray-700 capitalize">{viewingProperty.type === 'buy' ? 'For Sale' : 'For Rent'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Contact Phone</Label>
                    <p className="text-gray-700">{viewingProperty.phone}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Status</Label>
                    <p className="text-gray-700">{viewingProperty.status}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => handleCallProperty(viewingProperty.phone)}
                    variant="outline"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Property
                  </Button>
                  <Button
                    onClick={() => {
                      handleEditProperty(viewingProperty);
                      setShowViewPropertyDialog(false);
                    }}
                    variant="outline"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Property
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;