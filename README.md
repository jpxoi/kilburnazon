# Kilburnazon

Kilburnazon is a full-stack e-commerce simulation platform, featuring a modern web frontend, a robust Laravel backend, and a comprehensive SQL database schema. This monorepo is organized for easy local development and deployment.

## Project Structure

```txt
kilburnazon/
│
├── frontend/   # Next.js + Tailwind CSS web application
├── backend/    # Laravel 11 REST API
├── db/         # SQL schema and seed data
└── README.md   # (You are here)
```

---

## Frontend

- **Framework:** Next.js (React 19)
- **Styling:** Tailwind CSS
- **Location:** `frontend/`

### Setup (Frontend)

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env` and fill in required variables.
3. **Run in development:**

   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

4. **Production build:**

   ```bash
   npm run build
   npm run start
   ```

---

## Backend

- **Framework:** Laravel 11 (PHP 8.2+)
- **Location:** `backend/`

### Setup (PHP Backend)

1. **Install dependencies:**

   ```bash
   cd backend
   composer install
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env` and fill in required variables.
3. **Run in development:**

   ```bash
   php artisan serve
   ```

   The API will be available at [http://localhost:8000](http://localhost:8000).

---

## Database

- **Schema:** Provided as `db/kilburnazon.sql`
- **Engine:** MySQL/MariaDB

### Setup (MySQL)

1. Create a new database (e.g., `kilburnazon_db`).
2. Import the schema and seed data:

   ```bash
   mysql -u <user> -p <database> < db/kilburnazon.sql
   ```

---

## Development Notes

- The frontend is configured to communicate with the backend at `localhost:8000`.
- Make sure both servers are running for full functionality.
- Adjust CORS and environment variables as needed for your setup.

---

## Prerequisites

- **Frontend:** Node.js (LTS recommended)
- **Backend:** PHP 8.2+, Composer
- **Database:** MySQL or MariaDB

---

## License

MIT
