import { Button, Modal } from "react-bootstrap";

export interface IConfirmActionProperties {
    title: string;
    message: string;
    onYes: () => void;
    onNo: () => void;
}

export default function ConfirmAction(props: IConfirmActionProperties) {
    return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={ true }>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    { props.title }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{ props.message }</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-lg btn-success" onClick={ props.onYes }>Da</Button>
                <Button className="btn btn-lg btn-danger" onClick={ props.onNo }>Ne</Button>
            </Modal.Footer>
        </Modal>
    );
}
