import React, { useState } from 'react';
import { Search, Eye, Trash2, BookOpen, Clock, CheckCircle, AlertTriangle, User, Phone, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ServiceRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  submittedAt: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
}

const ServiceRequestManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  const [requests, setRequests] = useState<ServiceRequest[]>([
    {
      id: 'SRV-2024-001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+977-9841234567',
      service: 'Citizenship Certificate',
      description: 'I need to renew my citizenship certificate which expired last month.',
      submittedAt: '2024-01-15 10:30 AM',
      status: 'pending',
      priority: 'medium',
      isRead: false
    },
    {
      id: 'SRV-2024-002',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+977-9851234567',
      service: 'Business License',
      description: 'Application for new business license for a grocery store in Ward 5.',
      submittedAt: '2024-01-14 02:15 PM',
      status: 'in-progress',
      priority: 'high',
      isRead: true
    },
    {
      id: 'SRV-2024-003',
      name: 'Ram Prasad',
      email: 'ram.prasad@email.com',
      phone: '+977-9861234567',
      service: 'Building Permit',
      description: 'Need building permit for constructing a 2-story house in Ward 3.',
      submittedAt: '2024-01-13 08:45 AM',
      status: 'completed',
      priority: 'medium',
      isRead: true
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleStatusChange = (requestId: string, newStatus: string) => {
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { ...request, status: newStatus as ServiceRequest['status'] }
        : request
    ));
    toast({
      title: 'Status Updated',
      description: `Service request ${requestId} status changed to ${newStatus}`
    });
  };

  const handleMarkAsRead = (requestId: string) => {
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { ...request, isRead: true }
        : request
    ));
    toast({
      title: 'Marked as Read',
      description: `Service request ${requestId} marked as read`
    });
  };

  const handleDeleteRequest = (requestId: string) => {
    setRequests(prev => prev.filter(request => request.id !== requestId));
    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest(null);
    }
    toast({
      title: 'Request Deleted',
      description: `Service request ${requestId} has been deleted`
    });
  };

  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen p-6">
      {/* Header */}
      <div className="municipal-card p-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">Service Request Management</h2>
        <p className="text-gray-600 text-lg">Manage citizen service requests and applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="municipal-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-yellow-600">{requests.filter(r => r.status === 'pending').length}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="municipal-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{requests.filter(r => r.status === 'in-progress').length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="municipal-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{requests.filter(r => r.status === 'completed').length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="municipal-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">{requests.filter(r => r.priority === 'high').length}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="municipal-card p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-municipal-blue" />
            <input
              type="text"
              placeholder="Search service requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="municipal-input pl-12 w-full text-base"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="municipal-input text-base"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="municipal-input text-base"
          >
            <option value="all">All Priority Levels</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Service Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRequests.map((request) => (
          <div 
            key={request.id} 
            className={`municipal-card p-6 hover:shadow-lg transition-all duration-300 ${!request.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="font-bold text-municipal-blue text-lg">{request.id}</span>
                {!request.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(request.priority)}`}>
                {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
              </span>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">{request.service}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{request.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-municipal-blue" />
                <span className="text-sm text-gray-600">{request.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-municipal-blue" />
                <span className="text-sm text-gray-600">{request.email}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-municipal-blue" />
                <span className="text-sm text-gray-600">{request.phone}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-municipal-blue" />
                <span className="text-sm text-gray-600">{request.submittedAt}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-100">
              <select
                value={request.status}
                onChange={(e) => handleStatusChange(request.id, e.target.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border-0 focus:outline-none focus:ring-2 focus:ring-municipal-blue cursor-pointer ${getStatusColor(request.status)}`}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedRequest(request)}
                className="flex items-center gap-2 px-3 py-2 text-sm municipal-button-secondary flex-1 justify-center"
              >
                <Eye className="h-4 w-4" />
                View Details
              </button>
              {!request.isRead && (
                <button
                  onClick={() => handleMarkAsRead(request.id)}
                  className="p-2 hover:bg-blue-100 rounded-md transition-colors"
                  title="Mark as Read"
                >
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </button>
              )}
              <button
                onClick={() => handleDeleteRequest(request.id)}
                className="p-2 hover:bg-red-100 rounded-md transition-colors"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Service Request Details</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 hover:bg-gray-100 rounded-md"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Request ID</label>
                  <p className="text-municipal-blue font-medium">{selectedRequest.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Service Type</label>
                  <p className="font-medium">{selectedRequest.service}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Applicant Name</label>
                  <p>{selectedRequest.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Submitted At</label>
                  <p>{selectedRequest.submittedAt}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p>{selectedRequest.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <p>{selectedRequest.phone}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-600">{selectedRequest.description}</p>
              </div>
              
              <div className="flex gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Priority</label>
                  <p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedRequest.priority)}`}>
                      {selectedRequest.priority.charAt(0).toUpperCase() + selectedRequest.priority.slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Admin Notes</label>
                <textarea
                  rows={4}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-municipal-blue"
                  placeholder="Add notes about this service request..."
                />
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-2">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-municipal-blue text-white rounded-md hover:bg-municipal-blue-dark transition-colors">
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequestManagement;