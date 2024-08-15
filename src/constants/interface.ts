export type ButtonStyleProps = {
    state: "normal";
    size : "small" | "medium" | "large" | "plusBtn" | "gradientBtn";
    colorType : 'main' | 'gradient' | 'cancel';
};

export interface ButtonProps extends ButtonStyleProps{
    onClick?: () => void;
    children: React.ReactNode;
}


export type InputStyleProps = {
    size : 'small' | 'medium' | 'large';
    colorType : 'fillType' | 'strokeType';
    disabled?: boolean;
}

export interface inputProps extends InputStyleProps {
    placeholder : string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur ?: (event: React.FocusEvent<HTMLInputElement>) => void;
    name?: string;
    icon?: React.ReactNode;
}

export interface ModalProps {
    title?: string;
    isOpen: boolean;
    onRequestClose?: () => void;
    onConfirm?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    showConfirmButton?: string;
    showCancelButton?: string;
    showOneConfirmBtn?: boolean;
    children?: React.ReactNode;
    text ?: string;
}