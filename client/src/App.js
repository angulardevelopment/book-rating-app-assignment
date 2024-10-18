import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import BookRatingPage from "./components/BookRatingPage/BookRatingPage";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Follow Us</h4>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: contact@yourcompany.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/book-rating" element={<BookRatingPage />}></Route>
      </Routes>
      <Footer /> {/* Enhanced Footer is added here */}
    </div>
  );
};

export default App;

