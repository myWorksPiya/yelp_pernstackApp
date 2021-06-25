import React, { useState,useContext, useEffect }from 'react'
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantContext } from "../context/RestaurantContext";
import { useHistory } from 'react-router';


const UpdateRestaurant = (props) => {
 let history = useHistory();
 const { restaurants } = useContext(RestaurantContext);
 const { id } = useParams();
 //console.log(restaurants);
 const [name, setName] = useState("");
 const [location, setLocation] = useState("");
 const [priceRange, setPriceRange] = useState("");

 useEffect(() => {
  const fetchData = async () => {
   const response = await RestaurantFinder.get(`${id}`);
   console.log(response.data.data);
   setName(response.data.data.restaurant.name);
   setLocation(response.data.data.restaurant.location);
   setPriceRange(response.data.data.restaurant.price_range);

  }
  fetchData();
 }, []);
 
 const handleSubmit = async (e) => {
  e.preventDefault();
  const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
   name,
   location,
   price_range: priceRange
  });
  history.push("/");
  // console.log(updatedRestaurant);
 }
 return (
  <div>
  
   <form action="">
    <div className="form-group">
     <label htmlFor="name">Name</label>
     <input value={name} onChange={e=>setName(e.target.value)} type="text" id="name" className="form-control" />
     
    </div>
    <div className="form-group">
     <label htmlFor="location">Location</label>
     <input value={location} onChange={e=>setLocation(e.target.value)} type="text" id="location" className="form-control" />
    </div>
    <div className="form-group">
     <label htmlFor="price_range">Price Range</label>
     <input value={priceRange} onChange={e=>setPriceRange(e.target.value)} type="number" id="price_range" className="form-control" />
    </div>
    <button type="submit" onClick={handleSubmit}className="btn btn-primary">Submit</button>
   </form>
  </div>
 )
}

export default UpdateRestaurant
