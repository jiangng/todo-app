import React from 'react';
import PropTypes from 'prop-types'
import TodoItemBody from './TodoItemBody';
import ItemName from "./ItemName";

export default class DormantTodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseEnterLeave = this.handleMouseEnterLeave.bind(this);
  }

  handleMouseEnterLeave(e) {
    // can't directly pass props.onMouseEnterLeave to onMouseEnter/Leave below
    // reason is cuz e.target.dataset.id is unreliable when mouse enters from different directions
    this.props.onMouseEnterLeave(e.type, this.props.id);
  }

  render() {
    let dragOverTargetID, dragOverEffectClassName, dragDropAttributes;
    if (this.props.reorderingProp)
      ({ dragOverTargetID, dragOverEffectClassName, ...dragDropAttributes } = this.props.reorderingProp);

    return (
      <li
        id={this.props.id}
        className={dragOverTargetID === this.props.id ? dragOverEffectClassName : null}
        {...dragDropAttributes}
      >
        <span
          onMouseEnter={this.handleMouseEnterLeave}
          onMouseLeave={this.handleMouseEnterLeave}
        >
          <TodoItemBody
            id={this.props.id}
            onDeleteBtnClick={this.props.onDeleteBtnClick}
            onItemCheck={this.props.onItemCheck}
            isComplete={this.props.isComplete}
            isCheckBoxDisabled={this.props.isCheckBoxDisabled}
            isShowingDeleteBtn={this.props.isShowingDeleteBtn}
            nameField={<ItemName
              id={this.props.id}
              name={this.props.name}
              isComplete={this.props.isComplete}
              onItemNameClick={this.props.onItemNameClick}
            ></ItemName>}
          ></TodoItemBody>
        </span>
      </li>
    );
  }
}
DormantTodoItem.propTypes = {
  //id: PropTypes.string,
  reorderingProp: PropTypes.object
}