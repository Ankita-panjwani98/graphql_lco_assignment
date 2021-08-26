import React, { useContext, useState } from "react";

import BookDetails from "./BookDetails";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../queries/queries";
import styles from "../books/BookList.module.css";
import {ThemeContext} from '../../App';

function BookList() {
  const { data, loading } = useQuery(GET_BOOKS);
    const [bookSelected, setBookSelected] = useState('');

//   const [darkMode, setdarkMode] = useState(null);

// const dark =  JSON.parse(localStorage.getItem('mode'));
// console.log("mode", dark);


//   const darkmodeValue = (mode) =>{
      
//       setdarkMode(!mode);
//   }
//   console.log("Mode", darkMode);


const {darkModeTheme } = useContext(ThemeContext);

const[ dark, setMode] = darkModeTheme;




    const handleBookDetail = (id) => {
        setBookSelected(id);
    }
  function displayBooks() {
    if (loading) {
      return <div>Loading...</div>;
    } else {
      return data.books.map((book) => {
        return (
          <>
            <li  
            className={ dark ? `${styles.booksList} ${styles.darkModeList}`: `${styles.booksList}`}
            
            key={book.id} onClick={()=> handleBookDetail(book.id)}>{book.name}</li>
          </>
        );
      });
    }
  }

  

  return (
    <div className={ dark ? `${styles.BooksContainer} ${styles.darkMode}`: `${styles.BooksContainer}`}>
      <h1 className={styles.heading}>Books List</h1>
      <div>
        <ul>{displayBooks()}</ul>
        <BookDetails  bookid={bookSelected} />
      </div>
    </div>
  );
}

export default BookList;
