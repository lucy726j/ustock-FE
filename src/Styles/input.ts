import {css} from "styled-components"
import { Colors } from "./Colors";

export const inputSize = {
    small : css`
        width : 264px;
        height: 42px;
    `,
    medium: css`
        width : 340px;
        height: 40px; 
    `,
    large: css`
        width : 350px;
        height: 42px;
    `
};

export const fillTypeInput = {
    normal: css`
        background : rgba(97, 94, 252, 0.16);
        border: none;
    `
}

export const strokTypeInput = {
    normal: css`
        background : none;
        border : 1px solid ${Colors.main};
    `
}

export const inputType = {
    fillType : fillTypeInput,
    strokeType : strokTypeInput
}