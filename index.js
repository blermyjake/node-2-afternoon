require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive =require('massive');
const products_controller = require('./products_controller');

const app = express();
app.use( bodyParser.json() );

// Using the CONNECTION_STRING, we can invoke massive and pass it in as the first argument. This will return a promise.We'll want to execute some logic when the promise is fulfilled, so let's chain a .then to it. Be sure to capture the database instance in the first parameter. Now that we have the dbInstance, we can set it onto app. Let's have our function return app.set('db', dbInstance).
massive( process.env.CONNECTION_STRING ).then (dbInstance => {app.set('db', dbInstance)
})
// Finally, we need to add a .catch so that we can console.log any error we might receive. Do so by chaining .catch after the .then. The .catch takes a callback function. Name the callback function parameter err. If .catch is invoked, err will be the error that was received. Add a console.log to log the error.
.catch( err => console.log(err) );

app.get('/api/products', products_controller.getAll);
app.get('/api/product/:id', products_controller.getOne);
app.put('/api/product/:id', products_controller.update);
app.post('/api/product/', products_controller.create);
app.delete('/api/product/:id', products_controller.delete);

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);});


