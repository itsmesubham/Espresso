# Espresso Restaurant Management App

## API Documentation & Requirements

This document outlines the API endpoints and requirements for the Espresso Restaurant Management App - a comprehensive solution for restaurant operations including customer check-in, table management, order tracking, and reservation systems.

---

## Table of Contents

1. [Authentication APIs](#authentication-apis)
2. [Customer Management APIs](#customer-management-apis)
3. [Table Management APIs](#table-management-apis)
4. [Order Management APIs](#order-management-apis)
5. [Reservation System APIs](#reservation-system-apis)
6. [Staff Management APIs](#staff-management-apis)
7. [Reporting & Analytics APIs](#reporting--analytics-apis)
8. [Configuration APIs](#configuration-apis)

---

## Authentication APIs

### 1. Login
- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticate staff members to access the system
- **Request Body**:
```json
{
  "username": "string",
  "password": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "role": "string",
    "restaurantId": "string"
  }
}
```

### 2. Logout
- **Endpoint**: `POST /api/auth/logout`
- **Description**: Terminate user session
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true
}
```

### 3. Refresh Token
- **Endpoint**: `POST /api/auth/refresh`
- **Description**: Generate new access token
- **Request Body**:
```json
{
  "refreshToken": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "token": "string"
}
```

---

## Customer Management APIs

### 1. Check-in Customer
- **Endpoint**: `POST /api/customers/check-in`
- **Description**: Register a new customer check-in
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "name": "string",
  "phone": "string",
  "partySize": "number",
  "wantsSpecialArea": "boolean",
  "tableId": "string",
  "timestamp": "datetime"
}
```
- **Response**:
```json
{
  "success": true,
  "id": "string",
  "customer": {
    "id": "string",
    "name": "string",
    "phone": "string",
    "partySize": "number",
    "wantsSpecialArea": "boolean",
    "checkInTime": "datetime",
    "status": "string"
  }
}
```

### 2. Get Customer by Phone
- **Endpoint**: `GET /api/customers/phone/{phone}`
- **Description**: Retrieve customer information by phone number
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "customer": {
    "id": "string",
    "name": "string",
    "phone": "string",
    "partySize": "number",
    "wantsSpecialArea": "boolean",
    "checkInTime": "datetime",
    "status": "string"
  }
}
```

### 3. Update Customer Status
- **Endpoint**: `PUT /api/customers/{customerId}`
- **Description**: Update customer status (seated, waiting, left, etc.)
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "status": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "customer": {
    "id": "string",
    "name": "string",
    "phone": "string",
    "status": "string"
  }
}
```

---

## Table Management APIs

### 1. Get All Tables
- **Endpoint**: `GET /api/tables`
- **Description**: Retrieve all tables with their current status
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "tables": [
    {
      "id": "string",
      "number": "string",
      "status": "available|occupied|reserved|reserved_by_party",
      "capacity": "number",
      "section": "string",
      "customerId": "string",
      "reservationId": "string"
    }
  ]
}
```

### 2. Update Table Status
- **Endpoint**: `PUT /api/tables/{tableId}`
- **Description**: Update table status (assign to customer, mark as reserved, etc.)
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "status": "string",
  "customerId": "string",
  "reservationId": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "table": {
    "id": "string",
    "number": "string",
    "status": "string"
  }
}
```

### 3. Reserve Table
- **Endpoint**: `POST /api/tables/{tableId}/reserve`
- **Description**: Temporarily reserve a table for a customer
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "customerId": "string",
  "reservationTime": "datetime"
}
```
- **Response**:
```json
{
  "success": true,
  "table": {
    "id": "string",
    "status": "reserved",
    "customerId": "string",
    "reservationTime": "datetime"
  }
}
```

---

## Order Management APIs

### 1. Create Order
- **Endpoint**: `POST /api/orders`
- **Description**: Create a new order for a table
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "tableId": "string",
  "customerId": "string",
  "items": [
    {
      "itemId": "string",
      "name": "string",
      "quantity": "number",
      "notes": "string"
    }
  ],
  "status": "pending",
  "specialRequests": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "order": {
    "id": "string",
    "tableId": "string",
    "customerId": "string",
    "items": "array",
    "status": "string",
    "orderTime": "datetime",
    "total": "number"
  }
}
```

### 2. Get Orders by Status
- **Endpoint**: `GET /api/orders?status={status}`
- **Description**: Retrieve orders filtered by status
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "orders": [
    {
      "id": "string",
      "tableId": "string",
      "customerId": "string",
      "items": "array",
      "status": "string",
      "orderTime": "datetime",
      "readyTime": "datetime"
    }
  ]
}
```

### 3. Update Order Status
- **Endpoint**: `PUT /api/orders/{orderId}`
- **Description**: Update order status (preparing, ready, served, completed)
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "status": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "order": {
    "id": "string",
    "status": "string"
  }
}
```

### 4. Get Active Orders
- **Endpoint**: `GET /api/orders/active`
- **Description**: Retrieve all active orders (not completed/cancelled)
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "orders": [
    {
      "id": "string",
      "tableId": "string",
      "status": "string",
      "items": "array"
    }
  ]
}
```

---

## Reservation System APIs

### 1. Create Reservation
- **Endpoint**: `POST /api/reservations`
- **Description**: Create a new table reservation
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "customerName": "string",
  "customerPhone": "string",
  "partySize": "number",
  "date": "date",
  "time": "time",
  "specialRequests": "string",
  "status": "pending|confirmed|cancelled"
}
```
- **Response**:
```json
{
  "success": true,
  "reservation": {
    "id": "string",
    "customerName": "string",
    "customerPhone": "string",
    "partySize": "number",
    "date": "date",
    "time": "time",
    "status": "string",
    "tableId": "string",
    "createdAt": "datetime"
  }
}
```

### 2. Get Reservations by Date
- **Endpoint**: `GET /api/reservations?date={date}`
- **Description**: Retrieve reservations for a specific date
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "reservations": [
    {
      "id": "string",
      "customerName": "string",
      "customerPhone": "string",
      "partySize": "number",
      "date": "date",
      "time": "time",
      "status": "string",
      "tableId": "string"
    }
  ]
}
```

### 3. Update Reservation
- **Endpoint**: `PUT /api/reservations/{reservationId}`
- **Description**: Update reservation details or status
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "status": "string",
  "tableId": "string",
  "time": "time"
}
```
- **Response**:
```json
{
  "success": true,
  "reservation": {
    "id": "string",
    "status": "string",
    "tableId": "string"
  }
}
```

### 4. Cancel Reservation
- **Endpoint**: `DELETE /api/reservations/{reservationId}`
- **Description**: Cancel a reservation
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true
}
```

---

## Staff Management APIs

### 1. Get Staff Members
- **Endpoint**: `GET /api/staff`
- **Description**: Retrieve all staff members
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "staff": [
    {
      "id": "string",
      "name": "string",
      "role": "string",
      "status": "available|busy|offline"
    }
  ]
}
```

### 2. Update Staff Status
- **Endpoint**: `PUT /api/staff/{staffId}/status`
- **Description**: Update staff member availability status
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "status": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "staff": {
    "id": "string",
    "status": "string"
  }
}
```

---

## Reporting & Analytics APIs

### 1. Get Daily Reports
- **Endpoint**: `GET /api/reports/daily?date={date}`
- **Description**: Retrieve daily operational reports
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "report": {
    "date": "date",
    "customersServed": "number",
    "totalOrders": "number",
    "revenue": "number",
    "avgWaitTime": "number",
    "occupancyRate": "number"
  }
}
```

### 2. Get Table Utilization
- **Endpoint**: `GET /api/reports/table-utilization`
- **Description**: Retrieve table usage statistics
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "utilization": [
    {
      "tableId": "string",
      "usageHours": "number",
      "revenueGenerated": "number"
    }
  ]
}
```

---

## Configuration APIs

### 1. Get Restaurant Settings
- **Endpoint**: `GET /api/config/restaurant`
- **Description**: Retrieve restaurant configuration settings
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "settings": {
    "name": "string",
    "address": "string",
    "hours": {
      "monday": "string",
      "tuesday": "string",
      "wednesday": "string",
      "thursday": "string",
      "friday": "string",
      "saturday": "string",
      "sunday": "string"
    },
    "specialAreaAvailable": "boolean"
  }
}
```

### 2. Update Restaurant Settings
- **Endpoint**: `PUT /api/config/restaurant`
- **Description**: Update restaurant configuration settings
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "name": "string",
  "address": "string",
  "hours": "object",
  "specialAreaAvailable": "boolean"
}
```
- **Response**:
```json
{
  "success": true,
  "settings": {
    "name": "string",
    "address": "string",
    "hours": "object",
    "specialAreaAvailable": "boolean"
  }
}
```

---

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": "object"
  }
}
```

### Common Error Codes:
- `AUTH_ERROR`: Authentication failed
- `VALIDATION_ERROR`: Request validation failed
- `NOT_FOUND`: Requested resource not found
- `UNAUTHORIZED`: User lacks permissions
- `SERVER_ERROR`: Internal server error

---

## Security

- All endpoints require authentication via JWT tokens
- Role-based access control for different operations
- Rate limiting to prevent abuse
- Input validation and sanitization
- HTTPS enforcement in production

## Rate Limits

- Auth endpoints: 5 requests per minute per IP
- General endpoints: 60 requests per minute per user
- Reporting endpoints: 10 requests per minute per user

---

## Versioning

All API endpoints are versioned using the URI path (e.g., `/api/v1/...`).

## Webhook Notifications

The system supports webhook notifications for important events:
- New customer check-ins
- Order status updates
- Table availability changes
- Reservation confirmations

Webhook URLs are configured in the restaurant settings and should be HTTPS endpoints that can handle POST requests with JSON payloads.