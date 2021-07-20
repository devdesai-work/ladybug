import React, {useState} from 'react';
import Axios from 'axios';
import {Modal} from 'reactstrap';

const TeamModal = (props) => {
    const {toggle, user} = props;
    const [invite, setinvite] = useState({
        sender: user,
        recievers: '',
        team_name: '',
    })


    const handleclick = () => {
        const re_array = invite.recievers.split(',');
        for (let ele of re_array){
            Axios.post('http://localhost:3001/api/invite', {
            sender: invite.sender,
            reciever: ele,
            teamname: invite.team_name
            }).then((res)=>{
               console.log(res) 
            });
        }
        toggle(); 
    }

    return (
       <Modal isOpen={true} backdrop={'static'} toggle={toggle} size={'lg'}>
            <div className="p-2 ml-2">
            <h5 className="modal-title">Create Team</h5>
            </div>
            <div className='modal-body'>
                <div className='form-group'>
                     <label className='text-sm-left text-muted font-weight-bold'>Team Name</label>
                    <input onChange={(e)=> setinvite({...invite, team_name:e.target.value})} type="text" className="form-control" />
                    <span className='text-sm-left text-muted' style={{fontSize:"11px"}}>What is your team Called</span>
                </div>
               <div className='form-group'>
                     <label className='text-sm-left text-muted font-weight-bold'>Invite Teammates</label>
                    <input onChange={(e)=> setinvite({...invite, recievers:e.target.value})} type="text" className="form-control" />
                    <span className='text-sm-left text-muted' style={{fontSize:"11px"}}>Enter comma seperated username of the people you want to invite</span>
                </div>
            </div>
            <div className='modal-footer'>
                <button onClick={toggle} className='mr-2 btn btn-light'> Cancel </button>
                <button onClick={handleclick} className='mr-2 btn btn-primary'> Create Team </button>
            </div>
        </Modal>
    );
} 

export default TeamModal;