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
    timestamp: any; 
  } | null;
  updatedAt: any; 
};