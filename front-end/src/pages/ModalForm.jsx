// ModalForm.jsx
import React, { useState } from 'react';

const ModalForm = ({ title, fields, onSubmit, onClose, initialData = {} }) => {
  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => {
      acc[field] = initialData[field] || '';
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field}>
              <label className="block capitalize">{field}</label>
              <input
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full border px-2 py-1 rounded"
              />
            </div>
          ))}
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="text-red-500">Cancel</button>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
