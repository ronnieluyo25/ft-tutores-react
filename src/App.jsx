import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue-deep:    #1a2e5a;
    --blue-mid:     #1e3f8f;
    --blue-light:   #2f5ecf;
    --blue-pale:    #e8edf8;
    --accent:       #f5a623;
    --accent-warm:  #f07b1d;
    --accent-light: #fff4e0;
    --white:        #ffffff;
    --gray-50:      #f9fafb;
    --gray-100:     #f1f3f6;
    --gray-300:     #c8cdd8;
    --gray-500:     #6b7280;
    --gray-700:     #374151;
    --shadow-sm:    0 1px 4px rgba(26,46,90,0.08);
    --shadow-md:    0 4px 16px rgba(26,46,90,0.12);
    --shadow-lg:    0 12px 40px rgba(26,46,90,0.16);
    --radius:       14px;
    --radius-sm:    8px;
  }

  body {
    font-family: 'Barlow', sans-serif;
    background: var(--gray-50);
    color: var(--gray-700);
    min-height: 100vh;
  }

  /* ── LOGIN ─────────────────────────────── */
  .login-root {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .login-left {
    background: linear-gradient(145deg, var(--blue-deep) 0%, var(--blue-mid) 60%, var(--blue-light) 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 64px 56px;
    position: relative;
    overflow: hidden;
  }

  .login-left::before {
    content: '';
    position: absolute;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: rgba(245,166,35,0.12);
    top: -80px;
    right: -80px;
  }
  .login-left::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    bottom: 40px;
    left: -60px;
  }

  .login-brand {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 48px;
    z-index: 1;
  }
  .login-brand-icon {
    width: 48px;
    height: 48px;
    background: var(--accent);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    box-shadow: 0 4px 14px rgba(245,166,35,0.4);
  }
  .login-brand-name {
    font-family: 'Rajdhani', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--white);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .login-headline {
    font-family: 'Rajdhani', sans-serif;
    font-size: 46px;
    font-weight: 700;
    color: var(--white);
    line-height: 1.15;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 20px;
    z-index: 1;
  }
  .login-headline span {
    color: var(--accent);
  }

  .login-sub {
    font-size: 16px;
    color: rgba(255,255,255,0.72);
    line-height: 1.7;
    max-width: 360px;
    z-index: 1;
  }

  .login-stats {
    display: flex;
    gap: 32px;
    margin-top: 56px;
    z-index: 1;
  }
  .login-stat-val {
    font-family: 'Rajdhani', sans-serif;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--accent);
    display: block;
  }
  .login-stat-lbl {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .login-right {
    background: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 64px 56px;
  }

  .login-form-box {
    width: 100%;
    max-width: 380px;
  }

  .login-form-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: 34px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--blue-deep);
    margin-bottom: 8px;
  }
  .login-form-desc {
    font-size: 14px;
    color: var(--gray-500);
    margin-bottom: 36px;
  }

  .form-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--gray-700);
    margin-bottom: 8px;
    letter-spacing: 0.3px;
  }

  .form-input {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid var(--gray-300);
    border-radius: var(--radius-sm);
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    color: var(--gray-700);
    background: var(--white);
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
    margin-bottom: 24px;
  }
  .form-input:focus {
    border-color: var(--blue-light);
    box-shadow: 0 0 0 4px rgba(47,94,207,0.1);
  }

  .btn-primary {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-warm) 100%);
    color: var(--white);
    border: none;
    border-radius: var(--radius-sm);
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.3px;
    box-shadow: 0 4px 18px rgba(245,166,35,0.35);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(245,166,35,0.45);
  }
  .btn-primary:active { transform: translateY(0); }

  .login-error {
    margin-top: 14px;
    padding: 12px 16px;
    background: #fff0f0;
    border: 1px solid #fecaca;
    border-radius: var(--radius-sm);
    color: #dc2626;
    font-size: 13px;
    text-align: center;
  }

  /* ── DASHBOARD ─────────────────────────── */
  .dash-root {
    min-height: 100vh;
    background: var(--gray-50);
  }

  /* Topbar */
  .topbar {
    background: var(--white);
    border-bottom: 1px solid var(--gray-100);
    padding: 0 40px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: var(--shadow-sm);
  }
  .topbar-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Barlow', sans-serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: var(--blue-deep);
  }
  .topbar-logo {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    object-fit: contain;
    display: block;
  }
  .topbar-logo-fallback {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, var(--accent), var(--accent-warm));
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }
  .topbar-user {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .topbar-avatar {
    width: 38px;
    height: 38px;
    background: linear-gradient(135deg, var(--blue-mid), var(--blue-light));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-weight: 600;
    font-size: 14px;
  }
  .topbar-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--blue-deep);
  }
  .topbar-badge {
    font-size: 11px;
    padding: 3px 10px;
    background: var(--accent-light);
    color: var(--accent-warm);
    border-radius: 20px;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  /* Main content */
  .dash-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 36px 40px 60px;
  }

  .dash-welcome {
    margin-bottom: 32px;
  }
  .dash-welcome h1 {
    font-family: 'Rajdhani', sans-serif;
    font-size: 36px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--blue-deep);
    margin-bottom: 6px;
  }
  .dash-welcome p {
    font-size: 14px;
    color: var(--gray-500);
  }

  /* KPI Cards */
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 18px;
    margin-bottom: 36px;
  }

  .kpi-card {
    background: var(--white);
    border-radius: var(--radius);
    padding: 22px 20px;
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(26,46,90,0.06);
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .kpi-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  .kpi-card.accent {
    background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
    color: var(--white);
  }
  .kpi-card.accent::after {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: rgba(245,166,35,0.15);
    right: -20px;
    bottom: -20px;
  }

  .kpi-icon {
    font-size: 22px;
    margin-bottom: 14px;
    display: block;
  }
  .kpi-val {
    font-family: 'Rajdhani', sans-serif;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: var(--blue-deep);
    display: block;
    line-height: 1;
    margin-bottom: 6px;
  }
  .kpi-card.accent .kpi-val {
    color: var(--accent);
  }
  .kpi-lbl {
    font-size: 12px;
    color: var(--gray-500);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .kpi-card.accent .kpi-lbl {
    color: rgba(255,255,255,0.65);
  }

  /* Section header */
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }
  .section-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--blue-deep);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-title::before {
    content: '';
    display: block;
    width: 4px;
    height: 22px;
    background: linear-gradient(to bottom, var(--accent), var(--accent-warm));
    border-radius: 2px;
  }
  .section-count {
    font-size: 13px;
    color: var(--gray-500);
    background: var(--gray-100);
    padding: 4px 12px;
    border-radius: 20px;
  }

  /* Month filter */
  .month-filter-wrap {
    position: relative;
    display: inline-block;
  }
  .btn-month {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 18px;
    background: var(--white);
    border: 2px solid var(--blue-pale);
    border-radius: var(--radius-sm);
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: var(--blue-deep);
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
    white-space: nowrap;
  }
  .btn-month:hover {
    border-color: var(--blue-light);
    box-shadow: 0 0 0 3px rgba(47,94,207,0.08);
  }
  .btn-month.active {
    border-color: var(--blue-light);
    background: var(--blue-pale);
  }
  .btn-month-arrow {
    font-size: 10px;
    transition: transform 0.2s;
  }
  .btn-month.active .btn-month-arrow { transform: rotate(180deg); }

  .month-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: var(--white);
    border: 1px solid var(--gray-100);
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    min-width: 200px;
    z-index: 200;
    overflow: hidden;
    animation: fadeDown 0.15s ease;
  }
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .month-dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 18px;
    font-size: 14px;
    color: var(--gray-700);
    cursor: pointer;
    transition: background 0.12s;
    border-bottom: 1px solid var(--gray-100);
  }
  .month-dropdown-item:last-child { border-bottom: none; }
  .month-dropdown-item:hover { background: var(--blue-pale); color: var(--blue-deep); }
  .month-dropdown-item.selected {
    background: var(--blue-pale);
    color: var(--blue-deep);
    font-weight: 600;
  }
  .month-dropdown-item.selected::after {
    content: '✓';
    color: var(--accent-warm);
    font-weight: 700;
  }
  .month-dropdown-item.disabled {
    color: var(--gray-300);
    cursor: default;
    pointer-events: none;
  }

  /* Table */
  .table-wrapper {
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(26,46,90,0.06);
    overflow: hidden;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13.5px;
  }

  thead {
    background: var(--blue-deep);
  }
  thead th {
    padding: 14px 18px;
    text-align: left;
    color: rgba(255,255,255,0.85);
    font-weight: 500;
    font-size: 11.5px;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    white-space: nowrap;
  }

  tbody tr {
    border-bottom: 1px solid var(--gray-100);
    transition: background 0.15s;
  }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: var(--blue-pale); }

  tbody td {
    padding: 13px 18px;
    color: var(--gray-700);
  }

  .badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.3px;
  }
  .badge-pres {
    background: #dbeafe;
    color: #1d4ed8;
  }
  .badge-virt {
    background: #d1fae5;
    color: #065f46;
  }

  .monto-cell {
    font-weight: 600;
    color: var(--blue-deep);
  }

  .tutor-info-bar {
    display: flex;
    align-items: center;
    gap: 24px;
    background: var(--white);
    border-radius: var(--radius);
    padding: 18px 24px;
    margin-bottom: 28px;
    box-shadow: var(--shadow-sm);
    border-left: 4px solid var(--accent);
  }
  .tutor-info-item {
    font-size: 13px;
    color: var(--gray-500);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .tutor-info-item strong {
    display: block;
    font-size: 15px;
    color: var(--blue-deep);
    font-weight: 600;
  }
  .tutor-sep {
    width: 1px;
    height: 36px;
    background: var(--gray-100);
  }

  @media (max-width: 900px) {
    .login-root { grid-template-columns: 1fr; }
    .login-left { display: none; }
    .kpi-grid { grid-template-columns: repeat(2, 1fr); }
    .dash-content { padding: 24px 20px; }
    .topbar { padding: 0 20px; }
  }
`;

// ── Ruta de tu logo. Cambia este valor por la ruta de tu imagen.
// Tamaño recomendado: 80×80 px o 160×160 px (PNG con fondo transparente).
// Ejemplo: const LOGO_SRC = "/logo.png";  (coloca el archivo en /public)
const LOGO_SRC = null; // <- reemplaza null por la ruta cuando tengas el logo

export default function App() {
  const [usuario, setUsuario] = useState("");
  const [tutor, setTutor] = useState(null);
  const [resumen, setResumen] = useState(null);
  const [detalle, setDetalle] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Mes seleccionado: { anio, mes } donde mes es 1-12
  const hoy = new Date();
  const [mesSeleccionado, setMesSeleccionado] = useState({ anio: hoy.getFullYear(), mes: hoy.getMonth() + 1 });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const login = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Error de autenticación");

      const dni = data.tutor.dni;
      const dash = await fetch(`${API_BASE}/dashboard/${dni}`);
      const dashData = await dash.json();
      setTutor(dashData.tutor);
      setResumen(dashData.resumen);
      setDetalle(dashData.detalle);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") login(); };

  const getInitials = (nombre) =>
    nombre ? nombre.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase() : "T";

  // Captura el segundo token del nombre (índice 1), o el primero si solo hay uno
  const getPrimerNombre = (nombre) => {
    if (!nombre) return "";
    const partes = nombre.trim().split(/\s+/);
    return partes.length >= 2 ? partes[1] : partes[0];
  };

  const modalidadBadge = (m) => {
    const lower = (m || "").toLowerCase();
    if (lower.includes("presencial")) return <span className="badge badge-pres">{m}</span>;
    if (lower.includes("virtual")) return <span className="badge badge-virt">{m}</span>;
    return <span className="badge" style={{ background: "#f3f4f6", color: "#6b7280" }}>{m}</span>;
  };

  // Formatea fecha ISO a DD/MM/AAAA + día de semana
  const formatFecha = (fechaStr) => {
    if (!fechaStr) return { fecha: "", dia: "" };
    const d = new Date(fechaStr);
    if (isNaN(d)) return { fecha: fechaStr, dia: "" };
    const dd = String(d.getUTCDate()).padStart(2, "0");
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    const aaaa = d.getUTCFullYear();
    const dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    return { fecha: `${dd}/${mm}/${aaaa}`, dia: dias[d.getUTCDay()] };
  };

  // Quita las primeras 4 letras + el " - " del nombre del curso
  const formatCurso = (curso) => {
    if (!curso) return "";
    // Busca el patrón "XXXX - " al inicio (4 chars + espacio + guión + espacio)
    return curso.replace(/^.{4}\s*-\s*/, "").trim();
  };

  // Formatea horas como decimal con 2 decimales
  const formatHoras = (h) => {
    const n = parseFloat(h);
    return isNaN(n) ? h : n.toFixed(2);
  };

  // Nombres de meses en español
  const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                 "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  // Genera lista de meses disponibles: desde el mes del reporte más antiguo hasta el mes actual
  const getMesesDisponibles = () => {
    if (!detalle.length) return [{ anio: hoy.getFullYear(), mes: hoy.getMonth() + 1 }];
    const fechas = detalle.map(d => new Date(d.FechaReporte)).filter(d => !isNaN(d));
    if (!fechas.length) return [{ anio: hoy.getFullYear(), mes: hoy.getMonth() + 1 }];
    const minFecha = new Date(Math.min(...fechas));
    const result = [];
    let cur = new Date(minFecha.getUTCFullYear(), minFecha.getUTCMonth(), 1);
    const limite = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    while (cur <= limite) {
      result.push({ anio: cur.getFullYear(), mes: cur.getMonth() + 1 });
      cur.setMonth(cur.getMonth() + 1);
    }
    return result.reverse(); // más reciente primero
  };

  // Filtra el detalle según mes seleccionado
  const detalleFiltrado = detalle.filter(d => {
    const f = new Date(d.FechaReporte);
    if (isNaN(f)) return false;
    return f.getUTCFullYear() === mesSeleccionado.anio && (f.getUTCMonth() + 1) === mesSeleccionado.mes;
  });

  const nombreMesSeleccionado = `${MESES[mesSeleccionado.mes - 1]} ${mesSeleccionado.anio}`;

  const today = new Date().toLocaleDateString("es-PE", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  /* ── LOGIN ─────────────────────────────────────── */
  if (!tutor) {
    return (
      <>
        <style>{styles}</style>
        <div className="login-root">
          {/* Left panel */}
          <div className="login-left">
            <div className="login-brand">
              <div className="login-brand-icon">🎓</div>
              <span className="login-brand-name">FriendTeacher</span>
            </div>
            <h1 className="login-headline">
              Tu trabajo,<br />tu <span>impacto</span>,<br />tu reporte.
            </h1>
            <p className="login-sub">
              Portal exclusivo para tutores. Accede a tus sesiones, horas registradas
              y estimados de pago en un solo lugar.
            </p>
            <div className="login-stats">
              <div>
                <span className="login-stat-val">100%</span>
                <span className="login-stat-lbl">Transparencia</span>
              </div>
              <div>
                <span className="login-stat-val">24/7</span>
                <span className="login-stat-lbl">Disponible</span>
              </div>
              <div>
                <span className="login-stat-val">S/</span>
                <span className="login-stat-lbl">Estimados reales</span>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="login-right">
            <div className="login-form-box">
              <h2 className="login-form-title">Bienvenido</h2>
              <p className="login-form-desc">Ingresa tu DNI o código para acceder a tu panel.</p>

              <label className="form-label">DNI o Código de tutor</label>
              <input
                className="form-input"
                type="text"
                placeholder="Ej: 12345678"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                onKeyDown={handleKey}
                autoFocus
              />

              <button className="btn-primary" onClick={login} disabled={loading}>
                {loading ? "Verificando..." : "Ver mis reportes →"}
              </button>

              {error && <div className="login-error">⚠ {error}</div>}
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ── DASHBOARD ─────────────────────────────────── */
  return (
    <>
      <style>{styles}</style>
      <div className="dash-root">

        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-brand">
            {LOGO_SRC
              ? <img src={LOGO_SRC} alt="Logo" className="topbar-logo" />
              : <div className="topbar-logo-fallback">🎓</div>
            }
            FriendTeacher
          </div>
          <div className="topbar-user">
            <span className="topbar-badge">TUTOR</span>
            <span className="topbar-name">{tutor.nombre}</span>
            <div className="topbar-avatar">{getInitials(tutor.nombre)}</div>
          </div>
        </header>

        <main className="dash-content">

          {/* Welcome */}
          <div className="dash-welcome">
            <h1>Hola, {getPrimerNombre(tutor.nombre)} 👋</h1>
            <p style={{ textTransform: "capitalize" }}>{today}</p>
          </div>

          {/* Tutor info */}
          <div className="tutor-info-bar">
            <div className="tutor-info-item">
              <strong>{tutor.dni}</strong>DNI
            </div>
            <div className="tutor-sep" />
            <div className="tutor-info-item">
              <strong>{tutor.nombreCompleto}</strong>Nombre completo
            </div>
          </div>

          {/* KPIs */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <span className="kpi-icon">📋</span>
              <span className="kpi-val">{resumen.totalReportes}</span>
              <span className="kpi-lbl">Total reportes</span>
            </div>
            <div className="kpi-card">
              <span className="kpi-icon">⏱</span>
              <span className="kpi-val">{resumen.totalHoras}</span>
              <span className="kpi-lbl">Horas registradas</span>
            </div>
            <div className="kpi-card">
              <span className="kpi-icon">🏫</span>
              <span className="kpi-val">{resumen.totalPresenciales}</span>
              <span className="kpi-lbl">Presenciales</span>
            </div>
            <div className="kpi-card">
              <span className="kpi-icon">💻</span>
              <span className="kpi-val">{resumen.totalVirtuales}</span>
              <span className="kpi-lbl">Virtuales</span>
            </div>
            <div className="kpi-card accent">
              <span className="kpi-icon">💰</span>
              <span className="kpi-val">S/ {resumen.estimadoTotal}</span>
              <span className="kpi-lbl">Estimado total</span>
            </div>
          </div>

          {/* Table */}
          <div className="section-header">
            <h2 className="section-title">Detalle de sesiones</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="section-count">{detalleFiltrado.length} registros</span>

              {/* Dropdown de mes */}
              <div className="month-filter-wrap">
                <button
                  className={`btn-month${dropdownOpen ? " active" : ""}`}
                  onClick={() => setDropdownOpen(o => !o)}
                >
                  📅 {nombreMesSeleccionado}
                  <span className="btn-month-arrow">▼</span>
                </button>
                {dropdownOpen && (
                  <div className="month-dropdown">
                    {getMesesDisponibles().map(({ anio, mes }) => {
                      const esSel = anio === mesSeleccionado.anio && mes === mesSeleccionado.mes;
                      const esFuturo = new Date(anio, mes - 1, 1) > new Date(hoy.getFullYear(), hoy.getMonth(), 1);
                      return (
                        <div
                          key={`${anio}-${mes}`}
                          className={`month-dropdown-item${esSel ? " selected" : ""}${esFuturo ? " disabled" : ""}`}
                          onClick={() => { if (!esFuturo) { setMesSeleccionado({ anio, mes }); setDropdownOpen(false); } }}
                        >
                          {MESES[mes - 1]} {anio}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Día</th>
                  <th>Alumno</th>
                  <th>Curso</th>
                  <th>Modalidad</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Horas</th>
                  <th>Precio/hr</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                {detalleFiltrado.length === 0 && (
                  <tr>
                    <td colSpan={10} style={{ textAlign: "center", padding: "40px 20px", color: "var(--gray-500)" }}>
                      📭 No hay reportes registrados para <strong>{nombreMesSeleccionado}</strong>
                    </td>
                  </tr>
                )}
                {detalleFiltrado.map((d, i) => {
                  const { fecha, dia } = formatFecha(d.FechaReporte);
                  return (
                    <tr key={i}>
                      <td>{fecha}</td>
                      <td style={{ color: "var(--blue-light)", fontWeight: 600 }}>{dia}</td>
                      <td style={{ fontWeight: 500 }}>{d.NombreAlumno}</td>
                      <td>{formatCurso(d.Curso)}</td>
                      <td>{modalidadBadge(d.Modalidad)}</td>
                      <td>{d.HoraInicio}</td>
                      <td>{d.HoraFin}</td>
                      <td style={{ textAlign: "center" }}>{formatHoras(d.DuracionHoras)}</td>
                      <td>S/ {d.Precio}</td>
                      <td className="monto-cell">S/ {d.MontoEstimado}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </>
  );
}
