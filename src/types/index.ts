import { Timestamp } from "firebase/firestore";

export interface SerializedUser {
  uid: string | null; 
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
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
  id: string; // ID документа (может быть присвоен отдельно)
  chatId: string; // ID чата, к которому принадлежит сообщение
  senderId: string; // UID отправителя
  text?: string; // Текст сообщения, если type === 'text'
  mediaURL?: string; // URL к файлу/изображению, если type !== 'text'
  timestamp: Timestamp; // Время отправки (используется serverTimestamp())
  type: MessageType; // Тип сообщения
  readBy: string[]; // UID-ы пользователей, которые прочитали сообщение
}