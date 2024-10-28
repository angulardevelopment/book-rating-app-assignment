import './Books.css'

function Books({ image, title, author, rating }) {
    return (
        <div className="book-card">
            <img src={image} alt={title} />
            <h2>Title : {title}</h2>
            <h3>Author : {author}</h3>
            <h2>Rating : {rating}</h2>
        </div>
    )
}

export default Books;
