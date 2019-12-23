import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { connect } from "react-redux";
import { handleDeleteTask } from "../actions/tasks";
import { showModal } from "../actions/modal";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  position: flex;
  &:hover {
    background-color: rgba(255, 236, 236, 0.6);
  }
  ${props =>
    !props.shadow
      ? null
      : css`
          -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
          -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
          box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
        `}
`;

class Task extends Component {
  confirmDelete = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this task?",
      buttons: [
        {
          label: "Yes",
          onClick: this.handleDelete
        },
        {
          label: "No"
        }
      ]
    });
  };
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
            <div>
              <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                shadow={this.props.shadow}>
                {this.props.task.name}
                <button onClick={this.confirmDelete} className="delete-button-tasks">
                  <i className="fa fa-trash-o fa-lg" aria-hidden="true"></i>
                </button>
                <button className="edit-button-tasks" onClick={this.renderModal}>
                  <i className="fa fa-search-plus fa-lg" aria-hidden="true"></i>
                </button>
              </Container>
            </div>
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
