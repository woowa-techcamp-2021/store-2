const ID_ERROR = '아이디를 입력하세요';
const PWD_ERROR = '비밀번호를 입력하세요';
const CHECK_ERROR = '약관을 동의해주세요';
const ID_LEN = '아이디는 3자 이상 입력해야 합니다';
const PWD_LEN = '비밀번호는 4자 이상 입력해야 합니다.';

interface Inf {
  id: string;
  password: string;
  check?: boolean;
}

const authValidation = ({ id, password, check }: Inf): string | boolean => {
  if (!id) return ID_ERROR;
  if (!password) return PWD_ERROR;
  if (check === false) return CHECK_ERROR;
  if (id.length < 3) return ID_LEN;
  if (password.length < 4) return PWD_LEN;
  return true;
};

export { authValidation as default };
