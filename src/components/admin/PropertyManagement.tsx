import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, MapPin, Bed, Bath, Square, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  type: 'sale' | 'rent';
  category: 'apartment' | 'house' | 'studio' | 'townhouse' | 'penthouse' | 'condo';
  image: string;
  description?: string;
  available?: string;
  status: 'active' | 'inactive' | 'sold' | 'rented';
  createdAt: string;
}

const PropertyManagement: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([
    // Sale properties from home page
    {
      id: 1,
      title: "Modern Family Home",
      location: "Downtown, City Center",
      price: "रू 4,50,00,000",
      beds: 3,
      baths: 2,
      sqft: 2100,
      type: 'sale',
      category: 'house',
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      description: "Beautiful modern family home in prime location",
      status: 'active',
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Luxury Apartment",
      location: "Uptown District",
      price: "रू 6,80,00,000",
      beds: 2,
      baths: 2,
      sqft: 1800,
      type: 'sale',
      category: 'apartment',
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      description: "Luxury apartment with premium amenities",
      status: 'active',
      createdAt: "2024-01-14"
    },
    {
      id: 3,
      title: "Cozy Cottage",
      location: "Suburban Area",
      price: "रू 3,20,00,000",
      beds: 2,
      baths: 1,
      sqft: 1400,
      type: 'sale',
      category: 'house',
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
      description: "Charming cottage in peaceful neighborhood",
      status: 'active',
      createdAt: "2024-01-13"
    },
    // Rental properties from rent page
    {
      id: 4,
      title: "Spacious Downtown Apartment",
      location: "123 Main Street, Downtown",
      price: "रू 22,000/month",
      beds: 2,
      baths: 2,
      sqft: 1400,
      type: 'rent',
      category: 'apartment',
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      available: "Available Now",
      description: "Spacious apartment in downtown area",
      status: 'active',
      createdAt: "2024-01-12"
    },
    {
      id: 5,
      title: "Modern Studio Loft",
      location: "456 Oak Avenue, Arts District",
      price: "रू 18,000/month",
      beds: 1,
      baths: 1,
      sqft: 900,
      type: 'rent',
      category: 'studio',
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      available: "Dec 1, 2024",
      description: "Modern studio in arts district",
      status: 'active',
      createdAt: "2024-01-11"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    beds: 1,
    baths: 1,
    sqft: 0,
    type: 'sale' as 'sale' | 'rent',
    category: 'apartment' as Property['category'],
    image: '',
    description: '',
    available: '',
    status: 'active' as Property['status']
  });

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || property.type === typeFilter;
    const matchesStatus = !statusFilter || property.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddProperty = () => {
    const newProperty: Property = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setProperties([newProperty, ...properties]);
    setIsAddModalOpen(false);
    resetForm();
    toast({
      title: "Success",
      description: "Property added successfully"
    });
  };

  const handleEditProperty = () => {
    if (!selectedProperty) return;
    
    const updatedProperties = properties.map(property =>
      property.id === selectedProperty.id ? { ...selectedProperty, ...formData } : property
    );
    
    setProperties(updatedProperties);
    setIsEditModalOpen(false);
    setSelectedProperty(null);
    resetForm();
    toast({
      title: "Success",
      description: "Property updated successfully"
    });
  };

  const handleDeleteProperty = (propertyId: number) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(property => property.id !== propertyId));
      toast({
        title: "Success",
        description: "Property deleted successfully"
      });
    }
  };

  const handleViewProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (property: Property) => {
    setSelectedProperty(property);
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price,
      beds: property.beds,
      baths: property.baths,
      sqft: property.sqft,
      type: property.type,
      category: property.category,
      image: property.image,
      description: property.description || '',
      available: property.available || '',
      status: property.status
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      price: '',
      beds: 1,
      baths: 1,
      sqft: 0,
      type: 'sale',
      category: 'apartment',
      image: '',
      description: '',
      available: '',
      status: 'active'
    });
  };

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'rented': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Property Management</h1>
          <p className="text-gray-600">Manage all properties for sale and rent</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Property title"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Property location"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="e.g., रू 45,00,000 or रू 20,000/month"
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="Image URL"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="beds">Bedrooms</Label>
                  <Input
                    id="beds"
                    type="number"
                    value={formData.beds}
                    onChange={(e) => setFormData({...formData, beds: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="baths">Bathrooms</Label>
                  <Input
                    id="baths"
                    type="number"
                    value={formData.baths}
                    onChange={(e) => setFormData({...formData, baths: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="sqft">Square Feet</Label>
                  <Input
                    id="sqft"
                    type="number"
                    value={formData.sqft}
                    onChange={(e) => setFormData({...formData, sqft: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value: 'sale' | 'rent') => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value: Property['category']) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: Property['status']) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="rented">Rented</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.type === 'rent' && (
                <div>
                  <Label htmlFor="available">Available Date</Label>
                  <Input
                    id="available"
                    value={formData.available}
                    onChange={(e) => setFormData({...formData, available: e.target.value})}
                    placeholder="e.g., Available Now, Dec 1, 2024"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Property description"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProperty}>
                  Add Property
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="sale">For Sale</SelectItem>
            <SelectItem value="rent">For Rent</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
            <SelectItem value="rented">Rented</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="group hover:shadow-lg transition-all duration-300">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2">
                <Badge className={`${property.type === 'sale' ? 'bg-blue-600' : 'bg-green-600'} text-white`}>
                  {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge className={getStatusColor(property.status)}>
                  {property.status}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{property.title}</h3>
              <p className="text-gray-600 text-sm mb-2 flex items-center">
                <MapPin className="mr-1 h-3 w-3" />
                <span className="line-clamp-1">{property.location}</span>
              </p>
              <p className="font-bold text-green-600 mb-3">{property.price}</p>
              
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Bed className="mr-1 h-3 w-3" />
                  {property.beds}
                </div>
                <div className="flex items-center">
                  <Bath className="mr-1 h-3 w-3" />
                  {property.baths}
                </div>
                <div className="flex items-center">
                  <Square className="mr-1 h-3 w-3" />
                  {property.sqft}
                </div>
              </div>

              {property.available && (
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Calendar className="mr-1 h-3 w-3" />
                  {property.available}
                </div>
              )}

              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewProperty(property)}
                  className="flex-1"
                >
                  <Eye className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(property)}
                  className="flex-1"
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteProperty(property.id)}
                  className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No properties found matching your criteria.</p>
        </div>
      )}

      {/* View Property Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
          </DialogHeader>
          {selectedProperty && (
            <div className="grid gap-4">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <p className="font-semibold">{selectedProperty.title}</p>
                </div>
                <div>
                  <Label>Price</Label>
                  <p className="font-semibold text-green-600">{selectedProperty.price}</p>
                </div>
                <div>
                  <Label>Location</Label>
                  <p>{selectedProperty.location}</p>
                </div>
                <div>
                  <Label>Type</Label>
                  <p className="capitalize">{selectedProperty.type}</p>
                </div>
                <div>
                  <Label>Bedrooms</Label>
                  <p>{selectedProperty.beds}</p>
                </div>
                <div>
                  <Label>Bathrooms</Label>
                  <p>{selectedProperty.baths}</p>
                </div>
                <div>
                  <Label>Square Feet</Label>
                  <p>{selectedProperty.sqft}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedProperty.status)}>
                    {selectedProperty.status}
                  </Badge>
                </div>
              </div>
              {selectedProperty.available && (
                <div>
                  <Label>Available</Label>
                  <p>{selectedProperty.available}</p>
                </div>
              )}
              {selectedProperty.description && (
                <div>
                  <Label>Description</Label>
                  <p>{selectedProperty.description}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Property Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Same form fields as Add Property */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-beds">Bedrooms</Label>
                <Input
                  id="edit-beds"
                  type="number"
                  value={formData.beds}
                  onChange={(e) => setFormData({...formData, beds: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="edit-baths">Bathrooms</Label>
                <Input
                  id="edit-baths"
                  type="number"
                  value={formData.baths}
                  onChange={(e) => setFormData({...formData, baths: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="edit-sqft">Square Feet</Label>
                <Input
                  id="edit-sqft"
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => setFormData({...formData, sqft: parseInt(e.target.value)})}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-type">Type</Label>
                <Select value={formData.type} onValueChange={(value: 'sale' | 'rent') => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select value={formData.category} onValueChange={(value: Property['category']) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value: Property['status']) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.type === 'rent' && (
              <div>
                <Label htmlFor="edit-available">Available Date</Label>
                <Input
                  id="edit-available"
                  value={formData.available}
                  onChange={(e) => setFormData({...formData, available: e.target.value})}
                />
              </div>
            )}

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditProperty}>
                Update Property
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyManagement;