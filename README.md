# ICAO English Training Management System for Controllers and Pilots

```plaintext
├── frontend/                   # Frontend folder for React app
│   ├── public/                 # Public assets (e.g., images/aviation.png)
│   ├── src/                    # React source code
│   │   ├── components/         # Reusable components (e.g., UserTable.jsx , AirportTable.jsx)
│   │   ├── pages/              # Page components (e.g., Login.jsx, HRDashboard.jsx)
│   │   ├── services/           # API service functions (e.g., apiUsers.js for Axios)
│   │   ├── styles/             # Custom styles (e.g., pages.css)
│   │   ├── utils/              # Reusabal functions (e.g., calculateStatistics.jsx)
│   │   ├── App.jsx             # Main React application component
│   │   └── main.js             # React entry point
|   ├── .gitignore              # Files and directories to ignore in Git
│   └── package.json            # Frontend dependencies and scripts
└── README.md                   # Documentation for the project (frontend Sid)
```


# ✅ Requirement Fulfillment for Front-End Development (35%) : 
#  I. Use React to create the application’s front-end :
The front-end of the application is built entirely using React, enabling efficient and reusable UI components (eg, `src/App.jsx`)
---

#  II. Use CSS to style the application :
The application’s styling is done using 2 pages CSS (`src/components.jsx`) for the components files and (`src/pages.jsx`) for the pages files, ensuring a cohesive and visually appealing design
---

#  III. Create at least four different views or pages for the application :
The application includes multiple views such as (`Login.jsx`, `Statistics.jsx` and `HRDashboard`), 
---

#  IV. Create some form of navigation that is included across the application’s pages, utilizing React Router for page rendering :
The application uses React Router to navigate between pages seamlessly like in the (`Header.jsx`) and (`HeaderHr.jsx`) files
---
# V. Use React Hooks or Redux for application state management : 
The application uses multiples React Hooks 

### Example
```javascript
import { useEffect, useState } from 'react';
```
---
# VI. Interface directly with the server and API that you created :
The application interacts with the backend API to manage data dynamically using Axios in the 2 files (`services/apiUsers.jsx` and `services/apiAirports.jsx`)

### Example
```javascript
import axios from 'axios'
// Login service
export const login = async (email, password) => {
    const response = await axios.post(`${URL}/auth/login`, { email, password });
    return response.data; };
```
---
## Frontend repository Link: https://github.com/ChahinezBENF/aviation-english-cert-manager-backend
## Frontend deployement Link: https://aviation-english-cert-manager-backend.onrender.com