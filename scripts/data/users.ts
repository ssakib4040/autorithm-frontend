import bcrypt from "bcryptjs";

// Export async function to properly hash passwords
export async function getUsers() {
  const hashedPassword1 = await bcrypt.hash("password", 10);
  const hashedPassword2 = await bcrypt.hash("password", 10);

  return [
    {
      email: "ssakib6060@gmail.com",
      password: hashedPassword1,
      name: "Sadman Sakib",
      isAdmin: true,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: "john@example.com",
      password: hashedPassword2,
      name: "John Doe",
      isAdmin: false,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}
