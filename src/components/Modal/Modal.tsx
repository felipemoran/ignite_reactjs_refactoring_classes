import { ReactNode } from "react";
import ReactModal from "react-modal";

interface ModalProps {
    isOpen: boolean;
    toggleIsOpen: () => void;
    children: ReactNode;
}

export function Modal({ isOpen, toggleIsOpen, children }: ModalProps) {
    return (
        <ReactModal
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => {
                console.log("close triggered");
                toggleIsOpen();
            }}
            isOpen={isOpen}
            ariaHideApp={false}
            style={{
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    background: "#F0F0F5",
                    color: "#000000",
                    borderRadius: "8px",
                    width: "736px",
                    border: "none",
                },
                overlay: {
                    backgroundColor: "#121214e6",
                },
            }}
        >
            {children}
        </ReactModal>
    );
}
