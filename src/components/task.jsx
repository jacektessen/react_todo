import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { handleDeleteTask } from "../actions/tasks";
import { showModal } from "../actions/modal";
import { connect } from "react-redux";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  position: flex;
`;

class Task extends Component {
  handleDelete = () => {
    this.props.handleDeleteTask(this.props.task.id);
  };
  renderModal = () => {
    this.props.showModal(this.props.task.id);
  };
  render() {
    return (
      <div>
        <Draggable draggableId={this.props.task.id} index={this.props.index}>
          {provided => (
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {this.props.task.name}
              <i
                onClick={this.handleDelete}
                className="fa fa-trash-o fa-lg"
                aria-hidden="true"
              ></i>
              <i
                onClick={this.renderModal}
                className="fa fa-pencil fa-lg"
                aria-hidden="true"
              ></i>
            </Container>
          )}
        </Draggable>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleDeleteTask: taskID => dispatch(handleDeleteTask(taskID)),
    showModal: taskID => dispatch(showModal(taskID))
  };
};

export default connect(null, mapDispatchToProps)(Task);
