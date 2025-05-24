import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import TestSchedule from "../components/TestSchedule";
import CertAlerts from "../components/CertAlerts";
import TestHistory from "../components/TestHistory";
import HeaderLogout from "../components/HeaderLogout";
import { getUserById, cancelScheduledTest, addTestToSchedule } from "../services/apiUsers";

export default function ControllerDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserById(id);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login"); // Redirect to login on failure
      }
    };

    fetchUserData();
  }, [id, navigate]);

  // Schedule new test
  useEffect(() => {
    if (location.state?.testDate) {
      const scheduleTest = async () => {
        try {
          const updatedUser = await addTestToSchedule(id, {
            testDate: location.state.testDate,
            testName: "Scheduled Test",
          });
          setUser(updatedUser);
          navigate(`/controller-dashboard/${id}`, { replace: true });
        } catch (error) {
          console.error("Failed to schedule new test:", error);
        }
      };

      scheduleTest();
    }
  }, [id, location.state, navigate]);

  // Cancel a scheduled test
  const handleCancelTest = async (testId) => {
    try {
      await cancelScheduledTest(id, testId);
      setUser((prevUser) => ({
        ...prevUser,
        testSchedule: prevUser.testSchedule.filter((test) => test._id !== testId),
      }));
    } catch (error) {
      console.error("Failed to cancel test:", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  const daysUntilExpiry = user.certification?.expiresOn
    ? Math.ceil(
        (new Date(user.certification.expiresOn) - new Date()) / (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <div>
      <HeaderLogout />
      <div className="controller-dashboard">
        <div className="dashboard-section">
          <ProfileCard user={user} />
        </div>

        {daysUntilExpiry !== null && (
          <div className="dashboard-section">
            <CertAlerts daysUntilExpiry={daysUntilExpiry} />
          </div>
        )}

        <div className="dashboard-section">
          {/* Pass the upcoming tests from user.testSchedule, which can be canceled */}
          <TestSchedule
            tests={user.testSchedule || []}
            userId={id}
            onCancel={handleCancelTest}
          />
        </div>

        <div className="dashboard-section">
          {/* Show test history with no cancel button */}
          <TestHistory history={user.testHistory || []} />
        </div>
      </div>
    </div>
  );
}