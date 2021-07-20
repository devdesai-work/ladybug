import React , {useState, useEffect, useRef} from 'react'
import {Link, withRouter, useHistory} from 'react-router-dom';
import "./css/navigation.css"
import TeamModal  from './modals/TeamModal';
import IssueModal from './modals/IssueModal';
import InviteModal from './modals/InviteModal';
import bug from './img/bug2.png';
import {BellIcon, PeopleIcon, PersonAddIcon, PersonIcon} from '@primer/octicons-react';


const data = [
    {
        id: 1,
        name: "Error in startup",
        type: 'task'
    },
    {
        id: 2,
        name: "Fix Sign-In",
        type: 'task'
    },
    {
        id: 3,
        name: "DiscoPanda",
        type: 'project'
    },
    {
        id: 4,
        name: "Cocobaba",
        type: 'project'
    },
]

const displayList = (type) => {
    const newList = data.filter((item) =>
            item.type === type
        );
    return (
        <>
        {newList.map((item) => (
            <li key={item.id} className="d-flex justify-content-between align-items-center">
                <button className='mb-2 btn btn-light' style={{width:260, textAlign:'left'}}>{item.name}</button>
            </li>
        ))}
        </>
    );
}

const Navigation = (props) => {
    const [invite, setInvite] = useState(false);
    const [team, setTeam] = useState(false);
    const [type, settype] = useState(() => {'task'});
    const state = useRef(()=>true);
    const [drop, setdrop] = useState(false);
    const [people, setpeople] = useState(false);
    const [createIssue, setcreateIssue] = useState(false);
    const history = useHistory();
    const [User, setUser] = useState('');
    
    useEffect(() => {
        const user = localStorage.getItem('user');
        setUser(user);
    }, [])

    useEffect(()=> {
        if (type === 'task') {
            state.current = true
            
        }
        else{
            state.current = false
            
        }
        
    }, [type])

    const handleClick = () => {
        localStorage.setItem('user', '');
        history.push('/');
    }

    function toggle() {
        setcreateIssue((m) => m=!m );
    }

    const invitetoggle = () => {
        setInvite((e) => e=!e);
    }

    const teamtoggle = () => {
        setTeam((e) => e=!e);
    }

    const onSubmit = () => {
        toggle();
        console.log(createIssue);
        /*
            code for saving the issue in the database
        */
    }

    
    return (
        <>
        <nav class='navbar navbar-expand-lg shadow p-3 mb-5 bg-white rounded d-flex justify-content-between'>
        <ul className='nav w-25 d-flex flex-fill'>
            <li className='nav-item '>
                <Link className='navbar-brand' to='/your_work'><img src={bug} alt='sn' style={{width:'30px', height:'30px'}} /><span className='ml-2 text-body'>LadyBUG</span></Link>
            </li>
            <li className='nav-item dropdown mr-2'>
            <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=>{setdrop( d => !d )}} style={{backgroundColor:'Transparent'}}>Your Work</button>
            {drop && <div className='card shadow-sm p-3 mb-5 bg-white rounded' style={{width:'18rem', position: 'absolute', top:"100%",  left:"0", right:"0", zIndex:"1"}}>
                        <div style={{display:'flex'}}>
                        <a
                            className={state.current ? "nav-link active" : "nav-link"}
                            style = {{width:'7rem'}}
                            onClick={()=> settype('task')}
                            href='javascript:undefined'
                            >
                        Worked On
                        </a>
                        <a
                        className={state.current ? "nav-link " : "nav-link active"}
                        style = {{width:'7rem'}}
                        onClick={()=> settype('project')}
                        href='javascript:undefined'>
                        Projects
                        </a>
                        </div>
                    <div >
                        {displayList(type)}
                     </div>
                     <div className='dropdown-divider font-weight-bold'></div>
                     <div>
                        <Link className='ml-4 navbar-brand' style={{fontSize:'19px'}} to="/your_work" onClick={() => setdrop(!drop)}>Go to Your Work Page</Link>
                     </div>
                </div>}
            </li>
            <li className='nav-item dropdown mr-2'>
                <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=>{setpeople( d => !d )}} style={{backgroundColor:'Transparent'}}>People</button>
                {people && <div className='card shadow-sm p-3 mb-5 bg-white rounded' style={{width:'18rem', position: 'absolute', top:"100%",  left:"0", right:"0", zIndex:"1"}}>
                            <span className='text-sm-left text-muted font-weight-bold' style={{fontSize:"11px"}}>YOUR COLLABORATORS</span>
                            <div>
                                <button onClick={() => setInvite((e) => e=!e)} className='h-100 w-100 btn btn-light btn-block'><PersonAddIcon size={24} />Invite a teammate</button>
                            </div><br/>
                            <span className='text-sm-left text-muted font-weight-bold' style={{fontSize:"11px"}}>YOUR TEAMS </span>
                            <div>
                                <button onClick={teamtoggle} className='h-100 w-100 btn btn-light btn-block'><PeopleIcon size={24} /> Start a team </button>
                            </div>
                            <div className='dropdown-divider font-weight-bold'></div>
                            <Link to="/teams" onClick={() => setpeople(e => !e)}>Manage your Teams</Link>
                        
                </div>}
            </li>
            <li className='nav-item mr-2'>
                <Link to="/roadmap">
                    <button className='btn btn-light' style={{backgroundColor:'Transparent'}}>Roadmap</button>
                </Link>
            </li>
            <li className='nav-item ml-10'>
                <button className='btn btn-primary' onClick={() => setcreateIssue((m) => m=!m)} > Create </button>
            </li>

        </ul>
        <form className="form-inline my-2 mr-10 my-lg-0">
            <Link to='/notifications'><button  class="mr-2 btn btn-light my-2 my-sm-0" type="submit"><BellIcon size={24} /></button></Link>
            <button onClick={handleClick} class="btn btn-light my-2 my-sm-0" type="submit"><PersonIcon size={24} /></button>
            </form>
        </nav>
        <p>
            {
            createIssue ? (<IssueModal toggle={toggle} onSubmit={onSubmit} />) : null
            }
        </p>
        <p>
        {
            invite ? (<InviteModal toggle={invitetoggle} />) : null
        }
        </p>
        <p>{ team ? (<TeamModal toggle={teamtoggle} user={User} />) : null  }</p>
        </>
        );
}

export default withRouter(Navigation);

