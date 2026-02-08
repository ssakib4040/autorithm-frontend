export interface Contact {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "in-progress" | "resolved";
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}
