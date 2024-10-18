import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import BookRatingPage from "./components/BookRatingPage/BookRatingPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/book-rating" element={<BookRatingPage />}></Route>
    </Routes>
  );
};

export default App;
