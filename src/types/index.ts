import { Timestamp } from "firebase/firestore";

export interface SerializedUser {
  uid: string | null; 
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  bio: string | null;
  createdAt: string | null;
};

export interface Chat {
  id: string;
  participants: string[];
  lastMessage: {
    text: string;
    timeStamp: {
        seconds: number, 
        nanoseconds: number
    }; 
    readBy: string[];
    senderId: string;
  } | null;
  updatedAt: any; 
};

export type MessageType = "text" | "image" | "file" | "audio" | "video";

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text?: string;
  mediaURL?: string;
  timeStamp: Timestamp;
  type: MessageType;
  readBy: string[];
};

export type Theme = 'light' | 'dark' | 'lavender' | 'burgundy' | 'purple';