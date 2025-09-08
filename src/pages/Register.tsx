import React, { useState } from 'react';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try { await register({ name, email, password }); navigate('/login'); }
        catch (err) { alert('Gagal register'); }
    };


    return (
        <div className="max-w-md mx-auto mt-12">
            <form onSubmit={submit} className="p-6 bg-white rounded shadow">
                <h2 className="text-xl font-bold mb-4">Register</h2>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="name" className="w-full p-2 border rounded mb-2" />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" className="w-full p-2 border rounded mb-2" />
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" className="w-full p-2 border rounded mb-4" />
                <button className="w-full py-2 bg-green-600 text-white rounded">Register</button>
            </form>
        </div>
    );
}