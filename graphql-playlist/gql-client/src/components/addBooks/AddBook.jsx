import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import styles from "../addBooks/AddBook.module.css";
import { GET_AUTHORS , ADD_BOOK, GET_BOOKS} from "../../queries/queries";
import {ThemeContext} from '../../App';

const initialstate = {
  bookName: "",
  bookGenre: "",
  authorId: "",
};
function AddBook() {
 

  const { data, loading } = useQuery(GET_AUTHORS);
  const [addBookData] = useMutation(ADD_BOOK);

  // console.log("authors: ",data );
  const [bookData, setBookData] = useState(initialstate);

  const {darkModeTheme } = useContext(ThemeContext);

  const[ dark, setMode] = darkModeTheme;
  
  
    

  function displayAuthors() {
    if (loading) {
      return <option disabled>Loading Authors....</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option className={styles.options} key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  const handleChange = (event) => {
    event.persist();
    // console.log("Inside submit handler");
    const key = event.target.name;
    const value = event.target.value;
    setBookData((inputs) => ({
      ...inputs,
      [key]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle change", bookData);
    addBookData({
        variables:{
        name: bookData.bookName,
        genre: bookData.bookGenre,
        authorId: bookData.authorId
    },
    refetchQueries: [{query: GET_BOOKS}]
    });
  };
  return (
    <div 
     className={ dark ? `${styles.addBookFormContainer} ${styles.darkModeDiv}`: `${styles.addBookFormContainer}`}>
      <form onSubmit={handleSubmit} 
       className={ dark ? `${styles.addForm} ${styles.darkModeButton}`: `${styles.addForm}`}
      >
        <div
          className={ dark ? `${styles.field} ${styles.darkModeLabel}`: `${styles.field}`}
        >
          <label>Book Name:</label>
          <input type="text" name="bookName" onChange={handleChange} />
        </div>
        <div  className={ dark ? `${styles.field} ${styles.darkModeLabel}`: `${styles.field}`}>
          <label>Genre:</label>
          <input type="text" name="bookGenre" onChange={handleChange} />
        </div>
        <div  className={ dark ? `${styles.field} ${styles.darkModeLabel}`: `${styles.field}`}>
          <label>Author:</label>
          <select name="authorId" onChange={handleChange}>
            <option >Select Author</option>
            {displayAuthors()}
          </select>
        </div>

        <button
         className={ dark ? `${styles.button} ${styles.darkButton}`: `${styles.button}`}
        >+</button>
      </form>
    </div>
  );
}

export default AddBook;
