import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ChatRoom {
  id: string;
  name: string;
}

const ChatRoomList: React.FC = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    axios.get<ChatRoom[]>('/api/chat/room/list')
      .then((res) => setRooms(res.data)) // ✅ res.data에 바로 JSON 데이터 들어있음
      .catch((err) => {
        console.error('채팅방 목록 가져오기 실패:', err);
      });
  }, []);

  return (
    <div>
      <h2>채팅방 목록</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>{room.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
