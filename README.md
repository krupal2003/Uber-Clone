# Uber-Clone
It is a project of clone of Uber.

# User Registration API Documentation

## Endpoint

`POST /api/user/register`

## Description

Registers a new user in the system.

---

## Request Body

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

---

## Responses

### Success

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

### Validation Error

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

### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Server error"
    }
    ```

---

# User Login API Documentation

## Endpoint

`POST /api/user/login`

## Description

Authenticates an existing user and returns a JWT token upon successful login.

---

## Request Body

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

---

## Responses

### Success

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

### Validation Error

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

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "error": "Invalid credentials"
    }
    ```

### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Server error"
    }
    ```

---

# User Profile API Documentation

## Endpoint

`GET /users/profile`

## Description

Fetches the profile of the authenticated user.  
This endpoint is protected by middleware which validates the JWT token sent in the request headers (or cookies).

> **Note:** Ensure you include the token in your request's `Authorization` header as `Bearer <token>` or via cookies.

---

## Middleware

- **authUser:** Validates the JWT token and attaches the authenticated user to the request.  
  If the token is missing or invalid, the middleware returns a `401 Unauthorized` response.

---

## Responses

### Success

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

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "error": "Unauthorized access, no token provided" 
      // or
      "error": "Unauthorized access, invalid token"
    }
    ```

### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Server error"
    }
    ```

---

# User Logout API Documentation

## Endpoint

`GET /api/user/logout`

## Description

Logs out the authenticated user by clearing the authentication cookie and blacklisting the token.  
This endpoint is protected by middleware and requires a valid JWT token.

---

## Middleware

- **authUser:** Validates the JWT token and attaches the authenticated user to the request.  
  If the token is missing, invalid, or blacklisted, the middleware returns a `401 Unauthorized` response.

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Logout successful"
    }
    ```

### Unauthorized

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

### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Server error"
    }
    ```

---

# Captain Registration API Documentation

## Endpoint

`POST /api/captain/register`

## Description

Registers a new captain in the system along with their vehicle details.

---

## Request Body

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

---

## Responses

### Success

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

### Validation Error

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

### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Server error"
    }
    ```

---

## Notes

- The password is securely hashed before storing.
- The route returns a JWT token used for further authentication.