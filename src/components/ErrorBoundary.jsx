import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          textAlign: 'center',
          fontFamily: 'inherit'
        }}>
          <h2 style={{ fontSize: 24, margin: '0 0 12px' }}>Something went wrong</h2>
          <p style={{ maxWidth: 450, margin: '0 0 20px', color: '#888', fontSize: 13, lineHeight: 1.6 }}>
            An unexpected error occurred while loading this view. You can return to the home page or retry.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{
                padding: '9px 15px',
                border: '1px solid #242420',
                background: '#242420',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: 4,
                fontSize: 12
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                padding: '9px 15px',
                border: '1px solid var(--line, #deddd8)',
                background: 'transparent',
                color: 'inherit',
                cursor: 'pointer',
                borderRadius: 4,
                fontSize: 12,
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              Back to Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
