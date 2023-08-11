// 공통 Input 컴포넌트
import styled from "styled-components";

const StyledLabel = styled.label`
    font-size: 1rem;
`;

const StyledInput = styled.input`
    width: 70%;
    border: 1px solid #000;
    border-radius: 0.75rem;
    box-sizing: border-box;
    padding: 0.25rem 1rem;
    height: 3rem;
    margin: 0.5rem 0;
`;

const StyledInputWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
        onBlur,
        readOnly,
        onFocus,
    } = props;
    return (
        <StyledInputWrap>
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
                readOnly={readOnly}
                onFocus={onFocus}
            />
        </StyledInputWrap>
    );
};

export default Input;
