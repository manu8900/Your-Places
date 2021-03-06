import React, { useState, useContext } from 'react';
import Button from '../../shared/components/FormElements/Button.Component';
import Card from '../../shared/components/UIElements/Card.component';
import Modal from '../../shared/components/UIElements/Modal.component';
import Map from '../../shared/components/UIElements/Map.component'
import ErrorModal from '../../shared/components/UIElements/ErrorModal.component';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.component';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PlaceItem.styles.css';

const PlaceItem = props => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);
    const showDeleteWarningHandler = () => setShowConfirmModal(true);
    const CancelDeleteHandler = () => setShowConfirmModal(false);
    const ConfirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${props.id}`,
                'DELETE',
            );
            props.onDelete(props.id);
        } catch (err) { }
    };
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__model-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={CancelDeleteHandler}
                header="Are you sure?"
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={CancelDeleteHandler}>CANCEL</Button>
                        <Button danger onClick={ConfirmDeleteHandler}>DELETE</Button>
                    </React.Fragment>
                } >
                <p>Do you want to proceed and delete this place? Pleasee note that it can't be undone thereafter</p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    {isLoading && <LoadingSpinner asOverlay/>}
                    <div className="place-item__image">
                        <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        {auth.userId === props.creatorId && (<Button to={`/places/${props.id}`}>EDIT</Button>)}
                        {auth.userId === props.creatorId && (<Button danger onClick={showDeleteWarningHandler}>DELETE</Button>)}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
}

export default PlaceItem;