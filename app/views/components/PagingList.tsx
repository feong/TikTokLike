import React from 'react';
import {FlatList, FlatListProps, View} from 'react-native';

const DEFAULT_COUNT = 20; // per fetch data amount

interface Props<ItemT, Variables>
  extends Pick<
    FlatListProps<ItemT>,
    Exclude<keyof FlatListProps<ItemT>, 'data'>
  > {
  query: (
    variables: {
      afterIndex?: number;
      length?: number;
    } & Variables,
  ) => Promise<{data: Array<ItemT>; remain: number}>;
  variables?: Variables;
}

export function PagingList<T extends {id: number}>(
  props: Props<T, {length?: number}>,
) {
  const {query, variables, renderItem} = props;
  const length =
    variables?.length === undefined ? DEFAULT_COUNT : variables.length;

  const [data, setData] = React.useState<T[]>([]);
  const [remain, setRemain] = React.useState(0);
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const [viewHeight, setViewHeight] = React.useState(0);

  const fetchData = async () => {
    try {
      const ret = await query({
        afterIndex: data.length > 0 ? data[0].id : -1,
        length,
      });
      setData(ret.data);
      setRemain(ret.remain);
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, variables]);

  const onPageChanged = (index: number) => {
    setCurrentPageIndex(index);
  };

  return (
    <FlatList
      keyExtractor={(item, index) =>
        item && item.id ? `${item.id}` : `${index}`
      }
      initialNumToRender={20}
      {...props} // props should not be customized should be put under this line.
      pagingEnabled
      bounces={false}
      scrollsToTop={false}
      renderItem={(item) => (
        <View style={{height: viewHeight}}>
          {renderItem ? renderItem(item) : null}
        </View>
      )}
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
