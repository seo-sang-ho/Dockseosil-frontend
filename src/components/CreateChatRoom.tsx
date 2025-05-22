import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ChatRoomCreate() {
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    try {
      const res = await axios.post('/api/chat/room/make', { name: roomName }); // API 경로에 맞게 수정

      const roomId = res.data.roomId;
      alert(res.data.message);
      navigate(`/chatroom/${roomId}`); // 채팅방 페이지로 이동
    } catch (error: any) {
      alert(error.response?.data?.message || '채팅방 생성 실패');
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="채팅방 이름 입력"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="border px-2 py-1"
      />
      <button onClick={handleCreateRoom} className="ml-2 bg-blue-500 text-white px-4 py-1 rounded">
        생성
      </button>
    </div>
  );
}
