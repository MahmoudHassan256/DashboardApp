# 🛠️ React Admin Dashboard (Role-Based Access)

A lightweight admin dashboard built with **React + TypeScript**, styled using **TailwindCSS + shadcn/ui**, featuring **role-based access control**, persistent state via `localStorage`, and a clean modular structure.

---

## 🚀 Features

- 🔐 **Login/Logout** with session tracking
- 👤 **Users Page** – add, view, and delete users
- 🛡 **Role-based Access** – `admin` and `viewer` roles
- 📜 **Logs Page** – view system actions (admin-only)
- 🧠 **State Persistence** – users and logs stored in `localStorage`
- 💄 **Modern UI** – built with shadcn/ui components + TailwindCSS
- 🧱 **Modular Architecture** – easy to extend or refactor

---

## 🖥️ Pages

| Route             | Description                          | Access         |
|------------------|--------------------------------------|----------------|
| `/login`          | Login form (mocked auth)             | Public         |
| `/dashboard`      | Main dashboard layout                | Logged-in only |
| `/dashboard/users`| Manage user accounts                 | All roles      |
| `/dashboard/logs` | View action logs                     | Admin only     |

---

## 🧑‍💻 Tech Stack

- **React + TypeScript**
- **React Router DOM**
- **TailwindCSS**
- **shadcn/ui**
- **localStorage** (for persistence)

---

## 📦 Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/react-admin-dashboard.git
cd react-admin-dashboard

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
