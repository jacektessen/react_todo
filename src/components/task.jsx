import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { handleDeleteTask } from ".././redux/tasks";
import { showModal } from "../redux/modal";
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
    // console.log("Props w task", this.props);
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

export default connect(null, { handleDeleteTask, showModal })(Task);
