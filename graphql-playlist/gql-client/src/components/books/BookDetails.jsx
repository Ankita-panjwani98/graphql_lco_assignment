import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK_QUERY } from "../../queries/queries";
import { Switch } from "@material-ui/core";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import styles from "../books/BookDetails.module.css";
import { useState } from "react";
import { useEffect } from "react";
import {ThemeContext} from '../../App';


function BookDetails(props) {


  const { bookid } = props;

  // const getMode = () =>{

  //   return JSON.parse(localStorage.getItem('mode') )
  //   }
  //   const [dark, setMode] = useState(getMode);
    

  // useEffect(() => {
  //     localStorage.setItem("mode", JSON.stringify(dark))
    
  // }, [dark])

  // const darkModeValue = () => {
  //   setMode(!dark);
  //   sendDarkMode(dark);
  // } 

  const {darkModeTheme } = useContext(ThemeContext);

  const[ dark, setMode] = darkModeTheme;



  console.log("Book Id Clicked: ", bookid);
  const { data } = useQuery(GET_BOOK_QUERY, {
    variables: { id: bookid },
  });


  function displayBook() {
    if (data) {
      const book = data.book;
      console.log("Book Details", book);
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <h3>All Books by this Author.</h3>
          <ul>
            {book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected!</div>;
    }
  }
  return (
    <>
    
      <div  className={ dark ? `${styles.bookDetail} ${styles.darkMode}`: `${styles.bookDetail}`}>
        <div className={styles.nav}>
        
          {dark ? (
            <Brightness7Icon className={styles.sun} />
          ) : (
            <Brightness3Icon className={styles.moon} />
          )}
           <Switch checked={dark} onChange={()=> setMode(!dark)}/>
        </div>

        {/* <darkmode/> */}
        <h1>Output Book Details Here: </h1>
        {displayBook()}
        </div>
     
    </>
  );
}

export default BookDetails;
