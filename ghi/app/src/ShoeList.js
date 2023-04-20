import React, { useState } from "react";
import "./index.css";

function ShoeList(props) {
  const [shoes, setShoes] = useState(props.shoes || []);

  const handleDelete = async (shoeId) => {
    const updatedShoes = shoes.filter((shoe) => shoe.id !== shoeId);
    setShoes(updatedShoes);
  };

  if (!shoes.length) {
    return <div>No shoes to display</div>;
  }

  return (
    <>
      <a href="/shoes/new/">
        <button>Add Shoe</button>
      </a>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Model Name</th>
            <th>Color</th>
            <th>Picture</th>
            <th>Bin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shoes.map((shoe) => {
            console.log(shoe);
            return (
              <tr key={shoe.id}>
                <td>{shoe.manufacturer}</td>
                <td>{shoe.model_name}</td>
                <td>{shoe.color}</td>
                <td>
                  <img
                    src={shoe.picture_url}
                    alt=""
                    width="100px"
                    height="100px"
                  />
                </td>
                <td>{shoe.bin.bin_number}</td>
                <td>
                  <button onClick={() => handleDelete(shoe.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ShoeList;
