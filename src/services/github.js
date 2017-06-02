import fetch from 'dva/fetch';
import { PAGE_SIZE } from '../constants';
import { getTimeAgo } from '../utils';

function selectRepo(info) {
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
  } = info;
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
  return await fetch(`https://api.github.com/users/${username}/starred?per_page=${PAGE_SIZE}&page=${page}`)
    .then(res => res.json())
    .then(res => res.map(selectRepo));
}

export async function fetchStarsCount(username) {
  const res = await fetch(`https://api.github.com/users/${username}/starred?per_page=1`);
  return getStarsCount(res);
}

async function getStarsCount(res) {
  const links = res.headers.get('Link');
  const matches = links.match(/page=(\d+)>; rel="last"/);
  if (matches && matches[1]) return parseInt(matches[1]);
  const list = await res.json();
  return list.length;
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

export async function fetchRepo(name) {
  return await fetch(`https://api.github.com/repos/${name}`)
    .then(res => res.json())
    .then(res => selectRepo(res));
}