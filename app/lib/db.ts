import mongoose, { Mongoose } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });


const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Extend the global interface to include mongoose property
declare global {
  // Namespace for Node.js-specific globals
  namespace NodeJS {
    interface Global {
      mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
    }
  }
}

// Create a cached connection for Mongoose
interface CachedMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Use the global object with explicit type
const globalWithMongoose = global as typeof global & { mongoose?: CachedMongoose };

// Initialize cache if it doesn't exist
if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongoose;

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('Database connected');
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('Database connection failed:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset the promise to allow retries
    throw error;
  }

  return cached.conn;
}

// console.log('db.ts imported in:', typeof window === 'undefined' ? 'server' : 'client');

export default dbConnect;