// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatRoomList from './components/ChatRoomList';
import ChatRoomById from './components/ChatRoomById';

function App() {
  return (
    <Router>
      <Routes>
        {/* 채팅방 목록 */}
        <Route path="/" element={<ChatRoomList />} />
        
        {/* 채팅방 상세 정보 */}
        <Route path="/chatroom/:roomId" element={<ChatRoomById />} />
      </Routes>
    </Router>
  );
}

export default App;
