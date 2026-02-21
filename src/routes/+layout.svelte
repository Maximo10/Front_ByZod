<script lang="ts">
  import { onMount } from 'svelte';
  import { token, user, logout } from '$lib/stores';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { me } from '$lib/api';

  let localToken = '';
  let loading = true;

  onMount(async () => {
    if (!browser) return;

    token.subscribe(t => localToken = t ?? '');
    if (!localToken) return;

    try {
      const data = await me(localToken);
      user.set(data);
    } catch {
      logout();
      goto('/login');
    } finally {
      loading = false;
    }
  });

  function handleLogout() {
    logout();
    goto('/login');
  }
</script>

<slot />

<style>
  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    background: #f9fafb;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .card {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    width: 100%;
    max-width: 400px;
  }

  input {
    display: block;
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  button {
    width: 100%;
    padding: 0.75rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 0.5rem;
  }

  button:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }

  .error-message {
    background: #fed7d7;
    color: #c53030;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 6px;
    text-align: center;
  }

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
  }

  a:hover {
    text-decoration: underline;
  }
</style>