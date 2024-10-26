import { createContext, useEffect, useContext, useReducer } from "react";

const BooksContext = createContext();

const initialState = {
  books: [],
  query: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "books/loaded":
      return { ...state, books: action.payload };

    case "query/typed":
      return { ...state, query: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function BooksProvider({ children }) {
  const [{ books, query }, dispatch] = useReducer(reducer, initialState);

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchBooks() {
        try {
          const res = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${
              query.length > 3 ? query : ""
            }+intitle`,
            { signal: controller.signal }
          );
          const data = await res.json();
          console.log(data.items);
          const volumeInfo = data.items
            .map((info) => {
              return { ...info.volumeInfo, id: info.id };
            })
            .filter((info) => info.title !== undefined)
            .filter((info) => info.imageLinks !== undefined)
            .filter((info) => info.authors?.length !== 0);
          console.log(volumeInfo);
          dispatch({ type: "books/loaded", payload: data });
        } catch (err) {
          if (err.name !== "AbortError") console.log(err);
        }
      }

      if (query.length < 3) {
        dispatch({ type: "books/loaded", payload: [] });
        return;
      }
      fetchBooks();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  function handleSearch(e) {
    e.preventDefault();
    dispatch({ type: "query/typed", payload: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <BooksContext.Provider
      value={{
        books,
        query,
        handleSearch,
        handleSubmit,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

function useBooks() {
  const context = useContext(BooksContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { BooksProvider, useBooks };
