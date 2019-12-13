import React, { Component } from "react";
import ModalContent from "./modalContent";
import { connect } from "react-redux";
import { showModal, closeModal } from "../../../actions/modal";

export class Modal extends Component {
  constructor() {
    super();
    // this.state = {
    //   isShown: false
    // };
  }
  showModal = () => {
    this.props.showModal();
    this.toggleScrollLock();
  };
  closeModal = () => {
    this.props.closeModal();
    this.toggleScrollLock();
  };
  onKeyDown = event => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };
  onClickOutside = event => {
    if (this.props.clickOutside === false) {
      return;
    }
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };

  toggleScrollLock = () => {
    document.querySelector("html").classList.toggle("scroll-lock");
  };
  render() {
    return (
      <React.Fragment>
        {this.props.modal.isShown ? (
          <ModalContent
            content={this.props.children}
            // slidesPerPage={this.props.slidesPerPage}
            // buttonCTA={this.props.buttonCTA}

            modalRef={n => (this.modal = n)}
            buttonRef={n => (this.closeButton = n)}
            closeModal={this.closeModal}
            onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
            // onCTAButton={this.props.onCTAButton}
          />
        ) : (
          <React.Fragment />
        )}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    showModal: taskID => dispatch(showModal(taskID))
  };
};

export default connect(
  state => ({ modal: state.modal }),
  mapDispatchToProps
)(Modal);
