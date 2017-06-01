import fetch from 'dva/fetch';
import { PAGE_SIZE } from '../constants';
import { getTimeAgo } from '../utils';

function getMaxPage(links) {
  const matches = links.match(/page=(\d+)>; rel="last"/);
  return matches && parseInt(matches[1]) || 1;
}

function selectStar(star) {
  const { 
    id, 
    full_name, 
    description, 
    html_url, 
    owner,
    language,
    stargazers_count,
    forks_count,
    pushed_at
  } = star;
  return { 
    id, 
    name: full_name, 
    description, 
    html_url,
    owner_avatar: owner.avatar_url,
    owner_url: owner.html_url,
    language,
    stargazers_count,
    forks_count,
    updated_at: getTimeAgo(pushed_at) + ' ago'
  };
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

export async function unstar(username, password, repo) {
  return await fetch(`https://api.github.com/user/starred/${repo}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`
    }
  });
}