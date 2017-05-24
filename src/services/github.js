import request from '../utils/request';

function selectStar(star) {
  const { id, full_name, description } = star;
  return { id, name: full_name, description };
}

export async function fetchStars(username) {
  const res = await request(`https://api.github.com/users/${username}/starred?per_page=100&page=1`);
  return res.data.map(selectStar);
}
