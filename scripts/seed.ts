import chalk from "chalk";

import { getDb } from "../lib/mongodb";
import { getUsers } from "./data/users";
import { allProducts } from "./data/products";
import { allPurchases } from "./data/purchases";
import { allContacts } from "./data/contacts";

/**
 * Database seeding script
 * Run with: yarn seed or npm run seed
 *
 * Order matters:
 * 1. Users (needed for purchase references)
 * 2. Products
 * 3. Purchases (references users and products)
 * 4. Contacts (independent, can be seeded anytime)
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

  const result = await collection.insertMany(allProducts);
  console.log(chalk.green(`  ✓ Inserted ${result.insertedCount} products`));
}

async function seedPurchases() {
  const db = await getDb();

  console.log(chalk.yellow("\n💰 Seeding Purchases..."));
  const collection = db.collection("purchases");

  await collection.deleteMany({});
  console.log(chalk.gray("  ✓ Cleared existing purchases"));

  // Get all users and assign purchases randomly
  const usersCollection = db.collection("users");
  const allUsers = await usersCollection.find({}).toArray();

  if (allUsers.length === 0) {
    console.log(chalk.red("  ✗ No users found. Skipping purchases."));
    return;
  }

  const purchasesWithUserIds = allPurchases.map((purchase) => ({
    ...purchase,
    purchasedBy: allUsers[Math.floor(Math.random() * allUsers.length)]._id,
  }));

  const result = await collection.insertMany(purchasesWithUserIds);
  console.log(chalk.green(`  ✓ Inserted ${result.insertedCount} purchases`));
}

async function seedContacts() {
  const db = await getDb();

  console.log(chalk.yellow("\n📧 Seeding Contacts..."));
  const collection = db.collection("contacts");

  await collection.deleteMany({});
  console.log(chalk.gray("  ✓ Cleared existing contacts"));

  const result = await collection.insertMany(allContacts);
  console.log(chalk.green(`  ✓ Inserted ${result.insertedCount} contacts`));
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
