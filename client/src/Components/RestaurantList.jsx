import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';
import  StarRating  from './StarRating';


const RestaurantList = (props) => {

  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        // console.log(response);
        setRestaurants(response.data.data.restaurants);
      }
      catch(err) {
        
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (e,id) => {
     e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
    } catch (err) {
      
   }
 }
  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`)
  }

  const handleRestaurantSelect = (id) => {
  
    history.push(`/restaurants/${id}`)
  }

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>
    }
    return(<>
      <StarRating rating={restaurant.id} />
      <span className="text-warning ml-1">({restaurant.count})</span>

    </>)
  }

  return (
  <div className="list-group">
   <table className="table table-hover table-dark">
    <thead>
      <tr className="bg-primary">
        <th scope="col">Restaurant</th>
        <th scope="col">Location</th>
        <th scope="col">Price Range</th>
        <th scope="col">Ratings</th>
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
       <tbody>
         {restaurants && restaurants.map((restaurant) => {
           return (
             <tr key= {restaurant.id} onClick={()=>handleRestaurantSelect(restaurant.id)}>
               <td>{restaurant.name}</td>
               <td>{restaurant.location}</td>
               <td>{"$".repeat(restaurant.price_range)}</td>
               <td>{renderRating(restaurant)}</td>
               <td><button onClick={(e)=>handleUpdate(e,restaurant.id)}  className="btn btn-warning">Update</button></td>
               <td><button onClick={(e) =>handleDelete(e,restaurant.id)}className="btn btn-danger">Delete</button></td>
             </tr>
           );
         })}
    </tbody>
  </table>
  </div>
 )
}

export default RestaurantList
