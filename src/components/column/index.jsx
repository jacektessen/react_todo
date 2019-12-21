import React from "react";
import styled, { ThemeProvider, css } from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "../task";
import { getSettingsPage } from "../../actions/settingsPage";
import { connect } from "react-redux";

// export const theme = {
//   background: {
//     column1: "#ffcc80",
//     column2: "#fff176",
//     column3: "#ffeef2",
//     column4: "lightGreen"
//   }
// };

export const Container = styled.div`
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
      vertical-align: ${props => (props.column === "column4" ? "bottom" : null)}; */
    `}
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  padding: 4px;
`;

export const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

class Column extends React.Component {
  componentDidMount() {
    this.props.getSettingsPage();
  }
  render() {
    const { settings } = this.props;
    if (!settings) return null;
    const theme = {
      background: {
        column1: settings.panel_1,
        column2: settings.panel_2,
        column3: settings.panel_3,
        column4: settings.panel_4
      }
    };
    return (
      <ThemeProvider theme={theme}>
        {/* <ThemeProvider theme={this.state.theme}> */}
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

const mapStateToProps = state => {
  return {
    settings: state.settingsPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSettingsPage: () => dispatch(getSettingsPage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Column);
