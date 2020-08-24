import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.component';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.component';
import UsersList from '../components/UsersList.component';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
    const [loadedUsers, setLoadedUsers] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();


    useEffect(() => {
        /* Never use useEffect as async,only use promises.If 
        u want to use async await put the fetch inside a async func.  
        & useEffect will only rerenders the page when its certain 
        dependencies change. */
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users'
                );
                setLoadedUsers(responseData.users);
            } catch (err) { }
        };
        fetchUsers();
        /*Adding sendRequest as dependency useEffect 
         specifies to use this function after rendering the page. */
    }, [sendRequest])

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {
                isLoading && (
                    <div className="center">
                        <LoadingSpinner />
                    </div>
                )
            }
            {
                !isLoading
                &&
                loadedUsers
                &&
                <UsersList items={loadedUsers} />

            }
        </React.Fragment>

    )

}
export default Users;