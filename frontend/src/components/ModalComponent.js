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
      <Modal  show={this.props.modal.showModal} onHide={this.props.modal.cancelFunction}>
        <Modal.Header className={this.props.modal.colorType} style={{borderTopLeftRadius: 5,borderTopRightRadius: 5}} closeButton>
          <Modal.Title className='fg-white'>{this.props.modal.modalTitle}</Modal.Title>
        </Modal.Header >
        <Modal.Body>
          {this.props.modal.modalBody}
        </Modal.Body>
        <Modal.Footer className='bg-white' style={{borderBottomLeftRadius: 5,borderBottomRightRadius: 5}}>
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
