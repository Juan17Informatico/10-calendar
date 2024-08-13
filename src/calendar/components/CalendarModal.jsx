import { useState } from "react";
import Modal from "react-modal"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true);

    const onCloseModal = () => {
        console.log('cerrando modal');
        setIsOpen(false); 
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            Hola mundo
            <hr />
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quisquam, possimus in reprehenderit eligendi id praesentium magni, officiis numquam sapiente nam mollitia nihil. Adipisci dignissimos delectus obcaecati, voluptates sit dolore?
            </p>
        </Modal>
    )
}
