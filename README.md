# NexTech 3D Store 🚀

A futuristic, interactive full-stack e-commerce application featuring 3D product visualization, a glassmorphism user interface, and secure user authentication.

## ✨ Features

*   **Interactive 3D Environments:** Utilizes `React Three Fiber` and `Three.js` for an immersive landing page with interactive planets and a 3D tech model.
*   **3D Product Viewer:** Users can view, rotate, and interact with 3D product models on the product details page.
*   **Modern UI/UX:** Built with a stunning Glassmorphism aesthetic, gradient text, and smooth animations powered by `Framer Motion`.
*   **Complete Authentication:** Secure user registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.
*   **Dynamic Cart System:** Real-time shopping cart management using `Zustand` for global state.
*   **Admin Capabilities:** Integrated modal to seamlessly add or delete products directly from the UI.
*   **Responsive Design:** Fully optimized for both desktop and mobile experiences.

## 🛠️ Tech Stack

**Frontend:**
*   React (Vite)
*   React Three Fiber / Drei / Three.js (3D Graphics)
*   Zustand (State Management)
*   Framer Motion (Animations)
*   Lucide React (Icons)
*   React Router (Navigation)

**Backend:**
*   Node.js & Express.js
*   MongoDB & Mongoose
*   JSON Web Tokens (JWT)
*   Bcrypt.js

## ⚙️ Local Installation

Follow these steps to run the project locally on your machine.

**1. Clone the repository**
\`\`\`bash
git clone https://github.com/keyur2903/nextech-3d-store.git
cd nextech-3d-store
\`\`\`

**2. Install Frontend Dependencies**
\`\`\`bash
# Assuming your frontend is in the root or a 'client' folder. Adjust path if necessary.
npm install
\`\`\`

**3. Install Backend Dependencies**
\`\`\`bash
# Assuming your backend is in a 'server' or 'backend' folder. Adjust path if necessary.
cd server
npm install
\`\`\`

**4. Set up Environment Variables**
Create a `.env` file in your backend/server directory and add the following:
\`\`\`env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
\`\`\`

**5. Run the Application**
You will need two terminal windows:

*Terminal 1 (Backend):*
\`\`\`bash
cd server
npm run dev # or node server.js
\`\`\`

*Terminal 2 (Frontend):*
\`\`\`bash
# In the frontend directory
npm run dev
\`\`\`

## 🧠 Development Note
This project was built to explore the integration of complex 3D web graphics within a standard MERN stack architecture, showcasing the ability to combine heavy frontend visual libraries with secure, data-driven backend logic.
