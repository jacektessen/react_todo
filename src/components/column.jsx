import React from "react";
import styled, { ThemeProvider, css } from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";

const theme = {
  background: {
    column1: "#ffcc80",
    column2: "#fff176",
    column3: "#ffeef2",
    column4: "lightGreen"
  }
};

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  @media (min-width: 950px) {
    width: 48%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
  width: 600px;
  ${props =>
    props.column &&
    css`
      background: ${props => props.theme.background[props.column]};

      /* clear: ${props => (props.column === "column4" ? "both" : null)}; */
      /* width: ${props => (props.column === "column4" ? "50%" : null)};
      vertical-align: ${props =>
        props.column === "column4" ? "bottom" : null}; */
    `}
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 4px;
`;

const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

export default class Column extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container column={this.props.column.id}>
          <Title>{this.props.column.title}</Title>
          <Droppable droppableId={this.props.column.id}>
            {provided => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                {this.props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
              </TaskList>
            )}
          </Droppable>
        </Container>
      </ThemeProvider>
    );
  }
}
