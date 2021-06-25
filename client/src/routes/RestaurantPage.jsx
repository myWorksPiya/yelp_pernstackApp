import React, { useContext, useEffect} from 'react'
import { RestaurantContext } from '../context/RestaurantContext';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';
import Reviews from '../Components/Reviews';
import AddReview from '../Components/AddReview';
import StarRating from '../Components/StarRating';


const RestaurantPage = (props) => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantContext);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
        
      } catch (error) {
        console.log(error);
      }
      
    }
    fetchData();
  }, []);

 return (
  <div>
     <div>{selectedRestaurant && (
       <>
         <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
         <div className="text-center">
           <StarRating rating={selectedRestaurant.restaurant.average_rating} />
           <span className="text-warning ml-1">{selectedRestaurant.restaurant.count? `(${selectedRestaurant.restaurant.count})`: "0"}</span>
         </div>
         <div className="mt-3">
           <Reviews reviews={selectedRestaurant.reviews}/>
         </div>
          <AddReview/>
       </>
     )}</div>
  </div>
 )
}

export default RestaurantPage
