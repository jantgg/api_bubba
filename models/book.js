// models/book.js

class Book {
    constructor(title, author, year, genre, description, fav, url) {
        if (typeof title !== 'string') {
            throw new Error('El título debe ser una cadena');
        }
        if (typeof author !== 'string') {
            throw new Error('El autor debe ser una cadena');
        }
        if (typeof year !== 'number') {
            throw new Error('El año debe ser un número');
        }
        if (typeof genre !== 'string') {
            throw new Error('El género debe ser una cadena');
        }
        if (typeof description !== 'string') {
            throw new Error('La descripción debe ser una cadena');
        }
        if (typeof fav !== 'boolean') {
            throw new Error('Favorito debe ser un valor booleano');
        }
        if (typeof url !== 'string') {
            throw new Error('La URL de la imagen debe ser una cadena');
        }

        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;
        this.description = description;
        this.fav = fav;
        this.url = url;
    }
}

module.exports = Book;
