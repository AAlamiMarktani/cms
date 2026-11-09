// L'adresse de l'API vient du fichier .env (ou de Vercel en production)
const API_URL = process.env.REACT_APP_API_URL;

async function lireReponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

// Lire tous les clients
export async function getClients() {
  return lireReponse(await fetch(API_URL));
}

// Créer un client
export async function createClient(client) {
  return lireReponse(
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client)
    })
  );
}

// Modifier un client
export async function updateClient(id, modifications) {
  return lireReponse(
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modifications)
    })
  );
}

// Supprimer un client
export async function deleteClient(id) {
  return lireReponse(await fetch(`${API_URL}/${id}`, { method: "DELETE" }));
}
