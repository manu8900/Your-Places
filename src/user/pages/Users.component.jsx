import React from 'react';
import UsersList from '../components/UsersList.component';


const Users = () =>{
    const USERS= [{
        id:'u1',
        name:'Max Schwarz',
        image:'https://castyou-website.sgp1.digitaloceanspaces.com/2020/02/JASKARAN.jpg',
        places:3
    }];
return <UsersList items={USERS}/>

}
export default Users;