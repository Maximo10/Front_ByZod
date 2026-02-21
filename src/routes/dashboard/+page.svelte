<script lang="ts">
  import { onMount } from 'svelte';
  import { token, user, logout } from '$lib/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { me } from '$lib/api';

  let localToken = '';
  let loading = true;

  onMount(async () => {
    if (!browser) return;

    token.subscribe(t => localToken = t ?? '');
    if (!localToken) goto('/login');

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

<div class="container">
  <div class="card">
    <h1>Dashboard</h1>
    {#if loading}
      <p>Cargando...</p>
    {:else}
      <p>{$user ? `Bienvenido, ${$user.name}` : 'Usuario no encontrado'}</p>
      <button on:click={handleLogout}>Logout</button>
    {/if}
  </div>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .dashboard {
    min-height: 100vh;
    background: #f9fafb;
    font-family:
      system-ui,
      -apple-system,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      sans-serif;
    color: #1e293b;
    line-height: 1.5;
  }

  .header {
    background: white;
    padding: 1rem 2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e9eef2;
  }

  .header h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #0f172a;
    letter-spacing: -0.01em;
  }

  .content {
    max-width: 800px;
    margin: 2.5rem auto;
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .welcome-card {
    background: white;
    border-radius: 20px;
    padding: 2.5rem 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    text-align: center;
    border: 1px solid #edf2f7;
  }

  .welcome-card h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .welcome-card p {
    color: #475569;
    max-width: 500px;
    margin: 0 auto;
    font-size: 1.1rem;
  }

  .btn-primary {
    padding: 0.75rem 1.5rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    display: inline-block;
    text-align: center;
  }

  .btn-primary:hover {
    background: #5a67d8;
  }

  .btn-primary:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    .header {
      padding: 1rem;
    }
    .content {
      padding: 0 1rem;
      margin: 1.5rem auto;
    }
    .welcome-card {
      padding: 2rem 1rem;
    }
    .welcome-card h2 {
      font-size: 1.75rem;
    }
  }
</style>