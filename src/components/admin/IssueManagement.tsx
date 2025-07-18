
import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, MapPin, Camera } from 'lucide-react';

interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'verified' | 'resolved' | 'rejected';
  reportedBy: string;
  reportedAt: string;
  category: string;
  hasImages: boolean;
}

const IssueManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');

  const mockIssues: Issue[] = [
    {
      id: 'ISS-001',
      title: 'Broken Street Light',
      description: 'Street light on Main Street is not working',
      location: 'Main Street, Ward 5',
      urgency: 'medium',
      status: 'pending',
      reportedBy: 'John Doe',
      reportedAt: '2024-01-20 10:30 AM',
      category: 'Infrastructure',
      hasImages: true
    },
    {
      id: 'ISS-002',
      title: 'Pothole on Road',
      description: 'Large pothole causing traffic issues',
      location: 'Central Road, Ward 3',
      urgency: 'high',
      status: 'verified',
      reportedBy: 'Jane Smith',
      reportedAt: '2024-01-19 02:15 PM',
      category: 'Roads',
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
      category: 'Sanitation',
      hasImages: false
    }
  ];

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

  const handleStatusChange = (issueId: string, newStatus: string) => {
    console.log(`Changing issue ${issueId} status to: ${newStatus}`);
  };

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || issue.urgency === urgencyFilter;
    
    return matchesSearch && matchesStatus && matchesUrgency;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Civic Issues Management</h2>
        <p className="text-gray-600">Monitor and manage reported civic issues</p>
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

      {/* Issues Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Issue ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Title</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Urgency</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Reported By</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-municipal-blue">{issue.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{issue.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{issue.description}</p>
                      {issue.hasImages && (
                        <div className="flex items-center gap-1 mt-1">
                          <Camera className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">Has images</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{issue.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(issue.urgency)}`}>
                      {issue.urgency.charAt(0).toUpperCase() + issue.urgency.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
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
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{issue.reportedBy}</p>
                      <p className="text-xs text-gray-500">{issue.reportedAt}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded-md transition-colors" title="View Details">
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IssueManagement;
