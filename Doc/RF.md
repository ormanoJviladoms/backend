# 🛒 TrueFacts – Backend

## Requeriments Funcionals (RF)

Aquest document recull els **requeriments funcionals** del backend del projecte **TrueFacts**, una botiga online de samarretes desenvolupada com a projecte acadèmic de DAW2 dins del mòdul de Desenvolupament d’Aplicacions Web.

---

## 📌 RF.1 – Gestió de catàleg

- RF1.1: El sistema ha de permetre obtenir el llistat complet de samarretes disponibles.
- RF1.2: El sistema ha de permetre filtrar el catàleg per:
  - Model
  - Talla
  - Color
- RF1.3: El sistema ha de retornar la informació detallada de cada samarreta (nom, descripció, imatge, preu, stock disponible).

---

## 📌 RF.2 – Cistella de compra

- RF2.1: El sistema ha de permetre afegir productes a la cistella.
- RF2.2: El sistema ha de permetre eliminar productes de la cistella.
- RF2.3: El sistema ha de permetre modificar la quantitat d’un producte a la cistella.
- RF2.4: El sistema ha de mostrar en tot moment el total acumulat de la compra.

---

## 📌 RF.3 – Procés de compra

- RF3.1: El sistema ha de permetre iniciar el procés de compra amb els productes de la cistella.
- RF3.2: El sistema ha de registrar les dades de l’usuari necessàries per a la compra (nom, adreça, mètode de pagament simulat).
- RF3.3: El sistema ha de validar l’estoc disponible abans de confirmar la compra.
- RF3.4: El sistema ha de generar una comanda amb un identificador únic.
- RF3.5: El sistema ha de reduir l’estoc de cada producte en funció de la comanda realitzada.

---

## 📌 RF.4 – Gestió d’usuaris

- RF4.1: El sistema ha de permetre el registre de nous usuaris.
- RF4.2: El sistema ha de permetre l’autenticació d’usuaris existents.
- RF4.3: El sistema ha de permetre a l’usuari actualitzar les seves dades personals.
- RF4.4: El sistema ha de protegir les contrasenyes mitjançant tècniques de xifrat.

---

## 📌 RF.5 – Administració _(OPCIONAL A FER)_

- RF5.1: El sistema ha de permetre a un administrador afegir nous productes al catàleg.
- RF5.2: El sistema ha de permetre a un administrador editar productes existents.
- RF5.3: El sistema ha de permetre a un administrador eliminar productes.
- RF5.4: El sistema ha de permetre a un administrador consultar totes les comandes realitzades.

---

## 📌 RF.6 – API REST

- RF6.1: Totes les operacions del sistema s’han d’oferir a través d’una API REST amb rutes ben definides.
- RF6.2: El sistema ha de retornar les dades en format **JSON**.
- RF6.3: El sistema ha de gestionar errors i retornar codis HTTP adequats.

---

## 📌 RF.7 – Seguretat i bones pràctiques

- RF7.1: El sistema ha de validar totes les dades d’entrada per evitar injeccions i errors.
- RF7.2: El sistema ha de gestionar sessions i tokens per garantir la seguretat dels usuaris.
- RF7.3: El sistema ha de controlar permisos diferenciats per usuaris i administradors.

---

👨‍💻 **Autor**  
Backend desenvolupat per **Oriol Marquès**, estudiant de **DAW2** dins del mòdul de **Desenvolupament d’Aplicacions Web**.
