// src/components/ChatRoomDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface ChatRoom {
  id: number;
  name: string;
  createDate: string;
  modifyDate: string;
}

const ChatRoomDetail: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<ChatRoom | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<ChatRoom>(`/api/chat/room/${roomId}`)
      .then(res => setRoom(res.data))
      .catch(err => {
        if (err.response?.status === 404) {
          setError("채팅방이 존재하지 않습니다.");
        } else {
          setError("오류가 발생했습니다.");
        }
      });
  }, [roomId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!room) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h2>채팅방 상세 정보</h2>
      <p><strong>ID:</strong> {room.id}</p>
      <p><strong>이름:</strong> {room.name}</p>
      <p><strong>생성일:</strong> {room.createDate}</p>
      <p><strong>수정일:</strong> {room.modifyDate}</p>
    </div>
  );
};

export default ChatRoomDetail;
