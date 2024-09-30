import styled, { css } from "styled-components";
import { buttonSize, buttonType } from "../../Styles/button";
import { ButtonStyleProps, ButtonProps } from "../../constants/interface";

const ButtonStyle = styled.button<ButtonStyleProps>`
  border-radius: 10px;
  cursor: pointer;

  ${(props) => buttonSize[props.$size]}
  ${(props) => buttonType[props.$colorType]?.[props.$state]}

  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  /* disabled 상태일 때의 배경색과 텍스트 색상 */
  /* disabled 상태일 때의 스타일 적용 */
  ${(props) =>
    props.disabled
      ? css`
          background-color: #d3d3d3;
          color: #777;
          border: none;
        `
      : buttonType[props.$colorType]?.[props.$state]}

  ${(props) => buttonSize[props.$size]}
`;

const Button = ({
  onClick,
  children,
  disabled,
  ...styleprops
}: ButtonProps) => {
  return (
    <>
      <ButtonStyle {...styleprops} onClick={onClick} disabled={disabled}>
        {children}
      </ButtonStyle>
    </>
  );
};

export default Button;

// 버튼 사용 예시
/* <Button state="normal" colorType="main" size="small">버튼</Button> */
