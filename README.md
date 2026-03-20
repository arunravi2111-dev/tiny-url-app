Here’s a clean and professional **README.md** you can use for your Tiny URL project 👇

---

# 🚀 Tiny URL App

A full-stack URL shortening application built using:

* **Frontend:** Angular
* **Backend:** ASP.NET Core Web API
* **Database:** SQLite

---

# 📌 Features

### 🔗 URL Shortening

* Generate a short URL from a long URL
* Automatically creates a **6-character short code**

### 📋 URL Management

* View list of all shortened URLs
* Display:

  * Short URL
  * Original URL
  * Click count

### 🔍 Search & Filter

* Search URLs by:

  * Short code
  * Original URL

### 📊 Click Tracking

* Tracks number of clicks on each short URL
* Increments count on every redirect

### 📋 Actions

* Copy short URL to clipboard
* Delete URL
* Redirect to original URL when short link is accessed

### 🔐 Private URL Support

* Option to generate private URLs (not stored, but still usable)

---

# 🏗️ Project Structure

```
tiny-url-app/
│
├── frontend/        # Angular application
├── backend/         # ASP.NET Core Web API
├── .gitignore
└── README.md
```

---

# ⚙️ Prerequisites

* Node.js (v16+)
* Angular CLI
* .NET SDK (6 or later)
* SQLite

---

# ▶️ Getting Started

## 1. Clone the repository

```bash
git clone <your-repo-url>
cd tiny-url-app
```

---

## 2. Run Backend (ASP.NET Core API)

```bash
cd backend
dotnet restore
dotnet run
```

API will run at:

```
http://localhost:5235
```

Swagger:

```
http://localhost:5235/swagger
```

---

## 3. Run Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

Frontend will run at:

```
http://localhost:4200
```

---

# 🔗 API Endpoints (Examples)

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| GET    | /api/url      | Get all URLs             |
| POST   | /api/url      | Create short URL         |
| GET    | /{shortCode}  | Redirect to original URL |
| DELETE | /api/url/{id} | Delete URL               |

---

# ⚙️ Configuration

## Angular Environment

Update API URL in:

```
src/environments/environment.ts
```

```ts
export const environment = {
  apiUrl: 'http://localhost:5235/api'
};
```

---

## Backend Configuration

Update connection string in:

```
appsettings.json
```

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=tinyurl.db"
  }
}
```

---

# 🧪 Features Implementation Notes

* Uses **Angular Material** for UI components
* Uses **Reactive/Template-driven forms**
* Uses **RxJS Observables** for API calls
* Uses **Entity Framework Core** with SQLite
* Implements **CORS** for frontend-backend communication

---

# 📦 Build for Production

## Angular

```bash
ng build --configuration production
```

## .NET

```bash
dotnet publish -c Release
```

---

# 🚀 Future Improvements

* Pagination & sorting
* User authentication
* Custom alias for URLs
* Analytics dashboard
* Deployment (Azure / IIS / Docker)

---

# 👨‍💻 Author

* Arun Ravi

---

