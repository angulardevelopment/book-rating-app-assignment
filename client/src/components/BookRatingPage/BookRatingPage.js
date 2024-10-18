import React from "react";
import "./bookrating.css";
import BookRatingForm from "./BookRatingForm";

function BookRatingPage() {
  return (
    <div className="book-rating-container">
        <div className="book-rating-title-container">
            <div className="book-rating-title-content">
                <span className="book-rating-title">Literary Impressions : Your Book Rating & Survey</span>
                <span className="book-rating-title-description">Share your thoughts and rate the books that left a lasting impression on you!</span>
            </div>
         </div>
        <BookRatingForm/>
    </div>
  );
}

export default BookRatingPage;
