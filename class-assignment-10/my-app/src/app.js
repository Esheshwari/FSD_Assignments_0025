import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button } from 'react-bootstrap';

export default function App() {
  const [data, setData] = useState('');

  const fetchServerData = () => {
    fetch('http://localhost:5000/api/message')
      .then((res) => res.json())
      .then((d) => setData(d.message))
      .catch((err) => setData('Server off or CORS blocked'));
  };

  useEffect(() => {
    fetchServerData();
  }, []);

  return (
    <Container className="mt-5 text-center">
      <Card body className="shadow-sm p-4">
        <h2 className="mb-3">React Bootstrap Client</h2>
        <p className="lead">{data || 'Loading server message...'}</p>
        <Button variant="primary" onClick={fetchServerData}>
          Fetch Server Message Again
        </Button>
      </Card>
    </Container>
  );
}