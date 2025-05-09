import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, editUser } from '../services/apiUsers';

export default function EditUser() {
    const { id } = useParams(); // Extract user ID from route params
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'pilot', 
        airportCode: '',
        certificationLevel: '1',
        certificationDateIssued: '',
        certificateUrl: '',
    });

    useEffect(() => {
        getUserById(id).then((res) => setFormData({
            name: res.name || '',
            email: res.email || '',
            role: res.role || 'pilot',
            airportCode: res.airportCode || '',
            certificationLevel: res.certification?.level || '1',
            certificationDateIssued: res.certification?.dateIssued?.slice(0, 10) || '', // Format to YYYY-MM-DD
            certificateUrl: res.certification?.certificateUrl || '',
        }));
    }, [id]);

    const editTheUser = (e) => {
        e.preventDefault()
        const updatedUser = {
            name: e.target.name.value,
            email: e.target.email.value,
            role: e.target.role.value,
            airportCode: e.target.airportCode.value,
            certificationLevel: parseInt(e.target.certificationLevel.value, 10),
            certificationDateIssued: e.target.certificationDateIssued.value,
            certificateUrl: e.target.certificateUrl.value,
        };

        editUser(id, updatedUser).then(() => { nav('/users'); });
    };

      if (!formData.name) {
        return <div>Loading...</div>;  // Show a loading state while form data is being fetched
    }


    return (
        <div className="edit-user-page">
            <h1>Edit User</h1>
            <form onSubmit={editTheUser}>
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
                    <input type="text" name="airportCode" defaultValue={formData.airportCode} />
                </div>
                <div>
                    <label>Certification Level:</label>
                    <select name="certificationLevel" defaultValue={formData.certificationLevel}  required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
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
    );
}
