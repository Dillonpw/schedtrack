"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      console.log('Sending request to create subscription checkout session...');
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const { url } = await response.json();
        console.log('Redirecting to subscription checkout:', url);
        router.push(url);
      } else {
        const errorData = await response.json();
        console.error('Subscription checkout session creation failed:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <section>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Subscribe Now'}
        </button>
      </section>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
}