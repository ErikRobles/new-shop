import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log('Already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Use Previous Connection');
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log('New Connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
      console.log('Disconnected');
    } else {
      console.log('Not Disconnected');
    }
  }
}

function convertDocToObj(doc) {
  if (doc._id) {
    doc._id = doc._id.toString();
  }
  if (doc.createdAt) {
    doc.createdAt = doc.createdAt.toString();
  }
  if (doc.updatedAt) {
    doc.updatedAt = doc.updatedAt.toString();
  }
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
