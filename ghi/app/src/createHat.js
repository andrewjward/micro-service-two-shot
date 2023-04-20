import React, {useEffect, useState } from 'react';

function CreateHat() {

  const [fabric, setFabric] = useState('');
  const [style_name, setStyleName] = useState('');
  const [color, setColor] = useState('')
  const [url, setUrl] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);

  const fetchData = async () => {
    const locationsurl = 'http://localhost:8100/api/locations';
    const response = await fetch(locationsurl);
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      fabric,
      style_name,
      color,
      url,
      location,
    };

    const hatsUrl = 'http://localhost:8090/api/hats/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const hatResponse = await fetch(hatsUrl, fetchOptions);
    if (hatResponse.ok) {
      const newhat = await hatResponse.json()
      console.log(newhat);
      setFabric('');
      setStyleName('');
      setColor('');
      setUrl('')
      setLocation([]);
    }
  }

  const handleChangeFabric = (event) => {
    const value = event.target.value;
    setFabric(value);
  }

  const handleChangeStyleName = (event) => {
    const value = event.target.value;
    setStyleName(value);
  }

  const handleChangeColor = (event) => {
    const value = event.target.value;
    setColor(value);
  }

  const handleChangeUrl = (event) => {
    const value = event.target.value;
    setUrl(value);
  }

  const handleChangeLocation = (event) => {
    const value = event.target.value;
    setLocation(value);
  }


    return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Hat</h1>
            <form onSubmit={handleSubmit} id="create-hat-form">
                  <div className="form-floating mb-3">
                    <input onChange={handleChangeFabric} value= {fabric} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" />
                    <label htmlFor="fabric">Fabric</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleChangeStyleName} value= {style_name} placeholder="StyleName" required type="text" name="style_name" id="style_name" className="form-control" />
                    <label htmlFor="style_name">Style Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleChangeColor} value= {color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                    <label htmlFor="color">Color</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleChangeUrl} value= {url} placeholder="Url" required type="text" name="url" id="url" className="form-control" />
                    <label htmlFor="url">Picture Url</label>
                  </div>
                  <div className="mb-3">
                      <select onChange={handleChangeLocation} value= {location} name="location" id="location" className='form-select' required>
                        <option value="">Choose Closet location</option>
                        {locations.map(location => {
                          return (
                            <option key={location.href} value={location.href}>{location.closet_name}</option>
                          )
                        })}
                      </select>
                    </div>
                <button className="btn btn-lg btn-primary">Submit</button>
            </form>
        </div>
      </div>
    </div>
    );
  }

export default CreateHat;
