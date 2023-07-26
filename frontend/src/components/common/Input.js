// 공통 Input 컴포넌트

const Input = (props) => {
    const { id, label, value, type, placeholder, _onChange } = props;
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={_onChange}
            />
        </>
    );
};

export default Input;
