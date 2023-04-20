import React, { useState, useEffect } from "react";

function ShoeList() {
  const [shoes, setShoes] = useState([]);

  const fetchData = async () => {
    const fetchurl = `http://localhost:8080/api/shoes/`;
    const response = await fetch(fetchurl);
    if (response.ok) {
      const data = await response.json();
      setShoes(data.shoes);
    }
  };

  const handleDelete = async (shoeId) => {
    const deletedurl = `http://localhost:8080/api/shoes/${shoeId}`;
    const response = await fetch(deletedurl, { method: "DELETE" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

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
