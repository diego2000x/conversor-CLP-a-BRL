import requests

url = "https://api.frankfurter.dev/v2/rates?base=clp"

respuesta = requests.get(url)
datos = respuesta.json()

brl = next(moneda for moneda in datos if moneda["quote"] == "BRL")

tasa = brl["rate"]

print("Tasa de cambio CLP a BRL")
print(f"La tasa de cambio actual de CLP a BRL es: 1000 pesos chilenos = {1000 * tasa:.2f} reales.")

def menu():
    print("1. Convertir CLP a BRL")
    print("2. Convertir BRL a CLP")
    print("3. Salir")
    opcion = input("Ingrese una opcion: ")
    return opcion


def convertir_a_chilenos():
    reales = float(input("Ingrese los reales"))
    try:
        reales = float(reales)
        pesos_chilenos = reales / tasa
        print(f"{int(reales)} reales son equivalentes a {int(pesos_chilenos)} pesos chilenos.")
        return pesos_chilenos
    except ValueError:
        print("Por favor, ingrese un número válido para los reales.")


def convertir_a_reales():
    chilenos = float(input("Ingrese los pesos chilenos"))
    try:
        chilenos = float(chilenos)
        reales_equivalentes = chilenos * tasa
        print(f"{int(chilenos)} pesos chilenos son equivalentes a {int(reales_equivalentes)} reales.")
        return reales_equivalentes
    except ValueError:
        print("Por favor, ingrese un número válido para los pesos chilenos.")

while True:
    opcion = menu()
    if opcion == "1":
        convertir_a_chilenos()
    elif opcion == "2":
        convertir_a_reales()
    elif opcion == "3":
        break
    else:
        print("Opcion invalida. Intente nuevamente.")