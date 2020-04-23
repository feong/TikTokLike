import comments from './mock/comments.json';

export const fetchComments = async (params: {
  videoId: number;
  afterIndex?: number;
  length?: number;
}) => {
  // TODO: to paging request
  return comments.data.map((item, index) => ({
    ...item,
    date: Date.now() - index * 86400000,
  }));
};
