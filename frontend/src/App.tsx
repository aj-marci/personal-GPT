import React, {useState, useEffect} from 'react';


const App = () => {

  const [lineup, setLineup] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);

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
        setLineup(result.message); // set response state
      } catch (error) {
        console.error("Error fetching lineup:", error);
      }
    };

    fetchLineup();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value); // storing input value as the prompt
  };


  return (
    <div>
      <h2>Input prompt here</h2>
        <input type='text'></input>
      <p>{lineup ? lineup : "Loading lineup..."}</p>
    </div>
  );
};

export default App;
