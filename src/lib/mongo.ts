import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.warn("MONGODB_URI not set; database features will be disabled.");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var _mongoose: MongooseCache | undefined;
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectMongo() {
  if (cached?.conn) return cached.conn;
  if (!cached?.promise) {
    if (!uri) {
      throw new Error("MONGODB_URI not configured");
    }
    cached!.promise = mongoose.connect(uri, { dbName: process.env.MONGODB_DB || "usmle" });
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}
