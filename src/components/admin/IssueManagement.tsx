
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MapPin, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreHorizontal
} from 'lucide-react';

interface Issue {
  id: string;
  title: string;
  category: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'verified' | 'in-progress' | 'resolved' | 'rejected';
  reportedBy: string;
  reportedAt: string;
  description: string;
  hasImage: boolean;
}

const IssueManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const mockIssues: Issue[] = [
    {
      id: 'BMC-2024-001',
      title: 'Pothole on Main Street',
      category: 'Road Damage',
      location: 'Ward 5, Main Street',
      urgency: 'high',
      status: 'pending',
      reportedBy: 'John Doe',
      reportedAt: '2024-01-15 10:30 AM',
      description: 'Large pothole causing traffic issues and potential vehicle damage.',
      hasImage: true
    },
    {
      id: 'BMC-2024-002',
      title: 'Water Supply Disruption',
      category: 'Water Supply',
      location: 'Ward 3, Colony Area',
      urgency: 'medium',
      status: 'verified',
      reportedBy: 'Jane Smith',
      reportedAt: '2024-01-14 02:15 PM',
      description: 'No water supply for the past 24 hours in the residential area.',
      hasImage: false
    },
    {
      id: 'BMC-2024-003',
      title: 'Street Light Not Working',
      category: 'Public Lighting',
      location: 'Ward 7, School Street',
      urgency: 'low',
      status: 'resolved',
      reportedBy: 'Ram Prasad',
      reportedAt: '2024-01-13 08:45 PM',
      description: 'Street light has been out for a week, making the area unsafe at night.',
      hasImage: true
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'verified': return 'text-purple-600 bg-purple-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleStatusChange = (issueId: string, newStatus: string) => {
    // In a real app, this would update the backend
    console.log(`Updating issue ${issueId} to status: ${newStatus}`);
  };

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || issue.urgency === urgencyFilter;
    
    return matchesSearch && matchesStatus && matchesUrgency;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Civic Issues Management</h2>
          <p className="text-gray-600">Monitor and respond to citizen-reported issues</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-municipal-blue text-white rounded-md hover:bg-municipal-blue-dark transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
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
            <option value="in-progress">In Progress</option>
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
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Issue ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Title</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Urgency</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Reported</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-municipal-blue">{issue.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {issue.hasImage && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full" title="Has attachment" />
                      )}
                      {issue.title}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {issue.location}
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
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {issue.reportedAt}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedIssue(issue)}
                      className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Issue Details</h3>
              <button
                onClick={() => setSelectedIssue(null)}
                className="p-2 hover:bg-gray-100 rounded-md"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Issue ID</label>
                  <p className="text-municipal-blue font-medium">{selectedIssue.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <p>{selectedIssue.category}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <p className="font-medium">{selectedIssue.title}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-600">{selectedIssue.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <p>{selectedIssue.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Reported By</label>
                  <p>{selectedIssue.reportedBy}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Urgency</label>
                  <p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(selectedIssue.urgency)}`}>
                      {selectedIssue.urgency.charAt(0).toUpperCase() + selectedIssue.urgency.slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIssue.status)}`}>
                      {selectedIssue.status.charAt(0).toUpperCase() + selectedIssue.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
              
              {selectedIssue.hasImage && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Attachments</label>
                  <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md">
                    <p className="text-center text-gray-500">Image attachment available</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-2">
              <button
                onClick={() => setSelectedIssue(null)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-municipal-blue text-white rounded-md hover:bg-municipal-blue-dark transition-colors">
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueManagement;
