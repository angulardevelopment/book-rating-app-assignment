import React, { useEffect, useState } from "react";
import useSearchParams from "react-router-dom";
import "./bookrating.css";

function BookRatingForm() {

  // Dummy data
  const dummy = [
    {
      bookRatingId: "book-xyz789-5678",
      title: "The Secrets of JavaScript",
      author: "John Doe",
      publisher: "TechWorld Publishing",
      publishedDate: "2023-05-12",
      edition: "2nd",
      summary: "An in-depth guide to mastering JavaScript, covering both fundamentals and advanced concepts.",
      pageCounts: 350,
      ratings: "Good",
      review: "A comprehensive resource for anyone looking to deepen their JavaScript knowledge.",
      reviewDate: "2024-10-01"
    },
    {
      bookRatingId: "book-klmn456-9876",
      title: "Mastering CSS: From Basics to Advanced",
      author: "Jane Smith",
      publisher: "DesignPro Books",
      publishedDate: "2022-09-25",
      edition: "1st",
      summary: "This book provides a complete guide to CSS, helping readers create visually stunning web designs.",
      pageCounts: 280,
      ratings: 4.7,
      review: "A fantastic resource for web designers and developers looking to sharpen their CSS skills.",
      reviewDate: "2024-08-15"
    }
  ];
  

  // Rating enums
  const ratingList = [
    {icon : "🤩", value : "Great"}, 
    {icon : "😁", value : "Good"}, 
    {icon : "😀", value : "Okay"}, 
    {icon : "😬", value : "Bad"}, 
    {icon : "😰", value : "Terrible"}
  ]

  // Rating 
  const [rating, setRating] = useState({
    bookRatingId:"",
    title:"",
    author:"",
    publisher:"",
    publishedDate:"",
    edition:"",
    summary:"",
    pageCounts:"",
    ratings:"",
    review:"",
    reviewDate:""
  });

  const params = new URLSearchParams(window.location.search);

  useEffect(()=>{
    // Preset book details when entering the page if it has book rating id
    const bookRatingId = params.get("bookRatingId");
    if(bookRatingId){
       // Check if params has bookRatingId then set the data
       setRating((prevState)=>{
        const updatedBookRatings = dummy.find((data) => data.bookRatingId === bookRatingId);
        if(updatedBookRatings){
            return updatedBookRatings;
        } else {
            alert("No book was found");
            return prevState;
        }
       })
    }
  }, [])

  function generatebookRatingId() {
    // Generate a random book id which combines with the current timestamp
    const randomPart = Math.random().toString(36).substring(2, 8); // Random string of 6 characters
    const timestampPart = Date.now().toString(36); // Current timestamp in base 36
    
    return `book-${randomPart}-${timestampPart}`;
  }

  function handleInput(key, value){
    // Set input value
    setRating((prevState)=>{
        // Update the state with the new value
        const updatedBookRatings = {...prevState, [key]: value };
        return updatedBookRatings;
    })
  }

  function saveRating(){
    let bookRatingId = rating.bookRatingId;
    const title = rating.title;
    const author = rating.author;
    const publisher = rating.publisher;
    const publishedDate = rating.publishedDate;
    const edition = rating.edition;
    const summary = rating.summary;
    const pageCounts = rating.pageCounts;
    const ratings = rating.ratings;
    const review = rating.review;
    const reviewDate = rating.reviewDate;

    const bookRatingIdParams = params.get("bookRatingId");

    if (bookRatingIdParams) {
        // Update case when Id is valid, bookRatingId will not be empty, create API will be called here if Id is invalid
        if (bookRatingId) {
            alert(`Update successfully!`);

            // Your update API call here

        } else {
          bookRatingId = generatebookRatingId();
          alert(`Rated book successfully, here is your book rating ID: ${bookRatingId}`);

          // Your create API call here if needed

        }
      } else {
        // Save case when id is not present
        bookRatingId = generatebookRatingId();
        alert(`Rated book successfully, here is your book rating ID: ${bookRatingId}`);
        
        // Your create API call here

      }
  }

  return (
    <div className="book-rating-form-container">
     <div className="book-rating-form-content">
       <div className="question-container">
            <label className="question">1. Book title</label>
            <input 
                className="answer"
                type="text"
                placeholder="title"
                value={rating.title}
                onChange={(e) => handleInput("title", e.target.value)}
            />
       </div>
       <div className="question-container">
            <label className="question">2. Author</label>
            <input 
                className="answer"
                type="text"
                placeholder="author"
                value={rating.author}
                onChange={(e) => handleInput("author", e.target.value)}
            />
       </div>
       <div className="question-container">
            <label className="question">3. Publisher</label>
            <input 
                className="answer"
                type="text"
                placeholder="publisher"
                value={rating.publisher}
                onChange={(e) => handleInput("publisher", e.target.value)}
            />
       </div>
       <div className="question-container">
            <label className="question">4. Published Date</label>
            <input 
                className="answer"
                type="date"
                placeholder="published date"
                value={rating.publishedDate}
                onChange={(e) => handleInput("publishedDate", e.target.value)}
            />
       </div>
       <div className="question-container">
            <label className="question">5. Edition</label>
            <input 
                className="answer"
                type="text"
                placeholder="edition"
                value={rating.edition}
                onChange={(e) => handleInput("edition", e.target.value)}
            />
       </div>
       <div className="question-container">
            <label className="question">6. Summary</label>
            <textarea 
                className="answer description-container"
                type="text"
                placeholder="summary"
                value={rating.summary}
                onChange={(e) => handleInput("summary", e.target.value)}
            />
       </div>
       <div className="question-container">
            <label className="question">7. Page Counts</label>
            <input 
                className="answer"
                type="number"
                placeholder="page counts"
                value={rating.pageCounts}
                onChange={(e) => handleInput("pageCounts", e.target.value)}
            />
       </div>
       <div className="question-container">
            <label className="question">8. Ratings</label>
            <div className="rating-container">
                {ratingList.map((list, index) => {
                    const icon = list.icon;
                    const value = list.value;
                    return(
                        <div 
                            key={index}
                            className={`rating-box ${rating.ratings === value ? "selected-rating-box" : ""}`}
                            onClick={(e) => handleInput("ratings", value)}
                        >
                            <div className="rating-icon">{icon}</div>
                            <label className="rating-text">{value}</label>
                        </div>
                    )
                })}
            </div>
       </div>
       <div className="question-container">
            <label className="question">9. Review</label>
            <textarea 
                className="answer description-container"
                placeholder="review"
                value={rating.review}
                onChange={(e) => handleInput("review", e.target.value)}
            />
       </div>
       <div className="question-container">
            <label className="question">10. Review Date</label>
            <input 
                className="answer"
                type="date"
                placeholder="review date"
                value={rating.reviewDate}
                onChange={(e) => handleInput("reviewDate", e.target.value)}
            />
       </div>
     </div>
     <div className="book-rating-action-container"> 
        <div 
            className="save-button"
            onClick={() => saveRating()}
        >
            Save
        </div>
     </div>
    </div>
  );
}

export default BookRatingForm;
