import { css } from "styled-components";
import { Colors } from "./Colors";

export const buttonSize = {
  small: css`
    width: 140px;
    height: 40px;
  `,
  medium: css`
    width: 170px;
    height: 44px;
  `,
  large: css`
    width: 330px;
    height: 60px;
  `,
  plusBtn: css`
    width: 340px;
    height: 45px;
  `,
  gradientBtn: css`
    width: 264px;
    height: 52px;
  `,
  stroke: css`
    width: 273px;
    height: 53px;
  `,
};

export const mainColorBtn = {
  normal: css`
    background: ${Colors.main};
    color: #fff;
    border: none;
    font-size: 14px;
  `,
};

export const gradientBtnStyle = {
  normal: css`
    background: radial-gradient(circle, #4834d4 0%, #686de0 100%);
    color: #fff;
    border: none;
    font-size: 14px;
  `,
};

export const cancelBtnStyle = {
  normal: css`
    background: none;
    border: 1px solid ${Colors.red};
    color: ${Colors.red};
    font-size: 14px;
  `,
};
export const strokeStyle = {
  normal: css`
    background: none;
    border: 1px solid ${Colors.main};
    font-size: 14px;
    color: ${Colors.main};
    font-weight: 700;
  `,
};

export const buttonType = {
  main: mainColorBtn,
  gradient: gradientBtnStyle,
  cancel: cancelBtnStyle,
  stroke: strokeStyle,
};
