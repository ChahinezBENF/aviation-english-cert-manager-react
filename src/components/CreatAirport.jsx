import { useNavigate } from 'react-router-dom';
import { createAirport } from '../services/apiAirports';

export default function CreateAirportPage() {
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const airport = {
      code: e.target.code.value,
      name: e.target.name.value,
      location: {
        city: e.target.city.value,
        country: e.target.country.value,
      },
    };

    createAirport(airport)
      .then(() => nav('/airports')) // Navigate only after success
      .catch((err) => console.error('Error creating airport:', err));
  };

  return (
    <div className="create-airport-page">
      <h1>Create Airport</h1>
      <form onSubmit={submit}>
        <div>
          <label>Code:</label>
          <input type="text" name="code" required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="city" required />
        </div>
        <div>
          <label>Country:</label>
          <input type="text" name="country" required />
        </div>
        <div>
          <button type="submit">Create</button>
          <button type="button" onClick={() => nav('/airports')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
