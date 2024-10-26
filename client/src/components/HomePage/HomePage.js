import React from "react";
import "./home.css";
import BooksList from "./BooksList";
import { useBooks } from "../../contexts/BooksContext";
import Background from "./Background";
function HomePage() {
  const { query } = useBooks();
  return <div>{query?.length > 3 ? <BooksList /> : <Background />}</div>;
}

export default HomePage;
