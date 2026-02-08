import { Contact } from "@/types/contact";
import { getUsers } from "./users";

// Generate contacts from users
export async function getAllContacts(): Promise<Contact[]> {
  const users = await getUsers();
  return users.map((user, index) => ({
    name: user.name,
    email: user.email,
    userId: user.userId,
    subject: user.isAdmin
      ? "Admin account setup and configuration"
      : "General inquiry about workflow automation",
    message: user.isAdmin
      ? "Setting up the admin account for testing and development purposes. Need to verify all admin features are working correctly including user management, product creation, and system settings."
      : "Hi, I'm new to automation workflows and would like to learn more about how your products can help streamline my business processes. Can you recommend a good starting point for beginners?",
    status: user.isAdmin ? ("resolved" as const) : ("new" as const),
    createdAt: new Date(Date.now() - index * 60 * 60 * 1000), // Stagger by hours
    updatedAt: new Date(Date.now() - index * 60 * 60 * 1000),
  }));
}
