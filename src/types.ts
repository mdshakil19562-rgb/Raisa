export interface SimulatorUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  status: string;
  isOnline: boolean;
  lastSeen: string;
  isTyping: boolean;
}

export type MessageType = 'text' | 'image' | 'file' | 'voice';
export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface SimulatorMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  status: MessageStatus;
  mediaUrl?: string;
  mediaName?: string;
  duration?: number; // for voice messages in seconds
  deletedForEveryone?: boolean;
  deletedForUsers?: string[]; // userIds who deleted it for themselves
}

export type CallState = 'idle' | 'outgoing' | 'incoming' | 'active';
export type CallType = 'audio' | 'video';

export interface CallSession {
  id: string;
  callerId: string;
  receiverId: string;
  type: CallType;
  state: CallState;
  startTime?: Date;
  duration?: number;
  muted?: boolean;
  cameraOff?: boolean;
  speakerOn?: boolean;
}

export interface CallRecord {
  id: string;
  callerId: string;
  receiverId: string;
  type: CallType;
  timestamp: Date;
  status: 'missed' | 'incoming' | 'outgoing' | 'declined';
  duration?: string;
}

export interface AndroidFile {
  path: string;
  name: string;
  language: 'kotlin' | 'xml' | 'gradle' | 'json' | 'properties' | 'markdown';
  content: string;
}
