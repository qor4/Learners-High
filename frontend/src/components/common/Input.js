// 공통 Input 컴포넌트
import styled from "styled-components";

const StyledLabel = styled.label`
    font-size: 20px;
`;

const StyledInput = styled.input`
    width: auto;
    border: 1px solid #000;
    border-radius: 12px;
    box-sizing: border-box;
    padding: 4px 16px;
    height: 48px;
    font-size: 16px;
    margin: 16px;
`;

const Input = (props) => {
    const {
        id,
        name,
        label,
        value,
        type,
        placeholder,
        onChange,
        disabled,
        onKeyPress,
        onBlur
    } = props;
    return (
        <div>
            <StyledLabel htmlFor={id}>{label}</StyledLabel>
            <StyledInput
                id={id}
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                onKeyPress={onKeyPress}
                onBlur={onBlur}
            />
        </div>
    );
};

export default Input;
