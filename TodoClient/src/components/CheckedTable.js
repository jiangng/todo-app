import React from 'react';
import PropTypes from 'prop-types';
import CheckedHeader from './CheckedHeader';
import ItemList from './ItemList';

export default class CheckedTable extends React.Component {
  render() {
    return (
      <div>
        <CheckedHeader checkedItemCount={this.props.checkedItemIDList.length}></CheckedHeader>
        <ItemList
          items={this.props.items}
          itemIDList={this.props.checkedItemIDList}
          isComplete={true}
          onItemCheck={this.props.onItemCheck}
          onDeleteBtnClick={this.props.onDeleteBtnClick}
        ></ItemList>
      </div>
    );
  }
}
CheckedTable.propTypes = {
  checkedItemIDList: PropTypes.array,
  items: PropTypes.object,
  //deleteBtnShowingItemId: PropTypes.string,
};
