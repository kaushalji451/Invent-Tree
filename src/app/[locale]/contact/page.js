"use client"
import React, { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({
    inquiryType: '',
    organization: '',
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    language: '',
  });

  const inquiryOptions = ['Current Order', 'About Scheme', 'Recruitment', 'Other'];


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    // Assuming `form` is an object like { name: '', email: '', message: '' }
    for (const key in form) {
      formData.append(key, form[key]);
    }
    console.log("Submitting Form Data:", Object.fromEntries(formData.entries()));
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData, // 👈 sending FormData instead of JSON
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unknown error");

    alert("Message sent successfully!");
    console.log("Success:", result);
  } catch (err) {
    alert("Failed to submit: " + err.message);
    console.error("Error:", err);
  }
};
  return (
    <div className="min-h-screen bg-[#f4f6fd] flex flex-col items-center justify-start py-10 px-4">
      <div className="text-center mb-6">
        <h2 className="text-lg text-gray-800">For help with this scheme, fill in your details</h2>
        <p className="text-sm mt-1 text-gray-600">Or call us at <span className="text-green-600 font-semibold">058-322-3322</span> (Mon–Fri: 8:30–17:30)</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md w-full max-w-xl rounded-lg px-8 py-6"
      >
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Inquiry Type <span className="text-red-600">*</span></label>
          <div className="space-y-1">
            {inquiryOptions.map((option) => (
              <div key={option}>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-green-600"
                    checked={form.inquiryType === option}
                    onChange={() => setForm({ ...form, inquiryType: option })}
                  />
                  <span className="ml-2">{option}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor='organization' className="block text-gray-800 mb-1">Organization / Vendor Name</label>
          <input
            type="text"
            name="organization"
            id='organization'
            value={form.organization}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your organization name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor='name' className="block text-gray-800 mb-1">Full Name <span className="text-red-600">*</span></label>
          <input
            type="text"
            name="name"
            id='name'
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor='email' className="block text-gray-800 mb-1">Email <span className="text-red-600">*</span></label>
          <input
            type="email"
            name="email"
            id='email'
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor='phone' className="block text-gray-800 mb-1">Phone Number <span className="text-red-600">*</span></label>
          <input
            type="tel"
            name="phone"
            id='phone'
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="mb-4">
          <label htmlFor='subject' className="block text-gray-800 mb-1">Subject <span className="text-red-600">*</span></label>
          <input
            type="text"
            name="subject"
            id='subject'
            required
            value={form.subject}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter subject"
          />
        </div>

        <div className="mb-4">
          <label htmlFor='message' className="block text-gray-800 mb-1">Message <span className="text-red-600">*</span></label>
          <textarea
            name="message"
            id='message'
            required
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 h-24"
            placeholder="Enter your message"
          />
        </div>

        <div className="mb-6">
          <label htmlFor='language' className="block text-gray-800 mb-1">Language Preference</label>
          <input
            type="text"
            name="language"
            id='language'
            value={form.language}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., English or Hindi"
          />
        </div>

       <div className='w-full flex items-center justify-center'>
         <button
          type="submit"
          className="bg-[#20998f] p-5 w-[221px] h-[56px] flex items-center justify-center text-white font-semibold rounded-full"
        >
          Submit
        </button>
       </div>
       <br />
            <div>
              <p className='text-xs opacity-50 text-center'>This site is protected by reCAPTCHA and the Google <span className='text-blue-500 underline cursor-pointer'>Privacy Policy</span> and <span  className='text-blue-500 underline cursor-pointer'>Terms of Service</span> apply.</p>
            </div>

      </form>
    </div>
  );
};

export default ContactForm;
