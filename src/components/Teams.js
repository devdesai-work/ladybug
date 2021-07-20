import React, {useState} from 'react';
import './css/work.css'
import InviteModal from './modals/InviteModal';
import TeamModal from './modals/TeamModal';
import {PlusCircleIcon} from '@primer/octicons-react';

const Teams = () => {
    const [invite, setInvite] = useState(false);
    const [team, setTeam] = useState(false);

    const invitetoggle = () => {
        setInvite((e) => e=!e);
    }

    const teamtoggle = () => {
        setTeam((e) => e=!e)
    }

    return (
        <div className='max-width-container'>
            <div>
                <p className='display-4'> Your Connections </p>
            </div>
            <div className='mt-10'>
                <div>
                    <span className='h4'>People</span>
                </div>
                <div className='d-flex flex-row'>
                    <div className='mt-2 card' style={{width:'200px', height:'200px'}}>
                        <button onClick={invitetoggle} className='h-100 w-100 btn btn-light btn-block'> <p className='h5'> <PlusCircleIcon size={60} /> </p></button>
                    </div>
                    <div>
                        <div className='mt-2 ml-3 card' style={{width:'200px', height:'200px'}}>
                        <button className='h-100 w-100 btn btn-light btn-block'> <p className='h5'> All Teammates </p></button>
                    </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <span className='h4'>Teams</span>
                </div>
                 <div className='d-flex flex-row'>
                    <div className='mt-2 card' style={{width:'200px', height:'200px'}}>
                        <button onClick={teamtoggle} className='h-100 w-100 btn btn-light btn-block'> <p className='h5'> <PlusCircleIcon size={60} /> </p></button>
                    </div>
                    <div>
                        <div className='mt-2 ml-3 card' style={{width:'200px', height:'200px'}}>
                        <button className='h-100 w-100 btn btn-light btn-block'> <p className='h5'> Display Teams here </p></button>
                    </div>
                    </div>
                </div>
            </div>
            { invite ? (<InviteModal toggle={invitetoggle} />) : null}
            { team ? (<TeamModal toggle={teamtoggle} />) : null}
        </div>
    );
}

export default Teams;