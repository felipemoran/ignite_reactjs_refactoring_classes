import { useState } from "react";
import { FoodType } from "../../types";
import api from "../../services/api";
import { FiEdit3, FiTrash } from "react-icons/fi";
import styled, { css } from "styled-components";

interface FoodProps {
    food: FoodType;
    handleEditFood: (food: FoodType) => void;
    handleDelete: (id: FoodType["id"]) => void;
}

export function Food({ food, handleEditFood, handleDelete }: FoodProps) {
    const [available, setAvailable] = useState(food.available);

    function toggleAvailable() {
        api.put(`/foods/${food.id}`, {
            ...food,
            available: !available,
        }).then(() => {
            setAvailable(!available);
        });
    }

    return (
        <Container>
            <ImageWrapper available={available}>
                <ProductImage src={food.image} alt={food.name} />
            </ImageWrapper>
            <ProductInfo>
                <ProductName>{food.name}</ProductName>
                <ProductInfoItem>{food.description}</ProductInfoItem>
                <ProductPrice>
                    R$ <b>{food.price}</b>
                </ProductPrice>
            </ProductInfo>
            <Footer>
                <ButtonsContainer>
                    <IconButton
                        type="button"
                        className="icon"
                        onClick={() => handleEditFood(food)}
                        data-testid={`edit-food-${food.id}`}
                    >
                        <FiEdit3 size={20} />
                    </IconButton>

                    <IconButton
                        type="button"
                        className="icon"
                        onClick={() => handleDelete(food.id)}
                        data-testid={`remove-food-${food.id}`}
                    >
                        <FiTrash size={20} />
                    </IconButton>
                </ButtonsContainer>

                <AvailabilityContainer>
                    <AvailabilityText>
                        {available ? "Disponível" : "Indisponível"}
                    </AvailabilityText>

                    <Switch htmlFor={`available-switch-${food.id}`}>
                        <HiddenCheckbox
                            id={`available-switch-${food.id}`}
                            type="checkbox"
                            checked={available}
                            onChange={toggleAvailable}
                            data-testid={`change-status-food-${food.id}`}
                        />
                        <Slider />
                    </Switch>
                </AvailabilityContainer>
            </Footer>
        </Container>
    );
}

interface UIProps {
    available: boolean;
}

const Container = styled.div`
    background: #f0f0f5;
    border-radius: 8px;
`;

const ImageWrapper = styled.header<UIProps>`
    background: #ffb84d;
    border-radius: 8px 8px 0 0;
    height: 192px;
    overflow: hidden;
    transition: 0.3s opacity;
    text-align: center;

    ${(props) =>
        !props.available &&
        css`
            opacity: 0.3;
        `};
`;

const ProductImage = styled.img`
    pointer-events: none;
    user-select: none;
`;

const ProductInfo = styled.body`
    padding: 30px;
    background: revert; // better yet would be a css reset
`;

const ProductName = styled.h2`
    color: #3d3d4d;
`;

const ProductInfoItem = styled.p`
    color: #3d3d4d;

    margin-top: 16px;
`;

const ProductPrice = styled.p`
    font-style: normal;
    font-size: 24px;
    line-height: 34px;
    color: #39b100;

    margin-top: 16px;
    b {
        font-weight: 600;
    }
`;

const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 20px 30px;
    background: #e4e4eb;
    border-radius: 0 0 8px 8px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 6px;
`;

const IconButton = styled.button`
    background: #fff;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    border: none;
    transition: 0.1s;

    svg {
        color: #3d3d4d;
    }
`;

const AvailabilityContainer = styled.div`
    display: flex;
    align-items: center;
`;

const AvailabilityText = styled.p`
    color: #3d3d4d;
`;

const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 88px;
    height: 32px;
    margin-left: 12px;
`;

const HiddenCheckbox = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #c72828;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 16px;

    &:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 40px;
        left: 8px;
        bottom: 6px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 10px;
    }

    ${HiddenCheckbox}:checked + & {
        background-color: #39b100;
    }

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 1px #2196f3;
    }

    ${HiddenCheckbox}:checked + &:before {
        -webkit-transform: translateX(32px);
        -ms-transform: translateX(32px);
        transform: translateX(32px);
    }
`;
