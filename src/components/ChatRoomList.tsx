import React, { useEffect, useState } from 'react';

interface ChatRoom {
  id: string;
  name: string;
}

const ChatRoomList: React.FC = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    fetch('/api/chat/room/list')
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error('에러:', err));
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
