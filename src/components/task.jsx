import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { handleDeleteTask } from ".././redux/tasks";
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
  handleClick = () => {
    console.log("delete jest kliknięty", this.props.task.id);
    this.props.handleDeleteTask(this.props.task.id);
  };
  render() {
    // console.log("Props w task", this.props);
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.props.task.content} id: {this.props.task.id}
            <i
              onClick={this.handleClick}
              className="fa fa-trash-o fa-lg"
              aria-hidden="true"
            ></i>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default connect(null, { handleDeleteTask })(Task);
