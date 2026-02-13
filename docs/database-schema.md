# MongoDB Database Schema (Seed Data)

This document captures the MongoDB schema for the application. MongoDB itself is schemaless, so these fields are conventions rather than enforced rules.

## Collections

### users

Fields:

- userId: string (UUID)
- email: string
- password: string (bcrypt hash)
- name: string
- isAdmin: boolean
- isEmailVerified: boolean
- createdAt: Date
- updatedAt: Date

Seed notes:

- Two fixed users are created, then 50 faker-generated users are appended.

### products

Fields:

- id: number
- name: string
- description: string
- tool: "n8n" | "Make"
- category: string
- price: number
- slug: string
- discounts: Array<{
  - percentage: number
  - reason: string
  - startDate: Date
  - expiresAt: Date
    }>
- keyFeatures: string[]
- howItWorks: Array<{
  - title: string
  - description: string
    }>
- technicalDetails: {
  - complexity: string
  - setupTime: string
  - apis: string[]
  - requirements: string[]
    }
- whatsIncluded: string[]
- status: "active" | "inactive" | "draft"
- createdBy: string (UUID from users.userId)

Seed notes:

- createdBy is assigned in getAllProducts() using a rotating user list.
- Some products share the same slug but different tool values (e.g., n8n vs Make variants).

### purchases

Fields:

- id: number
- productId: number
- discountApplied?: {
  - percentage: number
  - reason: string
  - discountedPrice: number
    }
- originalPrice: number
- finalPrice: number
- purchasedBy: string (UUID from users.userId)
- purchaseDate: Date

Seed notes:

- Each user can purchase a given product at most once.
- 20% chance a discount is applied if the product has discounts.

### contacts

Fields:

- name: string
- email: string
- userId: string (UUID from users.userId)
- subject: string
- message: string
- status: "new" | "in-progress" | "resolved"
- createdAt: Date
- updatedAt: Date

Seed notes:

- One contact per user. Admin contacts are marked resolved and use admin-specific messaging.

### activities

Fields:

- id: string (UUID)
- userId: string (UUID from users.userId)
- action: string
- description: string
- metadata?: Record<string, any>
- ipAddress?: string
- userAgent?: string
- resourceType?: "product" | "purchase" | "contact" | "user" | "settings"
- resourceId?: string | number
- createdAt: Date

Seed notes:

- Seed data contains a mix of login, register, product_view, purchase, and contact_create actions.

## Relationships

- products.createdBy -> users.userId
- purchases.productId -> products.id
- purchases.purchasedBy -> users.userId
- contacts.userId -> users.userId
- activities.userId -> users.userId
- activities.resourceId -> products.id or purchases.id (when resourceType indicates)

## Common Access Patterns (Seed Data)

- Users are the root entity for purchases, contacts, and activities.
- Products are referenced by numeric id in purchases and activities.
- Product variants may share slug values (distinguished by tool).
