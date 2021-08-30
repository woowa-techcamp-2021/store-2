/**
 * 에러 관리
 * @param {string} errCode - 개발자를 위한 에러 코드
 * @return {ErrorType} statusCode: HTTP 응답 상태 코드, errorMessage: 클라이언트를 위한 메세지
 */
import { CustomError } from './error-generator';

interface ErrorType {
  statusCode: number;
  errorMessage: string;
}

function errorHandler(err: CustomError): ErrorType {
  let statusCode = 500;
  let errorMessage = '다시 시도해주세요';

  switch (err.code) {
    /**
     * Req Errors
     */
    case 'req/invalid-body':
      statusCode = 400;
      errorMessage = '잘못된 요청입니다';
      break;
    case 'req/invalid-query':
      statusCode = 400;
      errorMessage = '잘못된 요청입니다';
      break;
    case 'req/no-token':
      statusCode = 401;
      errorMessage = '다시 로그인해주세요';
      break;
    case 'req/invalid-date':
      statusCode = 409;
      errorMessage = '올바른 날짜를 입력해주세요';
      break;

    /**
     * Auth Errors
     */
    case 'auth/wrong-password':
      statusCode = 409;
      errorMessage = '비밀번호를 확인해주세요';
      break;
    case 'auth/account-not-found':
      statusCode = 404;
      errorMessage = '없는 계정입니다';
      break;
    case 'auth/token-expired':
      statusCode = 401;
      errorMessage = '다시 로그인해주세요';
      break;
    case 'auth/invalid-token':
      statusCode = 401;
      errorMessage = '다시 로그인해주세요';
      break;
    case 'auth/existing-user':
      statusCode = 409;
      errorMessage = '이미 가입된 아이디입니다';
      break;
    case 'auth/unauthorized-token':
      statusCode = 401;
      errorMessage = '다시 로그인해주세요';
      break;
    case 'auth/need-re-signin':
      statusCode = 401;
      errorMessage = '다시 로그인해주세요';
      break;

    /**
     * Categories Errors
     */
    case 'categories/categories-not-found':
      statusCode = 404;
      errorMessage = '카테고리 데이터가 없습니다';
      break;

    /**
     * Items Errors
     */
    case 'items/items-not-found':
      statusCode = 404;
      errorMessage = '아이템 데이터가 없습니다';
      break;
    case 'items/item-not-found':
      statusCode = 404;
      errorMessage = '존재하지 않는 상품입니다';
      break;
    case 'item/no-exist-querystring':
      statusCode = 400;
      errorMessage = '잘못된 요청입니다';
      break;

    /**
     * Address Errors
     */
    case 'address/maximun address':
      statusCode = 409;
      errorMessage = '배송지는 최대 3개까지 입력할 수 있습니다';
      break;

    /**
     * Likes Errors
     */
    case 'likes/fail-to-create':
      statusCode = 409;
      errorMessage = '존재하지 않는 아이템이거나 이미 좋아요를 누른 아이템입니다';
      break;
    case 'likes/fail-to-delete':
      statusCode = 409;
      errorMessage = '좋아요를 누른 적이 없는 아이템입니다';
      break;

    /**
     * Orders Errors
     */
    case 'orders/fail-to-load-orders':
      statusCode = 403;
      errorMessage = '잘못된 요청입니다';
      break;

    /**
     * Reviews Errors
     */
    case 'reviews/user-not-paid':
      statusCode = 409;
      errorMessage = '상품을 구매한 사용자만 후기를 작성할 수 있습니다';
      break;

    /**
     * Default Errors
     */
    default:
      statusCode = 500;
      errorMessage = '다시 시도해주세요';
      break;
  }

  if (err.customMessage) {
    errorMessage = err.customMessage;
  }

  return { statusCode, errorMessage };
}

export default errorHandler;
