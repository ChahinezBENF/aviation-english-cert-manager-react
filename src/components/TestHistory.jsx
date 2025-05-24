// import React from 'react'

// export default function TestHistory({ history }) {
//    return (
//      <div className="test-history">
//       <h2>Test History</h2>

//       {history.length > 0 ? (
//         <ul>
//           {history.map((test, index) => (
//             <li key={test._id || index} className="mb-1">
//               <span>{new Date(test.testDate).toLocaleDateString()}</span> - Level {test.resultLevel}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No test history available.</p>
//       )}
//     </div>

//   );
// }
import React from 'react';

export default function TestHistory({ history, onCancel }) {
  // Filter out canceled tests if you add that flag
  const visibleTests = history.filter(test => !test.canceled);

  return (
    <div className="test-history">
      <h2>Test History</h2>

      {visibleTests.length > 0 ? (
        <ul>
          {visibleTests.map((test, index) => {
            const isUpcoming = new Date(test.testDate) > new Date();

            return (
              <li key={test._id || index} className="mb-1">
                <span>{new Date(test.testDate).toLocaleDateString()}</span> - Level {test.resultLevel}
                {isUpcoming && onCancel && (
                  <button
                    style={{ marginLeft: '10px' }}
                    onClick={() => onCancel(test._id)}
                  >
                    Cancel
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No test history available.</p>
      )}
    </div>
  );
}
