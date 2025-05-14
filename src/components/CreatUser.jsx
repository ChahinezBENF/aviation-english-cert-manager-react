import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/apiUsers';
import HeaderHr from './HeaderHr';


export default function CreateUserPage() {
    const nav = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        const user = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            role: e.target.role.value,
            airportCode: e.target.airportCode.value,
            certification: {
                level: e.target.certificationLevel.value,
                dateIssued: e.target.certificationDateIssued.value,
                certificateUrl: e.target.certificateUrl.value,
            },
        };

        createUser(user).then(() => {
            nav('/users');  // Navigate only after success
        }).catch(err => console.error('Error creating user:', err));
    };


    return (
        <div>
            <HeaderHr />
            <div className="create-user-page">
                <h1>Create a new Employee</h1>
                <form onSubmit={submit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" required />
                    </div>
                    <div>
                        <label>Role:</label>
                        <select name="role" >
                            <option value="pilot">Pilot</option>
                            <option value="controller">Controller</option>
                        </select>
                    </div>
                    <div>
                        <label>Airport Code:</label>
                        <input type="text" name="airportCode" />
                    </div>
                    <div>
                        <label>Certification Level:</label>
                        <select name="certificationLevel" required>
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
                        <input type="date" name="certificationDateIssued" />
                    </div>
                    <div>
                        <label>Certificate URL:</label>
                        <input type="url" name="certificateUrl" />
                    </div>
                    <div >
                        <button type="submit" >Create</button>
                        <button type="button" onClick={() => { nav('/users') }}> Cancel </button>
                    </div>
                </form>
            </div>
        </div>
    );
}