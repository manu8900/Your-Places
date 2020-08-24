import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceLIst from '../components/PlaceList.component';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.component';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.component';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const userId = useParams().userId;
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/places/user/${userId}`
                )
                setLoadedPlaces(responseData.places);
            } catch (err) { }
        }
        fetchPlaces();
    }, [sendRequest, userId]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedPlaces && <PlaceLIst items={loadedPlaces} />}

        </React.Fragment>
    )
}

export default UserPlaces;