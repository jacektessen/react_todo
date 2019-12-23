import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { getSettingsPage, updateSettingsPage } from "../actions/settingsPage";

class SettingsPage extends Component {
  state = {
    data: {
      panel_1_color: "",
      panel_2_color: "",
      panel_3_color: "",
      panel_4_color: "",
      panel_1_name: "",
      panel_2_name: "",
      panel_3_name: "",
      panel_4_name: "",
      shadow_effect: true,
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

  handleSaveSettings = async () => {
    await this.props.updateSettingsPage(this.state.data);
    console.log("this.props.history", this.props);
    this.props.history.push("/dashboard");
  };

  inputForm = (name, label, value, type) => {
    const { data } = this.state;
    return (
      <tr key={name}>
        <th scope="row">{label}:</th>
        <td>
          <input
            type={type}
            value={value}
            onChange={event =>
              this.setState({ data: { ...data, [name]: event.target.value } })
            }
          />
        </td>
      </tr>
    );
  };

  renderPanelColorSettings = (name, label, value) => {
    const { data } = this.state;
    return [1, 2, 3, 4].map(panelNum =>
      this.inputForm(
        `panel_${panelNum}_color`,
        `Panel ${panelNum} - background color`,
        data[`panel_${panelNum}_color`],
        "color"
      )
    );
  };

  renderPanelNameSettings = (name, label, value) => {
    const { data } = this.state;
    return [1, 2, 3, 4].map(panelNum =>
      this.inputForm(
        `panel_${panelNum}_name`,
        `Panel ${panelNum} - name`,
        data[`panel_${panelNum}_name`],
        "text"
      )
    );
  };

  render() {
    // console.log("state in settigs", this.state);
    console.log("props ind settings", this.props);
    const { data } = this.state;
    return (
      <div>
        <table className="table mt-5">
          <tbody>
            {this.renderPanelColorSettings()}
            {this.renderPanelNameSettings()}
            <tr>
              <th scope="row">Shadow effect:</th>
              <td>
                <input
                  type="checkbox"
                  name="shadow_effect"
                  checked={data.shadow_effect}
                  onChange={event => {
                    this.setState({
                      data: {
                        ...data,
                        shadow_effect: !data.shadow_effect
                      }
                    });
                  }}
                />
              </td>
            </tr>
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
      </div>
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
    getSettingsPage: () => dispatch(getSettingsPage()),
    updateSettingsPage: settings => dispatch(updateSettingsPage(settings))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
