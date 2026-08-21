// MongoDB Fundamentals Assignment
// Library Management System
// Database: LibraryDB

use LibraryDB

// Create collections
db.createCollection("Books")
db.createCollection("Authors")
db.createCollection("Genres")

// Insert books
db.Books.insertMany([
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        year: 1988,
        available: true
    },
    {
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        genre: "Biography",
        year: 1999,
        available: true
    },
    {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        year: 1949,
        available: false
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        genre: "Fantasy",
        year: 1997,
        available: true
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        year: 1937,
        available: true
    }
])

// Insert authors
db.Authors.insertMany([
    { name: "Paulo Coelho", country: "Brazil", books: 1 },
    { name: "A.P.J. Abdul Kalam", country: "India", books: 1 },
    { name: "George Orwell", country: "United Kingdom", books: 1 },
    { name: "J.K. Rowling", country: "United Kingdom", books: 1 },
    { name: "J.R.R. Tolkien", country: "United Kingdom", books: 1 }
])

// Insert genres
db.Genres.insertMany([
    { name: "Fiction", description: "Imaginary or invented stories" },
    { name: "Biography", description: "Life story of a person" },
    { name: "Dystopian", description: "Stories involving an imagined undesirable society" },
    { name: "Fantasy", description: "Stories involving magical or imaginary elements" }
])

// READ - all books
db.Books.find()

// Search by title
db.Books.find({
    title: "The Alchemist"
})

// Search by author
db.Books.find({
    author: "Paulo Coelho"
})

// Search by genre
db.Books.find({
    genre: "Fantasy"
})

// Search available books
db.Books.find({
    available: true
})

// Books published after 1950
db.Books.find({
    year: { $gt: 1950 }
})

// Books published before 1950
db.Books.find({
    year: { $lt: 1950 }
})

// Books published between 1950 and 2000
db.Books.find({
    year: {
        $gte: 1950,
        $lte: 2000
    }
})

// Available Fantasy books
db.Books.find({
    genre: "Fantasy",
    available: true
})

// Fantasy OR Fiction
db.Books.find({
    $or: [
        { genre: "Fantasy" },
        { genre: "Fiction" }
    ]
})

// Regular expression search
db.Books.find({
    title: {
        $regex: "The",
        $options: "i"
    }
})

// Projection
db.Books.find(
    {},
    {
        title: 1,
        author: 1,
        _id: 0
    }
)

// Sort by year ascending
db.Books.find().sort({
    year: 1
})

// Sort by year descending
db.Books.find().sort({
    year: -1
})

// Limit results
db.Books.find().limit(3)

// UPDATE ONE
db.Books.updateOne(
    { title: "1984" },
    {
        $set: {
            available: true
        }
    }
)

// UPDATE MANY
db.Books.updateMany(
    { genre: "Fantasy" },
    {
        $set: {
            category: "Popular Fiction"
        }
    }
)

// DELETE ONE
db.Books.deleteOne({
    title: "1984"
})

// DELETE MANY
db.Books.deleteMany({
    available: false
})

// COUNT
db.Books.countDocuments()

// Count Fantasy books
db.Books.countDocuments({
    genre: "Fantasy"
})

// INDEXES
db.Books.createIndex({
    author: 1
})

db.Books.createIndex({
    title: 1
})
