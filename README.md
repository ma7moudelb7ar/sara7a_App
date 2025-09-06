# 💬 Sara7a App - Anonymous Messaging Platform
## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Security Features](#security-features)
- [Contributing](#contributing)
- [License](#license)
## 🎯 Overview

Sara7a App is a secure **anonymous messaging platform** that allows users to send and receive messages without revealing their identity.  
Built with modern web technologies, it features **robust authentication**, security measures, and a clean API design.  

### 🔑 Key Highlights
- 🔐 Secure authentication with **JWT** and **Google OAuth2**
- 📧 **Email verification** and **password recovery**
- 🛡️ Advanced security features (**rate limiting**, **encryption**, etc.)
- 📱 **RESTful API** ready for mobile and web clients
- 🗄️ **MongoDB** with **Mongoose ODM**
- ⚡ Real-time **scheduled cleanup jobs**
- 
## ✨ Features

### 👤 User Management
- User registration with profile image upload  
- Email verification system  
- Login with email/password or Google OAuth2  
- Password update and recovery with OTP  
- Profile management  
- Account freeze/unfreeze functionality  

### 💌 Messaging System
- Send anonymous messages to users  
- Retrieve received messages  
- Individual message viewing  
- Message validation and filtering  

### 🔒 Security & Auth
- JWT access and refresh tokens  
- Token blacklisting for logout  
- Password hashing with bcrypt  
- Phone number encryption  
- Rate limiting (3 requests per minute)  
- CORS protection  
- Helmet security headers  

### 📧 Email Services
- Email verification  
- Password recovery with OTP  
- Event-driven email system  

### 🧹 Background Jobs
- Automatic cleanup of expired tokens  
- Verification code expiration handling  
- Scheduled maintenance tasks

## 🛠️ Tech Stack

| Category       | Technology |
|----------------|------------|
| **Runtime**    | Node.js 22.15.0 |
| **Framework**  | Express.js 5.1.0 |
| **Database**   | MongoDB with Mongoose 8.16.4 |
| **Authentication** | JWT + Google OAuth2 |
| **Security**   | bcrypt, helmet, cors, crypto-js |
| **Validation** | Joi 17.13.3 |
| **File Upload** | Multer 2.0.2 |
| **Email**      | Nodemailer 7.0.5 |
| **Job Scheduling** | node-cron 4.2.1 |
| **Rate Limiting** | express-rate-limit 8.1.0 |


## 🚀 Installation

1. Install Prerequisites: Node.js 22.15.0 or higher, MongoDB database, Gmail account for email services  
2. Clone the repository: `git clone https://github.com/ma7moudelb7ar/sara7a_App.git && cd sara7a_App`  
3. Install dependencies: `npm install`  
4. Create environment file: `mkdir -p src/config && touch src/config/.env`  
5. Add Environment Variables: افتح ملف `.env` اللي جوه `src/config/` وضيف القيم المطلوبة (هتلاقيها في قسم Environment Variables).  
6. Start the application (Development mode): `npm run dev`  
7. Start the application (Production mode): `npm start`  
8. Access the server: التطبيق هيشتغل على البورت اللي إنت محدده في `.env` (مثال: http://localhost:5000).  

## 🔧 Environment Variables

Create a `.env` file in `src/config/` with the following variables:

# Server Configuration
PORT=3000
URL_FRONT=http://localhost:3000

# Database
DB_URL=mongodb://localhost:27017/sara7a_app

# JWT Signatures
ACCESS_USER=your_user_access_secret
ACCESS_ADMIN=your_admin_access_secret
ACCESS_USER_REFRESH=your_user_refresh_secret
ACCESS_ADMIN_REFRESH=your_admin_refresh_secret
SIGNATURE_TOKEN=your_email_signature_secret

# Bearer Prefixes
BEARER_USER=Bearer_User
BEARER_ADMIN=Bearer_Admin

# Encryption
SALT_ROUND=12
SECRET_KEY_PHONE=your_phone_encryption_key

# Email Configuration
EMAIL=your_email@gmail.com
PASSWORD=your_app_password
EMAIL_TEST=test@example.com

# Google OAuth2
WEB_CLIENT_ID=your_google_client_id

## 📧 Gmail Configuration

To enable email services, follow these steps:

1. Enable **2-Factor Authentication** on your Gmail account  
2. Generate an **App Password** from your Google account security settings  
3. Use the generated **App Password** in the `PASSWORD` field inside your `.env` file

## 📚 API Documentation

## 🚀 Base URL
http://localhost:3000

## 🔐 Authentication
Most endpoints require authentication. Use **JWT Token** in the request header:
Authorization: Bearer_User YOUR_JWT_TOKEN

## 👤 User Endpoints
### Register User
**POST** `/users/signup`  
Content-Type: multipart/form-data  
Example body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "cpassword": "SecurePass123!",
  "age": 25,
  "gender": "male",
  "phone": "01234567890"
}

### Login
**POST** `/users/signin`  
Content-Type: application/json  
Example body:
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

### Get Profile
**GET** `/users/getProfile`  
Requires **JWT Token** in header.

### Logout
**POST** `/users/logOut`  
Requires **JWT Token** in header.

## 💌 Message Endpoints
### Send Anonymous Message
**POST** `/message/sendMessage`  
Content-Type: application/json  
Example body:
{
  "userId": "USER_OBJECT_ID",
  "content": "Your anonymous message here"
}

### Get Received Messages
**GET** `/message/getMessage`  
Requires **JWT Token** in header.

### Get Single Message
**GET** `/message/getOneMessage/:messageId`  
Requires **JWT Token** in header.

## 📱 Response Format
All responses follow this structure:
{
  "message": "Success message",
  "data": { ... },
  "error": "Error message (if any)"
}

## 🧪 API Testing (Postman)
You can test all endpoints using Postman collection:  
👉 [Postman Documentation](https://documenter.getpostman.com/view/45502181/2sB34kEJy5)

## 📁 Project Structure

```bash
sara7a_App/
├── index.js                    # Application entry point
├── package.json                # Dependencies and scripts
├── src/
│   ├── app.controller.js       # Main app configuration
│   ├── config/
│   │   └── .env                # Environment variables
│   ├── DB/
│   │   ├── connectionDB.js     # Database connection
│   │   └── models/             # Mongoose models
│   │       ├── usermodel.js
│   │       ├── message.model.js
│   │       ├── BlackListedTokens.js
│   │       └── RevokeTokenModel.js
│   ├── middleware/             # Express middlewares
│   │   ├── authentication.js
│   │   ├── authorization.js
│   │   ├── validation.js
│   │   ├── multer.js
│   │   └── GlobalError.js
│   ├── modules/                # Feature modules
│   │   ├── users/
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   └── user.validation.js
│   │   └── messages/
│   │       ├── message.controller.js
│   │       ├── message.service.js
│   │       └── message.validation.js
│   ├── service/                # External services
│   │   └── sendEmail.js
│   ├── utils/                  # Utility functions
│   │   ├── security/           # Security utilities
│   │   ├── rules/              #  rules General
│   │   └── email/              # Email utilities
│   └── jobs/                   # Scheduled jobs
│       └── cleanupJob.js
└── uploads/                    # File uploads directory

## 🔒 Security Features

### 🛡️ Authentication & Authorization
- JWT-based authentication with access and refresh tokens  
- Role-based access control (User/Admin)  
- Token blacklisting for secure logout  
- Google OAuth2 integration  

### 🔐 Data Protection
- Password hashing with bcrypt (configurable salt rounds)  
- Phone number encryption with AES  
- Email verification required for account activation  
- OTP-based password recovery  

### 🚧 Request Security
- Rate limiting (3 requests per minute)  
- CORS configuration  
- Helmet security headers  
- Request validation with Joi  
- File upload restrictions  

### 🧹 Maintenance
- Automatic cleanup of expired tokens and codes  
- Scheduled database maintenance  
- Account freeze/unfreeze functionality  
## 🎨 Frontend Integration

This API is designed to work with any frontend framework. Recommended stacks:

### 📱 Mobile Apps
- **React Native** - Cross-platform mobile development  
- **Flutter** - Google's UI toolkit  

### 💻 Web Applications
- **React.js** - Component-based UI library  
- **Vue.js** - Progressive JavaScript framework  
- **Angular** - Full-featured framework  

---

### 🔗 Sample Frontend Integration

#### Standard login example
```javascript
const standardLogin = async (email, password) => {
  const response = await fetch('/users/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return await response.json();
};
### Google login integration example (React)
import { GoogleLogin } from '@react-oauth/google';

const handleGoogleSuccess = async (credentialResponse) => {
  try {
    const response = await fetch('/users/loginWithGmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        idToken: credentialResponse.credential 
      })
    });
    
    const data = await response.json();
    // Store tokens and redirect user
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
  } catch (error) {
    console.error('Google login error:', error);
  }
};
### Send anonymous message example
const sendMessage = async (userId, content) => {
  const response = await fetch('/message/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, content })
  });
  return await response.json();
};
## 🐳 Docker Support (Optional)

You can containerize this application using Docker.

### Create a Dockerfile
```dockerfile
FROM node:22.15.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
## 📊 Performance Monitoring

Recommended tools for monitoring and testing the application:

- **PM2** - Process manager for production  
- **MongoDB Compass** - Database GUI  
- **Postman** - API testing  

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository  
2. **Create** a feature branch  
   ```bash
git checkout -b feature/amazing-feature
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📋 Development Guidelines

Follow the existing code structure
Add proper error handling
Include input validation
Write clear commit messages
Update documentation when needed

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

** Ma7moud Elb7ar**  

## 👨‍💻 Author

**Mahmoud El-Bahar**  

GitHub: [ma7moudelb7ar](https://github.com/ma7moudelb7ar)  
Facebook: [ma7moudelb7ar](https://www.facebook.com/elbhar12)  
Instagram: [ma7moudelb7ar](https://www.instagram.com/ma7moudelb7ar/)  
LinkedIn: [ma7moudelb7ar](https://www.linkedin.com/in/mahmoud-elbhar-61b534328/)  
Gmail: [ma7moudelb7ar](mailto:ma7moudelb7ar@gmail.com)

## 🙏 Acknowledgments

- **Express.js team** for the amazing framework  
- **MongoDB team** for the robust database  
- **All contributors and users** of this project




