import React, { FC } from 'react';
import { StateProps } from 'store/axios';

const Auth: FC<StateProps> = ({ user, category, loading }) => {
  if (loading.category || loading.user) return null;
  if (!user) return <div>유저 없음</div>;
  return (
    <div>
      유저 아이디{user.id} 카테고리 {category} 로딩{loading.user}
    </div>
  );
};

export default Auth;
