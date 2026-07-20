import React, { useState } from 'react';
import WhatsAppSimulator from './components/WhatsAppSimulator';
import AndroidStudioExplorer from './components/AndroidStudioExplorer';
import { 
  Smartphone, 
  Code, 
  BookOpen, 
  Database, 
  Key, 
  Video, 
  MessageSquare, 
  Compass, 
  Layers, 
  ArrowRight,
  Sparkles,
  Github
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'explorer' | 'docs'>('simulator');

  return (
    <div className="min-h-screen bg-[#0B0E11] text-[#E1E1E1] flex flex-col font-sans">
      {/* Premium Immersive Header */}
      <header className="bg-[#121619] border-b border-white/5 px-6 py-5 sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-[#25D366] to-[#128C7E] rounded-xl text-white shadow-[0_0_15px_rgba(37,211,102,0.3)]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold tracking-tight font-display bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                WhatsApp Native Client Studio
              </h1>
              <p className="text-xs text-[#25D366] font-mono mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span> Complete Kotlin Android Project Generator & WebRTC Sandbox
              </p>
            </div>
          </div>

          {/* Core Applet Navigation */}
          <div className="flex bg-[#15191C] p-1.5 rounded-xl border border-white/5 shadow-inner">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-150 cursor-pointer ${
                activeTab === 'simulator' 
                  ? 'bg-[#25D366] text-black shadow-[0_0_15px_rgba(37,211,102,0.3)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Twin Simulator
            </button>
            <button
              onClick={() => setActiveTab('explorer')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-150 cursor-pointer ${
                activeTab === 'explorer' 
                  ? 'bg-[#25D366] text-black shadow-[0_0_15px_rgba(37,211,102,0.3)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code className="w-4 h-4" />
              Source Explorer
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-150 cursor-pointer ${
                activeTab === 'docs' 
                  ? 'bg-[#25D366] text-black shadow-[0_0_15px_rgba(37,211,102,0.3)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Setup Guides
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col gap-8">
        
        {/* Render Active View */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <WhatsAppSimulator />
          </div>
        )}

        {activeTab === 'explorer' && (
          <div className="flex-1 min-h-[600px] flex flex-col">
            <AndroidStudioExplorer />
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1: Firebase Auth & DB */}
            <div className="bg-[#121619] border border-white/5 rounded-2xl p-6 text-left shadow-lg space-y-4">
              <div className="flex items-center gap-3 text-[#25D366]">
                <Database className="w-6 h-6" />
                <h3 className="font-bold text-lg font-display">Firebase Backend</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                WhatsApp Duo uses a streamlined, offline-persistent Firestore layout optimized for dual users.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="bg-[#1F2428] p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] font-bold text-[#25D366] uppercase tracking-widest block font-mono">Fixed Auth Accounts</span>
                  <div className="space-y-2 mt-2 font-mono text-[11px]">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">User 1:</span>
                      <span className="text-slate-200">user1@example.com</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">User 2:</span>
                      <span className="text-slate-200">user2@example.com</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Pass:</span>
                      <span className="text-[#25D366]">12345678</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">Firestore Schema Paths</h4>
                  <ul className="text-xs space-y-2.5 list-disc pl-4 text-slate-300 font-mono">
                    <li><strong className="text-white">/users/&#123;id&#125;</strong>: Stores online presence, typing status, and profile info.</li>
                    <li><strong className="text-white">/chats/&#123;msgId&#125;</strong>: Dual indexed messaging records. Supports read receipts and deletes.</li>
                    <li><strong className="text-white">/calls/&#123;callId&#125;</strong>: Active WebRTC peer session metadata.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Column 2: WebRTC Signaling details */}
            <div className="bg-[#121619] border border-white/5 rounded-2xl p-6 text-left shadow-lg space-y-4">
              <div className="flex items-center gap-3 text-[#25D366]">
                <Video className="w-6 h-6" />
                <h3 className="font-bold text-lg font-display">WebRTC Signaling</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                The native Android WebRTC client relies on Firestore as a low-latency signaling server to establish direct P2P video links.
              </p>

              <div className="space-y-4 pt-2">
                <div className="bg-[#1F2428] p-4 rounded-xl border border-white/5 space-y-2.5">
                  <span className="text-[10px] font-bold text-[#25D366] uppercase tracking-widest block font-mono">WebRTC Ice Servers</span>
                  <p className="text-[11px] text-slate-300 font-mono">
                    Uses Google's public STUN servers for seamless NAT traversal:
                  </p>
                  <code className="text-[10px] text-[#25D366] font-mono bg-[#0B0E11] px-2.5 py-1 rounded block border border-white/5">
                    stun:stun.l.google.com:19302
                  </code>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">Signaling Flow</h4>
                  <ol className="text-xs space-y-2 list-decimal pl-4 text-slate-300 font-mono">
                    <li>Caller creates an <strong className="text-white">Offer SDP</strong> and writes it to Firestore.</li>
                    <li>Receiver listens to the signaling collection, fetches the Offer, sets their remote description, creates an <strong className="text-white">Answer SDP</strong>, and uploads it.</li>
                    <li>Both exchange local <strong className="text-white">ICE Candidates</strong> via sub-documents to initiate full peer streams.</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Column 3: Android Studio Deployment */}
            <div className="bg-[#121619] border border-white/5 rounded-2xl p-6 text-left shadow-lg space-y-4">
              <div className="flex items-center gap-3 text-[#25D366]">
                <Layers className="w-6 h-6" />
                <h3 className="font-bold text-lg font-display">Android Build Setup</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Follow these specifications inside your Android Studio IDE to compile and launch the package.
              </p>

              <div className="space-y-4 pt-2">
                <div className="bg-[#1F2428] p-4 rounded-xl border border-white/5 space-y-3 font-mono text-[11px]">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Target SDK:</span>
                    <span className="text-white">34 (Android 14)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Minimum SDK:</span>
                    <span className="text-white">26 (Android 8.0)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Build Tools:</span>
                    <span className="text-white">Gradle 8.2+</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">Required IDE Configuration</h4>
                  <ul className="text-xs space-y-2 list-disc pl-4 text-slate-300 font-mono">
                    <li>Ensure you have <strong className="text-white">JDK 17</strong> configured in Android Studio Gradle Settings.</li>
                    <li>Grant Camera & Microphone runtime permissions upon launching call screens.</li>
                    <li>Add the <strong className="text-white">google-services.json</strong> to the <code className="text-[#25D366]">app/</code> folder before building.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Aesthetic Status Footer */}
      <footer className="bg-[#0B0E11] border-t border-white/5 px-6 py-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#25D366] animate-pulse" />
            <span>Built by Senior Android Developer • Real-Time Client Suite</span>
          </div>
          <div className="flex gap-4">
            <span>Kotlin 1.9.22</span>
            <span>•</span>
            <span>WebRTC 1.0.32</span>
            <span>•</span>
            <span>Firebase SDK 32.7+</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
