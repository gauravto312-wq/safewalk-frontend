import React, { useState, useEffect } from 'react';
import { adminApi } from '../api/admin';
import { X, ExternalLink, Download, FileText, AlertCircle, Loader2 } from 'lucide-react';

const DocumentPreviewModal = ({ isOpen, onClose, document, userId, userName }) => {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activeUrl = null;

    if (isOpen && document && userId) {
      setLoading(true);
      setError(null);
      setBlobUrl(null);

      adminApi
        .previewDocumentBlob(userId, document.id)
        .then((blob) => {
          activeUrl = URL.createObjectURL(blob);
          setBlobUrl(activeUrl);
        })
        .catch((err) => {
          console.error('Failed to load document preview:', err);
          setError(err.response?.data?.message || 'Failed to securely fetch document. Ensure you have administrator privileges.');
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      if (activeUrl) {
        URL.revokeObjectURL(activeUrl);
      }
    };
  }, [isOpen, document, userId]);

  if (!isOpen || !document) return null;

  const isPdf = document.mimeType === 'application/pdf' || document.fileName?.toLowerCase().endsWith('.pdf');
  const isImage = document.mimeType?.startsWith('image/') || /\.(jpe?g|png|webp)$/i.test(document.fileName || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white tracking-wide truncate max-w-md">
                {document.fileName || 'Verification Document'}
              </h3>
              <p className="text-xs text-slate-400">
                Submitted by: <span className="text-slate-200 font-medium">{userName || `User #${userId}`}</span>
                {document.fileType && <span className="ml-2 px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{document.fileType}</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {blobUrl && (
              <>
                <a
                  href={blobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
                  title="Open in new window"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={blobUrl}
                  download={document.fileName || 'verification_document.pdf'}
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
                  title="Download copy"
                >
                  <Download className="w-4 h-4" />
                </a>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              title="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 bg-slate-950 p-2 sm:p-4 overflow-hidden relative flex items-center justify-center">
          {loading && (
            <div className="flex flex-col items-center justify-center space-y-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
              <p className="text-sm font-medium">Decrypting and streaming document...</p>
            </div>
          )}

          {error && !loading && (
            <div className="max-w-md p-6 bg-red-950/40 border border-red-800/60 rounded-xl text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
              <h4 className="text-base font-semibold text-white">Document Preview Error</h4>
              <p className="text-xs text-red-200/80">{error}</p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition"
              >
                Close Preview
              </button>
            </div>
          )}

          {blobUrl && !loading && !error && (
            <div className="w-full h-full rounded-lg overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center">
              {isPdf ? (
                <iframe
                  src={`${blobUrl}#toolbar=1`}
                  title={document.fileName}
                  className="w-full h-full border-0 rounded-lg bg-slate-900"
                />
              ) : isImage ? (
                <img
                  src={blobUrl}
                  alt={document.fileName}
                  className="max-h-full max-w-full object-contain mx-auto rounded shadow-lg"
                />
              ) : (
                <div className="text-center p-6 space-y-3">
                  <FileText className="w-12 h-12 text-slate-500 mx-auto" />
                  <p className="text-sm text-slate-300">Preview not natively supported in browser for this mime type ({document.mimeType}).</p>
                  <a
                    href={blobUrl}
                    download={document.fileName}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download File
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
          <span>Official SafeWalk Law Enforcement & Responder Verification Pipeline</span>
          <span className="font-mono text-slate-500">MIME: {document.mimeType || 'unknown'}</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
