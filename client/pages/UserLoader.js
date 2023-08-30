export const userLoader = async () => {
  try {
    const res = await fetch('/api/user', {
      method: 'GET',
    });
    const parsedRes = await res.json();
    console.log('Loaded user data: ', parsedRes);
    return parsedRes;
  } catch (err) {
    console.error('user loader error: ', err);
  }
};
