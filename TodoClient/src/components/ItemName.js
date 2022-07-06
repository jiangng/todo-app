import React from 'react';
import PropTypes from 'prop-types'

export default class ItemName extends React.Component {
  constructor(props) {
    super(props);

    this.handleItemNameClick = this.handleItemNameClick.bind(this);
  }

  handleItemNameClick() {
    this.props.onItemNameClick(this.props.id);
  }

  render() {
    const classList = [];

    if (this.props.isComplete)
      classList.push("crossed-line");

    if (this.props.name.length === 0)
      classList.push("empty-clickable");

    return (
      <span
        onClick={this.handleItemNameClick}
        className={classList.join(" ")}
      >
        {this.props.name}
      </span>
    );
  }
}
ItemName.propTypes = {
  //id: PropTypes.string,
}