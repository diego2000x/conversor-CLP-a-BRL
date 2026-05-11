import streamlit, requests

url = "https://api.frankfurter.dev/v2/rates?base=clp"

respuesta = requests.get(url)
datos = respuesta.json()

brl = next(moneda for moneda in datos if moneda["quote"] == "BRL")

tasa = brl["rate"]

col1, col2 = streamlit.columns(2)
with col1:
    streamlit.image("https://images.emojiterra.com/google/noto-emoji/unicode-17.0/color/svg/1f1e8-1f1f1.svg", width=50)
with col2:
    streamlit.image("https://images.emojiterra.com/google/noto-emoji/unicode-17.0/color/svg/1f1e7-1f1f7.svg", width=50)
streamlit.title("Tasa de cambio CLP a BRL")
streamlit.write(f"La tasa de cambio actual de CLP a BRL es: 1000 pesos chilenos = {1000 * tasa:.2f} reales.")

reales = streamlit.text_input("Ingrese los reales")

if streamlit.button("Convertir a pesos chilenos"):
    try:
        reales = float(reales)
        pesos_chilenos = reales / tasa
        streamlit.write(f"{int(reales)} reales son equivalentes a **${int(pesos_chilenos)}** pesos chilenos.")
    except ValueError:
        streamlit.error("Por favor, ingrese un número válido para los reales.")

chilenos = streamlit.text_input("Ingrese los pesos chilenos")

if streamlit.button("Convertir a reales"):
    try:
        chilenos = float(chilenos)
        reales_equivalentes = chilenos * tasa
        streamlit.write(f"{int(chilenos)} pesos chilenos son equivalentes a **${int(reales_equivalentes)}** reales.")
    except ValueError:
        streamlit.error("Por favor, ingrese un número válido para los pesos chilenos.")