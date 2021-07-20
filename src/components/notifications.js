import React, {useState, useEffect} from 'react';
import './css/work.css';
import Axios from 'axios';




const Notifications = () => {
    const [data, setData] = useState({
        invite_data: []
    })

    
    const handleClick = () => {
        const user = localStorage.getItem('user');

    }

    useEffect(() => {
        const user = localStorage.getItem('user');
        const pp = [{
            sender_username: 'people',
            team_name: 'in their team will appear here',
        }]
        Axios.post('http://localhost:3001/api/get_invites', {
            username: user,
        }).then((res)=>{
            if (res.data === false){
                setData({invite_data: pp});
            }
            else{
                setData({invite_data: res.data})
            }
           
        })
        
    }, [])

    return (
        <>
            <div className='max-width-container'>
            <div>
                <p className='display-3'> Notifications </p>
            </div>
            <div className='mt-30'>
                <ul className='list-group'>
                    {data.invite_data.map((item) => (
                        <li className='mb-3 list-group-item'>
                        <span className='mr-5 h4'>Invite from {item.sender_username} to join them in {item.team_name}</span>
                        <button  className='btn btn-primary'>Accept Invite</button>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    )
}

export default Notifications;