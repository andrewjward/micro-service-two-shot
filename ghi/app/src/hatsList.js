import React, { useState, useEffect } from "react";

function HatsList() {
  const [hats, setHats] = useState([]);

  const fetchData = async () => {
    const fetchurl = `http://localhost:8090/api/hats/`;
    const response = await fetch(fetchurl);
    if (response.ok) {
      const data = await response.json();
      setHats(data.hats);
    }
  };

  const handleDelete = async (hatId) => {
    const deletedurl = `http://localhost:8090/api/hats/${hatId}`;
    const response = await fetch(deletedurl, { method: "DELETE" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!hats.length) {
    return <div>No hats to display</div>;
  }

  return (
    <main>
      <a href="/hats/new/">
        <button className="btn btn-success" type="submit">
          Create new Hat
        </button>
      </a>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Style Name</th>
            <th>fabric</th>
            <th>color</th>
            <th>Picture</th>
            <th>location</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {hats.map((hat) => {
            return (
              <tr key={hat.href}>
                <td>{hat.style_name}</td>
                <td>{hat.fabric}</td>
                <td>{hat.color}</td>
                <td>
                  <img src={hat.url} height="100" />
                </td>
                <td>{hat.location.closet_name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(hat.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default HatsList;
