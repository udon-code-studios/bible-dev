// code taken from https://www.mongodb.com/developer/how-to/nextjs-with-mongodb/

import { MongoClient } from 'mongodb'

let uri = process.env.MONGODB_URI
let dbName = process.env.MONGODB_DB
let cachedClient = null
let cachedDb = null

if (!uri) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

if (!dbName) {
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env.local'
    )
}

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb }
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const db = await client.db(dbName)

    cachedClient = client
    cachedDb = db

    return { client, db }
}

// mongo: takes a collection and returns the array of items in that collection on the mongodb database
export default async function mongo(collection, find = {}) {
    const { db } = await connectToDatabase();
    const data = await db.collection(collection)
        .find(find)
        .toArray();
    return JSON.parse(JSON.stringify(data));
}