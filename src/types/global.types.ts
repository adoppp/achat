export interface User {
    id: string;
    username: string;
    lastSeen: number;
};

export interface Chat {
    id: string;
    members: string[];

    lastMessage: {
        text: string;
        senderId: string;
        createdAt: number;
    } | null;

    lastActivity: number;
    type: 'private' | 'group';

    createdAt: number;
};

export interface Message {
    id: string;

    text: string;
    type: 'text';
    senderId: string;

    createdAt: number; 
    edited?: boolean;
    editedAt?: number;
};