import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

export default class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseEnterId: null
    };

    this.handleMouseEnterLeave = this.handleMouseEnterLeave.bind(this);
    this.handleItemNameClick = this.handleItemNameClick.bind(this);
  }

  handleMouseEnterLeave(eventType, id) {
    if (this.props.activeItemId == null) {
      let mouseEnterId = null;
      switch (eventType) {
        case "mouseenter":
          mouseEnterId = id;
          break;
        case "mouseleave":
          //empty for now
          break;
        default:
          return;
      }

      this.setState({
        mouseEnterId: mouseEnterId
      });
    }
  }

  handleItemNameClick(id) {
    this.props.onItemNameClick(id)
    this.setState({
      mouseEnterId: null
    });
  }

  render() {
    const items = this.props.itemIDList.map((id) => {
      return (
        <TodoItem
          key={id}
          name={this.props.items[id]}
          id={id}
          isActive={this.props.activeItemId === id}
          isComplete={this.props.isComplete}
          onDeleteBtnClick={this.props.onDeleteBtnClick}
          onItemCheck={this.props.onItemCheck}

          // For active todoItem
          onInputExit={this.props.onInputExit}
          onItemNameChange={this.props.onItemNameChange}
          onBackspaceEmpty={this.props.onBackspaceEmpty}

          // For dormant todoItem
          onItemNameClick={this.handleItemNameClick}
          onMouseEnterLeave={this.handleMouseEnterLeave}
          reorderingProp={this.props.reorderingProp}
          isCheckBoxDisabled={this.props.activeItemId && this.props.activeItemId !== id}
          isShowingDeleteBtn={this.props.activeItemId === id || this.state.mouseEnterId === id}
        ></TodoItem>
      );
    });

    return (
      <ul>
        {items}
      </ul>
    );
  }
}
ItemList.propTypes = {
  itemIDList: PropTypes.array,
  items: PropTypes.object,
  reorderingProp: PropTypes.object
};
ItemList.defaultProps = {
  activeItemId: null,
  reorderingProp: null,
  onItemNameChange: () => { },
  onItemNameClick: () => { },
  onInputExitByKeyDown: () => { },
  onInputExitByOutsideClick: () => { },
  onBackspaceEmpty: () => { }
};
