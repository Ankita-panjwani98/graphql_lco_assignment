import BookList from "./components/books/BookList";
import AddBook from "./components/addBooks/AddBook";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import styles from "./components/addBooks/AddBook.module.css";
import { createContext, useState } from "react";



export const ThemeContext = createContext();

function App() {
  
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  // console.log("dark mode value", darkMode);
  const [darkMode, setDarkMode] = useState(false);



  return (
    <ThemeContext.Provider
    value={{
      darkModeTheme: [darkMode, setDarkMode]
    }}
    >   
       <ApolloProvider client={client}>
      <div
         className={ darkMode ? `${styles.main} ${styles.darkMode}`: `${styles.main}`}>
        <AddBook />
        <BookList />
      </div>
    </ApolloProvider>
    </ThemeContext.Provider>

  );
}

export default App;
