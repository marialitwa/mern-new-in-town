export interface User {
  _id: string;
  email: string;
  userName?: string;
  userImage?: string;
  createdAt: Date;
  updatedAt: Date;
  // created_cards?: Array<Object>; 
}
