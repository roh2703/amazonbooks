# 📚 Premium E-Commerce Book Store

A modern, full-stack e-commerce web application for a book store, built with a **Spring Boot backend** and **Angular frontend**. The application features a premium dark-themed UI with glassmorphism design and a scalable REST API architecture.

---

## 🚀 Features

* 🌙 **Modern UI**: Dark theme with glassmorphism and smooth animations
* 📖 **Book Management**: Browse, view, and manage books
* ⚡ **Fast REST APIs**: Built with Spring Boot
* 🗄️ **MySQL Database**: Persistent data storage
* 🌱 **Auto Data Seeding**: Preloads sample books with cover images
* 📱 **Responsive Design**: Works across devices

---

## 🏗️ Architecture

```
Angular (Frontend)
        ↓ REST API
Spring Boot (Backend)
        ↓
     MySQL
```

* **Frontend (Angular)** → UI & API consumption
* **Backend (Spring Boot)** → Business logic & APIs
* **Database (MySQL)** → Stores book data

---

## 🛠️ Tech Stack

| Layer       | Technology           |
| ----------- | -------------------- |
| Frontend    | Angular, TypeScript  |
| Backend     | Spring Boot, Java 17 |
| Database    | MySQL                |
| Build Tools | Maven, npm           |

---

## 📦 Project Structure

```
ecommerce/
├── backend/          # Spring Boot Application
└── frontend/         # Angular Application
```

---

## ⚙️ Setup Instructions

### 1️⃣ Database Setup

1. Start MySQL server
2. Create database:

```sql
CREATE DATABASE ecommerce;
```

---

### 2️⃣ Backend Setup (Spring Boot)

```bash
cd backend

# Using Maven Wrapper (Windows)
.\mvnw.cmd spring-boot:run

# Using Maven
mvn spring-boot:run
```

Backend runs at:
👉 http://localhost:8080

---

### 3️⃣ Frontend Setup (Angular)

```bash
cd frontend

npm install
npm start
```

Frontend runs at:
👉 http://localhost:4200

---

## 🔐 Configuration

Update backend configuration:

`backend/src/main/resources/application.properties`

```
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
```

---

## 🔗 API Endpoints

| Method | Endpoint    | Description    |
| ------ | ----------- | -------------- |
| GET    | /books      | Get all books  |
| GET    | /books/{id} | Get book by ID |
| POST   | /books      | Add new book   |
| PUT    | /books/{id} | Update book    |
| DELETE | /books/{id} | Delete book    |

---

## 📸 Screenshots

*Add your UI screenshots here (recommended):*

* Home Page
* Book Listing
* Book Details

---

## 🧪 Build Commands

```bash
# Backend
mvn clean package

# Frontend
npm run build
```

---

## 🐞 Troubleshooting

* Ensure MySQL is running
* Check ports `8080` and `4200` are free
* Verify database credentials
* Run `npm install` if dependencies fail

---

## ☁️ Deployment (Recommended)

You can deploy this project using:

* **Backend** → Azure App Service / Docker Container
* **Frontend** → Azure Static Web Apps / Nginx
* **Database** → Azure MySQL Flexible Server

---

## 🔄 CI/CD Pipeline (Advanced)

* CI using GitHub Actions / Azure DevOps
* Build backend (Maven) & frontend (npm)
* Dockerize application
* Deploy to Azure / Kubernetes (AKS)

---

## 🚀 Future Enhancements

* 🔐 User Authentication (JWT)
* 🛒 Shopping Cart
* 💳 Payment Integration
* 📦 Order Management
* 👨‍💼 Admin Dashboard

---

## 🤝 Contribution

Contributions are welcome!
Feel free to fork the repository and submit a pull request.

---

## 📌 Author

**Bharath Reddy**
DevOps Engineer | Cloud & Full Stack Enthusiast

---

## ⭐ Support

If you like this project, please ⭐ the repository!

---
