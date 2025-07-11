// src/components/ModalForm.jsx

import React, { useState } from 'react';

const ModalForm = ({
  title,
  fields = [],
  onSubmit,
  onClose,
  initialData = {},
}) => {
  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => {
      acc[field] = initialData[field] || '';
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-lg"
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block mb-1 text-sm font-medium text-gray-700 capitalize"
              >
                {field}
              </label>
              <input
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
