//import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  appShell: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f4f7fb',
    color: '#1f2937',
    fontFamily: 'Inter, "Segoe UI", sans-serif',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #dfe6ee',
    padding: '24px 18px',
    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '32px',
    padding: '8px 10px',
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#1f2937',
  },
  brandMark: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #2f5df6, #6a8dff)',
    color: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: 700,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '10px',
    color: '#475569',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'all 0.2s ease',
  },
  navLinkActive: {
    backgroundColor: '#edf3ff',
    color: '#1f3fbf',
    boxShadow: 'inset 0 0 0 1px rgba(47, 93, 246, 0.08)',
  },
  mainArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 28px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #dfe6ee',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#1f2937',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userBadge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#edf2f9',
    color: '#2f5df6',
    fontWeight: 700,
  },
  content: {
    padding: '28px',
    flex: 1,
  },
  contentCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e6edf5',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)',
  },
};

function MainLayout({ children }) {
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Users', to: '/users' },
    { label: 'Products', to: '/products' },
  ];

  return (
    <div style={styles.appShell}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <span style={styles.brandMark}>R</span>
          <span>Restaurant</span>
        </div>

        <nav style={styles.nav} aria-label="Sidebar navigation">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              style={styles.navLink}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div style={styles.mainArea}>
        <header style={styles.header}>
          <h1 style={styles.title}>Dashboard</h1>

          <div style={styles.headerActions}>
            <div style={styles.userBadge}>AD</div>
          </div>
        </header>

        <main style={styles.content}>
          <div style={styles.contentCard}>{children}</div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
