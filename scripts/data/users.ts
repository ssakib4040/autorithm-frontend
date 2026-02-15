import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

export const users = [
  {
    userId: uuidv4(),
    email: "admin@autorithm.com",
    password: await bcrypt.hash("password", 10),
    name: "Administrator",
    status: "active",
    isAdmin: true,
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: uuidv4(),
    email: "user1@gmail.com",
    password: await bcrypt.hash("password", 10),
    name: "John Doe",
    status: "active",
    isAdmin: false,
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: uuidv4(),
    email: "user2@gmail.com",
    password: await bcrypt.hash("password", 10),
    name: "Jane Smith",
    status: "active",
    isAdmin: false,
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Export async function to properly hash passwords
export async function getUsers() {
  // Generate 10 additional users using faker
  for (let i = 0; i < 10; i++) {
    users.push({
      userId: uuidv4(),
      email: faker.internet.email().toLowerCase(),
      password: await bcrypt.hash("password", 10),
      name: faker.person.fullName(),
      status: faker.helpers.arrayElement(["active", "suspended"]),
      isAdmin: false,
      isEmailVerified: faker.datatype.boolean(),
      createdAt: faker.date.past({ years: 1 }),
      updatedAt: new Date(),
    });
  }

  return users;
}
