
```markdown
# 🎓 Student Management System (JDC Portal)

An industrial-grade, full-stack Student Management System designed for scalable educational management. **JDC Portal** handles course administration, batch assignments, curriculum delivery, lesson recording management, and student enrollment tracking through a robust **4-Role Access Control System** (Admin, Teacher, Student, Guest).

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React 19, TypeScript, Vite 8
* **State Management:** Zustand 5
* **Routing:** React Router 7
* **Form Handling & Validation:** React Hook Form, Zod 4
* **Styling & Components:** Tailwind CSS v4, Base UI, Shadcn UI, Lucide Icons
* **HTTP Client:** Axios (With Centralized Bearer Interceptors)
* **Code Quality:** Oxlint

### Backend & Cloud
* **Core Framework:** Spring Boot 3.x (Java 25)
* **Security:** Spring Security (JWT-based Stateless Authentication & RBAC)
* **ORM & Database:** Spring Data JPA / Hibernate, MySQL 8
* **Object Storage:** Supabase Storage API (for avatars, course materials, and asset uploads)
* **Build Tool:** Apache Maven

---

## 🔐 Role-Based Access Control (RBAC)

The application enforces fine-grained permissions across 4 distinct user roles:

| Role | Access Scope |
| :--- | :--- |
| **Admin** | Full system administration, batch creation, course setup, global user management, database overrides. |
| **Teacher** | Assigned batch management (`/batches/user/{userId}`), lesson creation/editing, recording link uploads, and batch roster monitoring. |
| **Student** | Access to enrolled batch curriculum, lesson materials, video recordings, and individual enrollment status. |
| **Guest / Unauthenticated** | Public course directory, landing page, registration, and login endpoints. |

---

## 📂 Project Structure

```text
jdc-portal/
├── backend/
│   ├── src/main/java/com/jdc/portal/
│   │   ├── config/          # Spring Security, CORS, Supabase Client Config
│   │   ├── controller/      # REST API Controllers
│   │   ├── dto/             # Request & Response Data Transfer Objects
│   │   ├── exception/       # Global Controller Advice & Custom Exceptions
│   │   ├── model/           # JPA Entities (User, Batch, Lesson, Enrollment)
│   │   ├── repository/      # Spring Data JPA Repositories
│   │   └── service/         # Business Logic Layer
│   └── src/main/resources/
│       └── application.yml  # Database & Cloud Credentials
│
└── frontend/
    ├── src/
    │   ├── assets/          # Static Media & Fonts
    │   ├── components/      # Reusable UI Components
    │   ├── features/        # Feature Modules (batches, lessons, auth, admin)
    │   ├── lib/             # Axios Instances & Global Utilities
    │   ├── store/           # Zustand Auth & State Stores
    │   ├── types/           # Global TypeScript Interfaces
    │   └── App.tsx
    └── package.json

```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed locally:

* **Java Development Kit (JDK 25)**
* **Node.js** (v20+ recommended) & **npm**
* **MySQL Server** (v8.0+)
* A **Supabase Account** (for file bucket storage)

---

### 1. Database & Cloud Setup

#### MySQL Database

Create a database named `jdc_smd_db`:

```sql
CREATE DATABASE jdc_portal_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

```

#### Supabase Storage

1. Log into your Supabase Dashboard and create a new project.
2. Go to **Storage** and create a public bucket named `jdc-assets`.
3. Obtain your **Supabase Project URL** and **API Key / Secret Key** from Project Settings -> API.

---

### 2. Backend Installation (Spring Boot)

1. **Navigate to the backend directory:**
```bash
cd backend

```


2. **Configure Environment Properties:**
# ===============================
# Server Configuration
# ===============================
server.port=8080
# ===============================

# Database Configuration
# ===============================
spring.datasource.url=jdbc:mysql://localhost:3306/jdc_sms_db
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

# ===============================
# JPA / Hibernate Configuration
# ===============================
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# ===============================
# JWT Security Configuration
# ===============================
jwt.secret=YOUR_64_CHARACTER_LONG_SECURE_JWT_SECRET_KEY

```


3. **Build and Run:**
```bash
./mvnw clean install
./mvnw spring-boot:run

```


The backend API will start at `http://localhost:8080`.

---

### 3. Frontend Installation (React 19)

1. **Navigate to the frontend directory:**
```bash
cd ../frontend

```


2. **Configure Environment Variables:**
Create a `.env` file in the `frontend/` root:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

```


3. **Install Dependencies:**
```bash
npm install

```


4. **Start Vite Development Server:**
```bash
npm run dev

```

## 🧪 Testing & Code Quality

* **Frontend Linting (Oxlint):**
```bash
npm run lint

```


* **Frontend TypeScript Verification:**
```bash
npm run build

```



---

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```

```
