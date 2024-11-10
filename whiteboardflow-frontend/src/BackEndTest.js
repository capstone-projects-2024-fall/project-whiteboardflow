import { useState, useEffect } from "react";

/**
 * BackEndTest component that fetches data from the backend and displays it.
 * Displays a loading message until the data is retrieved.
 *
 * @returns {JSX.Element} The rendered BackEndTest component.
 */
function BackEndTest() {
  const [data, setData] = useState("");

  useEffect(() => {
    /**
     * Fetches data from the backend endpoint `/hello`, parses it as JSON,
     * and updates the `data` state. Logs the data to the console.
     */
    fetch("/hello")
      .then(res => res.json())
      .then(data => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      {typeof data.test_data === 'undefined' ? (
        <p>loading</p>
      ) : (
        data.test_data.map((test, i) => (
          <p key={i}>{test}</p>
        ))
      )}
    </div>
  );
}

export default BackEndTest;
