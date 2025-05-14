import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAirportById, editAirport } from '../services/apiAirports';
import HeaderHr from './HeaderHr';

export default function EditAirportPage() {
  const { id } = useParams(); // Extract airport ID from route params
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    getAirportById(id).then((res) =>
      setFormData({
        code: res.code || '',
        name: res.name || '',
        city: res.location?.city || '',
        country: res.location?.country || '',
      })
    );
  }, [id]);

  const submit = (e) => {
    e.preventDefault();
    const updatedAirport = {
      code: e.target.code.value,
      name: e.target.name.value,
      location: {
        city: e.target.city.value,
        country: e.target.country.value,
      },
    };

    editAirport(id, updatedAirport)
      .then(() => nav('/airports')) // Navigate only after success
      .catch((err) => console.error('Error updating airport:', err));
  };

  if (!formData.code) {
    return <div>Loading...</div>; // Show a loading state while form data is being fetched
  }

  return (
                     <div>
                  <HeaderHr/>
    <div className="edit-user-page">
      <h1>Update Airport</h1>
      <form onSubmit={submit}>
        <div>
          <label>Code:</label>
          <input type="text" name="code" defaultValue={formData.code} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" defaultValue={formData.name} required />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            defaultValue={formData.city}
            required
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            defaultValue={formData.country}
            required
          />
        </div>
        <div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => nav('/airports')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
