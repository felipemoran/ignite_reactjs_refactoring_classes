import { FiPlusSquare } from "react-icons/fi";

import Logo from "../../assets/logo.svg";
import styled from "styled-components";

interface HeaderProps {
    openModal: () => void;
}

export function Header({ openModal }: HeaderProps) {
    return (
        <Wrapper>
            <Content>
                <img src={Logo} alt="GoRestaurant" />
                <nav>
                    <NewItemButton onClick={openModal}>
                        <ButtonText>Novo Prato</ButtonText>
                        <IconWrapper>
                            <FiPlusSquare size={24} />
                        </IconWrapper>
                    </NewItemButton>
                </nav>
            </Content>
        </Wrapper>
    );
}

const Wrapper = styled.header`
    background: #c72828;
    padding: 30px 24px;
`;

const Content = styled.header`
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 0 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const NewItemButton = styled.button`
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
