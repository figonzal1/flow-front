"use client";

import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [token, setToken] = useState("");

  const registerCard = async () => {
    const result = await axios.post("http://localhost:3000/registerCard");

    console.log("REGISTER CARD", result.data);

    setToken(result.data.token);

    return result;
  };

  const handleRedirect = () => {
    if (token && window) {
      window.open(
        `https://sandbox.flow.cl/app/customer/disclaimer.php?token=${token}`,
        "_blank"
      );
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-5xl text-orange-400 font-semibold">
        Flow.cl - Integracion
      </h2>

      {!token ? (
        <button
          className="px-3 py-2 bg-blue-500 rounded-2xl"
          onClick={registerCard}
        >
          Iniciar inscripción
        </button>
      ) : (
        <button
          className="px-3 py-2 bg-green-500 rounded-2xl mt-2"
          onClick={handleRedirect}
        >
          Inscribir tarjeta
        </button>
      )}
    </div>
  );
}
