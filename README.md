# Uber-Clone
It is a project of a clone of Uber.

---

# User Routes Documentation

## 1. User Registration

### Endpoint

`POST /api/user/register`

### Description

Registers a new user in the system.

### Request Body

Send a JSON object with the following fields:

| Field                | Type   | Required | Description                              |
|----------------------|--------|----------|------------------------------------------|
| `fullName.firstName` | String | Yes      | User's first name (min 3 characters)     |
| `fullName.lastName`  | String | Yes      | User's last name (min 3 characters)      |
| `email`              | String | Yes      | User's email address (must be valid)     |
| `password`           | String | Yes      | User's password (at least 6 characters)  |

**Example:**
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "message": "user created succesfully",
      "token": "<jwt_token>",
      "user": {
        "_id": "user_id",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com"
        // ...other user fields (password not included)
      }
    }
    ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email address",
          "param": "email",
          "location": "body"
        }
        // ...other validation errors
      ]
    }
    ```

#### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Server error"
    }
    ```

---

## 2. User Login

### Endpoint

`POST /api/user/login`

### Description

Authenticates an existing user and returns a JWT token upon successful login.

### Request Body

Send a JSON object with the following fields:

| Field      | Type   | Required | Description                              |
|------------|--------|----------|------------------------------------------|
| `email`    | String | Yes      | User's email address (must be valid)     |
| `password` | String | Yes      | User's password (at least 6 characters)  |

**Example:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Login successful",
      "token": "<jwt_token>",
      "user": {
        "_id": "user_id",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com"
        // ...other user fields (password not included)
      }
    }
    ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email address",
          "param": "email",
          "location": "body"
        }
        // ...other validation errors
      ]
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "error": "Invalid credentials"
    }
    ```

#### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Server error"
    }
    ```

---

## 3. User Profile

### Endpoint

`GET /users/profile`

### Description

Fetches the profile of the authenticated user.  
This endpoint is protected by middleware that validates the JWT token sent in the request headers or cookies.

> **Note:** Include the token in the request's `Authorization` header as `Bearer <token>` or via cookies.

### Middleware

- **authUser:** Validates the JWT token and attaches the authenticated user to the request.  
  If the token is missing or invalid, the middleware returns a `401 Unauthorized` response.

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "_id": "user_id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields, excluding sensitive information like password
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "error": "Unauthorized access, no token provided" 
      // or
      "error": "Unauthorized access, invalid token"
    }
    ```

#### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Server error"
    }
    ```

---

## 4. User Logout

### Endpoint

`GET /api/user/logout`

### Description

Logs out the authenticated user by clearing the authentication cookie and blacklisting the token.  
This endpoint is protected by middleware and requires a valid JWT token.

### Middleware

- **authUser:** Validates the JWT token and attaches the authenticated user to the request.  
  If the token is missing, invalid, or blacklisted, the middleware returns a `401 Unauthorized` response.

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Logout successful"
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "error": "Unauthorized access, no token provided"
      // or
      "error": "Unauthorized access, token is blacklisted"
      // or
      "error": "Unauthorized access, invalid token"
    }
    ```

#### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Server error"
    }
    ```

---

# Captain Routes Documentation

## 1. Captain Registration

### Endpoint

`POST /api/captain/register`

### Description

Registers a new captain in the system along with their vehicle details.

### Request Body

Send a JSON object with the following fields:

| Field                           | Type   | Required | Description                                                                       |
|---------------------------------|--------|----------|-----------------------------------------------------------------------------------|
| `fullName.firstName`            | String | Yes      | Captain's first name (min 3 characters)                                           |
| `fullName.lastName`             | String | Yes      | Captain's last name (min 3 characters)                                            |
| `email`                         | String | Yes      | Captain's email address (must be valid)                                           |
| `password`                      | String | Yes      | Captain's password (at least 6 characters)                                        |
| `vehicle.color`                 | String | Yes      | Color of the vehicle (min 3 characters)                                           |
| `vehicle.vehicleNumber`         | String | Yes      | Vehicle registration number                                                       |
| `vehicle.vehicleType`           | String | Yes      | Type of the vehicle (allowed values: `car`, `bike`, `auto`)                       |
| `vehicle.capacity`              | Number | Yes      | Number of passengers the vehicle can accommodate (minimum value 1)                  |

**Example:**
```json
{
  "fullName": {
    "firstName": "Alex",
    "lastName": "Smith"
  },
  "email": "alex.smith@example.com",
  "password": "securePass123",
  "vehicle": {
    "color": "Blue",
    "vehicleNumber": "XYZ1234",
    "vehicleType": "car",
    "capacity": 4
  }
}
```

### Responses

#### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "message": "Captain created successfully",
      "token": "<jwt_token>",
      "captain": {
        "_id": "captain_id",
        "fullName": {
          "firstName": "Alex",
          "lastName": "Smith"
        },
        "email": "alex.smith@example.com",
        "vehicle": {
          "color": "Blue",
          "vehicleNumber": "XYZ1234",
          "vehicleType": "car",
          "capacity": 4
        }
        // ...other captain fields (sensitive information excluded)
      }
    }
    ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email address",
          "param": "email",
          "location": "body"
        }
        // ...other validation errors
      ]
    }
    ```

#### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Server error"
    }
    ```

---

## 2. Captain Login

### Endpoint

`POST /api/captain/login`

### Description

Authenticates an existing captain and returns a JWT token upon successful login.

### Request Body

Send a JSON object with the following fields:

| Field      | Type   | Required | Description                              |
|------------|--------|----------|------------------------------------------|
| `email`    | String | Yes      | Captain's email address (must be valid)  |
| `password` | String | Yes      | Captain's password (at least 6 characters)  |

**Example:**
```json
{
  "email": "alex.smith@example.com",
  "password": "securePass123"
}
```

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Login successful",
      "token": "<jwt_token>",
      "captain": {
        "_id": "captain_id",
        "fullName": {
          "firstName": "Alex",
          "lastName": "Smith"
        },
        "email": "alex.smith@example.com",
        "vehicle": {
          "color": "Blue",
          "vehicleNumber": "XYZ1234",
          "vehicleType": "car",
          "capacity": 4
        }
        // ...other captain fields (sensitive information excluded)
      }
    }
    ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email address",
          "param": "email",
          "location": "body"
        }
        // ...other validation errors
      ]
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "error": "Invalid credentials"
    }
    ```

#### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Server error"
    }
    ```

---

## 3. Captain Profile

### Endpoint

`GET /api/captain/profile`

### Description

Fetches the profile of the authenticated captain.  
This endpoint is protected by middleware that validates the JWT token.

### Middleware

- **authCaptain:** Validates the JWT token and attaches the authenticated captain to the request.  
  If the token is missing or invalid, it returns a `401 Unauthorized` response.

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "_id": "captain_id",
      "fullName": {
        "firstName": "Alex",
        "lastName": "Smith"
      },
      "email": "alex.smith@example.com",
      "vehicle": {
        "color": "Blue",
        "vehicleNumber": "XYZ1234",
        "vehicleType": "car",
        "capacity": 4
      }
      // ...other captain fields, excluding sensitive information like password
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "error": "Unauthorized access, no token provided" 
      // or 
      "error": "Unauthorized access, invalid token"
    }
    ```

#### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Server error"
    }
    ```

---

## 4. Captain Logout

### Endpoint

`GET /api/captain/logout`

### Description

Logs out the authenticated captain by clearing the authentication cookie and blacklisting the token.  
This endpoint is protected by middleware and requires a valid JWT token.

### Middleware

- **authCaptain:** Validates the JWT token and attaches the authenticated captain to the request.  
  If the token is missing, invalid, or blacklisted, it returns a `401 Unauthorized` response.

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Logout successful"
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "error": "Unauthorized access, no token provided"
      // or
      "error": "Unauthorized access, token is blacklisted"
      // or
      "error": "Unauthorized access, invalid token"
    }
    ```

#### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Server error"
    }
    ```

---

# Notes

- All passwords are securely hashed before storing.
- JWT tokens are returned upon successful login/registration and are required for accessing protected routes.
- In protected routes, ensure that the JWT token is sent via the `Authorization` header (`Bearer <token>`) or in a cookie.
- Tokens can be blacklisted upon logout to prevent further use until they expire.