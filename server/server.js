require("dotenv").config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const db = require("./db");
const port = process.env.PORT || 3008;

app.use(cors());
app.use(express.json());

//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  
  try {
    //const results = await db.query("select * from restaurants");
    
    const restaurantRatingsData = await db.query("SELECT * from restaurants left join (select restaurant_id,COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id;");
    //console.log("results", results);
    //console.log("restaurant data",restaurantRatingsData);

// console.log(results.rows);
 //console.log("route handler ran ");
  res.status(200).json({
   status: "success",
   results: restaurantRatingsData.rows.length,
   data: {
    restaurants: restaurantRatingsData.rows,
   }
 })
 }
 catch (err) {
   console.log(err);
 }
});

//get single restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
 //console.log(req.params);
 try {
  const results = await db.query("SELECT * from restaurants left join (select restaurant_id,COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1;",[req.params.id]);
  //console.log(results.rows[0]);
   const reviews = await db.query("select * from reviews where restaurant_id =$1", [req.params.id]);
  res.status(200).json({
  status: "success",
  data: {
    restaurant: results.rows[0],
    reviews: reviews.rows
  }
 })
 } catch (error) {
    console.log(error);
  }


 
 
});

// Create a restaurant
app.post("/api/v1/restaurants", async (req, res)=> {
 //console.log(req.body);
 try {
  const results = await db.query("INSERT INTO restaurants(name,location,price_range) values($1,$2,$3) returning *", [req.body.name, req.body.location, req.body.price_range]);
   res.status(201).json({
  status: "success",
  data: {
   restaurant: results.rows[0]
  }
 })
 } catch (err) {
  console.log(err);
  
 }


});

// update restaurant

app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
   const results = await db.query("UPDATE restaurants SET name = $1, location =$2, price_range=$3 where id = $4 returning *",[req.body.name,req.body.location,req.body.price_range,req.params.id])
  //console.log(results.rows[0]);
 //console.log(req.body);
   res.status(200).json({
     status: "success",
     data: {
       restaurant: results.rows[0]
     }
   });
 } catch (err) {
  console.log(err);
 }
 
});
//delete a restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants where id=$1", [req.params.id]);
    res.status(204).json({
  status: "success",
 })
  }
  catch (err) {
    console.log(err);
  }
 
})
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query("INSERT INTO reviews(restaurant_id,name,review,rating) values ($1,$2,$3,$4) returning *", [req.params.id, req.body.name, req.body.review, req.body.rating]);
     console.log(newReview);
    res.status(201).json({
      status: "success",
      data:{
        review: newReview.rows[0],
      },

    })
   
    
  } catch (error) {
    console.log(error);
  }
})


app.listen(port, () => {
 console.log(`server is up and listening on port ${port}`);
});

