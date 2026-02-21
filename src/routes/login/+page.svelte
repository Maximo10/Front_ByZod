<script lang="ts">
  import { goto } from '$app/navigation';
  import { token } from '$lib/stores';
  import { browser } from '$app/environment';
  import { z } from 'zod';
  import { login as loginAPI } from '$lib/api';

  let email = '';
  let password = '';
  let errorMessage = '';
  let isLoading = false;

  const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Password mínimo 6 caracteres")
  });

  async function handleLogin() {
    errorMessage = '';
    isLoading = true;

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      errorMessage = validation.error.issues[0].message;
      isLoading = false;
      return;
    }

    if (!browser) return;

    const data = await loginAPI(validation.data);

    if (data.token) {
      token.set(data.token);
      goto('/dashboard');
    } else {
      errorMessage = data.message || 'Login fallido';
    }

    isLoading = false;
  }
</script>

<div class="container">
  <div class="card">
    <h1>Login</h1>
    {#if errorMessage}<div class="error-message">{errorMessage}</div>{/if}
    <form on:submit|preventDefault={handleLogin}>
      <input type="email" placeholder="Email" bind:value={email} required />
      <input type="password" placeholder="Password" bind:value={password} required />
      <button type="submit" disabled={isLoading}>{isLoading ? 'Ingresando...' : 'Login'}</button>
    </form>
    <p>¿No tienes cuenta? <a href="/register">Registrar</a></p>
  </div>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    padding: 2.5rem;
    width: 100%;
    max-width: 400px;
    margin: 1rem;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    font-weight: 600;
    color: #333;
    text-align: center;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #555;
    font-size: 0.9rem;
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  input:focus {
    border-color: #667eea;
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .btn-primary {
    width: 100%;
    padding: 0.75rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 0.5rem;
  }

  .btn-primary:hover {
    background: #5a67d8;
  }

  .btn-primary:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }

  .error-message {
    background: #fed7d7;
    color: #c53030;
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    text-align: center;
  }

  .switch {
    text-align: center;
    margin-top: 1.5rem;
    color: #666;
    font-size: 0.9rem;
  }

  .switch a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
  }

  .switch a:hover {
    text-decoration: underline;
  }
</style>