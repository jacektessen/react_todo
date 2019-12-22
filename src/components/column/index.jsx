import React from "react";
import styled, { ThemeProvider, css } from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "../task";
import { getSettingsPage } from "../../actions/settingsPage";
import { connect } from "react-redux";

export const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
  @media (min-width: 950px) {
    width: 48%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
  width: 600px;
  ${props =>
    // props.column &&
    css`
      background: ${props => props.theme.background[props.column]};
    `}
  display: flex;
  flex-direction: column;
  ${props =>
    !props.shadow
      ? null
      : css`
          -webkit-box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.5);
          -moz-box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.5);
          box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.5);
        `}
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
        column1: settings.panel_1_color,
        column2: settings.panel_2_color,
        column3: settings.panel_3_color,
        column4: settings.panel_4_color
      }
    };
    const title = {
      column1: settings.panel_1_name,
      column2: settings.panel_2_name,
      column3: settings.panel_3_name,
      column4: settings.panel_4_name
    };
    return (
      <ThemeProvider theme={theme}>
        <Container column={this.props.column.id} shadow={settings.shadow_effect}>
          <Title>{title[this.props.column.id]}</Title>
          <Droppable droppableId={this.props.column.id}>
            {provided => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                {this.props.tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    shadow={settings.shadow_effect}
                  />
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
