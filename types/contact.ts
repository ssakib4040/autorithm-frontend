export interface Contact {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "in-progress" | "resolved";
  createdAt: Date;
  updatedAt: Date;
}
