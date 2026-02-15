import chalk from "chalk";

import { connectMongoose } from "../lib/mongoose";
import { Activity, Contact, Product, Purchase, User } from "../models";

import { getUsers } from "./data/users";
import { getAllProducts } from "./data/products";
import { getAllPurchases } from "./data/purchases";
import { getAllContacts } from "./data/contacts";
import { getAllActivities } from "./data/activities";

type SeedUserRef = { userId?: string };
type SeedUserContactRef = { userId?: string; name: string; email: string };
type SeedProductRef = {
  id: number;
  price: number;
  discounts?: Array<{ percentage: number; reason: string }>;
};

async function seedUsers(): Promise<SeedUserContactRef[]> {
  logSection("📝 Seeding Users...");

  await User.deleteMany({});
  logCleared("users");

  const users = await getUsers();
  const createdUsers = await User.insertMany(users);
  logInserted("users", createdUsers.length);

  return createdUsers.map(({ userId, name, email }) => ({
    userId,
    name,
    email,
  }));
}

async function seedProducts(users: SeedUserRef[]): Promise<SeedProductRef[]> {
  logSection("📦 Seeding Products...");

  await Product.deleteMany({});
  logCleared("products");

  const products = await getAllProducts(users);
  const createdProducts = await Product.insertMany(products);
  logInserted("products", createdProducts.length);

  return createdProducts.map(({ id, price, discounts }) => ({
    id,
    price,
    discounts,
  }));
}

async function seedPurchases(users: SeedUserRef[], products: SeedProductRef[]) {
  logSection("💰 Seeding Purchases...");

  await Purchase.deleteMany({});
  logCleared("purchases");

  const purchases = await getAllPurchases(users, products);
  const createdPurchases = await Purchase.insertMany(purchases);
  logInserted("purchases", createdPurchases.length);
}

async function seedContacts(users: SeedUserContactRef[]) {
  logSection("📧 Seeding Contacts...");

  await Contact.deleteMany({});
  logCleared("contacts");

  const contacts = await getAllContacts(users);
  const createdContacts = await Contact.insertMany(contacts);
  logInserted("contacts", createdContacts.length);
}

async function seedActivities(users: SeedUserRef[]) {
  logSection("📊 Seeding Activities...");

  await Activity.deleteMany({});
  logCleared("activities");

  const activities = await getAllActivities(users);
  const createdActivities = await Activity.insertMany(activities);
  logInserted("activities", createdActivities.length);
}

async function seed() {
  try {
    // Safety check for production
    if (process.env.NODE_ENV === "production") {
      console.log(
        chalk.red("❌ Seeding is not allowed in production environment."),
      );
      return;
    }

    console.log(chalk.cyan.bold("\n🌱 Starting Database Seed"));
    console.log(chalk.gray("━".repeat(50)));

    await connectMongoose();

    // Seed in correct order (users first for foreign key references)
    const users = await seedUsers();
    const products = await seedProducts(users);
    await seedPurchases(users, products);
    await seedContacts(users);
    await seedActivities(users);

    console.log(chalk.green.bold("✅ Seed completed successfully!\n"));
    process.exit(0);
  } catch (error) {
    console.error(chalk.red("❌ Seed failed:"), error);
    process.exit(1);
  }
}

seed();

const logSection = (title: string) => {
  console.log(chalk.yellow(`\n${title}`));
};

const logCleared = (label: string) => {
  console.log(chalk.gray(`  ✓ Cleared existing ${label}`));
};

const logInserted = (label: string, count: number) => {
  console.log(chalk.green(`  ✓ Inserted ${count} ${label}`));
};
