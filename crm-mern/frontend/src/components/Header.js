function Header({ total, prospects, clients, inactifs }) {
  const taux = total === 0 ? 0 : Math.round((clients / total) * 100);

  return (
    <header className="header">
      <div className="topbar">
        <div className="brand">
          <div className="logo">C</div>
          <div>
            <h1>Mon CRM</h1>
            <p>Gestion de la relation client</p>
          </div>
        </div>
        <span className="pill">{total} contact(s)</span>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-icon icon-total">👥</div>
          <div>
            <span className="stat-number">{total}</span>
            <span className="stat-label">Total contacts</span>
          </div>
        </div>
        <div className="stat">
          <div className="stat-icon icon-prospect">🎯</div>
          <div>
            <span className="stat-number">{prospects}</span>
            <span className="stat-label">Prospects</span>
          </div>
        </div>
        <div className="stat">
          <div className="stat-icon icon-client">✅</div>
          <div>
            <span className="stat-number">{clients}</span>
            <span className="stat-label">Clients ({taux}%)</span>
          </div>
        </div>
        <div className="stat">
          <div className="stat-icon icon-inactif">💤</div>
          <div>
            <span className="stat-number">{inactifs}</span>
            <span className="stat-label">Inactifs</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
