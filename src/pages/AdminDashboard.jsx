import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminApi } from '../api/admin';
import DocumentPreviewModal from '../components/DocumentPreviewModal';
import DecisionModal from '../components/DecisionModal';
import {
  ShieldCheck,
  ShieldAlert,
  Users,
  Activity,
  CheckCircle2,
  XCircle,
  FileText,
  Search,
  RefreshCw,
  LogOut,
  AlertTriangle,
  Building,
  BadgeAlert,
  Eye,
  Clock,
  Phone,
  Mail,
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  // Metrics state
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeEmergencies: 0,
    resolvedEmergencies: 0,
    pendingVerifications: 0,
  });

  // Pending queue state
  const [pendingList, setPendingList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'directory'

  // Modals state
  const [previewDoc, setPreviewDoc] = useState(null);
  const [previewUserId, setPreviewUserId] = useState(null);
  const [previewUserName, setPreviewUserName] = useState('');
  const [decisionModal, setDecisionModal] = useState({
    isOpen: false,
    type: 'APPROVE', // 'APPROVE' | 'REJECT'
    user: null,
  });
  const [submittingDecision, setSubmittingDecision] = useState(false);

  // Toast alert state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const loadDashboardData = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    setRefreshing(true);

    try {
      // 1. Fetch dashboard stats
      try {
        const dashRes = await adminApi.getDashboard();
        if (dashRes && dashRes.success && dashRes.data) {
          setStats({
            totalUsers: dashRes.data.totalUsers || 0,
            activeEmergencies: dashRes.data.activeEmergencies || 0,
            resolvedEmergencies: dashRes.data.resolvedEmergencies || 0,
            pendingVerifications: dashRes.data.pendingVerifications || 0,
          });
        }
      } catch (err) {
        console.warn('Dashboard stats fetch failed:', err);
      }

      // 2. Fetch pending verifications
      const pendingRes = await adminApi.getPendingVerifications();
      if (pendingRes && pendingRes.success && pendingRes.data) {
        setPendingList(pendingRes.data);
        // Also update pendingVerifications stat if needed
        setStats((prev) => ({ ...prev, pendingVerifications: pendingRes.data.length }));
      }

      // 3. Fetch user directory
      try {
        const usersRes = await adminApi.getAllUsers(0, 50);
        if (usersRes && usersRes.success && usersRes.data) {
          setAllUsers(usersRes.data.content || []);
          if (usersRes.data.totalElements) {
            setStats((prev) => ({ ...prev, totalUsers: usersRes.data.totalElements }));
          }
        }
      } catch (err) {
        console.warn('Users directory fetch failed:', err);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      showToast(err.response?.data?.message || 'Failed to refresh dashboard data', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Handle open document preview
  const handleOpenPreview = (officer, doc) => {
    setPreviewDoc(doc);
    setPreviewUserId(officer.userId || officer.id);
    setPreviewUserName(officer.name);
  };

  // Handle decision submit (Approve or Reject)
  const handleConfirmDecision = async (reason) => {
    if (!decisionModal.user) return;
    setSubmittingDecision(true);

    const targetUserId = decisionModal.user.userId || decisionModal.user.id;
    const isApprove = decisionModal.type === 'APPROVE';
    const statusPayload = isApprove ? 'VERIFIED' : 'REJECTED';

    try {
      const res = await adminApi.updateVerificationStatus(targetUserId, {
        status: statusPayload,
        reason: isApprove ? undefined : reason,
      });

      if (res && res.success) {
        showToast(
          `Successfully ${isApprove ? 'APPROVED' : 'REJECTED'} verification for ${decisionModal.user.name}.`,
          'success'
        );
        setDecisionModal({ isOpen: false, type: 'APPROVE', user: null });
        await loadDashboardData(true);
      } else {
        throw new Error(res.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Failed to submit decision:', err);
      showToast(err.response?.data?.message || err.message || 'Failed to update verification status', 'error');
    } finally {
      setSubmittingDecision(false);
    }
  };

  // Filter pending items based on search query
  const filteredPending = pendingList.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name?.toLowerCase().includes(q) ||
      item.mobileNumber?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q) ||
      item.departmentName?.toLowerCase().includes(q) ||
      item.badgeNumber?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 max-w-md animate-fade-in shadow-2xl">
          <div
            className={`p-4 rounded-xl border flex items-center space-x-3 text-sm font-medium ${
              toast.type === 'error'
                ? 'bg-red-950/90 border-red-800 text-red-200'
                : 'bg-emerald-950/90 border-emerald-800 text-emerald-200'
            }`}
          >
            {toast.type === 'error' ? <AlertTriangle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
            <span className="flex-1">{toast.message}</span>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white text-xs">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight">SafeWalk Admin Console</span>
              <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                PROD-GRID
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => loadDashboardData(false)}
              disabled={refreshing}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg border border-slate-700 transition"
              title="Refresh Dashboard Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-indigo-400' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-white">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-slate-400 font-mono">{user?.email || user?.mobileNumber}</p>
            </div>

            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8 w-full">
        {/* System Overview Metrics */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Review</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-3xl font-extrabold text-amber-400">{stats.pendingVerifications}</div>
            <p className="text-[11px] text-slate-400 mt-1">Officer credentials awaiting approval</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Emergencies</span>
              <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-3xl font-extrabold text-red-400">{stats.activeEmergencies}</div>
            <p className="text-[11px] text-slate-400 mt-1">In-progress SOS events</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resolved Events</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-3xl font-extrabold text-emerald-400">{stats.resolvedEmergencies}</div>
            <p className="text-[11px] text-slate-400 mt-1">Successfully handled incidents</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Users</span>
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-3xl font-extrabold text-white">{stats.totalUsers}</div>
            <p className="text-[11px] text-slate-400 mt-1">Citizens, Police & Responders</p>
          </div>
        </section>

        {/* Tab Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center space-x-2 ${
                activeTab === 'pending'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Pending Verifications</span>
              {stats.pendingVerifications > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-400 text-slate-950 font-bold ml-1">
                  {stats.pendingVerifications}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('directory')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center space-x-2 ${
                activeTab === 'directory'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>User Directory</span>
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search officer, badge, dept..."
              className="w-full pl-9 pr-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Tab 1: Pending Verifications Queue */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Police & Responder Verification Queue</h2>
                <p className="text-xs text-slate-400">
                  Inspect uploaded departmental credentials and decide authoritative access.
                </p>
              </div>
            </div>

            {loading ? (
              <div className="p-12 text-center space-y-3 bg-slate-900/40 rounded-2xl border border-slate-800">
                <RefreshCw className="w-8 h-8 animate-spin text-indigo-500 mx-auto" />
                <p className="text-xs text-slate-400">Loading pending verification requests...</p>
              </div>
            ) : filteredPending.length === 0 ? (
              <div className="p-12 text-center space-y-3 bg-slate-900/40 rounded-2xl border border-slate-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-sm font-semibold text-white">Verification Queue Clear</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {searchQuery
                    ? 'No pending officer verifications match your search query.'
                    : 'All law enforcement and hospital submissions have been reviewed. New submissions from Android will appear here automatically.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredPending.map((officer) => (
                  <div
                    key={officer.userId}
                    className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-slate-700/80 transition"
                  >
                    {/* Left: Officer Info */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                          {officer.role === 'POLICE' ? 'PO' : 'HP'}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-base font-bold text-white">{officer.name}</h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              {officer.role}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {officer.verificationStatus || 'PENDING'}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
                            <span className="flex items-center">
                              <Phone className="w-3.5 h-3.5 mr-1 text-slate-500" />
                              {officer.mobileNumber}
                            </span>
                            {officer.email && (
                              <span className="flex items-center">
                                <Mail className="w-3.5 h-3.5 mr-1 text-slate-500" />
                                {officer.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Department & Badge details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                          <span className="text-slate-500 block mb-0.5">Department / Organization:</span>
                          <span className="font-semibold text-slate-200 flex items-center">
                            <Building className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
                            {officer.departmentName || 'Not Specified'}
                          </span>
                        </div>

                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                          <span className="text-slate-500 block mb-0.5">Official Badge / ID Number:</span>
                          <span className="font-mono font-semibold text-emerald-400 flex items-center">
                            <BadgeAlert className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                            {officer.badgeNumber || 'Not Specified'}
                          </span>
                        </div>
                      </div>

                      {/* Documents Section */}
                      <div className="space-y-2 pt-1">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                          Uploaded Credentials ({officer.documents?.length || 0})
                        </span>
                        {officer.documents && officer.documents.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {officer.documents.map((doc) => (
                              <button
                                key={doc.id}
                                onClick={() => handleOpenPreview(officer, doc)}
                                className="inline-flex items-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition space-x-2 group cursor-pointer"
                              >
                                <FileText className="w-3.5 h-3.5 text-indigo-400 group-hover:text-indigo-300" />
                                <span className="truncate max-w-xs">{doc.fileName || `Document #${doc.id}`}</span>
                                <Eye className="w-3 h-3 text-slate-400 group-hover:text-white" />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-amber-400 italic">No document records found for this officer.</p>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex lg:flex-col items-center justify-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                      <button
                        onClick={() =>
                          setDecisionModal({
                            isOpen: true,
                            type: 'APPROVE',
                            user: officer,
                          })
                        }
                        className="w-full sm:w-auto lg:w-36 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center space-x-2 transition cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve</span>
                      </button>

                      <button
                        onClick={() =>
                          setDecisionModal({
                            isOpen: true,
                            type: 'REJECT',
                            user: officer,
                          })
                        }
                        className="w-full sm:w-auto lg:w-36 px-4 py-2.5 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 transition cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: User Directory */}
        {activeTab === 'directory' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Registered Users Directory</h3>
                <p className="text-xs text-slate-400">Full audit listing of registered civilian, police, and admin users.</p>
              </div>
              <span className="text-xs font-mono text-slate-400">{allUsers.length} accounts loaded</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-3.5">User</th>
                    <th className="px-6 py-3.5">Contact</th>
                    <th className="px-6 py-3.5">Role</th>
                    <th className="px-6 py-3.5">Department / Badge</th>
                    <th className="px-6 py-3.5">Verification</th>
                    <th className="px-6 py-3.5">Account Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {allUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-6 py-4 font-semibold text-white">
                        <div className="flex items-center space-x-2">
                          <span>{u.name}</span>
                          {u.policeVerified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" title="Police Verified" />
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">ID: #{u.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>{u.mobileNumber}</div>
                        {u.email && <div className="text-slate-400 text-[11px]">{u.email}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            u.role === 'ADMIN'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : u.role === 'POLICE'
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>{u.departmentName || '—'}</div>
                        {u.badgeNumber && <div className="text-emerald-400 font-mono text-[11px]">{u.badgeNumber}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            u.verificationStatus === 'VERIFIED'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : u.verificationStatus === 'REJECTED'
                              ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                              : u.verificationStatus === 'PENDING'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'text-slate-500'
                          }`}
                        >
                          {u.verificationStatus || 'NONE'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            u.status === 'ACTIVE'
                              ? 'bg-emerald-950/40 text-emerald-400'
                              : 'bg-red-950/40 text-red-400'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Inline Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        document={previewDoc}
        userId={previewUserId}
        userName={previewUserName}
      />

      {/* Decision Modal (Approve or Reject) */}
      <DecisionModal
        isOpen={decisionModal.isOpen}
        onClose={() => setDecisionModal({ isOpen: false, type: 'APPROVE', user: null })}
        onConfirm={handleConfirmDecision}
        type={decisionModal.type}
        user={decisionModal.user}
        submitting={submittingDecision}
      />
    </div>
  );
};

export default AdminDashboard;
