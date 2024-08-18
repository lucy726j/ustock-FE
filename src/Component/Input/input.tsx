import React, { forwardRef } from "react";
import { InputStyleProps, inputProps } from "../../constants/interface";
import styled from "styled-components";
import { inputSize, inputType } from "../../Styles/input";

const InputContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const IconWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const InputStyle = styled.input<InputStyleProps & { hasIcon: boolean }>`
  border-radius: 5px;
  padding: ${(props) =>
    props.hasIcon ? "0.5rem 1rem 0.5rem 2.5rem" : "0.5rem 2.5rem"};
  font-size: 12px;
  font-family: "SCDream4";
  color: black;
  ::placeholder {
    color: #b6b6b6;
    opacity: 1;
  }
  ${(props) => inputSize[props.size]}
  ${(props) => inputType[props.colorType]?.normal}
`;

export const Input = forwardRef<HTMLInputElement, inputProps>(
  (
    { placeholder, value, onChange, onBlur, name, icon, ...styleProps },
    ref
  ) => {
    return (
      <InputContainer>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <InputStyle
          {...styleProps}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          name={name}
          disabled={styleProps.disabled}
          hasIcon={!!icon}
        />
      </InputContainer>
    );
  }
);
