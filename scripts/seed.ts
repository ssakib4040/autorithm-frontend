import chalk from "chalk";

import { getDb } from "../lib/mongodb";
import { getUsers } from "./data/users";
import { getAllProducts } from "./data/products";
import { getAllPurchases } from "./data/purchases";
import { getAllContacts } from "./data/contacts";
import { getAllActivities } from "./data/activities";

/**
 * Database seeding script
 * Run with: yarn seed or npm run seed
 *
 * Order matters:
 * 1. Users (needed for purchase and activity references)
 * 2. Products
 * 3. Purchases (references users and products)
 * 4. Contacts (references users)
 * 5. Activities (references users and resources)
 */

async function seedUsers() {
  const db = await getDb();

  console.log(chalk.yellow("\n📝 Seeding Users..."));
  const collection = db.collection("users");

  await collection.deleteMany({});
  console.log(chalk.gray("  ✓ Cleared existing users"));

  const users = await getUsers();
  const result = await collection.insertMany(users);
  console.log(chalk.green(`  ✓ Inserted ${result.insertedCount} users`));
}

async function seedProducts() {
  const db = await getDb();

  console.log(chalk.yellow("\n📦 Seeding Products..."));
  const collection = db.collection("products");

  await collection.deleteMany({});
  console.log(chalk.gray("  ✓ Cleared existing products"));

  const products = await getAllProducts();
  const result = await collection.insertMany(products);
  console.log(chalk.green(`  ✓ Inserted ${result.insertedCount} products`));
}

async function seedPurchases() {
  const db = await getDb();

  console.log(chalk.yellow("\n💰 Seeding Purchases..."));
  const collection = db.collection("purchases");

  await collection.deleteMany({});
  console.log(chalk.gray("  ✓ Cleared existing purchases"));

  const purchases = await getAllPurchases();
  const result = await collection.insertMany(purchases);
  console.log(chalk.green(`  ✓ Inserted ${result.insertedCount} purchases`));
}

async function seedContacts() {
  const db = await getDb();

  console.log(chalk.yellow("\n📧 Seeding Contacts..."));
  const collection = db.collection("contacts");

  await collection.deleteMany({});
  console.log(chalk.gray("  ✓ Cleared existing contacts"));

  const contacts = await getAllContacts();
  const result = await collection.insertMany(contacts);
  console.log(chalk.green(`  ✓ Inserted ${result.insertedCount} contacts`));
}

async function seedActivities() {
  const db = await getDb();

  console.log(chalk.yellow("\n📊 Seeding Activities..."));
  const collection = db.collection("activities");

  await collection.deleteMany({});
  console.log(chalk.gray("  ✓ Cleared existing activities"));

  const activities = await getAllActivities();
  const result = await collection.insertMany(activities);
  console.log(chalk.green(`  ✓ Inserted ${result.insertedCount} activities`));
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

    // Seed in correct order (users first for foreign key references)
    await seedUsers();
    await seedProducts();
    await seedPurchases();
    await seedContacts();
    await seedActivities();

    console.log(chalk.gray("\n" + "━".repeat(50)));
    console.log(chalk.green.bold("✅ Seed completed successfully!\n"));
    process.exit(0);
  } catch (error) {
    console.log(chalk.gray("\n" + "━".repeat(50)));
    console.error(chalk.red("❌ Seed failed:"), error);
    process.exit(1);
  }
}

seed();
