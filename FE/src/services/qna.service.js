import mainRequest from '@/api/mainRequest';

export const getQnAByTour = async (tourId) => {
  const res = await mainRequest.get('/api/qna', { params: { tourId } });
  return res.data;
};

export const createQuestion = async (tourId, content) => {
  const res = await mainRequest.post(`/api/qna/create-question/${tourId}`, { content });
  return res.data;
};

export const replyQnA = async (qnaId, content) => {
  const res = await mainRequest.post(`/api/qna/reply/${qnaId}`, { content });
  return res.data;
};
