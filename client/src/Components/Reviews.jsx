import React from 'react';
import StarRating from './StarRating';


const Reviews = ({reviews}) => {
  return (
   <div className="row row-cols-3 mb-2">
     {reviews.map((rev) => {
       return (
         <div className="card text-white bg-primary mb-3 mr-4" style={{ maxWidth: "30%" }}>
           <div className="card-header d-flex justify-content-between">
             <h6>{rev.name}</h6>
                <span><StarRating rating={rev.rating}/></span>
    	     </div>
            <div className="card-body">
             <h6 className="card-text">{rev.review}</h6>
            </div>
      </div>    
       )
     }
     )}   
   </div>
 )
}

export default Reviews
