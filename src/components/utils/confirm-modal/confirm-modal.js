import React from "react";
import PropTypes from "prop-types";
import { Portal, Modal, Button } from "semantic-ui-react";

const ConfirmModal = ({ callback, message, color, children }) => {
    const confirm = () => {
        callback("confirmed");
    }

    const cancel = () => {
        callback();
    }

    return (
        <React.Fragment>
            <Portal open>
                <Modal open size="mini">
                    <Modal.Header style={{ textAlign: "center", border: "none", paddingBottom: 0 }}>Confirm</Modal.Header>
                    <Modal.Content style={{ textAlign: "center" }}>
                        {message && <div style={{ fontSize: 16, marginBottom: 20 }}>{message}</div>}
                        <div>
                            {children}
                        </div>
                        <div style={{ textAlign: "right", marginTop: 10 }}>
                            <Button color={color} onClick={confirm} type="button" style={{ marginRight: 14 }}>Delete</Button>
                            <Button basic onClick={cancel} className="button_link" type="button">Cancel</Button>
                        </div>
                    </Modal.Content>
                </Modal>
            </Portal>
        </React.Fragment>
    )
}

ConfirmModal.propTypes = {
    callback: PropTypes.func.isRequired,
    message: PropTypes.string,
    color: PropTypes.string.isRequired,
    children: PropTypes.node
}

ConfirmModal.defaultProps = {
    message: "",
    children: <div />
}

export default ConfirmModal;