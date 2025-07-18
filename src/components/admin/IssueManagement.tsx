
import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, MapPin, Camera, Trash2, Edit, AlertTriangle, User, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'verified' | 'resolved' | 'rejected';
  reportedBy: string;
  reportedAt: string;
  category: 'garbage' | 'pothole' | 'others';
  hasImages: boolean;
  images?: string[];
}

const IssueManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState<'all' | 'garbage' | 'pothole' | 'others'>('all');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const [issues, setIssues] = useState<Issue[]>([
    {
      id: 'ISS-001',
      title: 'Broken Street Light',
      description: 'Street light on Main Street is not working for the past 3 days. This creates safety concerns for pedestrians and vehicles during night time.',
      location: 'Main Street, Ward 5',
      urgency: 'medium',
      status: 'pending',
      reportedBy: 'John Doe',
      reportedAt: '2024-01-20 10:30 AM',
      category: 'others',
      hasImages: true,
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=400']
    },
    {
      id: 'ISS-002',
      title: 'Large Pothole',
      description: 'Large pothole on Central Road causing traffic issues and vehicle damage. Multiple citizens have complained about this.',
      location: 'Central Road, Ward 3',
      urgency: 'high',
      status: 'verified',
      reportedBy: 'Jane Smith',
      reportedAt: '2024-01-19 02:15 PM',
      category: 'pothole',
      hasImages: true,
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400']
    },
    {
      id: 'ISS-003',
      title: 'Garbage Collection Missed',
      description: 'Garbage not collected for 3 consecutive days in residential area. Causing health and hygiene issues.',
      location: 'Residential Area, Ward 7',
      urgency: 'low',
      status: 'resolved',
      reportedBy: 'Ram Prasad',
      reportedAt: '2024-01-18 08:45 AM',
      category: 'garbage',
      hasImages: false
    },
    {
      id: 'ISS-004',
      title: 'Overflowing Dustbin',
      description: 'Public dustbin is overflowing with waste and creating unhygienic conditions in the market area.',
      location: 'Market Area, Ward 2',
      urgency: 'medium',
      status: 'pending',
      reportedBy: 'Sita Devi',
      reportedAt: '2024-01-21 09:15 AM',
      category: 'garbage',
      hasImages: true,
      images: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400']
    },
    {
      id: 'ISS-005',
      title: 'Road Crack',
      description: 'Small crack in the road surface that might develop into a larger pothole if not addressed soon.',
      location: 'School Road, Ward 4',
      urgency: 'low',
      status: 'pending',
      reportedBy: 'Hari Kumar',
      reportedAt: '2024-01-20 03:45 PM',
      category: 'pothole',
      hasImages: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'verified': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'garbage': return 'text-orange-600 bg-orange-100';
      case 'pothole': return 'text-purple-600 bg-purple-100';
      case 'others': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleStatusChange = (issueId: string, newStatus: string) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === issueId ? { ...issue, status: newStatus as Issue['status'] } : issue
      )
    );
    toast({
      title: 'Status Updated',
      description: `Issue ${issueId} status changed to ${newStatus}`
    });
  };

  const handleViewDetails = (issue: Issue) => {
    setSelectedIssue(issue);
    setShowDetails(true);
  };

  const handleDeleteIssue = (issueId: string) => {
    setIssues(prevIssues => prevIssues.filter(issue => issue.id !== issueId));
    toast({
      title: 'Issue Deleted',
      description: `Issue ${issueId} has been deleted`
    });
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || issue.urgency === urgencyFilter;
    const matchesCategory = activeCategory === 'all' || issue.category === activeCategory;
    
    return matchesSearch && matchesStatus && matchesUrgency && matchesCategory;
  });

  const renderIssueCard = (issue: Issue) => (
    <div key={issue.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-municipal-blue">{issue.id}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(issue.category)}`}>
            {issue.category.charAt(0).toUpperCase() + issue.category.slice(1)}
          </span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(issue.urgency)}`}>
          {issue.urgency.charAt(0).toUpperCase() + issue.urgency.slice(1)}
        </span>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-2">{issue.title}</h3>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{issue.description}</p>
      
      <div className="flex items-center gap-1 mb-3">
        <MapPin className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-600">{issue.location}</span>
      </div>
      
      {issue.hasImages && (
        <div className="flex items-center gap-1 mb-3">
          <Camera className="h-3 w-3 text-gray-400" />
          <span className="text-xs text-gray-500">Has images</span>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-gray-500">Reported by: {issue.reportedBy}</p>
          <p className="text-xs text-gray-500">{issue.reportedAt}</p>
        </div>
        
        <select
          value={issue.status}
          onChange={(e) => handleStatusChange(issue.id, e.target.value)}
          className={`px-2 py-1 rounded-md text-xs font-medium border-0 focus:outline-none focus:ring-2 focus:ring-municipal-blue cursor-pointer ${getStatusColor(issue.status)}`}
        >
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      
      <div className="flex items-center gap-2 pt-3 border-t">
        <button 
          onClick={() => handleViewDetails(issue)}
          className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
        >
          <Eye className="h-3 w-3" />
          View Details
        </button>
        <button 
          onClick={() => handleDeleteIssue(issue.id)}
          className="flex items-center gap-1 px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
        >
          <Trash2 className="h-3 w-3" />
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Civic Issues Management</h2>
        <p className="text-gray-600">Monitor and manage reported civic issues by category</p>
      </div>

      {/* Category Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeCategory === 'all'
                ? 'border-municipal-blue text-municipal-blue bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Issues ({issues.length})
          </button>
          <button
            onClick={() => setActiveCategory('garbage')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeCategory === 'garbage'
                ? 'border-orange-500 text-orange-600 bg-orange-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Garbage Issues ({issues.filter(i => i.category === 'garbage').length})
          </button>
          <button
            onClick={() => setActiveCategory('pothole')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeCategory === 'pothole'
                ? 'border-purple-500 text-purple-600 bg-purple-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Pothole Issues ({issues.filter(i => i.category === 'pothole').length})
          </button>
          <button
            onClick={() => setActiveCategory('others')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeCategory === 'others'
                ? 'border-gray-500 text-gray-600 bg-gray-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Other Issues ({issues.filter(i => i.category === 'others').length})
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-municipal-blue"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-municipal-blue"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-municipal-blue"
          >
            <option value="all">All Urgency</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIssues.map(renderIssueCard)}
        {filteredIssues.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <Clock className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-500 text-lg">No issues found</p>
            <p className="text-gray-400 text-sm">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Issue Details Modal */}
      {showDetails && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Issue Details</h3>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Issue Header */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue ID</label>
                  <p className="text-municipal-blue font-bold text-lg">{selectedIssue.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedIssue.category)}`}>
                    {selectedIssue.category.charAt(0).toUpperCase() + selectedIssue.category.slice(1)}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <p className="font-semibold text-lg text-gray-900">{selectedIssue.title}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <p className="text-gray-600 leading-relaxed">{selectedIssue.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-600">{selectedIssue.location}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(selectedIssue.urgency)}`}>
                    {selectedIssue.urgency.charAt(0).toUpperCase() + selectedIssue.urgency.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedIssue.status)}`}>
                    {selectedIssue.status.charAt(0).toUpperCase() + selectedIssue.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reported By</label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-600">{selectedIssue.reportedBy}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reported At</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-600">{selectedIssue.reportedAt}</p>
                  </div>
                </div>
              </div>
              
              {selectedIssue.hasImages && selectedIssue.images && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Attached Images</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedIssue.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Issue image ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg border shadow-sm"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                          <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <select
                  value={selectedIssue.status}
                  onChange={(e) => {
                    handleStatusChange(selectedIssue.id, e.target.value);
                    setSelectedIssue({ ...selectedIssue, status: e.target.value as Issue['status'] });
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-municipal-blue ${getStatusColor(selectedIssue.status)}`}
                >
                  <option value="pending">Mark as Pending</option>
                  <option value="verified">Mark as Verified</option>
                  <option value="resolved">Mark as Resolved</option>
                  <option value="rejected">Mark as Rejected</option>
                </select>
                
                <button 
                  onClick={() => handleDeleteIssue(selectedIssue.id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueManagement;
