import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiX, FiShoppingCart, FiCreditCard, FiArrowLeft, FiTrendingUp, FiClock } from "react-icons/fi";

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    const firstItem = cartItems[0];
    
    navigate("/payment", {
      state: {
        name: firstItem.bike.name,
        price: firstItem.totalPrice,
        color: firstItem.color,
        pickupLocation: firstItem.pickupLocation,
        startDate: firstItem.startDate,
        startTime: firstItem.startTime,
        endTime: firstItem.endTime
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#67103d] flex items-center gap-2">
              <FiShoppingCart /> Your Cart
            </h2>
            <button
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button
                onClick={() => navigate("/bikes")}
                className="px-4 py-2 bg-[#67103d] text-white rounded-lg flex items-center gap-2 mx-auto"
              >
                <FiArrowLeft /> Browse Bikes
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className={`flex border-b pb-4 relative ${item.bike.isTrending ? "border-l-4 border-[#67103d]" : ""}`}>
                    {item.bike.isTrending && (
                      <div className="absolute -left-1 top-2 bg-[#67103d] text-white px-2 py-1 rounded-r-full text-xs font-bold flex items-center gap-1">
                        <FiTrendingUp size={12} />
                        <span>TRENDING</span>
                      </div>
                    )}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden mr-4">
                      <img
                        src={item.bike.image}
                        alt={item.bike.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.bike.name}</h3>
                      <p className="text-sm text-gray-500">{item.bike.category}</p>
                      <div className="flex justify-between mt-2">
                        <div>
                          <span className="text-sm">Color: </span>
                          <span className="font-medium capitalize">{item.color}</span>
                        </div>
                        <div>
                          <span className="text-sm">Quantity: </span>
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <div>
                          <span className="text-sm">Pickup: </span>
                          <span className="font-medium">{item.pickupLocation}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <FiClock />
                        <span>
                          {item.startDate} | {item.startTime} - {item.endTime}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#67103d]">Rs. {item.totalPrice}</p>
                      <button
                        className="text-red-500 text-sm mt-2 hover:text-red-700"
                        onClick={() => alert("Remove logic not implemented")}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>Rs. {calculateGrandTotal()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-[#67103d] to-[#8a1550] text-white rounded-lg flex items-center justify-center gap-2 hover:from-[#500c2e] hover:to-[#67103d]"
                >
                  <FiCreditCard /> Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;