# Uber-Clone
It is a project of clone of uber


# User Registration API Documentation

## Endpoint

`POST /api/user/register`

## Description

Registers a new user in the system.

---

## Request Body

Send a JSON object with the following fields:

| Field                   | Type   | Required | Description                              |
|-------------------------|--------|----------|------------------------------------------|
| `fullName.firstName`    | String | Yes      | User's first name (min 3 characters)     |
| `fullName.lastName`     | String | Yes      | User's last name (min 3 characters)      |
| `email`                 | String | Yes      | User's email address (must be valid)     |
| `password`              | String | Yes      | User's password (min 6 characters)       |

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
        "email": "john.doe@example.com",
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

## Notes

- The password is securely hashed before storing.
- The response includes a JWT token for authentication.
- The password field is never returned in the response.