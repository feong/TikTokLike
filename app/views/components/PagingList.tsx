import React from 'react';
import {FlatList, FlatListProps, View} from 'react-native';

const DEFAULT_COUNT = 20; // per fetch data amount
const DEFAULT_PRE_FETCH_INDEX = 3; // if there is only 3 item left, then fetch more data
const DEFAULT_UNMOUNT_LENGTH_AWAY = 5; // the item after 5 page or before 5 page of current will be unmount

interface Props<ItemT, Variables>
  extends Omit<
    FlatListProps<ItemT>,
    | 'data'
    | 'pagingEnabled'
    | 'bounces'
    | 'showsVerticalScrollIndicator'
    | 'scrollsToTop'
    | 'onLayout'
    | 'onScroll'
  > {
  query: (
    variables: {
      afterIndex?: number;
      length?: number;
    } & Variables,
  ) => Promise<{data: Array<ItemT>; remain: number}>;
  variables?: Variables;
  onPageIndexChanged?: (index: number) => void;
}

export function PagingList<T extends {id: number}>(
  props: Props<T, {length?: number}>,
) {
  const {query, variables, renderItem, onPageIndexChanged} = props;
  const length =
    variables?.length === undefined ? DEFAULT_COUNT : variables.length;

  const [data, setData] = React.useState<T[]>([]);
  const [remain, setRemain] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const [viewHeight, setViewHeight] = React.useState(0);

  const fetchData = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const ret = await query({
        afterIndex: data.length > 0 ? data[0].id : -1,
        length,
      });
      setData(data.concat(ret.data));
      setRemain(ret.remain);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, variables]);

  const onPageChanged = (index: number) => {
    setCurrentPageIndex(index);
    if (
      remain > 0 &&
      data.length - currentPageIndex - 1 < DEFAULT_PRE_FETCH_INDEX
    ) {
      fetchData();
    }
    onPageIndexChanged && onPageIndexChanged(index);
  };

  return (
    <FlatList
      keyExtractor={(item) => `${item.id}`}
      initialNumToRender={20}
      {...props} // props should not be customized should be put under this line.
      pagingEnabled
      bounces={false}
      showsVerticalScrollIndicator={false}
      scrollsToTop={false}
      renderItem={(item) => {
        const shouldMount =
          Math.abs(item.index - currentPageIndex) < DEFAULT_UNMOUNT_LENGTH_AWAY;
        return (
          <View style={{height: viewHeight}}>
            {shouldMount && renderItem ? renderItem(item) : null}
          </View>
        );
      }}
      data={data}
      onLayout={(e) => {
        const {height} = e.nativeEvent.layout;
        setViewHeight(height);
      }}
      onScroll={(event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (viewHeight > 0) {
          const pageIndex = Math.ceil(offsetY / viewHeight);
          if (pageIndex !== currentPageIndex) {
            onPageChanged(pageIndex);
          }
        }
      }}
    />
  );
}
