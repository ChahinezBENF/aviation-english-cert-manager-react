import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, editUser } from '../services/apiUsers';
import HeaderHr from './HeaderHr';
import { getAllAirports } from '../services/apiAirports';

export default function EditUser() {
    const { id } = useParams(); // Extract user ID from route params
    const nav = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'pilot',
        airportCode: '',
        certificationLevel: '1',
        certificationDateIssued: '',
        certificateUrl: '',
    });

    // Error state for validation messages
    const [error, setError] = useState('');
    // State to store airports
    const [airports, setAirports] = useState([]);

    useEffect(() => {
        getUserById(id).then((res) => setFormData({
            name: res.name || '',
            email: res.email || '',
            role: res.role || 'pilot',
            airportCode: res.airportCode || '',
            certificationLevel: res.certification?.level || '1',
            certificationDateIssued: res.certification?.dateIssued?.slice(0, 10) || '',
            certificateUrl: res.certification?.certificateUrl || '',
        }));

        getAllAirports().then(setAirports)
            .catch((err) => console.error('Error fetching airports:', err));

    }, [id]);

    const editTheUser = (e) => {
        e.preventDefault();

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = e.target.email.value;

        // Validate email format
        if (!emailRegex.test(email)) {
            setError('Invalid email format. Please enter a valid email.');
            return;
        }

        // Clear error if valid
        setError('');

        const updatedUser = {
            name: e.target.name.value,
            email,
            role: e.target.role.value,
            airportCode: e.target.airportCode.value,
            certification: {
                level: parseInt(e.target.certificationLevel.value, 10),
                dateIssued: e.target.certificationDateIssued.value,
                certificateUrl: e.target.certificateUrl.value,
            }
        };

        editUser(id, updatedUser).then(() => { nav('/users'); });
    };

    if (!formData.name) {
        return <div>Loading...</div>;  // Show a loading state while form data is being fetched
    }


    return (
        <div>
            <HeaderHr />
            <div className="edit-user-page">
                <h1>Update Employee</h1>
                <form onSubmit={editTheUser}>
                    {/* Show validation errors */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" defaultValue={formData.name} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" defaultValue={formData.email} required />
                    </div>
                    <div>
                        <label>Role:</label>
                        <select name="role" defaultValue={formData.role} >
                            <option value="pilot">Pilot</option>
                            <option value="controller">Controller</option>
                        </select>
                    </div>
                    <div>
                        <label>Airport Code:</label>
                        <select
                            name="airportCode"
                            value={formData.airportCode}
                            onChange={(e) => setFormData({ ...formData, airportCode: e.target.value })} // Update the state when the user selects a different option
                            required    >
                            {airports.map((airport) => (
                                <option key={airport.code} value={airport.code}>
                                    {airport.name} ({airport.code})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Certification Level:</label>
                        <select name="certificationLevel" defaultValue={formData.certificationLevel} required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                    <div>
                        <label>Certification Issued Date:</label>
                        <input type="date" name="certificationDateIssued" defaultValue={formData.certificationDateIssued} />
                    </div>
                    <div>
                        <label>Certificate URL:</label>
                        <input type="url" name="certificateUrl" defaultValue={formData.certificateUrl} />
                    </div>
                    <div>
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={() => nav('/users')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
