import React from "react";
import "./home.css";
import BooksList from "./BooksList";
import { useBooks } from "../../contexts/BooksContext";
function HomePage() {
  const { query } = useBooks;
  return (
    <div>
      <h1>HomePage</h1>
      <BooksList />
    </div>
  );
}

export default HomePage;
