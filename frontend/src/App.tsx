import React, { useState } from 'react';

const App = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [showResponse, setShowResponse] = useState<boolean>(false); 
  const [chatHistory, setChatHistory] = useState<{ role: string; message: string }[]>([]); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

  
    setChatHistory((prev) => [...prev, { role: 'user', message: prompt }]);
    setShowResponse(true);
    setResponse(null); 
    setPrompt(''); 

    try {
      const response = await fetch('http://localhost:8000/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const message = result.message;

      setChatHistory((prev) => [...prev, { role: 'assistant', message }]);
      setResponse(message);
    } catch (error) {
      console.error('Error generating response:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1e1e2c', 
        color: '#fff',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ color: '#a78bfa' }}>AJ's AI Chatbot</h2>
      <h2 style={{ color: '#a78bfa' }}>TypeScript/React/OpenAI</h2>
      <h2 style={{ color: '#a78bfa' }}>Developed with care</h2>

      <div
        style={{
          flex: 1,
          width: '100%',
          maxWidth: '600px',
          backgroundColor: '##F7F7F7',
          borderRadius: '10px',
          overflowY: 'auto',
          padding: '10px',
          marginBottom: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: chat.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                maxWidth: '75%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: chat.role === 'user' ? '#a78bfa' : '#3b3b4f',
                color: '#fff',
                textAlign: 'left',
              }}
            >
              {chat.message}
            </div>
          </div>
        ))}
        {showResponse && !response && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                maxWidth: '75%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#3b3b4f',
                color: '#fff',
                textAlign: 'left',
              }}
            >
              Generating response... Forgive me, I'm learning!
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '600px',
          gap: '10px',
        }}
      >
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #a78bfa',
            backgroundColor: '#2c2c3d',
            color: '#fff',
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#a78bfa',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default App;
