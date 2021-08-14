interface IId {
  id: number;
  name: string;
  email: string;
}

function fetchUser(id: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      const user: IId = {
        id,
        name: `User${id}`,
        email: `${id}@test.com`,
      };
      resolve(user);
    }, 100);
  });
}

test('fetch a user', async () => {
  const user = await fetchUser(1);
  expect(user).toEqual({
    id: 1,
    name: 'User1',
    email: '1@test.com',
  });
});
