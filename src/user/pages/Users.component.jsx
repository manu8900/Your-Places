import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.component';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.component';
import UsersList from '../components/UsersList.component';


const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();
    useEffect(() => {
        /* Never use useEffect as async,only use promises.If 
        u want to use async await put the fetch inside a async func.  
        & useEffect will only rerenders the page when its certain 
        dependencies change. */
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setLoadedUsers(responseData.users);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        };
        sendRequest();
    }, [])

    const errorHandler = () => {
        setError(null);
    }
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
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