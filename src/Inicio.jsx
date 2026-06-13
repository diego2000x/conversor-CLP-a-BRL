import React from "react";
import { useState } from "react";

const Inicio = () => {
  const tasa = 178.19;
  const [input, setInput] = useState(0);
  const conversion = parseInt(tasa * input);
  const [input2, setInput2] = useState(0);
  const conversion2 = parseInt(input2 / tasa);

  return (
    <div>
      <div className="Header">
        <h1>Conversor de Monedas</h1>
        <div className="banderas">
          <img src="chile.png" alt="" />
          <h1>💵</h1>
          <img src="brasil.png" alt="" />
        </div>
        <h2>CLP & BRL</h2>
      </div>
      <div className="Dialogo_conversion">
        <div className="mini-banderas">
          <img src="brasil.png" alt="" />
          <h1>➡</h1>
          <img src="chile.png" alt="" />
        </div>
        <p>
          "Convertir reales <strong>(BRL)</strong> a pesos chilenos
          <strong>(CLP)</strong>."
        </p>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Reales"
        />
        <p>
          <strong> {input} reales</strong> equivalen a{" "}
          <strong>{conversion} pesos</strong> chilenos.
        </p>
      </div>
      <div className="Dialogo_conversion">
        <div className="mini-banderas">
          <img src="chile.png" alt="" />
          <h1>➡</h1>
          <img src="brasil.png" alt="" />
        </div>
        <p>
          "Convertir pesos chilenos <strong>(CLP)</strong> a reales
          <strong>(BRL)</strong>."
        </p>
        <input
          type="text"
          onChange={(e) => setInput2(e.target.value)}
          placeholder="Pesos chilenos"
        />
        <p>
          <strong> {input2} pesos</strong> equivalen a{" "}
          <strong>{conversion2} reales</strong> brasileños.
        </p>
      </div>
    </div>
  );
};

export default Inicio;
