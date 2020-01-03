import * as React from "react";
import { ColumnProps } from "antd/lib/table";
import { Icon, Input, Button } from "antd";

interface FilterDropdownProps {
  dataIndex: string
  onSearch: GetColumnSearchOptions["onSearch"]
  onReset: GetColumnSearchOptions["onReset"]
  renderMenu?: React.ReactNode
}

class TableFilterDropdown extends React.Component<FilterDropdownProps, { searchValue: string }> {
  constructor(props: FilterDropdownProps) {
    super(props);
    this.state = {
      searchValue: ""
    }
  };

  render() {
    if (this.props.renderMenu) return this.props.renderMenu;
    return (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${this.props.dataIndex}`}
          value={this.state.searchValue}
          onChange={e => this.setState({ searchValue: e.target.value })}
          onPressEnter={() => this.props.onSearch(this.state.searchValue)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.props.onSearch(this.state.searchValue)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => { this.props.onReset(); this.setState({ searchValue: "" }) }} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    );
  };
}

interface GetColumnSearchOptions {
  dataIndex: string
  isFiltered: () => boolean
  onSearch: (searchValue: string) => void
  onReset: () => void
  renderMenu?: (options: GetColumnSearchOptions) => React.ReactNode
}

export function getColumnSearchProps<P = any>(options: GetColumnSearchOptions): ColumnProps<P> {
  const { dataIndex, isFiltered, onSearch, onReset, renderMenu } = options;
  return {
    filterDropdown: () => (
      <TableFilterDropdown
        onSearch={onSearch}
        onReset={onReset}
        dataIndex={dataIndex}
        renderMenu={renderMenu ?
          <div
            className="custom-filter-menu"
          >
            {renderMenu(options)}
          </div>
          : undefined}
      />
    ),
    filterIcon: () => <Icon type="search" style={{ color: isFiltered() ? '#1890ff' : undefined }} />
  }
}