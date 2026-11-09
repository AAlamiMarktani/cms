function initiales(nom) {
  return nom
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((mot) => mot[0].toUpperCase())
    .join("");
}

function formaterDate(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function ClientList({ clients, onChangerStatut, onSupprimer, onModifier }) {
  if (clients.length === 0) {
    return (
      <div className="empty">
        <div className="empty-icon">📭</div>
        <p>Aucun client à afficher.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Contact</th>
            <th>Entreprise</th>
            <th>Ajouté le</th>
            <th>Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td>
                <div className="client-cell">
                  <span className="avatar">{initiales(client.nom)}</span>
                  <span className="client-name">{client.nom}</span>
                </div>
              </td>
              <td>
                <div>{client.email}</div>
                <div className="muted small">{client.telephone || "—"}</div>
              </td>
              <td>{client.entreprise || "—"}</td>
              <td className="muted">{formaterDate(client.createdAt)}</td>
              <td>
                <select
                  className={`badge badge-${client.statut}`}
                  value={client.statut}
                  onChange={(e) => onChangerStatut(client._id, e.target.value)}
                >
                  <option value="prospect">Prospect</option>
                  <option value="client">Client</option>
                  <option value="inactif">Inactif</option>
                </select>
              </td>
              <td className="actions">
                <button
                  className="btn btn-ghost"
                  onClick={() => onModifier(client)}
                  title="Modifier"
                >
                  ✏️
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onSupprimer(client._id)}
                  title="Supprimer"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientList;
