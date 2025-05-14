import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../services/apiUsers';
import { useNavigate } from 'react-router-dom';
import CertValidity from './CertValidity';
import HeaderHr from '../components/HeaderHr';


export default function UserTable() {
  const nav = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users


  //fetchUsers
  useEffect(() => {
    getAllUsers().then((res) => {
      const filtered = res.filter(user => user.role === 'pilot' || user.role === 'controller');
      setUsers(filtered);
      setFilteredUsers(filtered); // Initialize filtered users with all users
    });
  }, []);

  //Delete user
  const deletTheUser = (id) => {
    deleteUser(id).then(() => {
      setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
      setFilteredUsers((prevFiltered) => prevFiltered.filter(user => user._id !== id));
    });
  };

  //Search user
  const search = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.role.toLowerCase().includes(value)
      ));
  };


  // Fixe the date display
  const formatUTCDate = (isoDate) => {
    if (!isoDate) return 'N/A';
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div>
      <HeaderHr/>
    <div className="user-table-container">
      <h1>Employees</h1>
      <div className="search">
        
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={search}

        />

      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Airport Code</th>
            <th>Certification Level</th>
            <th>Certification Issued</th>
            <th>Certification Expires</th>
            <th>Certification Validity</th>
            <th>Certificate URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.airportCode }</td>
                <td>{user.certification?.level }</td>
                <td>{formatUTCDate(user.certification?.dateIssued)}</td>
                <td>{formatUTCDate(user.certification?.expiresOn)}</td>
                <td>
                  <CertValidity expiresOn={user.certification?.expiresOn} /> {/* New Component */}
                </td>
                <td>
                  {user.certification?.certificateUrl ? (
                    <a
                      href={user.certification.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>
                  <button onClick={() => { nav(`/users/edit/${user._id}`) }} >
                    Modify
                  </button>
                  <button onClick={() => deletTheUser(user._id)} >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No users available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='action-buttons'>
      <button onClick={() => nav('/create-user')} >Create User</button>
      <button onClick={() => nav('/hr-dashboard')}>Go Back</button>
    
</div>   
 </div>
    </div>
  );
}
