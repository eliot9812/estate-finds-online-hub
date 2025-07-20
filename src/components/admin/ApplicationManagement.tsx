
import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Application {
  id: string;
  type: string;
  applicantName: string;
  submittedAt: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  documents: number;
  priority: 'normal' | 'urgent';
}

const ApplicationManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'APP-2024-001',
      type: 'Citizenship Certificate',
      applicantName: 'John Doe',
      submittedAt: '2024-01-15 10:30 AM',
      status: 'pending',
      documents: 3,
      priority: 'normal'
    },
    {
      id: 'APP-2024-002',
      type: 'Business License',
      applicantName: 'Jane Smith',
      submittedAt: '2024-01-14 02:15 PM',
      status: 'processing',
      documents: 5,
      priority: 'urgent'
    },
    {
      id: 'APP-2024-003',
      type: 'Building Permit',
      applicantName: 'Ram Prasad',
      submittedAt: '2024-01-13 08:45 AM',
      status: 'approved',
      documents: 7,
      priority: 'normal'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesType = typeFilter === 'all' || app.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleApprove = (applicationId: string) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: 'approved' } : app
    ));
    toast({
      title: 'Application Approved',
      description: `Application ${applicationId} has been approved`
    });
  };

  const handleReject = (applicationId: string) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: 'rejected' } : app
    ));
    toast({
      title: 'Application Rejected',
      description: `Application ${applicationId} has been rejected`
    });
  };

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Application Management</h2>
          <p className="text-gray-600">Process citizen service applications</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
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
            <option value="processing">Processing</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-municipal-blue"
          >
            <option value="all">All Types</option>
            <option value="Citizenship Certificate">Citizenship Certificate</option>
            <option value="Business License">Business License</option>
            <option value="Building Permit">Building Permit</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Application ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Applicant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Submitted</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Documents</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-municipal-blue">{app.id}</span>
                      {app.priority === 'urgent' && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">Urgent</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">{app.type}</td>
                  <td className="py-3 px-4 font-medium">{app.applicantName}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{app.submittedAt}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-gray-400" />
                      {app.documents}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewDetails(app)}
                        className="p-1 hover:bg-gray-100 rounded-md transition-colors" 
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handleApprove(app.id)}
                        className="p-1 hover:bg-green-100 rounded-md transition-colors" 
                        title="Approve"
                        disabled={app.status === 'approved' || app.status === 'rejected'}
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </button>
                      <button 
                        onClick={() => handleReject(app.id)}
                        className="p-1 hover:bg-red-100 rounded-md transition-colors" 
                        title="Reject"
                        disabled={app.status === 'approved' || app.status === 'rejected'}
                      >
                        <XCircle className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Application Details</h3>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-2 hover:bg-gray-100 rounded-md"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Application ID</label>
                  <p className="text-municipal-blue font-medium">{selectedApplication.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Application Type</label>
                  <p className="font-medium">{selectedApplication.type}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Applicant Name</label>
                  <p>{selectedApplication.applicantName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Submitted At</label>
                  <p>{selectedApplication.submittedAt}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Priority</label>
                  <p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedApplication.priority === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {selectedApplication.priority.charAt(0).toUpperCase() + selectedApplication.priority.slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApplication.status)}`}>
                      {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Documents</label>
                  <p className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-gray-400" />
                    {selectedApplication.documents} files
                  </p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Review Notes</label>
                <textarea
                  rows={4}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-municipal-blue"
                  placeholder="Add review notes for this application..."
                />
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-2">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => handleReject(selectedApplication.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                disabled={selectedApplication.status === 'approved' || selectedApplication.status === 'rejected'}
              >
                Reject
              </button>
              <button 
                onClick={() => handleApprove(selectedApplication.id)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                disabled={selectedApplication.status === 'approved' || selectedApplication.status === 'rejected'}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationManagement;
