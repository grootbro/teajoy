# MongoDB Connection Optimization - Best Practices 2025

This document describes the MongoDB/Mongoose connection optimizations implemented for production and serverless environments.

## Problem

The original implementation experienced connection timeouts causing 500 errors after the application ran for some time. This is a common issue in serverless/Next.js environments where:
- Connections are not properly pooled
- Stale connections are not detected
- Connection state is not validated before reuse

## Solution Overview

Implemented industry best practices based on:
- Official Mongoose documentation for Next.js
- Vercel deployment recommendations
- MongoDB connection pooling best practices

## Changes Made

### 1. `lib/mongodb.ts` - Connection Management

**Key improvements:**

```typescript
// Connection caching with validation
if (cached.conn && mongoose.connection.readyState === 1) {
  return cached.conn; // Return only if truly connected
}

// Reset cache if connection is stale
if (cached.conn && mongoose.connection.readyState !== 1) {
  cached.conn = null;
  cached.promise = null;
}
```

**Optimized connection options:**

- `bufferCommands: false` - **Critical for serverless** - prevents Mongoose from buffering commands when disconnected
- `maxPoolSize: 10` - Limits connection pool to prevent exhaustion
- `minPoolSize: 2` - Maintains minimum active connections for better performance
- `serverSelectionTimeoutMS: 10000` - 10 second timeout for server selection
- `socketTimeoutMS: 45000` - Close inactive sockets after 45 seconds
- `family: 4` - Force IPv4, skip IPv6 attempts for faster connection

**Connection state tracking:**
- `readyState === 1` means connected
- `readyState === 0` means disconnected
- Validates state before returning cached connection

### 2. `next.config.js` - Webpack Configuration

```javascript
experimental: {
  serverComponentsExternalPackages: ["mongoose"],
}
```
Prevents Mongoose from being bundled in client-side code.

```javascript
webpack: (config) => {
  config.experiments = {
    ...config.experiments,
    topLevelAwait: true,
  };
  return config;
}
```
Enables top-level await for better async handling.

### 3. `pages/api/products.ts` - API Optimization

**Performance improvements:**

```typescript
const products = await Product.find({ active: true })
  .sort({ id: 1 })
  .lean()  // Returns plain JS objects instead of Mongoose documents
  .exec();
```

`.lean()` provides ~50% performance improvement for read-only operations.

**Caching headers:**

```typescript
res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
```

- Cache responses for 60 seconds
- Serve stale content for 120 seconds while revalidating

### 4. `pages/api/orders.ts` - Better Error Handling

- Added validation for products array
- Improved error messages
- Cleaner error handling without verbose logging

## Why This Works

### Connection Pooling
Instead of creating a new connection for each request, we:
1. Cache the connection globally
2. Validate it's still alive before reuse
3. Maintain a pool of 2-10 connections

### Serverless Optimization
- `bufferCommands: false` prevents the app from hanging when disconnected
- Connection validation prevents using stale connections
- Proper cleanup when connections die

### Performance
- `.lean()` queries are faster (no Mongoose overhead)
- HTTP caching reduces database hits
- Connection reuse reduces latency

## Monitoring

Check connection status in PM2 logs:
```bash
pm2 logs teajoy --lines 50
```

Look for:
- ✅ MongoDB connected successfully
- ❌ MongoDB connection failed: [error]

## Testing

Test API endpoint:
```bash
curl http://localhost:4242/api/products
```

Should return:
```json
{
  "success": true,
  "products": [...]
}
```

## Connection States

| State | Value | Meaning |
|-------|-------|---------|
| disconnected | 0 | Not connected |
| connected | 1 | Connected and ready |
| connecting | 2 | Connection in progress |
| disconnecting | 3 | Disconnecting |

Our code only reuses connections in state `1` (connected).

## Best Practices Applied

✅ Global connection caching (prevents connection storms)
✅ Connection state validation (prevents stale connection usage)
✅ Proper error handling (graceful degradation)
✅ Connection pooling (efficient resource usage)
✅ Serverless optimization (bufferCommands: false)
✅ Performance optimization (lean queries, HTTP caching)
✅ Type safety (TypeScript strict mode)

## Production Checklist

- [x] Connection caching implemented
- [x] Connection validation before reuse
- [x] Proper timeout settings
- [x] Connection pool sizing
- [x] Error handling and logging
- [x] HTTP caching headers
- [x] Lean queries for read operations
- [x] TypeScript strict mode compliance
- [x] Webpack optimization for serverless
- [x] Environment variable validation

## References

- [Mongoose Next.js Guide](https://mongoosejs.com/docs/nextjs.html)
- [Vercel MongoDB Connection](https://github.com/vercel/next.js/discussions/12229)
- [MongoDB Connection Pooling](https://www.mongodb.com/docs/manual/core/connection-pooling/)

---

**Last Updated:** 2025-10-18
**Mongoose Version:** 8.x
**Next.js Version:** 14.x
