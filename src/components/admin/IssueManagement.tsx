import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, MapPin, Camera, Trash2, Edit, AlertTriangle } from 'lucide-react';
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
}

const IssueManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'garbage' | 'pothole' | 'others'>('all');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const [issues, setIssues] = useState<Issue[]>([
    {
      id: 'ISS-001',
      title: 'Broken Street Light',
      description: 'Street light on Main Street is not working',
      location: 'Main Street, Ward 5',
      urgency: 'medium',
      status: 'pending',
      reportedBy: 'John Doe',
      reportedAt: '2024-01-20 10:30 AM',
      category: 'others',
      hasImages: true
    },
    {
      id: 'ISS-002',
      title: 'Large Pothole',
      description: 'Large pothole causing traffic issues',
      location: 'Central Road, Ward 3',
      urgency: 'high',
      status: 'verified',
      reportedBy: 'Jane Smith',
      reportedAt: '2024-01-19 02:15 PM',
      category: 'pothole',
      hasImages: true
    },
    {
      id: 'ISS-003',
      title: 'Garbage Collection Missed',
      description: 'Garbage not collected for 3 days',
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
      description: 'Public dustbin is overflowing with waste',
      location: 'Market Area, Ward 2',
      urgency: 'medium',
      status: 'pending',
      reportedBy: 'Sita Devi',
      reportedAt: '2024-01-21 09:15 AM',
      category: 'garbage',
      hasImages: true
    },
    {
      id: 'ISS-005',
      title: 'Road Crack',
      description: 'Small crack in the road surface',
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
    const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesUrgency && matchesCategory;
  });

  const getIssuesByCategory = (category: 'garbage' | 'pothole' | 'others') => {
    return filteredIssues.filter(issue => issue.category === category);
  };

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
      <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
      
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
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Reported by: {issue.reportedBy}</p>
          <p className="text-xs text-gray-500">{issue.reportedAt}</p>
        </div>
        
        <select
          value={issue.status}
          onChange={(e) => handleStatusChange(issue.id, e.target.value)}
          className={`px-2 py-1 rounded-md text-xs font-medium border-0 focus:outline-none focus:ring-2 focus:ring-municipal-blue ${getStatusColor(issue.status)}`}
        >
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      
      <div className="flex items-center gap-2 mt-3 pt-3 border-t">
        <button 
          onClick={() => handleViewDetails(issue)}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
        >
          <Eye className="h-3 w-3" />
          View
        </button>
        <button 
          onClick={() => handleDeleteIssue(issue.id)}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
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

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-municipal-blue"
          >
            <option value="all">All Categories</option>
            <option value="garbage">Garbage Issues</option>
            <option value="pothole">Pothole Issues</option>
            <option value="others">Other Issues</option>
          </select>
          
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

      {/* Issues by Category */}
      <div className="space-y-8">
        {/* Garbage Issues */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Trash2 className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Garbage Issues ({getIssuesByCategory('garbage').length})
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getIssuesByCategory('garbage').map(renderIssueCard)}
            {getIssuesByCategory('garbage').length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-8">No garbage issues found</p>
            )}
          </div>
        </div>

        {/* Pothole Issues */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Pothole Issues ({getIssuesByCategory('pothole').length})
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getIssuesByCategory('pothole').map(renderIssueCard)}
            {getIssuesByCategory('pothole').length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-8">No pothole issues found</p>
            )}
          </div>
        </div>

        {/* Other Issues */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Clock className="h-5 w-5 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Other Issues ({getIssuesByCategory('others').length})
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getIssuesByCategory('others').map(renderIssueCard)}
            {getIssuesByCategory('others').length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-8">No other issues found</p>
            )}
          </div>
        </div>
      </div>

      {/* Issue Details Modal */}
      {showDetails && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Issue Details</h3>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Issue ID</label>
                  <p className="text-municipal-blue font-bold">{selectedIssue.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedIssue.category)}`}>
                    {selectedIssue.category.charAt(0).toUpperCase() + selectedIssue.category.slice(1)}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <p className="font-semibold">{selectedIssue.title}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-600">{selectedIssue.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <p className="text-gray-600">{selectedIssue.location}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Urgency</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(selectedIssue.urgency)}`}>
                    {selectedIssue.urgency.charAt(0).toUpperCase() + selectedIssue.urgency.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIssue.status)}`}>
                    {selectedIssue.status.charAt(0).toUpperCase() + selectedIssue.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reported By</label>
                  <p className="text-gray-600">{selectedIssue.reportedBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reported At</label>
                  <p className="text-gray-600">{selectedIssue.reportedAt}</p>
                </div>
              </div>
              
              {selectedIssue.hasImages && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Images</label>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Camera className="h-4 w-4" />
                    <span>Images attached to this report</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueManagement;
