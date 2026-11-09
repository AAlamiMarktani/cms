import { useState } from "react";

function EditModal({ client, onSauver, onFermer }) {
  const [form, setForm] = useState({
    nom: client.nom || "",
    email: client.email || "",
    telephone: client.telephone || "",
    entreprise: client.entreprise || "",
    statut: client.statut
  });

  function changer(champ, valeur) {
    setForm({ ...form, [champ]: valeur });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const reussi = await onSauver(client._id, form);
    if (reussi) onFermer();
  }

  return (
    <div className="overlay" onClick={onFermer}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2>Modifier le contact</h2>
        <label>
          Nom
          <input
            value={form.nom}
            onChange={(e) => changer("nom", e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => changer("email", e.target.value)}
            required
          />
        </label>
        <label>
          Téléphone
          <input
            value={form.telephone}
            onChange={(e) => changer("telephone", e.target.value)}
          />
        </label>
        <label>
          Entreprise
          <input
            value={form.entreprise}
            onChange={(e) => changer("entreprise", e.target.value)}
          />
        </label>
        <label>
          Statut
          <select
            value={form.statut}
            onChange={(e) => changer("statut", e.target.value)}
          >
            <option value="prospect">Prospect</option>
            <option value="client">Client</option>
            <option value="inactif">Inactif</option>
          </select>
        </label>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onFermer}>
            Annuler
          </button>
          <button type="submit" className="btn btn-primary">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditModal;
