# 💬 Sara7a App - Anonymous Messaging Platform

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Google%20OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google OAuth" />
  <img src="https://img.shields.io/badge/Nodemailer-0F1419?style=for-the-badge&logo=nodemailer&logoColor=white" alt="Nodemailer" />
  <img src="https://img.shields.io/badge/bcrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white" alt="bcrypt" />
  <img src="https://img.shields.io/badge/Joi-000000?style=for-the-badge&logo=joi&logoColor=white" alt="Joi" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/Made%20with-❤️-red.svg?style=for-the-badge" alt="Made with Love" />
</p>

<p align="center">
  A modern, secure anonymous messaging platform built with Node.js and Express.js
</p>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Security Features](#-security-features)
- [Frontend Integration](#-frontend-integration)
- [Docker Support](#-docker-support)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🎯 Overview

Sara7a App is a secure **anonymous messaging platform** that allows users to send and receive messages without revealing their identity. Built with modern web technologies, it features **robust authentication**, security measures, and a clean API design.

### 🔑 Key Highlights
- 🔐 Secure authentication with **JWT** and **Google OAuth2**
- 📧 **Email verification** and **password recovery**
- 🛡️ Advanced security features (**rate limiting**, **encryption**, etc.)
- 📱 **RESTful API** ready for mobile and web clients
- 🗄️ **MongoDB** with **Mongoose ODM**
- ⚡ Real-time **scheduled cleanup jobs**

---

## ✨ Features

### 👤 User Management
- User registration with profile image upload (up to 2 cover images)
- Email verification system
- **Standard Login** with email/password
- **Google OAuth2 Login** - Sign in with Gmail account
- Password update and recovery with OTP
- Profile management with encrypted phone numbers
- Account freeze/unfreeze functionality
- Social media authentication integration

### 💌 Messaging System
- Send anonymous messages to users
- Retrieve received messages
- Individual message viewing
- Message validation and filtering

### 🔒 Security & Auth
- **Dual Authentication System**: Standard login + Google OAuth2
- JWT access and refresh tokens with configurable expiration
- Token blacklisting for secure logout
- **Google ID Token Verification** for social login
- Password hashing with bcrypt (configurable salt rounds)
- Phone number encryption with AES-256
- Rate limiting (3 requests per minute)
- CORS protection with whitelist
- Helmet security headers
- **Provider-based user management** (system/google)

### 📧 Email Services
- Email verification
- Password recovery with OTP
- Event-driven email system

### 🧹 Background Jobs
- Automatic cleanup of expired tokens
- Verification code expiration handling
- Scheduled maintenance tasks

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js 22.15.0 |
| **Framework** | Express.js 5.1.0 |
| **Database** | MongoDB with Mongoose 8.16.4 |
| **Authentication** | JWT + Google OAuth2 |
| **Security** | bcrypt, helmet, cors, crypto-js |
| **Validation** | Joi 17.13.3 |
| **File Upload** | Multer 2.0.2 |
| **Email** | Nodemailer 7.0.5 |
| **Job Scheduling** | node-cron 4.2.1 |
| **Rate Limiting** | express-rate-limit 8.1.0 |

---

## 🚀 Installation

### Prerequisites
- Node.js 22.15.0 or higher
- MongoDB database
- Gmail account for email services

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ma7moudelb7ar/sara7a_App.git
   cd sara7a_App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   mkdir -p src/config
   touch src/config/.env
   ```

4. **Configure environment variables** (see [Environment Variables](#-environment-variables))

5. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on the port specified in your `.env` file.

---

## 🔧 Environment Variables

Create a `.env` file in `src/config/` with the following variables:

```env
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

# Google OAuth2 Configuration
WEB_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Social Media Login Settings
GOOGLE_AUTH_ENABLED=true
```

### 📧 Gmail Configuration
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password for nodemailer
3. Use the App Password in the `PASSWORD` field

### 🔐 Google OAuth2 Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized JavaScript origins
6. Copy the Client ID to `WEB_CLIENT_ID` in your .env file

**Note:** For Google login to work, you'll need to configure the frontend to obtain the Google ID token and send it to the backend.

---

## 📚 API Documentation

### 📖 Complete API Documentation
**🔗 [View Full API Documentation on Postman](https://documenter.getpostman.com/view/45502181/2sB34kEJy5)**

The complete API documentation with examples, request/response formats, and testing capabilities is available on Postman Documenter.

### Base URL
```
http://localhost:3000
```

### 🔐 Authentication Options

#### 1. Standard Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer_User YOUR_JWT_TOKEN
```

#### 2. Social Media Login - Google OAuth2
The app supports **Google Sign-In** for seamless authentication:

```http
POST /users/loginWithGmail
Content-Type: application/json

{
  "idToken": "GOOGLE_ID_TOKEN_HERE"
}
```

**Google Login Process:**
1. User signs in with Google on frontend
2. Frontend receives Google ID token
3. Send ID token to `/users/loginWithGmail` endpoint
4. Backend verifies token with Google
5. Returns JWT access and refresh tokens

**Benefits of Google Login:**
- ✅ No password required
- ✅ Email automatically verified
- ✅ Faster registration process
- ✅ Enhanced security with Google's infrastructure

### 👤 Key User Endpoints

#### Standard Registration
```http
POST /users/signup
Content-Type: multipart/form-data

Form Data:
- name: "John Doe"
- email: "john@example.com"
- password: "SecurePass123!"
- cpassword: "SecurePass123!"
- age: 25
- gender: "male"
- phone: "01234567890"
- cover: [image files] (up to 2 images)
```

#### Standard Login
```http
POST /users/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Google Login (Social Media Authentication)
```http
POST /users/loginWithGmail
Content-Type: application/json

{
  "idToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 💌 Message Endpoints

#### Send Anonymous Message
```http
POST /message/sendMessage
Content-Type: application/json

{
  "userId": "USER_OBJECT_ID",
  "content": "Your anonymous message here"
}
```

#### Get Received Messages
```http
GET /message/getMessage
Authorization: Bearer_User YOUR_JWT_TOKEN
```

### 📱 Response Format
All API responses follow this structure:
```json
{
  "message": "Success message",
  "data": { ... },
  "error": "Error message (if any)"
}
```

---

## 📁 Project Structure

```
sara7a_App/
├── index.js                    # Application entry point
├── package.json               # Dependencies and scripts
├── src/
│   ├── app.controller.js      # Main app configuration
│   ├── config/
│   │   └── .env              # Environment variables
│   ├── DB/
│   │   ├── connectionDB.js   # Database connection
│   │   └── models/           # Mongoose models
│   │       ├── usermodel.js
│   │       ├── message.model.js
│   │       ├── BlackListedTokens.js
│   │       └── RevokeTokenModel.js
│   ├── middleware/           # Express middlewares
│   │   ├── authentication.js
│   │   ├── authorization.js
│   │   ├── validation.js
│   │   ├── multer.js
│   │   └── GlobalError.js
│   ├── modules/              # Feature modules
│   │   ├── users/
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   └── user.validation.js
│   │   └── messages/
│   │       ├── message.controller.js
│   │       ├── message.service.js
│   │       └── message.validation.js
│   ├── service/              # External services
│   │   └── sendEmail.js
│   ├── utils/                # Utility functions
│   │   ├── security/         # Security utilities
│   │   ├── rules/           # Validation rules
│   │   └── email/           # Email utilities
│   └── jobs/                 # Scheduled jobs
│       └── cleanupJob.js
└── uploads/                  # File uploads directory
```

---

## 🔒 Security Features

### 🛡️ Authentication & Authorization
- **Dual Authentication System:**
  - Standard email/password authentication
  - **Google OAuth2 Social Login**
- JWT-based authentication with access and refresh tokens
- Role-based access control (User/Admin)
- Token blacklisting for secure logout
- **Google ID Token verification** using Google Auth Library
- **Provider-specific user handling** (system users vs Google users)
- Seamless account linking and management

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

---

## 🎨 Frontend Integration

This API is designed to work with any frontend framework. Recommended stacks:

### 📱 Mobile Apps
- **React Native** - Cross-platform mobile development
- **Flutter** - Google's UI toolkit

### 💻 Web Applications  
- **React.js** - Component-based UI library
- **Vue.js** - Progressive JavaScript framework
- **Angular** - Full-featured framework

### 🔗 Sample Frontend Integration
```javascript
// Standard login example
const standardLogin = async (email, password) => {
  const response = await fetch('/users/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return await response.json();
};

// Google login integration example (React)
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

// Send anonymous message example
const sendMessage = async (userId, content) => {
  const response = await fetch('/message/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, content })
  });
  return await response.json();
};
```

---

## 🐳 Docker Support (Optional)

Create a `Dockerfile` for containerization:

```dockerfile
FROM node:22.15.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Commands
```bash
# Build the image
docker build -t sara7a-app .

# Run the container
docker run -p 3000:3000 --env-file src/config/.env sara7a-app
```

---

## 📊 Performance Monitoring

### Recommended Tools
- **PM2** - Process manager for production
- **MongoDB Compass** - Database GUI
- **Postman** - API testing
- **New Relic** - Application monitoring

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📋 Development Guidelines
- Follow the existing code structure
- Add proper error handling
- Include input validation
- Write clear commit messages
- Update documentation when needed

---

## 👨‍💻 Author

**Mahmoud El-Bahar**

- 🐙 GitHub: [@ma7moudelb7ar](https://github.com/ma7moudelb7ar)
- 📘 Facebook: [ma7moudelb7ar](https://www.facebook.com/elbhar12)
- 📷 Instagram: [ma7moudelb7ar](https://www.instagram.com/ma7moudelb7ar/)
- 💼 LinkedIn: [ma7moudelb7ar](https://www.linkedin.com/in/mahmoud-elbhar-61b534328/)
- 📧 Gmail: [ma7moudelb7ar@gmail.com](mailto:ma7moudelb7ar@gmail.com)

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the robust database
- All contributors and users of this project

---

<p align="center">
  Made by Mahmoud El-Bahar♥️
</p>

<p align="center">
  <strong>⭐ Star this repository if you find it helpful!</strong>
</p>

