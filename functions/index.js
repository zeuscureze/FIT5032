const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors");
const functions = require('firebase-functions');
admin.initializeApp();// 初始化 Firebase Admin SDK

const corsMiddleware = cors({origin: true});

// Cloud Function to count the number of books in the "books" collection
exports.countBooks = onRequest((req, res) => {
  corsMiddleware(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.capitalizeBookData = functions.firestore
  .document("books/{bookId}")
  .onCreate((snap, context) => {
    const newValue = snap.data();
    const capitalizedData = {
      isbn: newValue.isbn.toString().toUpperCase(),
      name: newValue.name.toUpperCase(),
    };

    return snap.ref.update(capitalizedData);
  });
exports.getAllBooks = functions.https.onRequest(async (req, res) => {
  try {
    console.log("Fetching books from Firestore...");
    const booksCollection = await admin.firestore().collection("books").get();
    const books = booksCollection.docs.map((doc) => doc.data());
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books: ", error);
    res.status(500).send("Error fetching books: " + error.message);
  }
});
