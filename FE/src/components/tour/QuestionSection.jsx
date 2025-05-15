import { useEffect, useState } from 'react';
import { getQnAByTour, createQuestion, replyQnA } from '@/services/qna.service';
import PropTypes from 'prop-types';
import { useAuthState } from '@/contexts/AuthContext';

function QnAItem({ qna, onReply, replyingId, onReplySubmit }) {
  const [replyContent, setReplyContent] = useState('');
  return (
    <div className="border rounded p-3 mb-2 bg-gray-50">
      <div className="font-semibold mb-1">{qna.createdBy || 'Ẩn danh'} hỏi:</div>
      <div className="mb-2 text-gray-800">{qna.content}</div>
      <div className="flex gap-2 mb-2">
        <button className="text-blue-500 text-sm hover:underline" onClick={() => onReply(qna.id)}>
          Trả lời
        </button>
      </div>
      {replyingId === qna.id && (
        <form
          className="mb-2 flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onReplySubmit(qna.id, replyContent, setReplyContent);
          }}
        >
          <textarea
            className="border rounded p-2 text-sm"
            rows={2}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Nhập nội dung trả lời..."
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
              Gửi
            </button>
            <button type="button" className="text-gray-500 text-sm" onClick={() => onReply(null)}>
              Huỷ
            </button>
          </div>
        </form>
      )}
      {/* Hiển thị các câu trả lời lồng nhau */}
      {qna.answers && qna.answers.length > 0 && (
        <div className="pl-4 border-l mt-2">
          {qna.answers.map((answer) => (
            <div key={answer.id} className="mb-2">
              <div className="font-semibold text-green-700">
                {answer.createdBy || 'Ẩn danh'} trả lời:
              </div>
              <div className="text-gray-800">{answer.content}</div>
              <div className="text-xs text-gray-400 mb-1">
                {new Date(answer.createdAt).toLocaleString('vi-VN')}
              </div>
              {/* Có thể cho phép reply vào answer nếu muốn, hoặc chỉ reply vào question */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

QnAItem.propTypes = {
  qna: PropTypes.object.isRequired,
  onReply: PropTypes.func.isRequired,
  replyingId: PropTypes.number,
  onReplySubmit: PropTypes.func.isRequired,
};

export default function QuestionSection({ tourId }) {
  const [qnaList, setQnaList] = useState([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [replyingId, setReplyingId] = useState(null);
  const { user } = useAuthState();

  const fetchQnA = async () => {
    setLoading(true);
    const res = await getQnAByTour(tourId);
    setQnaList(res.result || []);
    setLoading(false);
  };

  useEffect(() => {
    if (tourId) fetchQnA();
  }, [tourId]);

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    await createQuestion(tourId, question);
    setQuestion('');
    fetchQnA();
  };

  const handleReplySubmit = async (qnaId, content, resetContent) => {
    if (!content.trim()) return;
    await replyQnA(qnaId, content);
    setReplyingId(null);
    resetContent('');
    fetchQnA();
  };

  return (
    <div className="bg-white rounded-xl p-5 mt-8 shadow">
      <h2 className="text-xl font-bold mb-4">Hỏi đáp về tour</h2>
      {user && (
        <form className="mb-6 flex flex-col gap-2" onSubmit={handleCreateQuestion}>
          <textarea
            className="border rounded p-2 text-sm"
            rows={2}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Đặt câu hỏi cho tour này..."
            required
          />
          <button
            type="submit"
            className="self-end bg-blue-500 text-white px-4 py-1 rounded text-sm"
          >
            Gửi câu hỏi
          </button>
        </form>
      )}
      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <div className="flex flex-col gap-2">
          {qnaList.length === 0 && <div>Chưa có câu hỏi nào cho tour này.</div>}
          {qnaList.map((qna) => (
            <QnAItem
              key={qna.id}
              qna={qna}
              onReply={setReplyingId}
              replyingId={replyingId}
              onReplySubmit={handleReplySubmit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

QuestionSection.propTypes = {
  tourId: PropTypes.string,
};
