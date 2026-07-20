import React, { useState, useEffect, useRef } from 'react';
import { 
  SimulatorUser, 
  SimulatorMessage, 
  CallSession, 
  CallRecord, 
  CallState, 
  CallType,
  MessageType,
  MessageStatus
} from '../types';
import { 
  Phone, 
  Video, 
  Send, 
  Paperclip, 
  Smile, 
  Mic, 
  Check, 
  CheckCheck, 
  Search, 
  MoreVertical, 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  MicOff, 
  Camera, 
  CameraOff, 
  RefreshCw, 
  PhoneOff, 
  Trash2, 
  FileText, 
  Image as ImageIcon, 
  Play, 
  Pause,
  Clock,
  LogOut,
  Info,
  ChevronRight
} from 'lucide-react';

// Custom lightweight synthesizer for rich audio feedback (no asset dependencies!)
const playSound = (type: 'sent' | 'received' | 'ringing' | 'connected' | 'ended') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    switch (type) {
      case 'sent': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
        break;
      }
      case 'received': {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        
        osc1.frequency.setValueAtTime(580, ctx.currentTime);
        osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        
        osc1.start();
        osc1.stop(ctx.currentTime + 0.1);
        osc2.start(ctx.currentTime + 0.08);
        osc2.stop(ctx.currentTime + 0.25);
        break;
      }
      case 'ringing': {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        
        osc1.frequency.setValueAtTime(440, ctx.currentTime);
        osc2.frequency.setValueAtTime(480, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.4);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        
        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.5);
        osc2.stop(ctx.currentTime + 0.5);
        break;
      }
      case 'connected': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(660, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
        break;
      }
      case 'ended': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(330, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
        break;
      }
    }
  } catch (e) {
    // Fail silently if browser blocks audio autoplay
  }
};

export default function WhatsAppSimulator() {
  // Shared database mock states
  const [users, setUsers] = useState<Record<string, SimulatorUser>>({
    user1: {
      id: 'user1',
      email: 'user1@example.com',
      name: 'Nikhil (User 1)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
      status: 'Hey there! I am using WhatsApp Duo.',
      isOnline: true,
      lastSeen: 'Online',
      isTyping: false,
    },
    user2: {
      id: 'user2',
      email: 'user2@example.com',
      name: 'Rohan (User 2)',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80',
      status: 'Busy at work. Text only.',
      isOnline: true,
      lastSeen: 'Online',
      isTyping: false,
    }
  });

  const [messages, setMessages] = useState<SimulatorMessage[]>([
    {
      id: 'm1',
      senderId: 'user1',
      receiverId: 'user2',
      content: 'Hey Rohan! Is the native Android Studio project ready for testing?',
      type: 'text',
      timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      status: 'read'
    },
    {
      id: 'm2',
      senderId: 'user2',
      receiverId: 'user1',
      content: 'Yes! Fully structured in Kotlin with high-quality WebRTC audio and video calling.',
      type: 'text',
      timestamp: new Date(Date.now() - 3600000 * 1.9),
      status: 'read'
    },
    {
      id: 'm3',
      senderId: 'user2',
      receiverId: 'user1',
      content: 'I also wrote the README, AndroidManifest, Gradle configurations, and XML files.',
      type: 'text',
      timestamp: new Date(Date.now() - 3600000 * 1.85),
      status: 'read'
    },
    {
      id: 'm4',
      senderId: 'user1',
      receiverId: 'user2',
      content: 'Amazing! Let\'s perform a quick voice/video test call to inspect the stream.',
      type: 'text',
      timestamp: new Date(Date.now() - 3600000 * 1.8),
      status: 'read'
    }
  ]);

  const [callSession, setCallSession] = useState<CallSession | null>(null);
  const [callRecords, setCallRecords] = useState<CallRecord[]>([]);

  // User 1 device states
  const [u1Tab, setU1Tab] = useState<'chats' | 'calls' | 'settings'>('chats');
  const [u1ActiveChat, setU1ActiveChat] = useState<string | null>(null);
  const [u1InputText, setU1InputText] = useState('');
  const [u1DarkMode, setU1DarkMode] = useState(true);
  const [u1SearchText, setU1SearchText] = useState('');
  const [u1Recording, setU1Recording] = useState(false);

  // User 2 device states
  const [u2Tab, setU2Tab] = useState<'chats' | 'calls' | 'settings'>('chats');
  const [u2ActiveChat, setU2ActiveChat] = useState<string | null>(null);
  const [u2InputText, setU2InputText] = useState('');
  const [u2DarkMode, setU2DarkMode] = useState(true);
  const [u2SearchText, setU2SearchText] = useState('');
  const [u2Recording, setU2Recording] = useState(false);

  // Call timers
  const [callDuration, setCallDuration] = useState(0);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Webcams stream simulator
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [u1CamView, setU1CamView] = useState<HTMLVideoElement | null>(null);
  const [u2CamView, setU2CamView] = useState<HTMLVideoElement | null>(null);

  // Periodic ringing tone simulator
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callSession && (callSession.state === 'outgoing' || callSession.state === 'incoming')) {
      playSound('ringing');
      interval = setInterval(() => {
        playSound('ringing');
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [callSession?.state]);

  // Handle call timer count
  useEffect(() => {
    if (callSession && callSession.state === 'active') {
      callTimerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
      setCallDuration(0);
    }
    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [callSession?.state]);

  // Request browser webcam for HD caller effect
  useEffect(() => {
    if (callSession && callSession.type === 'video' && callSession.state === 'active') {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setLocalStream(stream);
        })
        .catch(() => {
          // webcam blocked or unavailable, handle gracefully
        });
    } else {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        setLocalStream(null);
      }
    }
  }, [callSession?.state]);

  // Mark messages as read when target opens the chat
  useEffect(() => {
    if (u1ActiveChat === 'user2') {
      setMessages(prev => prev.map(msg => 
        msg.senderId === 'user2' && msg.receiverId === 'user1' 
          ? { ...msg, status: 'read' as const } 
          : msg
      ));
    }
  }, [u1ActiveChat, messages.length]);

  useEffect(() => {
    if (u2ActiveChat === 'user1') {
      setMessages(prev => prev.map(msg => 
        msg.senderId === 'user1' && msg.receiverId === 'user2' 
          ? { ...msg, status: 'read' as const } 
          : msg
      ));
    }
  }, [u2ActiveChat, messages.length]);

  // Sync typing indicators
  const handleTypingChange = (userId: string, isTyping: boolean) => {
    setUsers(prev => ({
      ...prev,
      [userId]: { ...prev[userId], isTyping }
    }));
  };

  const sendMessage = (senderId: string, receiverId: string, content: string, type: MessageType = 'text', customProps = {}) => {
    if (!content.trim() && type === 'text') return;

    const newMessage: SimulatorMessage = {
      id: Math.random().toString(),
      senderId,
      receiverId,
      content,
      type,
      timestamp: new Date(),
      status: 'sent',
      ...customProps
    };

    playSound('sent');
    setMessages(prev => [...prev, newMessage]);

    // Update status to delivered immediately
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'delivered' } : m));
      playSound('received');

      // If receiver is looking at this chat, update status to read immediately
      const isReceiverInChat = (receiverId === 'user1' && u1ActiveChat === senderId) ||
                              (receiverId === 'user2' && u2ActiveChat === senderId);
      if (isReceiverInChat) {
        setTimeout(() => {
          setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'read' } : m));
        }, 300);
      }
    }, 1000);
  };

  // Delete message
  const handleDeleteMessage = (messageId: string, forEveryone: boolean, userId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        if (forEveryone) {
          return { ...msg, deletedForEveryone: true };
        } else {
          const deletedFor = msg.deletedForUsers || [];
          return { ...msg, deletedForUsers: [...deletedFor, userId] };
        }
      }
      return msg;
    }));
  };

  // Calling flow
  const initiateCall = (callerId: string, receiverId: string, type: CallType) => {
    const newSession: CallSession = {
      id: Math.random().toString(),
      callerId,
      receiverId,
      type,
      state: 'outgoing',
      muted: false,
      cameraOff: false,
      speakerOn: false
    };
    setCallSession(newSession);
  };

  const handleAcceptCall = () => {
    if (!callSession) return;
    playSound('connected');
    setCallSession(prev => prev ? { ...prev, state: 'active', startTime: new Date() } : null);
  };

  const handleRejectCall = () => {
    if (!callSession) return;
    playSound('ended');
    const newRecord: CallRecord = {
      id: Math.random().toString(),
      callerId: callSession.callerId,
      receiverId: callSession.receiverId,
      type: callSession.type,
      timestamp: new Date(),
      status: 'declined'
    };
    setCallRecords(prev => [newRecord, ...prev]);
    setCallSession(null);
  };

  const handleEndCall = () => {
    if (!callSession) return;
    playSound('ended');
    const formattedDuration = formatTimer(callDuration);
    const newRecord: CallRecord = {
      id: Math.random().toString(),
      callerId: callSession.callerId,
      receiverId: callSession.receiverId,
      type: callSession.type,
      timestamp: new Date(),
      status: 'outgoing', // or incoming depending on side
      duration: formattedDuration
    };
    setCallRecords(prev => [newRecord, ...prev]);
    setCallSession(null);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderTicks = (status: MessageStatus) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3.5 h-3.5 text-neutral-400" />;
      case 'delivered':
        return <CheckCheck className="w-3.5 h-3.5 text-neutral-400" />;
      case 'read':
        return <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" />;
    }
  };

  // Helper to filter chat logs
  const getChatMessages = (uA: string, uB: string) => {
    return messages.filter(m => 
      ((m.senderId === uA && m.receiverId === uB) || (m.senderId === uB && m.receiverId === uA)) &&
      !(m.deletedForUsers || []).includes(uA)
    );
  };

  // Sub-component: Individual Phone Device Render
  const PhoneDevice = ({
    userId,
    activeTab,
    setActiveTab,
    activeChat,
    setActiveChat,
    inputText,
    setInputText,
    darkMode,
    setDarkMode,
    searchText,
    setSearchText,
    recording,
    setRecording,
    otherUserId
  }: {
    userId: string;
    activeTab: 'chats' | 'calls' | 'settings';
    setActiveTab: (tab: 'chats' | 'calls' | 'settings') => void;
    activeChat: string | null;
    setActiveChat: (id: string | null) => void;
    inputText: string;
    setInputText: (text: string) => void;
    darkMode: boolean;
    setDarkMode: (dm: boolean) => void;
    searchText: string;
    setSearchText: (text: string) => void;
    recording: boolean;
    setRecording: (rec: boolean) => void;
    otherUserId: string;
  }) => {
    const user = users[userId];
    const otherUser = users[otherUserId];
    const chatLogs = getChatMessages(userId, otherUserId);
    const lastMsg = chatLogs[chatLogs.length - 1];

    const inputRef = useRef<HTMLInputElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Auto scroll chat
    useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatLogs.length, otherUser.isTyping]);

    const handleSendText = () => {
      if (!inputText.trim()) return;
      sendMessage(userId, otherUserId, inputText, 'text');
      setInputText('');
      handleTypingChange(userId, false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSendText();
      }
    };

    const handleInputFocus = (focused: boolean) => {
      handleTypingChange(userId, focused && inputText.length > 0);
    };

    const handleSendVoice = () => {
      setRecording(true);
      playSound('sent');
      setTimeout(() => {
        setRecording(false);
        sendMessage(userId, otherUserId, '🎤 Voice Message (0:04)', 'voice', { duration: 4 });
      }, 1500);
    };

    const handleSendImage = () => {
      sendMessage(userId, otherUserId, '🖼️ Photo attachment', 'image', {
        mediaUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=300&h=200&q=80',
        mediaName: 'waterfall.jpg'
      });
    };

    const handleSendFile = () => {
      sendMessage(userId, otherUserId, '📄 Android_WebRTC_Setup.pdf', 'file', {
        mediaName: 'Android_WebRTC_Setup.pdf'
      });
    };

    // Render Calls Tab
    const userCallRecords = callRecords.filter(r => r.callerId === userId || r.receiverId === userId);

    return (
      <div className={`w-full max-w-[390px] h-[640px] rounded-[44px] border-[10px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative flex flex-col select-none transition-all duration-300 overflow-hidden ${
        darkMode ? 'bg-[#0B0E11] text-[#E1E1E1] border-[#121619]' : 'bg-[#F8F9FA] text-[#111B21] border-[#e9edef]'
      }`}>
        {/* Device Speaker Notch */}
        <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-32 h-4.5 bg-black rounded-full z-50 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F2428] mr-2 block"></span>
          <span className="w-12 h-1 bg-[#1F2428] rounded-full block"></span>
        </div>

        {/* Device Status Bar */}
        <div className="h-9 px-6 flex justify-between items-center text-[11px] font-semibold tracking-wide font-mono z-40 bg-opacity-95 bg-inherit pt-2">
          <span>{userId === 'user1' ? '18:21 (SIM 1)' : '18:21 (SIM 2)'}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#25D366]">5G</span>
            <span className="w-4 h-2 rounded-sm border border-current flex items-center p-0.5"><span className="h-full w-2.5 bg-[#25D366] block rounded-xs"></span></span>
          </div>
        </div>

        {/* ACTIVE WEBRTC OVERLAYS */}
        {callSession && (callSession.callerId === userId || callSession.receiverId === userId) && (
          <div className="absolute inset-0 bg-[#0B141A] z-50 flex flex-col items-center justify-between py-12 px-6">
            {/* Caller Header */}
            <div className="text-center">
              <div className="w-24 h-24 rounded-full border-2 border-[#25D366] overflow-hidden mx-auto shadow-lg relative">
                <img 
                  src={callSession.callerId === userId ? otherUser.avatar : users[callSession.callerId].avatar} 
                  alt="avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-xl font-bold mt-4 text-white">
                {callSession.callerId === userId ? otherUser.name : users[callSession.callerId].name}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest font-mono">
                {callSession.state === 'outgoing' && callSession.callerId === userId && 'Dialing...'}
                {callSession.state === 'incoming' && callSession.receiverId === userId && 'Incoming Call'}
                {callSession.state === 'active' && 'WebRTC SECURE CONNECTION'}
              </p>
              {callSession.state === 'active' && (
                <div className="text-sm font-semibold text-[#25D366] mt-2 font-mono bg-[#005c4b] bg-opacity-25 px-3 py-1 rounded-full inline-block">
                  {formatTimer(callDuration)}
                </div>
              )}
            </div>

            {/* Video Streams */}
            {callSession.type === 'video' && callSession.state === 'active' && (
              <div className="w-full h-48 bg-black rounded-2xl relative overflow-hidden my-4 border border-neutral-800">
                {/* PIP Local Video */}
                <div className="absolute right-3 top-3 w-16 h-24 bg-neutral-900 rounded-lg overflow-hidden border border-neutral-700 z-10 shadow">
                  <video 
                    ref={el => {
                      if (el && localStream) el.srcObject = localStream;
                    }} 
                    autoPlay 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover transform scale-x-[-1]" 
                  />
                </div>
                {/* Simulated Remote Stream */}
                <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500 font-mono">
                  <img 
                    src={callSession.callerId === userId ? otherUser.avatar : users[callSession.callerId].avatar} 
                    alt="Remote User" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-0.5 rounded text-[10px] text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 block animate-ping"></span>
                    REMOTE HD
                  </span>
                </div>
              </div>
            )}

            {/* Calling Control Buttons */}
            <div className="flex flex-col items-center gap-6 w-full">
              {callSession.state === 'incoming' && callSession.receiverId === userId ? (
                <div className="flex justify-center gap-12 w-full">
                  <button 
                    onClick={handleRejectCall} 
                    className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white cursor-pointer hover:bg-red-600 transition-all active:scale-90"
                  >
                    <PhoneOff className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={handleAcceptCall} 
                    className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white cursor-pointer hover:bg-green-600 transition-all active:scale-90 animate-bounce"
                  >
                    <Phone className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <div className="flex justify-center gap-6 w-full items-center">
                  <button className="p-3.5 rounded-full bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition">
                    <MicOff className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleEndCall} 
                    className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white cursor-pointer hover:bg-red-600 transition-all active:scale-90"
                  >
                    <PhoneOff className="w-6 h-6" />
                  </button>
                  <button className="p-3.5 rounded-full bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition">
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SCROLLABLE VIEWPORTS (CHATS / CALLS / SETTINGS) */}
        {!activeChat ? (
          <>
            {/* View Header */}
            <div className={`px-5 py-3 flex justify-between items-center ${
              darkMode ? 'bg-[#121619]' : 'bg-[#ffffff] border-b border-neutral-100'
            }`}>
              <h2 className="text-xl font-bold tracking-tight text-[#25D366] drop-shadow-[0_0_8px_rgba(37,211,102,0.2)]">WhatsApp Duo</h2>
              <div className="flex items-center gap-4 text-slate-400">
                <Search className="w-4.5 h-4.5 cursor-pointer hover:text-white" />
                <MoreVertical className="w-4.5 h-4.5 cursor-pointer hover:text-white" />
              </div>
            </div>

            {/* TAB BAR */}
            <div className={`flex text-center text-sm font-semibold tracking-wide border-b ${
              darkMode ? 'bg-[#121619] border-white/5' : 'bg-[#ffffff] border-neutral-100'
            }`}>
              {['chats', 'calls', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`flex-1 py-3 text-xs uppercase tracking-wider transition-all duration-150 relative cursor-pointer ${
                    activeTab === tab 
                      ? 'text-[#25D366] font-bold' 
                      : darkMode ? 'text-slate-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#25D366] block shadow-[0_0_10px_rgba(37,211,102,0.5)]"></span>
                  )}
                </button>
              ))}
            </div>

            {/* TAB PANES */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'chats' && (
                <div className="p-1.5">
                  <div 
                    onClick={() => setActiveChat(otherUserId)}
                    className={`flex items-center gap-3.5 p-3 rounded-2xl cursor-pointer transition-all duration-150 ${
                      darkMode ? 'hover:bg-[#1F2428] border border-transparent hover:border-white/5 shadow-sm' : 'hover:bg-neutral-100'
                    }`}
                  >
                    <div className="relative">
                      <img src={otherUser.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover border border-neutral-800" />
                      {otherUser.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-inherit"></span>
                      )}
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-sm">{otherUser.name}</h4>
                        <span className="text-[10px] text-neutral-500 font-mono">18:21</span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-1.5">
                        <p className="text-xs text-[#8696A0] truncate max-w-[180px] font-mono">
                          {otherUser.isTyping ? (
                            <span className="text-[#25D366] italic font-semibold">typing...</span>
                          ) : lastMsg ? (
                            lastMsg.deletedForEveryone ? '🚫 This message was deleted' : lastMsg.content
                          ) : (
                            otherUser.status
                          )}
                        </p>
                        
                        {/* Unread dot simulation */}
                        {lastMsg && lastMsg.senderId === otherUserId && lastMsg.status !== 'read' && (
                          <span className="w-5 h-5 rounded-full bg-[#25D366] text-black text-[10px] font-bold flex items-center justify-center font-mono animate-pulse">
                            1
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'calls' && (
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Recent call history</h3>
                  </div>
                  {userCallRecords.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500 text-xs font-mono">
                      No recent call session logs.
                    </div>
                  ) : (
                    userCallRecords.map((rec) => (
                      <div key={rec.id} className="flex justify-between items-center py-2 border-b border-neutral-800 border-opacity-30">
                        <div className="flex items-center gap-3.5">
                          <div className="p-2 bg-neutral-800 rounded-full text-[#25D366]">
                            {rec.type === 'video' ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                          </div>
                          <div className="text-left">
                            <h4 className="text-xs font-bold">{rec.callerId === userId ? users[rec.receiverId].name : users[rec.callerId].name}</h4>
                            <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                              {rec.status === 'declined' ? 'Call declined' : `Connected • ${rec.duration || '00:15'}`}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] text-neutral-500 font-mono">
                          {rec.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="p-4 text-left space-y-5">
                  <div className={`flex items-center gap-4 p-4 rounded-2xl ${
                    darkMode ? 'bg-[#1F2428] border border-white/5 shadow-md' : 'bg-neutral-900 bg-opacity-5'
                  }`}>
                    <img src={user.avatar} alt="My Avatar" className="w-14 h-14 rounded-full object-cover border border-white/5" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{user.name}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-1">{user.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2.5 border-b border-neutral-800 border-opacity-35">
                      <div className="text-xs">
                        <h5 className="font-semibold">Dark Mode Appearance</h5>
                        <p className="text-[10px] text-neutral-500 mt-0.5">Optimize interface contrast</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={darkMode} 
                        onChange={() => setDarkMode(!darkMode)}
                        className="w-10 h-5 bg-[#25D366] rounded-full appearance-none relative checked:after:translate-x-5 after:content-[''] after:absolute after:w-5 after:h-5 after:rounded-full after:bg-white after:transition-all after:shadow cursor-pointer border border-neutral-700"
                      />
                    </div>

                    <div className="py-2.5 border-b border-neutral-800 border-opacity-35 text-xs">
                      <h5 className="font-semibold">Simulated User Profiles</h5>
                      <p className="text-[10px] text-[#25D366] mt-0.5 font-mono">Status: Connected to local WebSocket</p>
                    </div>

                    <div className="py-2.5 text-xs">
                      <h5 className="font-semibold">Privacy Encryption</h5>
                      <p className="text-[10px] text-neutral-500 mt-0.5">End-to-end peer-to-peer WebRTC signals</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* ACTIVE CHAT SCREEN */
          <div className="flex flex-1 flex-col overflow-hidden relative">
            {/* Chat Screen Toolbar Header */}
            <div className={`px-4 py-3 flex items-center justify-between z-30 ${
              darkMode ? 'bg-[#15191C] border-b border-white/5 shadow-md' : 'bg-[#ffffff] border-b border-neutral-100'
            }`}>
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveChat(null)} className="cursor-pointer text-[#25D366] hover:text-[#128C7E] transition">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <img src={otherUser.avatar} alt="Other User Avatar" className="w-9 h-9 rounded-full object-cover border border-white/5" />
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">{otherUser.name}</h4>
                  <span className="text-[10px] text-[#25D366] font-mono flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#25D366] animate-pulse"></span>
                    {otherUser.isTyping ? 'typing...' : otherUser.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-400">
                <button onClick={() => initiateCall(userId, otherUserId, 'video')} className="cursor-pointer text-white hover:text-[#25D366] bg-white/5 p-1.5 rounded-full hover:bg-[#25D366]/10 transition">
                  <Video className="w-4.5 h-4.5" />
                </button>
                <button onClick={() => initiateCall(userId, otherUserId, 'audio')} className="cursor-pointer text-white hover:text-[#25D366] bg-white/5 p-1.5 rounded-full hover:bg-[#25D366]/10 transition">
                  <Phone className="w-4.5 h-4.5" />
                </button>
                <MoreVertical className="w-4.5 h-4.5 cursor-pointer hover:text-white" />
              </div>
            </div>

            {/* MESSAGE CHAT CANVAS */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-3.5 flex flex-col ${
              darkMode ? 'bg-[#0B0E11]' : 'bg-[#efeae2]'
            }`} style={{ backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`, backgroundBlendMode: darkMode ? 'overlay' : 'normal', backgroundOpacity: 0.05 }}>
              {chatLogs.map((msg) => {
                const isMe = msg.senderId === userId;
                return (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col max-w-[80%] rounded-2xl px-3.5 py-2.5 relative text-xs text-left shadow-md transition ${
                      isMe 
                        ? darkMode ? 'bg-[#056162] text-white border border-[#25D366]/20 self-end rounded-tr-none' : 'bg-[#d9fdd3] text-[#111B21] self-end rounded-tr-none'
                        : darkMode ? 'bg-[#1F2428] text-[#E1E1E1] border border-white/5 self-start rounded-tl-none' : 'bg-white text-[#111B21] self-start rounded-tl-none'
                    }`}
                  >
                    {/* Delete Message Dialog Anchor */}
                    {msg.deletedForEveryone ? (
                      <span className="text-neutral-500 italic flex items-center gap-1.5">
                        🚫 This message was deleted
                      </span>
                    ) : (
                      <>
                        {/* Image attachment rendering */}
                        {msg.type === 'image' && msg.mediaUrl && (
                          <div className="mb-2 rounded-xl overflow-hidden border border-neutral-700/20">
                            <img src={msg.mediaUrl} alt="Shared File" className="w-full h-32 object-cover" />
                          </div>
                        )}

                        {/* File attachment rendering */}
                        {msg.type === 'file' && (
                          <div className="flex items-center gap-2 bg-neutral-800 bg-opacity-25 p-2 rounded-xl mb-2 font-mono text-[10px]">
                            <FileText className="w-4 h-4 text-[#25D366]" />
                            <span className="truncate max-w-[120px]">{msg.mediaName}</span>
                          </div>
                        )}

                        <p className="leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                        
                        <div className="flex justify-end items-center gap-1 mt-1.5 text-[9px] text-[#8696A0] font-mono">
                          <span>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {isMe && renderTicks(msg.status)}
                          
                          {/* Trash button to delete for everyone */}
                          <button 
                            onClick={() => handleDeleteMessage(msg.id, true, userId)}
                            className="ml-2 hover:text-red-400 cursor-pointer opacity-40 hover:opacity-100 transition"
                            title="Delete for everyone"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </>
                    )}
                    </div>
                );
              })}

              {otherUser.isTyping && (
                <div className={`flex flex-col max-w-[80%] rounded-2xl px-4 py-3 bg-neutral-800 self-start rounded-tl-none text-xs text-[#25D366] italic font-semibold font-mono animate-pulse`}>
                  typing...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* CHAT SCREEN ACTION INPUT BAR */}
            <div className={`p-3 flex items-center gap-2.5 z-30 ${
              darkMode ? 'bg-[#15191C]/95 backdrop-blur-md border-t border-white/5' : 'bg-[#f0f2f5]'
            }`}>
              <div className="flex items-center gap-2.5">
                <button onClick={handleSendImage} title="Share Photo" className="text-slate-400 hover:text-[#25D366] hover:scale-110 transition cursor-pointer">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button onClick={handleSendFile} title="Share PDF File" className="text-slate-400 hover:text-[#25D366] hover:scale-110 transition cursor-pointer">
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>

              <input
                ref={inputRef}
                type="text"
                placeholder="Type a message"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  handleTypingChange(userId, e.target.value.length > 0);
                }}
                onFocus={() => handleInputFocus(true)}
                onBlur={() => handleInputFocus(false)}
                onKeyPress={handleKeyPress}
                className={`flex-1 text-xs border-0 outline-none px-3.5 py-2.5 rounded-full font-mono ${
                  darkMode ? 'bg-[#1F2428] text-slate-100 placeholder-slate-500 border border-white/5 shadow-inner focus:ring-1 focus:ring-[#25D366]/30' : 'bg-white text-black placeholder-neutral-400 shadow-xs'
                }`}
              />

              {inputText.trim() ? (
                <button 
                  onClick={handleSendText} 
                  className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#128C7E] flex items-center justify-center text-black cursor-pointer transition-all active:scale-95 shadow-[0_0_15px_rgba(37,211,102,0.4)]"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              ) : (
                <button 
                  onClick={handleSendVoice} 
                  className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#128C7E] flex items-center justify-center text-black cursor-pointer transition-all active:scale-95 shadow-[0_0_15px_rgba(37,211,102,0.4)]"
                >
                  <Mic className="w-4.5 h-4.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Title & Instructions */}
      <div className="text-center max-w-2xl px-4">
        <div className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(37,211,102,0.1)]">
          <Info className="w-3.5 h-3.5" /> Fully Interactive Twin Phone Simulator
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[#E1E1E1] bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Real-time Cross-Device Workspace Playground
        </h2>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Interact with **User 1** and **User 2** simultaneously. Trigger WebRTC video/audio calls, type messages to see real-time typing indicators, send custom documents/images, and test deletion propagation.
        </p>
      </div>

      {/* Grid containing twin devices */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-12 w-full max-w-4xl px-4">
        {/* Device A (User 1) */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-bold text-slate-300 bg-[#121619] border border-white/5 px-4 py-1.5 rounded-full font-mono uppercase tracking-wider shadow-md">
            Device A (Nikhil)
          </span>
          <PhoneDevice
            userId="user1"
            otherUserId="user2"
            activeTab={u1Tab}
            setActiveTab={setU1Tab}
            activeChat={u1ActiveChat}
            setActiveChat={setU1ActiveChat}
            inputText={u1InputText}
            setInputText={setU1InputText}
            darkMode={u1DarkMode}
            setDarkMode={setU1DarkMode}
            searchText={u1SearchText}
            setSearchText={setU1SearchText}
            recording={u1Recording}
            setRecording={setU1Recording}
          />
        </div>

        {/* Device B (User 2) */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-bold text-slate-300 bg-[#121619] border border-white/5 px-4 py-1.5 rounded-full font-mono uppercase tracking-wider shadow-md">
            Device B (Rohan)
          </span>
          <PhoneDevice
            userId="user2"
            otherUserId="user1"
            activeTab={u2Tab}
            setActiveTab={setU2Tab}
            activeChat={u2ActiveChat}
            setActiveChat={setU2ActiveChat}
            inputText={u2InputText}
            setInputText={setU2InputText}
            darkMode={u2DarkMode}
            setDarkMode={setU2DarkMode}
            searchText={u2SearchText}
            setSearchText={setU2SearchText}
            recording={u2Recording}
            setRecording={setU2Recording}
          />
        </div>
      </div>
    </div>
  );
}
