import woowahan from 'lib/woowahan-components';

const Button = woowahan.button`
  cursor: pointer;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme?.colorWhite};
  font-family: ${({ theme }) => theme?.fontEuljiro};
  opacity: 0.9;
  margin-bottom: 10px;
  background-color: ${props => {
    if (props.color === 'dark') return props.theme?.colorLineDark;
    if (props.color === 'github') return props.theme?.colorGithub;
    return props.theme?.colorLine;
  }};

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  ${({ theme }) => theme?.mobile} {
    height: 50px;
    font-size: 20px;
  }

  ${({ theme }) => theme?.tablet} {
    height: 56px;
    font-size: 22px;
  }

  ${({ theme }) => theme?.laptop} {
    height: 64px;
    font-size: 24px;
  }
`;

export default Button;
