import React, { useEffect, useState, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface ChatRoom {
  id: number;
  name: string;
  createDate: string;
  modifyDate: string;
}

interface Message {
  writerName: string;
  content: string;
}

const ChatRoomDetail: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<ChatRoom | null>(null);
  const [error, setError] = useState<string | null>(null);

  // form state
  const [writerName, setWriterName] = useState('');
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState<Message[]>([]); // 채팅 내용 저장용

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!writerName || !content) return;

    // 메시지 추가 (임시, 백엔드 연동 시 axios.post 사용)
    setMessages([...messages, { writerName, content }]);
    setWriterName('');
    setContent('');
  };

  if (error) return <div>{error}</div>;
  if (!room) return <div>로딩 중...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{room.id}번 채팅방</h1>

      <nav className="my-4 space-x-4">
        <Link to="/chat/room/make" className="text-blue-600 underline">채팅방 생성</Link>
        <Link to="/" className="text-blue-600 underline">채팅방 목록</Link>
      </nav>

      <form onSubmit={handleSubmit} className="space-x-2 mb-4">
        <input
          type="text"
          name="writerName"
          placeholder="작성자 명"
          value={writerName}
          onChange={(e) => setWriterName(e.target.value)}
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="content"
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border px-2 py-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">작성</button>
      </form>

      <div className="bg-gray-100 p-2 rounded">
        <h3 className="font-semibold">채팅 내용</h3>
        {messages.length === 0 ? (
          <p className="text-gray-500">작성된 메시지가 없습니다.</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {messages.map((msg, idx) => (
              <li key={idx} className="text-sm">
                <strong>{msg.writerName}:</strong> {msg.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatRoomDetail;
