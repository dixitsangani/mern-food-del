import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';

const baseURL = "http://localhost:8001";

function List() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/admin/viewfoodlist`);
      if (response.data.status === 1) {
        setData(response.data.record)
      } else {
        setData([]);
        console.log("No food records found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:8001/admin/deletefoolist/${id}`);
      console.log("Data deleted successfully");
     
      return fetchData();
    } catch (error) {
      console.error("Error deleting food item:", error);
      setError("Error deleting food item");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="food-list">
      <div className="header">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {error && <p className="error-message">{error}</p>}
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="food-item">
            <img 
              src={`${baseURL}${item.image}`} // Ensuring the correct URL is used
              alt={item.name || 'Unnamed item'} 
              height="100px" 
              width="100px" 
            />
            <p>{item.name || 'Unnamed item'}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <button onClick={() => handleDelete(item._id)}>X</button>
          </div>
        ))
      ) : (
        <p>No food records found</p>
      )}
    </div>
  );
}

List.propTypes = {
  // Define your prop types here if needed in the future
};

export default List;
