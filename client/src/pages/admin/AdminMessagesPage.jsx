import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import { contactApi } from '../../services/api';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMessages, setTotalMessages] = useState(0);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 8,
      };
      if (searchTerm) params.search = searchTerm;
      if (statusFilter !== 'ALL') params.status = statusFilter;

      const res = await contactApi.getAllMessages(params);
      if (res.success) {
        setMessages(res.data);
        setTotalPages(res.pages);
        setTotalMessages(res.total);
      }
    } catch (err) {
      console.error('[Admin Messages Fetch Error]', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [searchTerm, statusFilter, currentPage]);

  const handleOpenModal = async (msg) => {
    setSelectedMessage(msg);
    setReplyText(msg.adminReply || '');
    setIsModalOpen(true);

    if (msg.status === 'NEW') {
      try {
        await contactApi.updateMessageStatus(msg._id, 'READ');
        fetchMessages();
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSendingReply(true);
    try {
      const res = await contactApi.replyToMessage(selectedMessage._id, replyText);
      if (res.success) {
        setIsModalOpen(false);
        fetchMessages();
      }
    } catch (err) {
      alert(err.message || 'Failed to send reply');
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this support message?')) return;
    try {
      const res = await contactApi.deleteMessage(id);
      if (res.success) {
        fetchMessages();
      }
    } catch (err) {
      alert(err.message || 'Failed to delete message');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E4DC]">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block mb-1">
            Concierge Inbox
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-[#292A26]">
            Customer Inquiries &amp; Messages
          </h1>
          <p className="text-xs text-[#77766F] mt-1">Review inquiries, compose replies, and track resolutions.</p>
        </div>
      </div>

      <Card className="p-4 border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
          <Input
            placeholder="Search Sender Name, Email, Subject..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-72"
          />

          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-44 text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">NEW</option>
            <option value="READ">READ</option>
            <option value="REPLIED">REPLIED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>

        <div className="text-xs text-gray-500 font-medium">
          Showing <strong className="text-gray-900">{totalMessages}</strong> messages
        </div>
      </Card>

      <Card className="border border-gray-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <LoadingState message="Fetching support inbox..." className="py-20" />
        ) : messages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Sender</th>
                  <th className="py-3 px-4">Subject &amp; Message</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {messages.map((msg) => (
                  <tr key={msg._id} className={`hover:bg-[#FAF8F3] transition-colors ${msg.status === 'NEW' ? 'bg-[#FAF8F3] font-semibold' : ''}`}>
                    <td className="py-3 px-4">
                      <span className="font-bold text-gray-900 block">{msg.name}</span>
                      <span className="text-[11px] text-gray-400">{msg.email}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gray-900 block">{msg.subject}</span>
                      <span className="text-[11px] text-gray-400 line-clamp-1">{msg.message}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4"><StatusBadge status={msg.status} /></td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleOpenModal(msg)}>💬 Reply</Button>
                        <button onClick={() => handleDeleteMessage(msg._id)} className="p-1.5 text-rose-500 hover:text-rose-700 font-bold">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No Support Messages" description="Try clearing your search query or status filter." />
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => setCurrentPage(p)} className="m-4" />
      </Card>

      {/* REPLY MODAL */}
      {selectedMessage && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Message Details — ${selectedMessage.subject}`}>
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-gray-50 rounded-xl border">
              <p><strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})</p>
              <p className="mt-2 text-gray-800 font-medium">"{selectedMessage.message}"</p>
            </div>

            <form onSubmit={handleSendReply} className="space-y-3 border-t pt-3">
              <label className="font-bold uppercase tracking-wider block">Compose Admin Reply</label>
              <textarea
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type response here..."
                required
                className="w-full p-3 border rounded-xl"
              />
              <div className="flex justify-end">
                <Button type="submit" variant="primary" size="sm" isLoading={isSendingReply}>
                  ✉️ Send Reply Email
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
