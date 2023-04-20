import React, { useState, useEffect } from "react";

function ShoeForm() {
  const [manufacturer, setManufacturer] = useState("");
  const [modelName, setModelName] = useState("");
  const [color, setColor] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [bins, setbins] = useState(null);
  const [bin, setbin] = useState("");

  const fetchData = async () => {
    const Url = "http://localhost:8100/api/bins/";
    const response = await fetch(Url);
    if (response.ok) {
      const data = await response.json();
      setbins(data.bins);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const shoe = {
      manufacturer: manufacturer,
      model_name: modelName,
      color,
      picture_url: pictureUrl,
      bin,
    };
    console.log(shoe);
    const shoeUrl = `http://localhost:8080/api/bins/${shoe.bin}/shoes/`;
    const fetchConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        body: JSON.stringify(shoe),
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
      setbin("");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    bins && (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="manufacturer">Manufacturer:</label>
          <input
            type="text"
            id="manufacturer"
            value={manufacturer}
            onChange={(event) => setManufacturer(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="modelName">Model Name:</label>
          <input
            type="text"
            id="modelName"
            value={modelName}
            onChange={(event) => setModelName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pictureUrl">Picture URL:</label>
          <input
            type="text"
            id="pictureUrl"
            value={pictureUrl}
            onChange={(event) => setPictureUrl(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="bin">Bin:</label>
          <select
            id="bin"
            value={bin}
            name="bin"
            onChange={(event) => setbin(event.target.value)}
          >
            {bins.bins?.map((bin) => {
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
    )
  );
}

export default ShoeForm;
