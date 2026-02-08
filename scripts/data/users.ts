import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// Export async function to properly hash passwords
export async function getUsers() {
  const hashedPassword1 = await bcrypt.hash("password", 10);
  const hashedPassword2 = await bcrypt.hash("password", 10);

  return [
    {
      userId: uuidv4(),
      email: "ssakib6060@gmail.com",
      password: hashedPassword1,
      name: "Sadman Sakib",
      isAdmin: true,
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: uuidv4(),
      email: "john@example.com",
      password: hashedPassword2,
      name: "John Doe",
      isAdmin: false,
      isEmailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}
