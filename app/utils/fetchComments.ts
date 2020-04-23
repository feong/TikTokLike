import comments from './mock/comments.json';
import {fetchOwnComments} from './postComment';

export const fetchComments = async (params: {
  videoId: number;
  afterIndex?: number;
  length?: number;
}) => {
  // TODO: to paging request

  const ret = await fetchOwnComments(params.videoId);

  return ret.concat(
    comments.data
      .filter((item) => item.postId === params.videoId)
      .map((item, index) => ({
        ...item,
        date: Date.now() - index * 86400000,
      })),
  );
};
