export const PAGINATION = {
  defaultCurrent: 1,
  hideOnSinglePage: true,
  defaultPageSize: 8,
  showSizeChanger: true,
  pageSizeOptions: [8, 10, 20, 50, 100],
  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
};

export const TABLE_SETTING = {
  bordered: true,
  size: "small",
  expandedRowRender: false,
  title: undefined,
  showHeader: true,
  footer: false,
  scroll: undefined,
  rowKey: "id",
};
