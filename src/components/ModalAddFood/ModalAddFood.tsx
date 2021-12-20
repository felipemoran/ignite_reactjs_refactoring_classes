import { Input } from "../Input";
import { FiCheckSquare } from "react-icons/fi";
import { Modal } from "../Modal";
import styled from "styled-components";
import { Form as Unform } from "@unform/web";
import { FoodType } from "../../types";

interface ModalAddFoodProps {
    isOpen: boolean;
    toggleIsOpen: () => void;
    handleAddFood: (food: FoodType) => void;
}

export function ModalAddFood({
    isOpen,
    toggleIsOpen,
    handleAddFood,
}: ModalAddFoodProps) {
    function handleSubmit(data: FoodType) {
        handleAddFood(data);
        toggleIsOpen();
    }

    return (
        <Modal isOpen={isOpen} toggleIsOpen={toggleIsOpen}>
            <Form onSubmit={handleSubmit}>
                <ModalTitle>Novo Prato</ModalTitle>
                <Input name="image" placeholder="Cole o link aqui" />

                <Input name="name" placeholder="Ex: Moda Italiana" />
                <Input name="price" placeholder="Ex: 19.90" />

                <Input name="description" placeholder="Descrição" />
                <AddFoodButton type="submit" data-testid="add-food-button">
                    <ButtonText>Adicionar Prato</ButtonText>
                    <IconWrapper>
                        <FiCheckSquare size={24} />
                    </IconWrapper>
                </AddFoodButton>
            </Form>
        </Modal>
    );
}

export const Form = styled(Unform)`
    padding: 48px 40px;
    display: flex;
    flex-direction: column;

    button {
    }
`;

const ModalTitle = styled.h1`
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
`;

const AddFoodButton = styled.button`
    margin-top: 48px;
    align-self: flex-end;

    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #39b100;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ButtonText = styled.span`
    padding: 16px 24px;
`;

const IconWrapper = styled.div`
    display: flex;
    padding: 16px 16px;
    background: #41c900;
    border-radius: 0 8px 8px 0;
    margin: 0 auto;
`;
