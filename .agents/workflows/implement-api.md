# Workflow: Implement an API Feature

This workflow guides the AI agent through implementing backend REST API features for Toys Ecom.

## Prerequisites
1. Read `README.md`, `docs/ARCHITECTURE.md`, `docs/DATABASE.md`, and `docs/API.md`.
2. Confirm the target endpoints, HTTP methods, authorization levels, request body formats, and expected JSON responses.

## Implementation Steps
1. **Model Check / Creation (`server/src/models/`)**:
   - Ensure the required Mongoose schema is defined in `server/src/models/` with accurate field types, validations, default values, indices, and timestamps.

2. **Controller Logic (`server/src/controllers/`)**:
   - Implement controller functions handling request parsing, data validation, database interaction via Mongoose, error handling, and structured JSON responses.
   - Use standard response formats:
     ```json
     {
       "success": true,
       "message": "Operation successful",
       "data": { ... }
     }
     ```
     or error format:
     ```json
     {
       "success": false,
       "message": "Error description",
       "error": "Detailed error string"
     }
     ```

3. **Route Registration (`server/src/routes/`)**:
   - Register route endpoints using Express Router.
   - Apply required middleware (`authMiddleware`, `adminMiddleware`, `validationMiddleware`).

4. **Input & Security Validation**:
   - Validate incoming payloads (`req.body`, `req.params`, `req.query`).
   - Ensure sensitive fields like password hashes are excluded (`select('-password')`).
   - Verify role-based authorization for protected/admin endpoints.

## Verification
- Test endpoints using automated tests, cURL, or Postman requests.
- Verify status codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Error).
