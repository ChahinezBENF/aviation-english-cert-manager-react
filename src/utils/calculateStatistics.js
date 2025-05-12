export const calculateUserStatistics = (users, airports) => {
  const today = new Date();
   // Calculate the date 30 days from today
  const next30Days = new Date();
  next30Days.setDate(today.getDate() + 30);


  // **User-related statistics**
  // Count the number of users by role (controllers and pilots only)
  const totalUsers = users.filter(user => user.role === 'controller' || user.role === 'pilot').length;
  const roles = users.reduce(
    (acc, user) => {
      if (user.role === 'controller') acc.controllers += 1;
      if (user.role === 'pilot') acc.pilots += 1;
      return acc;
    },
    // Initial counts
    { controllers: 0, pilots: 0 }
  );

   // Count the number of users at each certification level
  const certificationLevels = users.reduce((acc, user) => {
    const level = user.certification?.level;
    if (level) acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});


  // Get the list of users with expired certifications
  const expiredCertifications = users.filter(
    (user) => user.certification?.expiresOn && new Date(user.certification.expiresOn) < today
  );

  // Get the list of users with certifications expiring within the next 30 days
  const expiringCertifications = users.filter(
    (user) =>
      user.certification?.expiresOn &&
      new Date(user.certification.expiresOn) >= today &&
      new Date(user.certification.expiresOn) <= next30Days
  );

    // Get the list of users with valid certifications 
  const validCertifications = users.filter(
    (user) =>
      user.certification?.expiresOn && new Date(user.certification.expiresOn) >= today 
  );


 

  // **Airport-related statistics**
  const totalAirports = airports.length;

const airportStats = airports.map((airport) => {
  const totalEmployees = (airport.controllers?.length || 0) + (airport.pilots?.length || 0);

  return {
    airportName: airport.name,
    totalEmployees, // Total employees at this airport
  };
});

// Sort airports by most employees
const mostEmployeesAirports = [...airportStats]
  .sort((a, b) => b.totalEmployees - a.totalEmployees)
  .slice(0, 1); // Get top 1 airports

// Sort airports by least employees
const leastEmployeesAirports = [...airportStats]
  .sort((a, b) => a.totalEmployees - b.totalEmployees)
  .slice(0, 1); // Get bottom 1 airports

// Identify airports with **no employees**
const noEmployeeAirports = airportStats.filter((airport) => airport.totalEmployees === 0);


  // **Certification-related statistics**
const certifiedUsers = users.filter(user => 
  (user.role === "controller" || user.role === "pilot") && user.certification?.level
);

const totalCertificationLevels = certifiedUsers.reduce((sum, user) => sum + user.certification.level, 0);
const averageCertificationLevel = certifiedUsers.length 
  ? Math.round(totalCertificationLevels / certifiedUsers.length) 
  : 0;

const totalCertifiedUsers = certifiedUsers.length;
const certificationLevelPercentages = Object.fromEntries(
  Object.entries(certificationLevels).map(([level, count]) => [
    level,
    ((count / totalCertifiedUsers) * 100).toFixed(2) + "%",
  ])
);

   // Generate trends for the past 6 months 
  const dates = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    return {
      month: date.toLocaleString('default', { month: 'long' }),
      expired: expiredCertifications.filter(
        (user) => new Date(user.certification.expiresOn).getMonth() === date.getMonth()
      ).length,
      expiring: expiringCertifications.filter(
        (user) => new Date(user.certification.expiresOn).getMonth() === date.getMonth()
      ).length,
      valid: validCertifications.filter(
        (user) => new Date(user.certification.expiresOn).getMonth() === date.getMonth()
      ).length,
    };
  });


  return {
    // **User-related return**
    totalUsers, // Total number of users
    roles, // Number of users by roles 
    certificationLevels, // Count of users at each certification level
    expiredCertifications: expiredCertifications.length, // Total expired certifications
    expiringCertifications: expiringCertifications.length, // Total expiring within 30 days
    expiringCertificationsList: expiringCertifications, // List of users with expiring certifications
    validCertifications: validCertifications.length, // Total valid certifications
    validCertificationsList: validCertifications, // List of users with valid certifications
    dates,

   // **Airport-related return**
    airportStats: {
      totalAirports,
      mostEmployeesAirports, // Airports with most employees
      leastEmployeesAirports, // Airports with least employees
      noEmployeeAirports, // Airports with no employees

    },

    certificationStats: {
    averageCertificationLevel,
    certificationLevelPercentages,
  },

  };
};
