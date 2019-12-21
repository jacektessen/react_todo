import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { getSettingsPage, updateSettingsPage } from "../actions/settingsPage";

class SettingsPage extends Component {
  state = {
    data: {
      panel_1: "",
      panel_2: "",
      panel_3: "",
      panel_4: "",
      language: "",
      user: "",
      id: ""
    },
    prevData: null,
    unsavedChanges: false
  };

  componentDidMount() {
    this.props.getSettingsPage();
    if (this.props.settings) {
      try {
        this.setState({
          data: this.props.settings
        });
      } catch {}
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.settings !== this.props.settings) {
      try {
        this.setState({
          data: this.props.settings
        });
      } catch {}
    }
    if (
      JSON.stringify(Object.values(this.state.data)) !==
        JSON.stringify(Object.values(this.props.settings)) &&
      !this.state.unsavedChanges
    ) {
      this.setState({ unsavedChanges: true });
    }
    if (
      JSON.stringify(Object.values(this.state.data)) ===
        JSON.stringify(Object.values(this.props.settings)) &&
      this.state.unsavedChanges
    ) {
      this.setState({ unsavedChanges: false });
    }
  }

  handleSaveSettings = () => {
    this.props.updateSettingsPage(this.state.data);
  };
  inputForm = (name, label, value) => {
    const { data } = this.state;
    return (
      <tr key={name}>
        <th scope="row">{label}:</th>
        <td>
          <input
            type="color"
            value={value}
            onChange={event =>
              this.setState({ data: { ...data, [name]: event.target.value } })
            }
          />
        </td>
      </tr>
    );
  };

  renderInputSettings = (name, label, value) => {
    const { data } = this.state;
    return (
      <table className="table mt-5">
        <tbody>
          {[1, 2, 3, 4].map(panelNum =>
            this.inputForm(
              `panel_${panelNum}`,
              `Panel ${panelNum} - background color`,
              data[`panel_${panelNum}`]
            )
          )}
          {this.state.unsavedChanges && (
            <tr>
              <td colSpan="2">
                <button
                  onClick={this.handleSaveSettings}
                  className="btn btn-success btn-block">
                  Save
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };
  render() {
    return <div>{this.renderInputSettings()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settingsPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSettingsPage: () => dispatch(getSettingsPage()),
    updateSettingsPage: settings => dispatch(updateSettingsPage(settings))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
