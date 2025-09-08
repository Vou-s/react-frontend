import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/auth';
import { useAuth } from '../context/AuthContext';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();


  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      const token = res.data.token || res.data.access_token || res.data.data?.token;
      if (!token) throw new Error('Token tidak ditemukan');
      localStorage.setItem('token', token);
      setUser && setUser({});
      navigate('/');
    } catch (err: any) { setErr(err?.response?.data?.message || err.message || 'Login gagal'); }
  };


  return (
    <div className="max-w-md mx-auto mt-12">
      <form onSubmit={submit} className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {err && <div className="text-red-500 mb-2">{err}</div>}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" className="w-full p-2 border rounded mb-2" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" className="w-full p-2 border rounded mb-4" />
        <button className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
        <div className="mt-3 text-sm">Belum punya akun? <Link to="/register" className="text-blue-600">Register</Link></div>
      </form>
    </div>
  );
}