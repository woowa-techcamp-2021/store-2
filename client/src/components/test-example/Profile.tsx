import React, { FC } from 'react';

interface IProfile {
  username: string;
  name: string;
}
const Profile: FC<IProfile> = ({ username, name }) => {
  return (
    <div>
      <b>{username}</b>&nbsp;
      <span>({name})</span>
    </div>
  );
};

export default Profile;
