# Auth & Validation Package — Setup Guide

## 1. Install dependencies

```bash
npm install bcrypt jsonwebtoken joi
```

## 2. Add a JWT secret to your `.env`

```
JWT_SECRET=some_long_random_string_here
```

Generate a strong one, e.g. in Node:
```js
require('crypto').randomBytes(64).toString('hex')
```

Add `JWT_SECRET` to your Render environment variables too, using a **different**
value than local (or the same — just make sure Render has one set, or every
token verification will fail in production).

## 3. Copy these files into your project

```
/middleware/authenticate.js
/middleware/authorize.js
/middleware/validate.js
/validation/authValidation.js
/validation/cardValidation.js
/controllers/authController.js
/routes/authRoutes.js
/utils/authUtils.js
```

## 4. Fix the placeholder database name

In `controllers/authController.js`, replace:

```js
mongodb.getDatabase().db('YOUR_DB_NAME').collection('users')
```

with your actual database name (the same one you just hardcoded into your
other controllers after the last fix).

## 5. Wire the auth routes into `routes/index.js`

Add this line alongside your existing route mounts:

```js
router.use('/auth', require('./authRoutes'));
```

See `routes/index.EXAMPLE.js` for the full picture.

## 6. Protect your write endpoints

In `sinnohRoutes.js` (and `nationalDexRoutes.js`), add `authenticate`,
`authorize('admin')`, and `validate(cardSchema)` to your POST/PUT/DELETE
routes. GET routes can stay open. See `routes/sinnohRoutes.EXAMPLE.js`
for the exact pattern — it's a direct copy of your existing file structure
with the middleware layered in.

Repeat the same pattern for `nationalDexRoutes.js`. If its fields differ
from the Sinnoh cards, duplicate `cardValidation.js` into a
`nationalDexValidation.js` with the right fields.

## 7. Create your first admin user

Since registration defaults to `role: 'user'` unless `role: 'admin'` is
explicitly passed in the request body, you'll want to manually create your
first admin. Two options:

- Temporarily allow `role` in the register request body (already supported —
  just POST `{ "role": "admin", ... }` once), then remove that ability from
  client-facing docs afterward, OR
- Insert directly into your `users` collection via MongoDB Atlas UI /
  Compass, with a bcrypt-hashed password.

## 8. Test it

```bash
# Register
curl -X POST http://localhost:3030/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"ash","email":"ash@pallet.town","password":"pikachu123","role":"admin"}'

# Login
curl -X POST http://localhost:3030/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ash@pallet.town","password":"pikachu123"}'

# Use the token from login on a protected route
curl -X POST http://localhost:3030/sinnoh \
  -H "Authorization: Bearer <token_here>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Turtwig","dexNumber":387,"type":"Grass","rarity":"Common","setName":"Diamond & Pearl","hp":50}'
```

## How it all fits together

- `authenticate` — checks the `Authorization: Bearer <token>` header, verifies
  the JWT, and attaches the decoded payload to `req.user`.
- `authorize('admin')` — runs after `authenticate`; blocks the request with
  403 unless `req.user.role` matches.
- `validate(schema)` — runs before your controller; checks `req.body`
  against a Joi schema and returns 400 with clear error messages if invalid.
  This replaces manual "if not req.body.name" checks in your controllers.

Your existing controllers (`sinnohController.js` etc.) don't need to change
at all — this all lives in the routing layer in front of them.

## Swagger note

Your Swagger UI's "Try it out" won't have a way to send a Bearer token unless
you add a security scheme to your `swagger.js` config. If you want, ask and
I'll show you how to add an "Authorize" button to Swagger UI for this.
