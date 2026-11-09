import { useEffect, useState } from "react";
import Header from "./components/Header";
import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";
import EditModal from "./components/EditModal";
import Toast from "./components/Toast";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient
} from "./services/clientService";
import "./App.css";

function App() {
  const [clients, setClients] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [chargement, setChargement] = useState(true);
  const [erreurChargement, setErreurChargement] = useState("");
  const [toast, setToast] = useState(null);
  const [clientEnEdition, setClientEnEdition] = useState(null);

  function afficherToast(texte, type = "succes") {
    setToast({ texte, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Au premier affichage : demander les clients à l'API
  useEffect(() => {
    getClients()
      .then((data) => setClients(data))
      .catch((error) => setErreurChargement(error.message))
      .finally(() => setChargement(false));
  }, []);

  async function ajouterClient(nouveauClient) {
    try {
      const clientCree = await createClient(nouveauClient);
      setClients([clientCree, ...clients]);
      afficherToast("Client ajouté !");
      return true;
    } catch (error) {
      afficherToast(error.message, "erreur");
      return false;
    }
  }

  async function modifierClient(id, modifications) {
    try {
      const clientModifie = await updateClient(id, modifications);
      setClients(clients.map((c) => (c._id === id ? clientModifie : c)));
      afficherToast("Client modifié !");
      return true;
    } catch (error) {
      afficherToast(error.message, "erreur");
      return false;
    }
  }

  async function changerStatut(id, statut) {
    await modifierClient(id, { statut });
  }

  async function supprimerClient(id) {
    if (!window.confirm("Supprimer ce client ?")) {
      return;
    }
    try {
      await deleteClient(id);
      setClients(clients.filter((c) => c._id !== id));
      afficherToast("Client supprimé !");
    } catch (error) {
      afficherToast(error.message, "erreur");
    }
  }

  // On garde uniquement les clients qui correspondent à la recherche et au statut
  const clientsFiltres = clients.filter((c) => {
    const texte = (c.nom + " " + c.email + " " + (c.entreprise || "")).toLowerCase();
    const okRecherche = texte.includes(recherche.toLowerCase());
    const okStatut = filtreStatut === "tous" || c.statut === filtreStatut;
    return okRecherche && okStatut;
  });

  const compter = (statut) => clients.filter((c) => c.statut === statut).length;

  const onglets = [
    { valeur: "tous", label: "Tous", nombre: clients.length },
    { valeur: "prospect", label: "Prospects", nombre: compter("prospect") },
    { valeur: "client", label: "Clients", nombre: compter("client") },
    { valeur: "inactif", label: "Inactifs", nombre: compter("inactif") }
  ];

  return (
    <div className="container">
      <Header
        total={clients.length}
        prospects={compter("prospect")}
        clients={compter("client")}
        inactifs={compter("inactif")}
      />

      <section className="card">
        <h2>➕ Nouveau contact</h2>
        <ClientForm onAjouter={ajouterClient} />
      </section>

      <section className="card">
        <div className="toolbar">
          <input
            className="recherche"
            placeholder="🔍 Rechercher par nom, email ou entreprise..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>

        <div className="tabs">
          {onglets.map((o) => (
            <button
              key={o.valeur}
              className={`tab ${filtreStatut === o.valeur ? "tab-active" : ""}`}
              onClick={() => setFiltreStatut(o.valeur)}
            >
              {o.label} <span className="tab-count">{o.nombre}</span>
            </button>
          ))}
        </div>

        {chargement ? (
          <div className="loader">
            <div className="spinner" />
            <p>Chargement des clients...</p>
          </div>
        ) : erreurChargement ? (
          <div className="erreur-box">
            ⚠️ Impossible de charger les clients : {erreurChargement}
            <br />
            Vérifie que le backend tourne et que REACT_APP_API_URL est correcte.
          </div>
        ) : (
          <ClientList
            clients={clientsFiltres}
            onChangerStatut={changerStatut}
            onSupprimer={supprimerClient}
            onModifier={setClientEnEdition}
          />
        )}
      </section>

      {clientEnEdition && (
        <EditModal
          client={clientEnEdition}
          onSauver={modifierClient}
          onFermer={() => setClientEnEdition(null)}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}

export default App;
