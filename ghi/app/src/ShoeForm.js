import React, { useState, useEffect } from "react";

function ShoeForm() {
  const [manufacturer, setManufacturer] = useState("");
  const [modelName, setModelName] = useState("");
  const [color, setColor] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [bins, setbins] = useState([]);
  const [bin, setbin] = useState("");

  const fetchData = async () => {
    const Url = "http://localhost:8100/api/bins/";
    const response = await fetch(Url);
    if (response.ok) {
      const data = await response.json();
      setbins(data.bins);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const shoe = {
      manufacturer: manufacturer,
      model_name: modelName,
      color,
      picture_url: pictureUrl,
      bin,
    };

    const shoeUrl = `http://localhost:8080/api/shoes/`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(shoe),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(shoeUrl, fetchConfig);
    if (response.ok) {
      const newShoe = await response.json();
      console.log(newShoe);
      setManufacturer("");
      setModelName("");
      setColor("");
      setPictureUrl("");
      setbin([]);
    }
  };

  const handleChangeManufacturer = (event) => {
    const value = event.target.value;
    setManufacturer(value);
  };

  const handleChangeModelName = (event) => {
    const value = event.target.value;
    setModelName(value);
  };

  const handleChangeColor = (event) => {
    const value = event.target.value;
    setColor(value);
  };

  const handleChangePictureUrl = (event) => {
    const value = event.target.value;
    setPictureUrl(value);
  };

  const handleChangebin = (event) => {
    const value = event.target.value;
    setbin(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="manufacturer">Manufacturer:</label>
        <input
          type="text"
          id="manufacturer"
          value={manufacturer}
          onChange={handleChangeManufacturer}
        />
      </div>
      <div>
        <label htmlFor="modelName">Model Name:</label>
        <input
          type="text"
          id="modelName"
          value={modelName}
          onChange={handleChangeModelName}
        />
      </div>
      <div>
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={handleChangeColor}
        />
      </div>
      <div>
        <label htmlFor="pictureUrl">Picture URL:</label>
        <input
          type="text"
          id="pictureUrl"
          value={pictureUrl}
          onChange={handleChangePictureUrl}
        />
      </div>
      <div>
        <label htmlFor="bin">Bin:</label>
        <select id="bin" value={bin} name="bin" onChange={handleChangebin}>
          {bins.map((bin) => {
            return (
              <option key={bin.id} value={bin.href}>
                {bin.bin_number}
              </option>
            );
          })}
        </select>
      </div>
      <button type="submit">Create Shoe</button>
    </form>
  );
}

export default ShoeForm;
