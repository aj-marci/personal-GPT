import React, {useState, useEffect} from 'react';


const App = () => {

  const [lineup, setLineup] = useState<string | null>(null);

  useEffect(() => {
    const fetchLineup = async () => {
      try {
        const response = await fetch('http://localhost:8000/generate-lineup', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setLineup(result.message); // Extract the lineup message from the response
      } catch (error) {
        console.error("Error fetching lineup:", error);
      }
    };

    fetchLineup();
  }, []);


  return (
    <div>
      <h2>NHL 18-Man Lineup:</h2>
      <p>{lineup ? lineup : "Loading lineup..."}</p>
    </div>
  );
};

export default App;
