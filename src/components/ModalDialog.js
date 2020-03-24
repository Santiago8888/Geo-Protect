import React from "react";
import PropTypes from 'prop-types';

const ModalDialog =  props => {
  const header = props.title ? (
    <div className='modal-card-head has-background-white'>
      {props.title}
    </div>
  ) : null;
  const footer = props.footer ? (
    <footer className='modal-card-foot'>{ props.footer }</footer>
  ) : null;
  return (
    <div className={`modal ${props.className} ${props.isActive ? 'is-active': ''}`}>
      <div className="modal-background"/>
      <div className="modal-card">
        <React.Fragment>
          { header }
          <button className="modal-close is-large"
                  aria-label="close"
                  onClick={
                    e => {
                      if (
                        props.hasOwnProperty('onClose') &&
                        typeof props.onClose !== 'undefined'
                      ) {
                        props.onClose(e);
                      }
                    }
                  }
          >
            &times;
          </button>
        </React.Fragment>
        <div className='modal-card-body'>
          { props.children }
        </div>
        { footer }
      </div>
    </div>
  );
};

ModalDialog.propTypes ={
  title: PropTypes.node,
  className: PropTypes.string,
  isActive: PropTypes.bool,
  footer: PropTypes.node,
  onClose: PropTypes.func,
};

export default ModalDialog;