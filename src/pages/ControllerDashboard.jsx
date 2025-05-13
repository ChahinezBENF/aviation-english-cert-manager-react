import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import TestSchedule from "../components/TestSchedule";
import CertAlerts from "../components/CertAlerts";
import TestHistory from "../components/TestHistory";
import HeaderLogout from '../components/HeaderLogout';
import { getUserById } from "../services/apiUsers";

export default function ControllerDashboard() {
   const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


 useEffect(() => {
    if (!id) {
      console.error("Missing user ID. Redirecting to login...");
      navigate("/login");
      return;
    }

    fetchUserById(id);
  }, [id, navigate]);


 const fetchUserById = async (userId) => {
    try {
      const updatedUser = await getUserById(userId);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error fetching user data by ID:", error);
      navigate("/login");
    }
  };


  if (!user) {
    return <p>Loading...</p>;
  }

  const daysUntilExpiry = user.certification?.expiresOn
    ? Math.ceil(
        (new Date(user.certification.expiresOn) - new Date()) / (1000 * 60 * 60 * 24)
      )
    : null;

  const upcomingTests = Array.isArray(user.testHistory)
    ? user.testHistory.filter((test) => new Date(test.testDate) > new Date())
    : [];

   return (
    <div>  
      
        <HeaderLogout/>

    <div className="controller-dashboard">

      <div className="dashboard-section">
        <ProfileCard user={user} />
      </div>
      {daysUntilExpiry !== null && (
        <div className="dashboard-section">
          <h2>Certification Alerts</h2>
          <CertAlerts daysUntilExpiry={daysUntilExpiry} />
        </div>
      )}
      <div className="dashboard-section">
        <TestSchedule
          tests={upcomingTests}
          onReschedule={(testId) => console.log("Reschedule test:", testId)}
        />
      </div>
      <div className="dashboard-section">
        <TestHistory history={user.testHistory || []} />
      </div>
    </div>
    </div>
  );
}