import styled from 'styled-components';

const LoginSection = styled.section`
    /* width: 550px; */
`

const ToggleBox = styled.div`
    width: 550px;
    position:relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const ToggleBtn = styled.button`
    padding: 20px 0 38px 0;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.2rem;
    border:1px solid var(--color-grey);
    border-radius: 10px;
    &:disabled{
        background-color: var(--color-brightGrey);
        color:var(--color-black);
    }
`
const LoginForm = styled.form`
    position: absolute;
    top: 60px;
    padding: 36px 35px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-white);
    border: 1px solid var(--color-grey);
    border-radius: 10px;
`

const LoginInput = styled.input`
    margin: 3px auto;
    padding: 20px 8px;
    width: 480px;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2rem;
    border:none;
    border-bottom: 1px solid var(--color-grey);
    &::placeholder{
        font-weight: 400;
        color:var(--color-grey)
    }
    &:focus{
        border:transparent;
        outline: 2px solid var(--color-main);
    }
`

const ErrorText = styled.small`
    margin: 26px 0;
    font-size: 1.6rem;
    line-height: 2rem;
    color:var(--color-red);
`

export { LoginSection, ToggleBox, ToggleBtn, LoginForm, LoginInput, ErrorText };