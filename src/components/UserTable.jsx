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
  const [roleFilter, setRoleFilter] = useState(''); // State for role filter
  const [validityFilter, setValidityFilter] = useState(''); // State for certification validity filter
  const [levelFilter, setLevelFilter] = useState(''); // State for certification level filter

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

  // Search user
  const search = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterUsers(value, roleFilter, validityFilter, levelFilter);
  };

  // Determine certification validity
  const isCertificationValid = (expiresOn) => {
    if (!expiresOn) return 'N/A';
    return new Date(expiresOn) > new Date() ? 'Valid' : 'Expired';
  };

  // Filter users based on all criteria
  const filterUsers = (searchTerm, role, validity, level) => {
    setFilteredUsers(
      users.filter((user) => {
        const matchesRole = role === '' || user.role === role;
        const matchesValidity =
          validity === '' || isCertificationValid(user.certification?.expiresOn) === validity;
        const matchesLevel =
          level === '' || String(user.certification?.level) === String(level); 
        const matchesSearch =
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.role.toLowerCase().includes(searchTerm);

        return matchesRole && matchesValidity && matchesLevel && matchesSearch;
      })
    );
  };

  // Handle dropdown changes
  const handleRoleFilter = (e) => {
    const value = e.target.value;
    setRoleFilter(value);
    filterUsers(searchTerm, value, validityFilter, levelFilter);
  };

  const handleValidityFilter = (e) => {
    const value = e.target.value;
    setValidityFilter(value);
    filterUsers(searchTerm, roleFilter, value, levelFilter);
  };

  const handleLevelFilter = (e) => {
    const value = e.target.value;
    setLevelFilter(value);
    filterUsers(searchTerm, roleFilter, validityFilter, value);
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
      <HeaderHr />
      <div className="user-table-container">
        <h1>Employees</h1>
        <div className="filters-section">

          <div className="filter-group">
            <label htmlFor="search">Search:</label>
            <input
              id="search"
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={search}
            />
          </div>
          {/* Start of filter section */}
          <div className="filter-group">
            <label htmlFor="role-filter">Role:</label>
            <select value={roleFilter} onChange={handleRoleFilter}>
              <option value="">All Roles</option>
              <option value="pilot">Pilot</option>
              <option value="controller">Controller</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="validity-filter">Validity:</label>
            <select value={validityFilter} onChange={handleValidityFilter}>
              <option value="">All Validity</option>
              <option value="Valid">Valid</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="level-filter">Level:</label>
            <select value={levelFilter} onChange={handleLevelFilter}>
              <option value="">All Levels</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          {/* End of filter section */}

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
              <th>Certificate</th>
              <th>Profil</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.airportCode}</td>
                  <td>{user.certification?.level}</td>
                  <td>{formatUTCDate(user.certification?.dateIssued)}</td>
                  <td>{formatUTCDate(user.certification?.expiresOn)}</td>
                  <td>
                    <CertValidity expiresOn={user.certification?.expiresOn} />
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

                    <button
                      onClick={() => { nav(`/controller-dashboard/${user._id}`) }}>
                      View
                    </button>
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
