import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb';

const uri = "mongodb+srv://freeuibos:123123123@linktree.7ejndde.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToDatabase(): Promise<Collection> {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB.");

    // Assuming your database is named 'linktree'
    const db: Db = client.db('linktree');
    
    // And your collection is named 'users'
    const usersCollection: Collection = db.collection('users');
    return usersCollection;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}