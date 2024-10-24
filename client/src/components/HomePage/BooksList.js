import { useBooks } from "../../contexts/BooksContext";

import styles from "./Bookslist.module.css";

export default function BooksList() {
  const { books, query } = useBooks();
  console.log(books.items);
  return (
    <>
      <div>
        {query?.length > 3 && (
          <ul className={styles["books-list"]}>
            {books.items?.map((book, i) => (
              <Books book={book} key={i} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function Books({ book }) {
  book = book.volumeInfo;
  return (
    <li className={styles.books}>
      <img src={book.imageLinks?.thumbnail} alt={book.title} />
      <div className={styles["brief-details"]}>
        <h2 className={styles.title}>{book.title}</h2>
        {book.authors && (
          <div className={styles["author"]}>
            <span>{`Authors:  `}</span>
            <span>{` ${book.authors?.splice(0).join(", ")}`}</span>
          </div>
        )}
        {book.categories && (
          <div>
            <span className={styles["categories"]}>{`Categories:  `}</span>
            <span className={styles["categories"]}>{`${book.categories
              ?.splice(0)
              .join(", ")}`}</span>
          </div>
        )}
        <div className={styles["extra-info"]}>
          <div>Language: {book.language}</div>
          {book.averageRating && <div>Rating: {book.averageRating}/5</div>}
        </div>
      </div>
    </li>
  );
}
