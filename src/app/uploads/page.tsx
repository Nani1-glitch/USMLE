"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function UploadsPage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploads, setUploads] = useState<any[]>([]);
  const [loadingUploads, setLoadingUploads] = useState(true);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'chunks'>('list');
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [chunks, setChunks] = useState<any[]>([]);
  const [loadingChunks, setLoadingChunks] = useState(false);
  const [deleteChunkConfirm, setDeleteChunkConfirm] = useState<string | null>(null);
  const [deletingChunk, setDeletingChunk] = useState(false);

  // Load existing uploads on page load
  useEffect(() => {
    async function loadUploads() {
      try {
        const response = await fetch('/api/uploads/list');
        if (response.ok) {
          const data = await response.json();
          setUploads(data.uploads || data || []);
        } else {
          setUploads([]);
        }
      } catch (error) {
        console.error('Failed to load uploads:', error);
        setUploads([]);
      } finally {
        setLoadingUploads(false);
      }
    }
    loadUploads();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      if (!text.trim()) throw new Error("Please provide text content");

      const r = await fetch("/api/rag/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title || "Untitled", content: text }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d?.error || "Embed failed");
      setStatus(`Embedded: ${title || "Untitled"} (chunks: ${d.chunks})`);
      setUploads(prev => [...(prev || []), { title: title || "Untitled", source: "text", chunks: d.chunks, date: new Date().toISOString() }]);
      setTitle(""); // Clear the form
      setText("");
    } catch (e: any) {
      setStatus(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  async function handleViewContent(uploadTitle: string) {
    setLoadingContent(true);
    try {
      const response = await fetch('/api/uploads/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: uploadTitle })
      });
      
      if (response.ok) {
        const data = await response.json();
        setSelectedContent(data);
      } else {
        console.error('Failed to load content');
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoadingContent(false);
    }
  }

  async function handleDelete(uploadTitle: string) {
    setDeleting(true);
    try {
      const response = await fetch('/api/uploads/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: uploadTitle })
      });
      
      if (response.ok) {
        // Refresh the uploads list
        await loadUploads();
        setDeleteConfirm(null);
        setStatus("Repository deleted successfully!");
        setTimeout(() => setStatus(null), 3000);
      } else {
        const error = await response.json();
        setStatus(`Error: ${error.error}`);
        setTimeout(() => setStatus(null), 5000);
      }
    } catch (error) {
      console.error('Error deleting repository:', error);
      setStatus("Error deleting repository");
      setTimeout(() => setStatus(null), 5000);
    } finally {
      setDeleting(false);
    }
  }

  async function loadUploads() {
    try {
      const response = await fetch('/api/uploads/list');
      if (response.ok) {
        const data = await response.json();
        setUploads(data.uploads || data || []);
      }
    } catch (error) {
      console.error('Error loading uploads:', error);
      setUploads([]);
    } finally {
      setLoadingUploads(false);
    }
  }

  async function handleViewChunks(repoTitle: string) {
    setLoadingChunks(true);
    setSelectedRepo(repoTitle);
    try {
      const response = await fetch('/api/uploads/chunks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: repoTitle })
      });
      
      if (response.ok) {
        const data = await response.json();
        setChunks(data.chunks);
        
        // If no chunks left, go back to repository list
        if (data.chunks.length === 0) {
          setViewMode('list');
          setSelectedRepo(null);
          setChunks([]);
          setStatus("All notes deleted. Repository is now empty.");
          setTimeout(() => setStatus(null), 3000);
          // Refresh the repository list
          await loadUploads();
        } else {
          setViewMode('chunks');
        }
      } else {
        console.error('Failed to load chunks');
        setStatus('Error loading chunks');
        setTimeout(() => setStatus(null), 3000);
      }
    } catch (error) {
      console.error('Error loading chunks:', error);
      setStatus('Error loading chunks');
      setTimeout(() => setStatus(null), 3000);
    } finally {
      setLoadingChunks(false);
    }
  }

  async function handleDeleteChunk(chunkId: string) {
    if (!selectedRepo) return;
    
    setDeletingChunk(true);
    try {
      const response = await fetch('/api/uploads/chunk/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chunkId, title: selectedRepo })
      });
      
      if (response.ok) {
        // Refresh the chunks list
        await handleViewChunks(selectedRepo);
        setDeleteChunkConfirm(null);
        setStatus("Note deleted successfully!");
        setTimeout(() => setStatus(null), 3000);
      } else {
        const error = await response.json();
        setStatus(`Error: ${error.error}`);
        setTimeout(() => setStatus(null), 5000);
      }
    } catch (error) {
      console.error('Error deleting chunk:', error);
      setStatus("Error deleting note");
      setTimeout(() => setStatus(null), 5000);
    } finally {
      setDeletingChunk(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Educational Disclaimer */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="bg-white/90 backdrop-blur-sm text-gray-600 px-3 py-2 rounded-lg shadow-lg border border-gray-200">
          <span className="text-xs font-medium">For Educational Purposes Only</span>
        </div>
      </div>

      {/* Detailed Medical Professional Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Main Medical Professional Silhouette */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[700px] opacity-15 blur-2xl">
          <div className="w-full h-full relative">
            {/* Medical Professional Figure */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-80 relative">
                {/* Head with Medical Cap */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-blue-300/40 rounded-full"></div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-blue-400/30 rounded-full"></div>
                
                {/* Body with Medical Coat */}
                <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-36 h-52 bg-cyan-300/40 rounded-t-full"></div>
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-40 h-48 bg-cyan-400/30 rounded-t-full"></div>
                
                {/* Stethoscope */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-emerald-400/50 rounded-full"></div>
                <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-emerald-500/40 rounded-full"></div>
                <div className="absolute top-18 left-1/2 transform translate-x-8 w-6 h-6 bg-emerald-500/40 rounded-full"></div>
                
                {/* Arms */}
                <div className="absolute top-28 left-6 w-6 h-20 bg-blue-400/40 rounded-full"></div>
                <div className="absolute top-28 right-6 w-6 h-20 bg-blue-400/40 rounded-full"></div>
                
                {/* Hands */}
                <div className="absolute top-46 left-4 w-8 h-8 bg-blue-500/30 rounded-full"></div>
                <div className="absolute top-46 right-4 w-8 h-8 bg-blue-500/30 rounded-full"></div>
                
                {/* Medical Bag */}
                <div className="absolute top-50 left-8 w-12 h-16 bg-emerald-400/30 rounded-lg"></div>
                <div className="absolute top-52 left-10 w-8 h-2 bg-emerald-500/40 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Medical Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10 blur-xl">
          <div className="w-full h-full bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full relative">
            {/* Medical Cross */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-2 bg-white/30 rounded-full transform -translate-y-1/2"></div>
                <div className="absolute left-1/2 top-0 w-2 h-full bg-white/30 rounded-full transform -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 opacity-10 blur-xl">
          <div className="w-full h-full bg-gradient-to-br from-emerald-300/20 to-blue-300/20 rounded-full relative">
            {/* Heart Symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-1/3 right-1/3 w-20 h-20 opacity-8 blur-xl">
          <div className="w-full h-full bg-gradient-to-br from-cyan-300/20 to-emerald-300/20 rounded-full relative">
            {/* DNA Helix */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border border-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 relative z-10">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-all duration-200 group">
              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/chat" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-all duration-200 group">
                <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="font-medium">AI Tutor</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-6xl px-4 py-8 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 bg-clip-text text-transparent mb-6">Personal Notes</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">Create, organize, and manage your personal medical study notes. Build your own knowledge repository for quick reference and review.</p>
        </div>

        {/* Create New Note Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-8 mb-8">
          <div className="flex items-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Create New Note</h2>
              <p className="text-gray-600 mt-1">Write and save your personal medical study notes</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">Note Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                placeholder="Enter a descriptive title (e.g., Cardiology Notes, Pharmacology Basics)"
              />
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">Note Content</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 h-64 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none bg-white/80 backdrop-blur-sm"
                placeholder="Write your medical notes, study materials, or important concepts here..."
              />
            </div>

            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="w-6 h-6 mr-3 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving Note...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Save Note
                </>
              )}
            </button>
          </form>

          {/* Status Message */}
          {status && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-green-800 font-medium">{status}</span>
              </div>
            </div>
          )}
        </div>

        {/* Personal Notes Repository */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {viewMode === 'chunks' ? `Notes in "${selectedRepo}"` : 'Your Notes Repository'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {viewMode === 'chunks' ? 'Individual notes in this collection' : 'All your saved personal notes'}
                </p>
              </div>
            </div>
            {viewMode === 'chunks' && (
              <button
                onClick={() => {
                  setViewMode('list');
                  setSelectedRepo(null);
                  setChunks([]);
                }}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Repositories</span>
              </button>
            )}
          </div>
          
          {viewMode === 'chunks' ? (
            loadingChunks ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-gray-600">Loading notes...</span>
                </div>
              </div>
            ) : chunks.length > 0 ? (
              <div className="grid gap-4">
                {chunks.map((chunk, i) => (
                  <div key={chunk.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                            Note {chunk.chunkIndex + 1}
                          </span>
                          <span className="text-sm text-gray-500 ml-3">
                            {new Date(chunk.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-800 leading-relaxed line-clamp-3">
                          {chunk.content}
                        </p>
                      </div>
                      <div className="ml-4 flex items-center space-x-2">
                        <button
                          onClick={() => setDeleteChunkConfirm(chunk.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Delete this note"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No notes found</h3>
                <p className="text-gray-600">This repository doesn't have any individual notes.</p>
              </div>
            )
          ) : loadingUploads ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-gray-600">Loading your knowledge base...</span>
              </div>
            </div>
          ) : uploads.length > 0 ? (
            <div className="grid gap-4">
              {uploads.map((upload, i) => (
                <div 
                  key={i} 
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => handleViewContent(upload.title)}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{upload.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {upload.source}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          {upload.chunks} chunks
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(upload.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewChunks(upload.title);
                        }}
                        className="px-3 py-1 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200"
                        title="View individual notes"
                      >
                        View Notes
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirm(upload.title);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete entire repository"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No content yet</h3>
              <p className="text-gray-600">Upload your first medical notes to start building your knowledge base.</p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50/50 to-emerald-50/50 rounded-3xl p-8 border border-gray-200 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Personal Note Management</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">1. Create Notes</h4>
              <p className="text-gray-600 leading-relaxed">Write and organize your personal medical study notes with descriptive titles and detailed content.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">2. Organize & Store</h4>
              <p className="text-gray-600 leading-relaxed">Your notes are automatically organized and stored securely for easy access and reference.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">3. Quick Reference</h4>
              <p className="text-gray-600 leading-relaxed">Access your notes anytime for quick review, study sessions, and exam preparation.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Content Modal */}
      {selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedContent.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{selectedContent.chunks} chunks</span>
                    <span>{new Date(selectedContent.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedContent(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {loadingContent ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-gray-600">Loading content...</span>
                  </div>
                </div>
              ) : (
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {selectedContent.content}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Delete Repository</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete "<span className="font-semibold">{deleteConfirm}</span>"? 
                This will permanently remove all associated chunks and data.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={deleting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {deleting ? (
                    <>
                      <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    'Delete Repository'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chunk Delete Confirmation Modal */}
      {deleteChunkConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Delete Note</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this individual note? 
                This will remove only this specific note, not the entire repository.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteChunkConfirm(null)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  disabled={deletingChunk}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteChunk(deleteChunkConfirm)}
                  disabled={deletingChunk}
                  className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {deletingChunk ? (
                    <>
                      <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    'Delete Note'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}