# MongoDB Fundamentals – Library Management System

## 1. Introduction

MongoDB is a popular open-source NoSQL database management system designed to store and manage data in a flexible and scalable manner. Unlike traditional relational databases that store information in rows and columns, MongoDB stores data in documents using BSON (Binary JSON).

This assignment demonstrates MongoDB fundamentals through a simple Library Management System. It covers MongoDB installation and configuration, the document-oriented data model, database and collection creation, CRUD operations, searching and filtering documents, updating and deleting records, indexing, and the importance of NoSQL databases in modern applications.

## 2. Objectives

- Understand MongoDB and NoSQL concepts.
- Understand databases, collections, documents, and fields.
- Learn the MongoDB document data model.
- Perform Create, Read, Update, and Delete operations.
- Build a simple Library Management database.
- Search books using different criteria.
- Use filtering, sorting, projection, and indexing.
- Understand the importance of NoSQL in modern applications.

## 3. What is NoSQL?

NoSQL stands for "Not Only SQL." NoSQL databases are designed to handle data that may be flexible, semi-structured, or distributed across large systems.

Common types include:

1. Document databases — MongoDB, CouchDB
2. Key-value databases — Redis
3. Column-family databases — Apache Cassandra
4. Graph databases — Neo4j

MongoDB is a document-oriented NoSQL database.

## 4. What is MongoDB?

MongoDB is an open-source, cross-platform, document-oriented NoSQL database. It stores data in flexible BSON documents rather than traditional rows and columns.

Example:

```javascript
{
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    year: 1988,
    available: true
}
```

## 5. Features of MongoDB

### Document-Oriented
MongoDB stores data as documents, allowing complex data structures to be represented naturally.

### Flexible Schema
Documents in the same collection can have different fields when required.

### Scalability
MongoDB supports horizontal scaling through sharding.

### High Performance
Indexes and document-based storage provide efficient data access.

### Replication
Replica sets provide redundancy and high availability.

### Rich Query Language
MongoDB supports filtering, sorting, updating, aggregation, and other operations.

## 6. MongoDB Data Model

MongoDB follows this hierarchy:

**MongoDB Server → Database → Collection → Document → Field**

### Database
A database contains collections.

Example: `LibraryDB`

### Collection
A collection is similar to a table in a relational database.

Examples:

- `Books`
- `Authors`
- `Genres`

### Document
A document is similar to a row but has a flexible structure.

### Field
A field represents a property inside a document, such as `title`, `author`, `genre`, or `year`.

## 7. Installation and Configuration

Basic steps:

1. Download MongoDB Community Server.
2. Install MongoDB.
3. Install MongoDB Compass if a graphical interface is required.
4. Start the MongoDB server.
5. Open MongoDB Shell or MongoDB Compass.
6. Connect using:

```text
mongodb://localhost:27017
```

## 8. Library Management System

The database used in this assignment is:

```text
LibraryDB
```

Collections:

```text
LibraryDB
├── Books
├── Authors
└── Genres
```

The Books collection contains information such as title, author, genre, publication year, and availability.

## 9. Creating the Database and Collections

```javascript
use LibraryDB

db.createCollection("Books")
db.createCollection("Authors")
db.createCollection("Genres")
```

## 10. Insert Operations

### Insert One Book

```javascript
db.Books.insertOne({
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    year: 1988,
    available: true
})
```

### Insert Multiple Books

```javascript
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
```

## 11. Insert Authors

```javascript
db.Authors.insertMany([
    { name: "Paulo Coelho", country: "Brazil", books: 1 },
    { name: "A.P.J. Abdul Kalam", country: "India", books: 1 },
    { name: "George Orwell", country: "United Kingdom", books: 1 },
    { name: "J.K. Rowling", country: "United Kingdom", books: 1 },
    { name: "J.R.R. Tolkien", country: "United Kingdom", books: 1 }
])
```

## 12. Insert Genres

```javascript
db.Genres.insertMany([
    { name: "Fiction", description: "Imaginary or invented stories" },
    { name: "Biography", description: "Life story of a person" },
    { name: "Dystopian", description: "Stories involving an imagined undesirable society" },
    { name: "Fantasy", description: "Stories involving magical or imaginary elements" }
])
```

## 13. Read Operations

### Display All Books

```javascript
db.Books.find()
```

### Display Books in Readable Format

```javascript
db.Books.find().pretty()
```

## 14. Search Books by Title

```javascript
db.Books.find({
    title: "The Alchemist"
})
```

## 15. Search Books by Author

```javascript
db.Books.find({
    author: "Paulo Coelho"
})
```

## 16. Search Books by Genre

```javascript
db.Books.find({
    genre: "Fantasy"
})
```

## 17. Search Available Books

```javascript
db.Books.find({
    available: true
})
```

## 18. Search by Publication Year

Books published after 1950:

```javascript
db.Books.find({
    year: { $gt: 1950 }
})
```

Books published before 1950:

```javascript
db.Books.find({
    year: { $lt: 1950 }
})
```

Books published between 1950 and 2000:

```javascript
db.Books.find({
    year: {
        $gte: 1950,
        $lte: 2000
    }
})
```

Operators:

- `$gt` — greater than
- `$lt` — less than
- `$gte` — greater than or equal to
- `$lte` — less than or equal to

## 19. Multiple Conditions

Find available Fantasy books:

```javascript
db.Books.find({
    genre: "Fantasy",
    available: true
})
```

## 20. OR Condition

```javascript
db.Books.find({
    $or: [
        { genre: "Fantasy" },
        { genre: "Fiction" }
    ]
})
```

## 21. Regular Expression Search

Find titles containing "The":

```javascript
db.Books.find({
    title: {
        $regex: "The",
        $options: "i"
    }
})
```

The `i` option makes the search case-insensitive.

## 22. Projection

Display only title and author:

```javascript
db.Books.find(
    {},
    {
        title: 1,
        author: 1,
        _id: 0
    }
)
```

## 23. Sorting

Ascending order:

```javascript
db.Books.find().sort({
    year: 1
})
```

Descending order:

```javascript
db.Books.find().sort({
    year: -1
})
```

Here, `1` means ascending and `-1` means descending.

## 24. Limiting Results

```javascript
db.Books.find().limit(3)
```

## 25. Update Operations

Update one book:

```javascript
db.Books.updateOne(
    { title: "1984" },
    {
        $set: {
            available: true
        }
    }
)
```

Update multiple books:

```javascript
db.Books.updateMany(
    { genre: "Fantasy" },
    {
        $set: {
            category: "Popular Fiction"
        }
    }
)
```

## 26. Delete Operations

Delete one book:

```javascript
db.Books.deleteOne({
    title: "1984"
})
```

Delete unavailable books:

```javascript
db.Books.deleteMany({
    available: false
})
```

Delete operations should be used carefully because records may not be recoverable without backups.

## 27. Counting Documents

Count all books:

```javascript
db.Books.countDocuments()
```

Count Fantasy books:

```javascript
db.Books.countDocuments({
    genre: "Fantasy"
})
```

## 28. Indexing

Indexes can improve query performance.

Create an index on author:

```javascript
db.Books.createIndex({
    author: 1
})
```

Create an index on title:

```javascript
db.Books.createIndex({
    title: 1
})
```

Indexes are particularly useful for large collections and frequently searched fields.

## 29. CRUD Summary

| Operation | Method | Purpose |
|---|---|---|
| Create | `insertOne()` | Insert one document |
| Create | `insertMany()` | Insert multiple documents |
| Read | `find()` | Retrieve documents |
| Update | `updateOne()` | Update one document |
| Update | `updateMany()` | Update multiple documents |
| Delete | `deleteOne()` | Delete one document |
| Delete | `deleteMany()` | Delete multiple documents |

## 30. MongoDB vs Relational Database

| Feature | Relational Database | MongoDB |
|---|---|---|
| Data model | Tables and rows | Documents and collections |
| Schema | Generally fixed | Flexible |
| Data format | Rows and columns | BSON documents |
| Query language | SQL | MongoDB Query Language |
| Relationships | Tables and joins | Embedded documents/references |
| Scaling | Commonly vertical | Strong horizontal scaling support |
| Examples | MySQL, PostgreSQL | MongoDB |

## 31. Advantages of MongoDB

- Flexible schema
- Horizontal scalability
- High availability through replication
- Efficient document-based access
- Rich query capabilities
- Suitable for large and changing datasets
- Useful for rapid application development

## 32. Limitations of MongoDB

- Poorly designed schemas can cause duplicated data.
- Complex relational operations may be less natural than in SQL.
- Indexes require additional storage.
- Document design requires careful planning.
- MongoDB is not the best choice for every workload.

## 33. Applications of MongoDB

MongoDB can be used in:

- E-commerce applications
- Content management systems
- Social media applications
- Mobile applications
- Internet of Things systems
- Real-time analytics
- Gaming applications
- Product catalog systems
- Cloud applications

## 34. Importance of NoSQL in Modern Applications

Modern applications generate large amounts of structured, semi-structured, and unstructured data. NoSQL databases provide flexible data models and are designed to support scalable and distributed applications.

NoSQL is important because:

1. Modern applications generate large amounts of data.
2. Application data structures can change frequently.
3. Cloud systems require scalability.
4. Distributed systems require high availability.
5. Real-time applications need efficient data access.
6. Modern applications often need horizontal scaling.

MongoDB addresses these requirements through its document model, indexing, replication, and scaling capabilities.

## 35. Library Management System Flow

```text
Library Management System
          |
   +------+------+
   |      |      |
 Books  Authors Genres
   |
 CRUD Operations
   |
+--+--+--+--+
|  |  |  |
C  R  U  D
|
Search / Filter
|
+-------+-------+
|       |       |
Title  Author  Genre
```

## 36. Sample Document

```javascript
{
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    year: 1988,
    available: true
}
```

MongoDB automatically generates an `_id` field for each document.

## 37. Learning Outcomes

After completing this assignment:

- MongoDB's document-oriented architecture was understood.
- Databases, collections, documents, and fields were studied.
- CRUD operations were performed.
- Books were searched using multiple criteria.
- Filtering, sorting, projection, and indexing were demonstrated.
- The role of NoSQL in modern applications was understood.
- A practical Library Management System was implemented.

## 38. Conclusion

MongoDB is a powerful NoSQL database suitable for applications requiring flexibility, scalability, and efficient data management. Its document-oriented structure allows developers to store complex and changing data naturally.

In this assignment, a Library Management System was created using MongoDB. The implementation demonstrated database and collection creation, document insertion, CRUD operations, searching books by title, author and genre, filtering, sorting, projection, updating, deleting, counting, and indexing.

The practical example shows how MongoDB can be used to manage real-world data efficiently. NoSQL databases such as MongoDB are particularly valuable for modern web, mobile, cloud, IoT, and data-intensive applications.

## 39. References

1. MongoDB Documentation
2. MongoDB Manual
3. MongoDB University learning resources
4. NoSQL database concepts
5. Classroom notes and laboratory exercises
