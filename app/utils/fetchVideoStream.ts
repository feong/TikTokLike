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
  return index === -1 ? [] : videoStream.data.slice(index, length);
};
