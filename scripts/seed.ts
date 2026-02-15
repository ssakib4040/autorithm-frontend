import chalk from "chalk";

import { connectMongoose } from "../lib/mongoose";
import { Activity, Contact, Product, Purchase, User } from "../models";
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
  console.log(chalk.yellow("\n📝 Seeding Users..."));

  await User.deleteMany({});
  console.log(chalk.gray("  ✓ Cleared existing users"));

  const users = await getUsers();
  const createdUsers = await User.insertMany(users);
  console.log(chalk.green(`  ✓ Inserted ${createdUsers.length} users`));

  return createdUsers;
}

async function seedProducts(users: Array<{ userId?: string }>) {
  console.log(chalk.yellow("\n📦 Seeding Products..."));

  await Product.deleteMany({});
  console.log(chalk.gray("  ✓ Cleared existing products"));

  const products = await getAllProducts(users);
  const createdProducts = await Product.insertMany(products);
  console.log(chalk.green(`  ✓ Inserted ${createdProducts.length} products`));

  return createdProducts;
}

async function seedPurchases(
  users: Array<{ userId?: string }>,
  products: Array<{ id: number; price: number }>,
) {
  console.log(chalk.yellow("\n💰 Seeding Purchases..."));

  await Purchase.deleteMany({});
  console.log(chalk.gray("  ✓ Cleared existing purchases"));

  const purchases = await getAllPurchases(users, products);
  const createdPurchases = await Purchase.insertMany(purchases);
  console.log(chalk.green(`  ✓ Inserted ${createdPurchases.length} purchases`));
}

async function seedContacts(
  users: Array<{ userId?: string; name: string; email: string }>,
) {
  console.log(chalk.yellow("\n📧 Seeding Contacts..."));

  await Contact.deleteMany({});
  console.log(chalk.gray("  ✓ Cleared existing contacts"));

  const contacts = await getAllContacts(users);
  const createdContacts = await Contact.insertMany(contacts);
  console.log(chalk.green(`  ✓ Inserted ${createdContacts.length} contacts`));
}

async function seedActivities(users: Array<{ userId?: string }>) {
  console.log(chalk.yellow("\n📊 Seeding Activities..."));

  await Activity.deleteMany({});
  console.log(chalk.gray("  ✓ Cleared existing activities"));

  const activities = await getAllActivities(users);
  const createdActivities = await Activity.insertMany(activities);
  console.log(
    chalk.green(`  ✓ Inserted ${createdActivities.length} activities`),
  );
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
