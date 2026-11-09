function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.type === "erreur" ? "⚠️ " : "✓ "}
      {toast.texte}
    </div>
  );
}

export default Toast;
