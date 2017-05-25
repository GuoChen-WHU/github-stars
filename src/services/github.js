import fetch from 'dva/fetch';
import { PAGE_SIZE } from '../constants';

function getMaxPage(links) {
  const matches = links.match(/page=(\d+)>; rel="last"/);
  return matches && parseInt(matches[1]) || 1;
}

function selectStar(star) {
  const { id, full_name, description } = star;
  return { id, name: full_name, description };
}

export async function fetchStars(username, page) {
  const res = await fetch(`https://api.github.com/users/${username}/starred?per_page=${PAGE_SIZE}&page=${page}`);
  
  // Get the last page index from link header in the response,
  // So that we can set the total page in Stars pagination component properly
  let maxPage;
  if (page === 1) {
    const links = res.headers.get('Link');
    maxPage = getMaxPage(links);
  }
  const data = await res.json();
  const list = data.map(selectStar);

  return {
    list,
    maxPage
  };
}

export async function fetchUser(username, password) {
  return await fetch('https://api.github.com/user', { 
    headers: { 
      Authorization: `Basic ${btoa(`${username}:${password}`)}`
    }
  })
    .then(res => res.json());
}