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

# Google OAuth2
WEB_CLIENT_ID=your_google_client_id

