import React from "react";
import "./home.css";
import BooksList from "./BooksList";
import { useBooks } from "../../contexts/BooksContext";
import Books from "../Books/Books";

function HomePage() {
  const { query } = useBooks();
  
  const sampleBooks = [
    {
      image: "https://spoo.me/tnetGb",
      title: "Book 1",
      author: "Author 1",
      rating: 4.5
    },
    {
      image: "https://spoo.me/tnetGb",
      title: "Book 2",
      author: "Author 2",
      rating: 4.2
    },
    {
      image: "https://spoo.me/tnetGb",
      title: "Book 3",
      author: "Author 3",
      rating: 4.0
    }
  ];

  return <div>{query?.length > 3 ? <BooksList /> : 
  (
    <div id="sampleBooks">
          {sampleBooks.map((book, index) => (
            <Books
              key={index}
              image={book.image}
              title={book.title}
              author={book.author}
              rating={book.rating}
            />
          ))}
        </div>
  )
  }</div>;
}

export default HomePage;
