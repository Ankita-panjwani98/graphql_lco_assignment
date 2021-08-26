const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');
const app = express();


app.use(cors());
app.get('/', (req,res)=>{
    res.send("UP and running with grphql crash course!!");
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

//  Mongoose Connectivity
mongoose.connect(
    "mongodb+srv://ankita:ankita@cluster0.3kddv.mongodb.net/gql-ninja?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) return console.log(err.message);
      console.log("Database Connected!");
      app.listen(4000, () => {
        console.log("Server listening to the port 4000");
      });
    }
  );
  
 

// app.listen(4000,()=>{
//     console.log("Server running at port 4000! ");
// })