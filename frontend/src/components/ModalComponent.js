/**
* Created by albertoclarit on 9/2/16.
*/
import React,{PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalActions from '../actions/modalActions';
import { routerActions } from 'react-router-redux';

import {Modal,Button} from '@sketchpixy/rubix';

class ModalComponent extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <Modal bsSize={this.props.modal.size} show={this.props.modal.showModal} onHide={this.props.modal.cancelFunction}>
        <Modal.Header>
          <Modal.Title>{this.props.modal.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.modal.modalBody}
        </Modal.Body>
        <Modal.Footer>
          {this.props.modal.cancel}
          {this.props.modal.proceed}
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    modal:state.modal
  }
}

function mapDispatchToProps(dispatch) {
  return {
    routerActions: bindActionCreators(routerActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalComponent);
