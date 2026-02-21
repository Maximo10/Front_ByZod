import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const token = writable<string | null>(browser ? localStorage.getItem('token') : null);
export const user = writable<{ id: string; name: string; email: string } | null>(null);

if (browser) {
  token.subscribe((value) => {
    if (value) localStorage.setItem('token', value);
    else localStorage.removeItem('token');
  });
}

export function logout() {
  token.set(null);
  user.set(null);
}