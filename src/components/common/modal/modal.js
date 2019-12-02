import React, { Component } from "react";
import ModalContent from "./modalContent";
import { connect } from "react-redux";
import { showModal, closeModal } from "../../../redux/modal";

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
    // console.log("childer in carouselModa", this.props.children);
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

export default connect(state => ({ modal: state.modal }), {
  showModal,
  closeModal
})(Modal);
