// src/App.jsx

import { useState } from 'react';

export default function Form() {
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        feedback: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await fetch("/.netlify/functions/submit-feedback", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("Error submitting the form.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback</label>
                    <input
                        type="text"
                        id="feedback"
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your feedback"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Submit
                </button>

                {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
            </form>

            {/* Name at the bottom */}
            <div className="mt-4 text-center">
                <h3 className="text-gray-700">By Kudhan</h3>
            </div>
        </div>
    );
};
