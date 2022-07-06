import React from 'react';

export default function withReordering(WrappedComponent, reorder, getDragOverEffect) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dragID: null,
        dragOverID: null,
      };

      this.handleDragStart = this.handleDragStart.bind(this);
      this.handleDrop = this.handleDrop.bind(this);
      this.handleDragEnter = this.handleDragEnter.bind(this);
      this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    handleDragStart(e) {
      this.setState({
        dragID: parseInt(e.currentTarget.id)
      });
    }

    handleDrop() {
      reorder(this.state.dragID, this.state.dragOverID);

      this.setState({
        dragID: null,
        dragOverID: null
      });
    }

    handleDragEnter(e) {
      this.setState({
        dragOverID: parseInt(e.currentTarget.id)
      });
    }

    handleDragEnd() {
      if (this.state.dragOverID) {
        this.handleDrop();
      }
    }

    render() {
      const injectedProp = {
        draggable: true,
        onDragStart: this.handleDragStart,
        onDragOver: (ev) => ev.preventDefault(),
        onDrop: this.handleDrop,
        onDragEnter: this.handleDragEnter,
        onDragEnd: this.handleDragEnd,
        dragOverTargetID: this.state.dragOverID,
        dragOverEffectClassName: getDragOverEffect(this.props.itemIDList, this.state.dragID, this.state.dragOverID)
      };

      return (
        <WrappedComponent
          reorderingProp={injectedProp}
          {...this.props}
        >
        </WrappedComponent>
      );
    }
  };
}
