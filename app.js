const express = require('express');
const app = express();
const Book = require('./models/book');


app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Prueba');
});

app.listen(PORT, () => {
    console.log(`Servidor up puerto ${PORT}`);
});

const admin = require('firebase-admin');
const serviceAccount = require('./config/apiprueba-7648e-firebase-adminsdk-h6dnn-688040e53d.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

//END POINTS -----------------------------------------------------------------
app.get('/books', async (req, res) => {
    try {
        const booksRef = db.collection('books');
        const snapshot = await booksRef.get();
        const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(books);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await db.collection('books').doc(id).get();

        if (!book.exists) {
            res.status(404).send('Libro no encontrado');
        } else {
            res.status(200).json({ id: book.id, ...book.data() });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.post('/books', async (req, res) => {
    try {
        const { title, author, year, genre, description, fav, url } = req.body;
        const newBook = new Book(title, author, year, genre, description, fav, url);

        const addedBookRef = await db.collection('books').add({
            title: newBook.title,
            author: newBook.author,
            year: newBook.year,
            genre: newBook.genre,
            description: newBook.description,
            fav: newBook.fav,
            url: newBook.url
        });

        res.status(201).json({ 
            message: 'Libro creado con éxito', 
            book: { id: addedBookRef.id, ...newBook }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = req.body;
        await db.collection('books').doc(id).set(updatedBook, { merge: true });

        res.status(200).send(`Libro con ID: ${id} actualizado`);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection('books').doc(id).delete();

        res.status(200).send(`Libro con ID: ${id} eliminado`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

