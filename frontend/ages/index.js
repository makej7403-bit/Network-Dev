import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

export default function Home() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [motivations, setMotivations] = useState([]);

  useEffect(() => {
    // fetch initial motivations
    axios.get((process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000') + '/api/motivations')
      .then(r => setMotivations(r.data.messages || []))
      .catch(() => {});

    // setup socket
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000');
    socket.on('new_motivation', (item) => {
      setMotivations(prev => [...prev, item]);
    });
    socket.on('connect', () => console.log('connected to socket'));
    return () => socket.disconnect();
  }, []);

  const sendChat = async () => {
    try {
      const resp = await axios.post((process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000') + '/api/chat', { message });
      setReply(resp.data.reply || JSON.stringify(resp.data));
    } catch (err) {
      console.error(err);
      setReply('Error contacting server');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Global Light — Welcome</h1>
      <p>Founder: Akin S. Sokpah — email: sokpahakinsaye81@gmail.com</p>

      <section>
        <h2>AI Tutor Chat</h2>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} cols={60} />
        <br />
        <button onClick={sendChat}>Send</button>
        <pre style={{ background: '#f4f4f4', padding: 10 }}>{reply}</pre>
      </section>

      <section>
        <h2>Motivational messages (auto every 30 minutes)</h2>
        <ul>
          {motivations.map((m, i) => (
            <li key={i}>{m.quote} <small>({m.createdAt})</small></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
