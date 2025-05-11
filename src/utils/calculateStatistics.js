export const calculateUserStatistics = (users) => {
  const today = new Date();

   // Calculate the date 30 days from today
  const next30Days = new Date();
  next30Days.setDate(today.getDate() + 30);

  const totalUsers = users.length;

  // Count the number of users by role (controllers and pilots only)
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

  return {
    totalUsers, // Total number of users
    roles, // Number of users by roles 
    certificationLevels, // Count of users at each certification level
    expiredCertifications: expiredCertifications.length, // Total expired certifications
    expiringCertifications: expiringCertifications.length, // Total expiring within 30 days
    expiringCertificationsList: expiringCertifications, // List of users with expiring certifications
    validCertifications: validCertifications.length, // Total valid certifications
    validCertificationsList: validCertifications, // List of users with valid certifications
  };
};
