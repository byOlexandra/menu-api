
# ☕ Coffee Shop Menu API

A robust, production-ready RESTful Public API built with Node.js, Express, and MongoDB. This API provides an automated, secure, and multi-lingual menu management system designed for modern coffee shops and digital menus.

## 🚀 Live Demo
* **API Base URL:** `https://menu-api-s9rp.onrender.com`
* **Main Menu Endpoint:** `https://menu-api-s9rp.onrender.com/menu`

---

## 🛠️ Key Features & Architecture

* **Advanced Filtering & Search:** Search simultaneously across multiple language fields (`name.ua` / `name.en`) using case-insensitive MongoDB `$regex` patterns. Filter products by category, price range, and real-time availability.
* **Pagination & Server-Side Sorting:** High-performance data sorting (`.sort()`) and pagination (`.skip()` / `.limit()`) executed directly on the database level using Mongoose `.lean()` for maximum efficiency.
* **Smart Localization (Dual Language):** Dynamic response formatting based on query parameters (`?lang=ua` or `?lang=en`) with a secure fallback to English as the global standard.
* **API Security & Rate Limiting:** Protected against DDoS and brute-force spam attacks using `express-rate-limit` (configured for max 100 requests per 15 minutes per IP).
* **Data Validation:** Strict input sanitation and schema validation executed "on-the-fly" via `Joi` middleware for all data-modifying (`POST` / `PATCH`) requests.
* **Centralized Error Handling:** Clean, unified architecture utilizing `http-errors` to intercept, log, and format reliable semantic REST API error responses.

---

## 💻 Tech Stack

* **Runtime Environment:** Node.js
* **Backend Framework:** Express.js
* **Database:** MongoDB Atlas (Cloud)
* **ODM:** Mongoose
* **Validation:** Joi
* **Security:** Express-Rate-Limit, Helmet

---

## 🧭 API Reference & Query Parameters

### Base URL Route `GET /`
Returns a welcome message and basic routing guide.

### Main Menu Route `GET /menu`
Supports complex query parameters that can be combined dynamically:

| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `lang` | `string` | Sets the response language (`ua` or `en`). Default is `en`. | `?lang=ua` |
| `category` | `string` | Filters by category (`coffee`, `tea`, `bakery`, `desserts`, etc.) | `?category=coffee` |
| `available` | `boolean` | Filters items by their real-time stock availability | `?available=true` |
| `minPrice` | `number` | Filters items with a price greater than or equal to value | `?minPrice=50` |
| `maxPrice` | `number` | Filters items with a price less than or equal to value | `?maxPrice=120` |
| `search` | `string` | Case-insensitive keyword search in both English and Ukrainian | `?search=latte` |
| `sortBy` | `string` | Database field to sort by (e.g., `price`). Default is `price`. | `?sortBy=price` |
| `order` | `string` | Sorting order direction: `asc` (cheap to expensive) or `desc` | `?order=desc` |
| `page` | `number` | The current page number for pagination. Default is `1`. | `?page=2` |
| `limit` | `number` | Number of items returned per page. Default is `25`. | `?limit=5` |

* **Advanced Combined Query Example:**
  `GET /menu?category=desserts&maxPrice=80&lang=ua&sortBy=price&order=asc`

---

## 🔄 CRUD Operations (API Endpoints)

### 1. Products Management

#### 📍 Get All Products
* **Method:** `GET`
* **URL:** `/menu`
* **Response Status:** `200 OK`

#### 📍 Get Product by ID
* **Method:** `GET`
* **URL:** `/menu/:productId`
* **Response Status:** `200 OK` / `404 Not Found`

#### 📍 Create New Product
* **Method:** `POST`
* **URL:** `/menu`
* **Headers:** `Content-Type: application/json`
* **Validation:** Requires full `Joi` validated object body.
* **Response Status:** `201 Created` / `400 Bad Request`
* **Payload Example:**
```json
{
  "name": {
    "ua": "Капучино",
    "en": "Cappuccino"
  },
  "description": {
    "ua": "Класичний кавовий напій на основі еспресо та ніжної молочної піни.",
    "en": "Classic coffee drink made with espresso and steamed milk foam."
  },
  "price": 65,
  "category": "coffee",
  "isAvailable": true,
  "allergens": ["dairy"]
}

```

#### 📍 Update Existing Product

* **Method:** `PATCH`
* **URL:** `/menu/:productId`
* **Headers:** `Content-Type: application/json`
* **Validation:** Validated via `Joi.fork()`. All fields are optional, but strict rules still apply.
* **Response Status:** `200 OK` / `400 Bad Request` / `404 Not Found`
* **Payload Example:**

```json
{
  "price": 70,
  "isAvailable": false
}

```

#### 📍 Delete Product

* **Method:** `DELETE`
* **URL:** `/menu/:productId`
* **Response Status:** `200 OK` / `404 Not Found`

---

## 🛡️ Error Handling Responses

The API uses standard HTTP status codes and uniform JSON error payloads:

* **400 Bad Request (Validation Failure):**

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Validation Error: \"price\" must be a positive number"
}

```

* **429 Too Many Requests (Rate Limiter Triggered):**

```json
{
  "status": "fail",
  "statusCode": 429,
  "message": "Too many requests from this IP, please try again after 15 minutes."
}

```

---

## ⚙️ Local Development Setup

Follow these steps to run the project locally:

1. **Clone the repository:**
```bash
git clone [https://github.com/your-username/menu-api.git](https://github.com/your-username/menu-api.git)
cd menu-api

```


2. **Install dependencies:**
```bash
npm install

```


3. **Set up Environment Variables:**
Create a `.env` file in the root directory and specify your credentials:
```env
PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string

```


4. **Run the server:**
* Development mode (with nodemon): `npm run dev`
* Production mode: `npm start`


