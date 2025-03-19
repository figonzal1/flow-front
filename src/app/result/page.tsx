"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [cardStatus, setCardStatus] = useState("");

  useEffect(() => {
    if (token) {
      const getRegisterTcStatus = async () => {
        const response = await axios.get<{
          status: string;
          customerId: string;
          creditCardType: string;
          last4cardDigits: string;
        }>(`http://localhost:3000/registerCardStatus/${token}`);

        const data = response.data;

        setCardStatus(data.status);

        return response;
      };

      getRegisterTcStatus();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-5xl text-orange-400 font-semibold">
        Verificación de Tarjeta
      </h1>
      {cardStatus ? (
        <div
          className={`${
            cardStatus == "0" ? "bg-red-400/10" : "bg-green-400/10"
          } rounded-xl p-5 `}
        >
          {cardStatus === "0" ? (
            <p className="text-red-400 font-bold">Tarjeta no registrada</p>
          ) : cardStatus === "1" ? (
            <p className="text-green-400 font-bold">Tarjeta registrada</p>
          ) : (
            <p>Estado desconocido</p>
          )}
        </div>
      ) : (
        <p className="font-bold p-5">Verificando...</p>
      )}
    </div>
  );
}
