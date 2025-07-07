// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PartnerLogin = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = e => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/partners/login', form);
//       localStorage.setItem('partnerToken', res.data.token);
//       localStorage.setItem('partnerInfo', JSON.stringify(res.data.partner));
//       navigate('/partner-dashboard');
//     } catch (err) {
//       alert('Login failed: ' + err.response?.data?.message || err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white rounded shadow">
//       <input
//         name="email"
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={handleChange}
//         required
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={handleChange}
//         required
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <button type="submit" className="w-full bg-[#67103d] text-white p-2 rounded hover:bg-[#50052c]">Login</button>
//     </form>
//   );
// };

// export default PartnerLogin;
