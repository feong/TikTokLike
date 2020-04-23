import videoStream from './mock/videoStream.json';

export const fetchVideoStream = async (params: {
  afterIndex?: number;
  length?: number;
}) => {
  const {afterIndex, length = 10} = params;
  const index =
    afterIndex === undefined
      ? 0
      : videoStream.data.findIndex((item) => item.id > afterIndex);
  if (index === -1) {
    return {data: [], remain: 0};
  } else {
    const data = videoStream.data.slice(index, length);
    return {data, remain: videoStream.data.length - index - data.length};
  }
};
