// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { FiShoppingCart, FiTrash2, FiArrowLeft, FiCreditCard, FiClock } from 'react-icons/fi';

// const CartPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load cart items from location state or localStorage
//   useEffect(() => {
//     if (location.state?.bikeDetails) {
//       const newItem = {
//         ...location.state.bikeDetails,
//         quantity: 1,
//         addedAt: new Date().toISOString()
//       };
//       setCartItems([newItem]);
//       localStorage.setItem('cartItems', JSON.stringify([newItem]));
//     } else {
//       const savedCart = localStorage.getItem('cartItems');
//       if (savedCart) {
//         setCartItems(JSON.parse(savedCart));
//       }
//     }
//   }, [location.state]);

//   const removeFromCart = (id) => {
//     const updatedCart = cartItems.filter(item => item.id !== id);
//     setCartItems(updatedCart);
//     localStorage.setItem('cartItems', JSON.stringify(updatedCart));
//   };

//   const updateQuantity = (id, newQuantity) => {
//     if (newQuantity < 1) return;
    
//     const updatedCart = cartItems.map(item => 
//       item.id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem('cartItems', JSON.stringify(updatedCart));
//   };

//   const calculateSubtotal = () => {
//     return cartItems.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);
//   };

//   const calculateTotal = () => {
//     const subtotal = calculateSubtotal();
//     const tax = subtotal * 0.1; // 10% tax
//     return subtotal + tax;
//   };

//   const proceedToCheckout = () => {
//     setLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       navigate('/payment', { 
//         state: { 
//           cartItems,
//           subtotal: calculateSubtotal(),
//           total: calculateTotal()
//         } 
//       });
//       setLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center mb-8">
//           <button 
//             onClick={() => navigate(-1)} 
//             className="flex items-center text-[#67103d] hover:text-[#50052c] mr-4"
//           >
//             <FiArrowLeft className="mr-1" /> Back
//           </button>
//           <h1 className="text-3xl font-bold text-gray-900">Your Rental Cart</h1>
//           <div className="ml-auto bg-[#67103d] text-white px-3 py-1 rounded-full flex items-center">
//             <FiShoppingCart className="mr-2" />
//             {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
//           </div>
//         </div>

//         {cartItems.length === 0 ? (
//           <div className="text-center py-12">
//             <FiShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
//             <h2 className="mt-4 text-xl font-medium text-gray-900">Your cart is empty</h2>
//             <p className="mt-2 text-gray-500">Start adding bikes to your cart to continue</p>
//             <button
//               onClick={() => navigate('/bikes')}
//               className="mt-6 bg-[#67103d] text-white px-6 py-3 rounded-lg hover:bg-[#50052c] transition"
//             >
//               Browse Bikes
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <div className="bg-white shadow rounded-lg overflow-hidden">
//                 <div className="px-6 py-4 border-b border-gray-200">
//                   <h2 className="text-lg font-medium text-gray-900">Rental Items ({cartItems.length})</h2>
//                 </div>
//                 <ul className="divide-y divide-gray-200">
//                   {cartItems.map((item) => (
//                     <li key={item.id} className="p-6">
//                       <div className="flex flex-col sm:flex-row">
//                         <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             className="w-40 h-32 object-cover rounded-lg"
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex justify-between">
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
//                               <p className="text-sm text-gray-500 mt-1">
//                                 {item.category} • {item.color} • {item.duration} hours
//                               </p>
//                               <div className="flex items-center mt-2">
//                                 <FiStar className="text-yellow-400 mr-1" />
//                                 <span className="text-sm text-gray-700">{item.rating}</span>
//                               </div>
//                             </div>
//                             <button
//                               onClick={() => removeFromCart(item.id)}
//                               className="text-gray-400 hover:text-red-500"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </div>
//                           <div className="mt-4 flex items-center justify-between">
//                             <div className="flex items-center">
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                 className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100"
//                               >
//                                 -
//                               </button>
//                               <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 text-center">
//                                 {item.quantity}
//                               </span>
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                 className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100"
//                               >
//                                 +
//                               </button>
//                             </div>
//                             <div className="text-lg font-medium text-[#67103d]">
//                               Rs. {item.totalPrice * item.quantity}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <div>
//               <div className="bg-white shadow rounded-lg overflow-hidden sticky top-4">
//                 <div className="px-6 py-4 border-b border-gray-200">
//                   <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
//                 </div>
//                 <div className="p-6">
//                   <div className="flex justify-between mb-2">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span className="font-medium">Rs. {calculateSubtotal()}</span>
//                   </div>
//                   <div className="flex justify-between mb-2">
//                     <span className="text-gray-600">Tax (10%)</span>
//                     <span className="font-medium">Rs. {(calculateSubtotal() * 0.1).toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between mb-4 pt-4 border-t border-gray-200">
//                     <span className="text-lg font-medium">Total</span>
//                     <span className="text-lg font-bold text-[#67103d]">
//                       Rs. {calculateTotal().toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="mt-6">
//                     <button
//                       onClick={proceedToCheckout}
//                       disabled={loading || cartItems.length === 0}
//                       className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
//                         loading || cartItems.length === 0
//                           ? 'bg-gray-400 cursor-not-allowed'
//                           : 'bg-[#67103d] hover:bg-[#50052c]'
//                       }`}
//                     >
//                       {loading ? (
//                         <>
//                           <FiClock className="animate-spin mr-2" />
//                           Processing...
//                         </>
//                       ) : (
//                         <>
//                           <FiCreditCard className="mr-2" />
//                           Proceed to Payment
//                         </>
//                       )}
//                     </button>
//                   </div>
//                   <div className="mt-4 text-center text-sm text-gray-500">
//                     <p>or</p>
//                     <button
//                       onClick={() => navigate('/bikes')}
//                       className="text-[#67103d] hover:text-[#50052c] font-medium mt-2"
//                     >
//                       Continue Shopping
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-4 bg-white shadow rounded-lg overflow-hidden">
//                 <div className="px-6 py-4 border-b border-gray-200">
//                   <h2 className="text-lg font-medium text-gray-900">Rental Information</h2>
//                 </div>
//                 <div className="p-6">
//                   <div className="mb-4">
//                     <h3 className="text-sm font-medium text-gray-900">Pickup Location</h3>
//                     <p className="mt-1 text-sm text-gray-600">
//                       123 Cycling Street, Colombo
//                     </p>
//                   </div>
//                   <div className="mb-4">
//                     <h3 className="text-sm font-medium text-gray-900">Operating Hours</h3>
//                     <p className="mt-1 text-sm text-gray-600">
//                       Monday - Sunday: 8:00 AM - 8:00 PM
//                     </p>
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-900">Need Help?</h3>
//                     <p className="mt-1 text-sm text-gray-600">
//                       Call us at +94 76 123 4567
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;