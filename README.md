# Autorithm - Premium Automation Marketplace

Autorithm is a full-stack Next.js application that serves as a marketplace for pre-built automation workflows designed for n8n and Make.com platforms. The platform allows users to browse, purchase, and implement production-ready automation systems for various use cases including CRM, e-commerce, SaaS operations, marketing, and AI workflows.

## Features

- 🛍️ **Product Marketplace**: Browse and purchase pre-built automation workflows
- 🔐 **User Authentication**: Complete auth system with JWT & NextAuth.js
- 🎨 **Modern UI**: Built with Tailwind CSS and Headless UI components
- 🔍 **Advanced Filtering**: Filter products by tool (n8n/Make), category, and price range
- 📱 **Responsive Design**: Fully responsive across all devices
- 🗄️ **MongoDB Integration**: Scalable database solution for products and users
- 🔒 **Admin Dashboard**: Protected routes for product management
- 📄 **Dynamic Routing**: App Router with server and client components

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB
- **Authentication**: NextAuth.js + JWT
- **UI Components**: Headless UI, Heroicons
- **Password Hashing**: bcryptjs
- **Runtime**: React 19.2.3

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret_key
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## API Documentation

This application includes a full-stack API built with Next.js App Router. All API routes are located in the `app/api` directory.

### Authentication Endpoints

#### Register User

- **POST** `/api/auth/register`
- **Description**: Register a new user account
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```
- **Response** (201):
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2026-01-04T...",
      "updatedAt": "2026-01-04T..."
    }
  }
  ```

#### Login

- **POST** `/api/auth/login`
- **Description**: Login with email and password
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response** (200):
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token_here",
    "user": {
      "email": "user@example.com",
      "name": "John Doe",
      "isAdmin": false
    }
  }
  ```

#### Forgot Password

- **POST** `/api/auth/forgot-password`
- **Description**: Request a password reset token
- **Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response** (200):
  ```json
  {
    "message": "If email exists, password reset link has been sent",
    "resetToken": "jwt_reset_token"
  }
  ```

#### Reset Password

- **POST** `/api/auth/reset-password`
- **Description**: Reset password using the token from forgot-password
- **Body**:
  ```json
  {
    "token": "jwt_reset_token",
    "newPassword": "newpassword123"
  }
  ```
- **Response** (200):
  ```json
  {
    "message": "Password reset successfully"
  }
  ```

#### NextAuth

- **GET/POST** `/api/auth/[...nextauth]`
- **Description**: NextAuth.js authentication endpoints for session management
- **Includes**: Sign in, sign out, session handling, JWT callbacks

---

### Product Endpoints

#### Get All Products

- **GET** `/api/products`
- **Description**: Retrieve a list of all products with optional filters
- **Query Parameters**:
  - `category` (optional): Filter by category
  - `tool` (optional): Filter by tool (n8n or Make)
  - `minPrice` (optional): Minimum price filter
  - `maxPrice` (optional): Maximum price filter
  - `search` (optional): Search in name and description
  - `limit` (optional, default: 50): Number of results per page
  - `page` (optional, default: 1): Page number
- **Example**: `/api/products?category=automation&tool=n8n&page=1&limit=10`
- **Response** (200):
  ```json
  {
    "products": [
      {
        "id": 1,
        "name": "Product Name",
        "description": "Product description",
        "tool": "n8n",
        "category": "automation",
        "price": 49.99,
        "slug": "product-name",
        "stock": 100,
        "createdAt": "2026-01-04T...",
        "updatedAt": "2026-01-04T..."
      }
    ],
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "skip": 0
  }
  ```

#### Create Product

- **POST** `/api/products`
- **Description**: Create a new product
- **Body**:
  ```json
  {
    "name": "New Product",
    "description": "Product description",
    "price": 49.99,
    "category": "automation",
    "stock": 100
  }
  ```
- **Response** (201):
  ```json
  {
    "message": "Product created successfully",
    "product": {
      "name": "New Product",
      "description": "Product description",
      "price": 49.99,
      "category": "automation",
      "stock": 100,
      "createdAt": "2026-01-04T...",
      "updatedAt": "2026-01-04T..."
    }
  }
  ```

#### Get Single Product

- **GET** `/api/products/[slug]`
- **Description**: Get a single product by its slug
- **Example**: `/api/products/my-product-name`
- **Response** (200):
  ```json
  {
    "id": 1,
    "name": "Product Name",
    "description": "Product description",
    "tool": "n8n",
    "category": "automation",
    "price": 49.99,
    "slug": "product-name",
    "stock": 100,
    "createdAt": "2026-01-04T...",
    "updatedAt": "2026-01-04T..."
  }
  ```

#### Update Product (Admin Only)

- **PUT** `/api/products/[slug]`
- **Description**: Update a product by its slug (requires admin authentication)
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Body**: (any fields to update)
  ```json
  {
    "name": "Updated Product Name",
    "price": 59.99,
    "stock": 150
  }
  ```
- **Response** (200):
  ```json
  {
    "message": "Product updated successfully",
    "product": {
      /* updated product */
    }
  }
  ```

#### Delete Product (Admin Only)

- **DELETE** `/api/products/[slug]`
- **Description**: Delete a product by its slug (requires admin authentication)
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response** (200):
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```

---

### Helper Endpoint

#### Hello World

- **GET** `/api/hello`
- **Description**: Simple test endpoint
- **Response** (200):
  ```json
  {
    "name": "John Doe"
  }
  ```

---

### Authentication & Authorization

#### JWT Token

Most protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

You receive this token when you login via `/api/auth/login`.

#### Admin Access

Some endpoints (Update Product, Delete Product) require admin privileges. The user must have `isAdmin: true` in their database record.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
