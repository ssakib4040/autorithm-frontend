import db from "../lib/mongodb";
import { allProducts } from "../data/products";
import bcrypt from "bcryptjs";
import chalk from "chalk";

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

    const users = [
      {
        email: "ssakib6060@gmail.com",
        password: await bcrypt.hash("password", 10),
        name: "Sadman Sakib",
        isAdmin: true,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "john@example.com",
        password: await bcrypt.hash("password", 10),
        name: "John Doe",
        isAdmin: false,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

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
