import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// Define a global type to cache the connection
declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: typeof mongoose | null;
}

// Assign default if not already defined (only in development)
global.mongooseConn ||= null;

export async function connectToDatabase() {
  if (global.mongooseConn) return global.mongooseConn;

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      dbName: 'mental_health', // optional: use your db name
    });
    global.mongooseConn = conn;
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
