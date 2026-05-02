# 3D E-Commerce Platform

A premium, interactive full-stack 3D e-commerce web application built with React, Vite, React Three Fiber, and a Node.js/Express backend with MongoDB. 

This project features a stunning glassmorphic UI, dynamic 3D rendering of products, and a complete checkout and user authentication flow.

## 🌟 Features

- **Immersive 3D Visuals:** Interactive procedural 3D tech products using React Three Fiber.
- **Premium UI/UX:** Glassmorphic dark-mode design with smooth animations using Framer Motion.
- **Full-Stack E-Commerce:** 
  - Dynamic product listing and detailed product views.
  - Complete shopping cart functionality.
  - Secure user authentication (Login/Register).
  - Admin controls for adding/deleting products.
- **Backend:** Node.js server with Express and MongoDB (Mongoose).
- **Responsive Design:** Fully responsive layout for all devices.

## 🚀 Technologies Used

**Frontend:**
- React (v19)
- Vite
- React Three Fiber / Drei (3D Rendering)
- Framer Motion (Animations)
- Zustand (State Management)
- React Router DOM
- Lucide React (Icons)

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & bcryptjs for Authentication
- CORS & dotenv

## 📁 Project Structure

```
├── backend/               # Node.js/Express Server
│   ├── middleware/        # Auth & validation middlewares
│   ├── models/            # Mongoose schemas (Product, User)
│   ├── routes/            # API endpoints
│   ├── server.js          # Entry point for backend
│   └── seed.js            # Database seeding script
├── src/                   # React Frontend
│   ├── components/        # UI & 3D Canvas components
│   ├── pages/             # Route pages (Home, Product, Auth)
│   ├── store/             # Zustand state management
│   ├── App.jsx            # Main app component
│   └── index.css          # Global styles & glassmorphism
```

## 🛠️ Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed and running locally (or a MongoDB Atlas connection string)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd project3
   ```

2. **Setup Frontend**
   ```bash
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Variables**
   Create a `.env` file in the `backend/` directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce3d
   JWT_SECRET=your_jwt_secret_key
   ```

### Running the Application

You will need two separate terminal windows.

**Terminal 1: Start Backend**
```bash
cd backend
npm start
```

**Terminal 2: Start Frontend**
```bash
# In the root project directory
npm run dev
```

### Seeding the Database (Optional)
To populate the database with initial products, run:
```bash
cd backend
npm run seed
```

## 📄 License
This project is licensed under the MIT License.
