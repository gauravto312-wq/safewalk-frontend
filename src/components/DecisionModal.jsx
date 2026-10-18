import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Loader2 } from 'lucide-react';

const DecisionModal = ({ isOpen, onClose, onConfirm, type, user, submitting }) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  if (!isOpen || !user) return null;

  const isApprove = type === 'APPROVE';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isApprove && !reason.trim()) {
      setError('A rejection reason is required so the officer can correct their submission.');
      return;
    }
    setError('');
    onConfirm(reason.trim());
  };

  const handleClose = () => {
    setReason('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`p-6 border-b border-slate-800 ${isApprove ? 'bg-emerald-950/20' : 'bg-red-950/20'}`}>
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${isApprove ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {isApprove ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {isApprove ? 'Approve Verification' : 'Reject Verification Request'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {user.name} ({user.role}) — {user.departmentName || 'No Department'} [Badge: {user.badgeNumber || 'N/A'}]
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isApprove ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-300 leading-relaxed">
                Are you sure you want to approve this officer's verification?
              </p>
              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Officer Name:</span>
                  <span className="font-semibold text-white">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-medium text-slate-200">{user.departmentName || 'General Police'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Badge / ID:</span>
                  <span className="font-mono text-emerald-400">{user.badgeNumber || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mobile:</span>
                  <span className="text-slate-300">{user.mobileNumber}</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Upon approval, this account will be marked <span className="text-emerald-400 font-semibold">VERIFIED</span> in the database, allowing immediate emergency dispatch handling on the Android app.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-slate-300 leading-relaxed">
                Specify the authoritative reason for rejection. This message will be synchronized to the officer's Android device.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Rejection Reason <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g. Official department seal is illegible, please upload an uncropped, high-resolution scan of your departmental ID card."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  autoFocus
                />
                {error && <p className="text-xs text-red-400 mt-1 flex items-center"><AlertTriangle className="w-3.5 h-3.5 mr-1" />{error}</p>}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs text-slate-500">Quick templates:</span>
                {[
                  'Illegible badge number or department seal',
                  'Expired departmental credentials',
                  'Incorrect ID document type provided',
                ].map((tmpl) => (
                  <button
                    key={tmpl}
                    type="button"
                    onClick={() => {
                      setReason(tmpl);
                      setError('');
                    }}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700 transition"
                  >
                    {tmpl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || (!isApprove && !reason.trim())}
              className={`px-5 py-2.5 text-xs font-semibold rounded-xl flex items-center space-x-2 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                isApprove
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/30'
              }`}
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{isApprove ? 'Confirm Approval' : 'Submit Rejection'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DecisionModal;
