import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface ChatRoom {
  id: string;
  name: string;
}

const ChatRoomList: React.FC = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    axios.get<ChatRoom[]>('/api/chat/room/list')
      .then((res) => setRooms(res.data)) 
      .catch((err) => {
        console.error('채팅방 목록 가져오기 실패:', err);
      });
  }, []);

  return (
    <div>
      <h2>채팅방 목록</h2>      
        <ul>
        {rooms.map((room) => (
            <li key={room.id}>
            <Link to={`/chatroom/${room.id}`}>{room.name}</Link>
            </li>
        ))}
        </ul>
    </div>
  );
};

export default ChatRoomList;
