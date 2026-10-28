import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import Pagination from '../../components/common/Pagination';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import { userApi } from '../../services/api';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 8,
      };
      if (searchTerm) params.search = searchTerm;
      if (statusFilter !== 'ALL') params.status = statusFilter;

      const res = await userApi.getAllCustomers(params);
      if (res.success) {
        setCustomers(res.data);
        setTotalPages(res.pages);
        setTotalCustomers(res.total);
      }
    } catch (err) {
      console.error('[Admin Customers Fetch Error]', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm, statusFilter, currentPage]);

  const handleToggleBlockStatus = async () => {
    try {
      const newStatus = selectedCustomer.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
      const res = await userApi.updateCustomerStatus(selectedCustomer._id, newStatus);
      if (res.success) {
        setIsBlockModalOpen(false);
        fetchCustomers();
      }
    } catch (err) {
      alert(err.message || 'Failed to update customer status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E4DC]">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block mb-1">
            Accounts
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-[#292A26]">
            Customer Directory
          </h1>
          <p className="text-xs text-[#77766F] mt-1">Manage customer profiles and account access.</p>
        </div>
      </div>

      <Card className="p-4 border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
          <Input
            placeholder="Search Customer Name, Email, Phone..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-72"
          />

          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-40 text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="ALL">All Account Statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="BLOCKED">BLOCKED</option>
          </select>
        </div>

        <div className="text-xs text-gray-500 font-medium">
          Showing <strong className="text-gray-900">{totalCustomers}</strong> customers
        </div>
      </Card>

      <Card className="border border-gray-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <LoadingState message="Fetching live customer directory..." className="py-20" />
        ) : customers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Registered Date</th>
                  <th className="py-3 px-4">Account Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {customers.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FAF8F3] text-[#292A26] border border-[#E8E4DC] font-medium flex items-center justify-center text-xs">
                          {c.name.charAt(0)}
                        </div>
                        <span>{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gray-900 block">{c.email}</span>
                      <span className="text-[11px] text-gray-400">{c.phone || 'N/A'}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => { setSelectedCustomer(c); setIsDetailsOpen(true); }} className="p-1.5 text-[#77766F] hover:text-[#292A26] text-xs">Inspect</button>
                        <button
                          onClick={() => { setSelectedCustomer(c); setIsBlockModalOpen(true); }}
                          className={`p-1.5 font-bold rounded-lg text-xs ${c.status === 'ACTIVE' ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'}`}
                        >
                          {c.status === 'ACTIVE' ? '🚫 Block' : '✅ Unblock'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No Customers Found" description="Try resetting your search query or status filter." />
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => setCurrentPage(p)} className="m-4" />
      </Card>

      {/* BLOCK MODAL */}
      {selectedCustomer && (
        <ConfirmationModal
          isOpen={isBlockModalOpen}
          onClose={() => setIsBlockModalOpen(false)}
          onConfirm={handleToggleBlockStatus}
          title={selectedCustomer.status === 'ACTIVE' ? 'Block Account' : 'Unblock Account'}
          message={`Are you sure you want to toggle access for ${selectedCustomer.name}?`}
          confirmText={selectedCustomer.status === 'ACTIVE' ? 'Block' : 'Unblock'}
          isDanger={selectedCustomer.status === 'ACTIVE'}
        />
      )}

      {/* DETAILS MODAL */}
      {selectedCustomer && (
        <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title={`Customer Profile — ${selectedCustomer.name}`}>
          <div className="space-y-3 text-xs">
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Phone:</strong> {selectedCustomer.phone || 'N/A'}</p>
            <p><strong>Status:</strong> {selectedCustomer.status}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
