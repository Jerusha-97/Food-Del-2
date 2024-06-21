import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  // const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("Error fetching list");
    }
  };

const removeFood = async (foodId) => {
  try {
    const response = await axios.post(`${url}/api/food/remove`, { FoodID: foodId });
    if (response.status === 200) {
      toast.success('Food removed successfully');
      await fetchList(); // Refresh the list after removing the item
    } else {
      toast.error('Failed to remove food');
    }
  } catch (error) {
    toast.error('Error removing food');
    console.error('Error in removeFood:', error);
  }
};



  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img
              src={`${url}/images/${item.image}`} // Correct image name
              alt={`Image of ${item.name}`}
              onError={(e) => {
                e.target.src = '/images/fallback.png'; // Fallback image on error
              }}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
      
              <p onClick={()=>removeFood(item.FoodID)} className='cursor'>X</p> 
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
