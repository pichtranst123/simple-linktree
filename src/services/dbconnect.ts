import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://freeuibos:123123123@linktree.7ejndde.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  export async function connectToDatabase() {
    try {
      await client.connect();
      console.log("Successfully connected to MongoDB.");
      return client;
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      process.exit(1);
    }
  }
