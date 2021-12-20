import { useEffect, useRef, useState } from "react";

import { useField } from "@unform/core";
import styled, { css } from "styled-components";

interface InputProps {
    name: string;
    placeholder: string;
}

export function Input({ name, placeholder }: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const { fieldName, defaultValue, registerField } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value",
        });
    }, [fieldName, registerField]);

    return (
        <Container isFilled={isFilled} isFocused={isFocused}>
            <InputField
                isFilled={isFilled}
                isFocused={isFocused}
                onFocus={() => {
                    setIsFocused(true);
                }}
                onBlur={() => {
                    setIsFocused(false);
                    setIsFilled((inputRef.current?.value || "") !== "");
                }}
                defaultValue={defaultValue}
                ref={inputRef}
                placeholder={placeholder}
            />
        </Container>
    );
}

interface ContainerProps {
    isFilled: boolean;
    isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;

    background: #fff;
    border-radius: 8px;
    padding: 18px 24px;
    width: 100%;
    font-size: 16px;

    & + div {
        margin-top: 24px;
    }

    h1 {
        margin-bottom: 40px;
        font-weight: 600;
        font-size: 36px;
        line-height: 36px;
    }

    ${(props) =>
        props.isFocused &&
        css`
            color: #ff9000;
            border: 1px solid #ff9000;
        `}
`;

const InputField = styled.input<ContainerProps>`
    flex: 1;
    background: transparent;
    border: 0;
    color: #b7b7cc;

    &::placeholder {
        color: #b7b7cc;
    }

    ${(props) =>
        (props.isFilled || props.isFocused) &&
        css`
            color: #ff9000;
        `}
`;
