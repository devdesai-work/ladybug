import React, {useState} from 'react';
import {Modal, Button} from 'reactstrap';


const WorkModal = (props) => {
    const {toggle, bug, task} = props;
    
    
    return (
        <Modal isOpen={true} backdrop={'static'} size={'lg'} toggle={toggle}>
            <div class="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Choose Workspace Type</h5>
        <button type="button" className="close" onClick={toggle} >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className='d-flex flex-column'>
            <button className='card mb-5' style={{ height:'100px'}} onClick={bug}>
                <p className='pl-2 pt-2 h3 '>Bug Tracking</p>
                <p className='pl-2 text-muted'>Manage a List of development tasks and bugs</p>
            </button>
            <button className='card' style={{ height:'100px'}} onClick={task}>
               <p className='pl-2 pt-2 h3 '>Task Tracking</p>
               <p className='pl-2 text-muted'>Organize and track everyday Tasks</p>
            </button>
        </div>
      </div>
    </div> 
        </Modal>
    );
}

export default WorkModal;