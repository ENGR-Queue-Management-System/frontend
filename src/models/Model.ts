export interface IModelUser {
  id: number;
  studentId?: string;
  firstNameTH: string;
  lastNameTH: string;
  firstNameEN: string;
  lastNameEN: string;
  email: string;
  roomId?: number;
  room?: string;
}

export interface IModelRoom {
  id: number;
  room: string;
}
