import db from "../lib/mongodb";
import chalk from "chalk";

import { users } from "./data/users";
import { allProducts } from "./data/products";

async function seed() {
  try {
    if (process.env.NODE_ENV === "production") {
      console.log(
        chalk.red("Seeding is not allowed in production environment.")
      );
      return;
    }

    console.log(chalk.cyan("Starting database seed..."));
    console.log(chalk.gray("━".repeat(50)));

    // Seed products
    console.log(chalk.yellow("Seeding Products..."));
    const productsCollection = db.collection("products");
    await productsCollection.deleteMany({});
    console.log(chalk.gray("✓ Cleared existing products"));
    const productResult = await productsCollection.insertMany(allProducts);
    console.log(
      chalk.green(`✓ Inserted ${productResult.insertedCount} products`)
    );

    // Seed users
    console.log(chalk.yellow("Seeding Users..."));
    const usersCollection = db.collection("users");
    await usersCollection.deleteMany({});
    console.log(chalk.gray("✓ Cleared existing users"));

    const userResult = await usersCollection.insertMany(users);
    console.log(chalk.green(`✓ Inserted ${userResult.insertedCount} users`));

    console.log(chalk.gray("━".repeat(50)));
    console.log(chalk.green.bold("Seed completed successfully!"));
    process.exit(0);
  } catch (error) {
    console.log(chalk.gray("━".repeat(50)));
    console.error(chalk.red("Seed failed:"), error);
    process.exit(1);
  }
}

seed();
