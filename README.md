# Guestara Backend  
**Menu & Services Management System**

A production-ready Node.js backend built to manage real-world service hierarchies, dynamic pricing strategies, and tax inheritance logic.  
This project focuses on **engineering design, data integrity, and scalable backend architecture**, rather than simple CRUD operations.

---

## 🚀 Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** PostgreSQL (Neon DB)  
- **ORM:** Prisma (PostgreSQL Adapter)  
- **Validation:** Zod  
- **Language:** JavaScript (ES6+)

---

## 🧠 Engineering Decisions

### Why PostgreSQL?
The domain requires strong relational guarantees due to category hierarchies and tax inheritance.

- **Referential Integrity:** Items always reference valid categories.
- **Efficient Queries:** Category → Subcategory → Item relationships are resolved using optimized SQL JOINs.
- **Structured Schema:** Ideal for evolving pricing and tax rules.

---

### Tax Inheritance Logic
Tax is calculated dynamically instead of being duplicated across records.

**Fallback Order:**

Item → Subcategory → Category → Default (0%)

This approach:
- Prevents update anomalies
- Reduces redundant data
- Centralizes tax logic in the service layer

---

### Pricing Engine (Strategy Pattern)
The system supports multiple pricing models:
- Static
- Tiered
- Complimentary
- Discounted
- Dynamic

Pricing rules are stored in a `pricing_details` JSON column and processed using a strategy-based pricing engine.

**Benefits:**
- Flexible pricing definitions
- No schema bloat
- Easy extension for new pricing types

---

### Booking Conflict Handling
Time-based services prevent overlapping bookings using the condition:
(RequestedStart < ExistingEnd) AND (RequestedEnd > ExistingStart)
This ensures safe concurrency and prevents double-booking.

---

## 🛠️ Key Features

- **Recursive Category Hierarchy**  
  Supports infinite nesting via self-referencing `parentId`.

- **Soft Deletes**  
  Records are deactivated using `is_active` instead of being hard-deleted.

- **Availability Guard**  
  Services can only be booked on allowed operational days.

- **Strict Validation**  
  All API inputs are validated using Zod before reaching the database.

## 📺 Technical Walkthrough

[<img src="https://github.com/user-attachments/assets/7d2b0090-3470-46ac-b436-28a2fb1b7d54" width="100%" />](https://drive.google.com/file/d/1X3h5bmAyNFVvoFx9qzIyQJpVIVGcp0B8/view?usp=sharing)

> **👆 Click the image above** to watch the technical walkthrough. I dive deep into the schema design, the tax inheritance implementation, and the pricing engine logic.

## 📂 Project Structure
src/
├── config/        # Prisma & database configuration
├── controllers/  # Request handling
├── middlewares/  # Validation & error handling
├── routes/       # API definitions
├── services/     # Business logic (tax & pricing)
├── utils/        # Pricing engine helpers
├── validators/   # Zod schemas
└── index.js      # Application entry point

---

## 🚦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/dprateek996/guestara-backend.git
cd guestara-backend
npm install
2. Environment Setup

Create a .env file:
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
PORT=3000
3. Database Migration
npx prisma db push
4. Run the Server
npm run dev
