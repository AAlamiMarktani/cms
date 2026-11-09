import { useState } from "react";

function ClientForm({ onAjouter }) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [envoi, setEnvoi] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault(); // empêche le rechargement de la page
    setEnvoi(true);
    const reussi = await onAjouter({ nom, email, telephone, entreprise });
    setEnvoi(false);
    if (reussi) {
      setNom("");
      setEmail("");
      setTelephone("");
      setEntreprise("");
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Nom *
        <input
          placeholder="Sara Amrani"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </label>
      <label>
        Email *
        <input
          type="email"
          placeholder="sara@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Téléphone
        <input
          placeholder="06 12 34 56 78"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
      </label>
      <label>
        Entreprise
        <input
          placeholder="Atlas Digital"
          value={entreprise}
          onChange={(e) => setEntreprise(e.target.value)}
        />
      </label>
      <button type="submit" className="btn btn-primary" disabled={envoi}>
        {envoi ? "Envoi..." : "+ Ajouter"}
      </button>
    </form>
  );
}

export default ClientForm;
