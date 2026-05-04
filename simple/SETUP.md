# CleverStore E-commerce Frontend

## Features Completed ✅

### 1. Authentication Pages
- ✅ Landing Page with multi-language support (EN, FR, RW)
- ✅ Login Page with forgot password link
- ✅ Register Page
- ✅ Forgot Password Page

### 2. Dashboard
- ✅ Sidebar with navigation (Users, Orders, Products, Shops, Notifications, Settings)
- ✅ TopBar with:
  - Notification icon with unread badge
  - Message icon
  - Dark/Light mode toggle
  - Logout button

### 3. Full CRUD Operations
- ✅ **Users**: Create, Read, Update, Delete
- ✅ **Orders**: Create, Read, Update, Delete
- ✅ **Products**: Create, Read, Update, Delete
- ✅ **Shops**: Create, Read, Update, Delete
- ✅ **Notifications**: View, Mark as read

### 4. Features
- ✅ Dark mode support (persists in localStorage)
- ✅ Multi-language landing page
- ✅ Real-time notification badge
- ✅ Responsive design
- ✅ Error handling with detailed messages

## Backend API Endpoints

### Users
- GET `/api/users/getAllUsers` - Get all users
- POST `/api/users/createUser` - Create user
- PUT `/api/users/updateUser/:id` - Update user
- DELETE `/api/users/deleteUser/:id` - Delete user

### Orders
- GET `/api/orders/getAllOrders` - Get all orders
- POST `/api/orders/createOrder` - Create order
- PUT `/api/orders/updateOrder/:id` - Update order
- DELETE `/api/orders/deleteOrder/:id` - Delete order

### Products
- GET `/api/products/getAllProducts` - Get all products
- POST `/api/products/createProduct` - Create product
- PUT `/api/products/updateProduct/:id` - Update product
- DELETE `/api/products/deleteProduct/:id` - Delete product

### Shops
- GET `/api/shops/getAllShops` - Get all shops
- POST `/api/shops/createShop` - Create shop
- PUT `/api/shops/updateShop/:id` - Update shop
- DELETE `/api/shops/deleteShop/:id` - Delete shop

### Notifications
- GET `/api/notifications/my` - Get my notifications
- PATCH `/api/notifications/:id/read` - Mark as read
- PATCH `/api/notifications/read-all` - Mark all as read

## Setup Instructions

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment**
Create `.env` file:
```
VITE_BACKEND_URL=http://localhost:5000
```

3. **Start backend server**
Make sure your backend is running on port 5000

4. **Start frontend**
```bash
npm run dev
```

5. **Login**
Use your backend credentials to login and access the dashboard

## Tech Stack
- React 19
- React Router DOM
- Tailwind CSS 4
- Axios
- Vite

## Dark Mode
Toggle dark mode using the moon/sun icon in the TopBar. Theme persists across sessions.

## Language Support
Landing page supports:
- English (EN)
- French (FR)
- Kinyarwanda (RW)

## Notes
- All API calls require authentication token
- Token is stored in localStorage after login
- Notification badge updates every 30 seconds
- All forms have validation and error handling
