import React from 'react';

class ThreeJSErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Catch any Three.js related errors
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Three.js rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <figure
          className="absolute inset-0 flex items-center justify-center"
          style={{ width: "100vw", height: "100vh" }}
        >
          <div className="text-center opacity-20">
            <div className="text-6xl mb-4">🚀</div>
            <p className="text-sm text-white-600">
              3D graphics unavailable
            </p>
          </div>
        </figure>
      );
    }

    return this.props.children;
  }
}

export default ThreeJSErrorBoundary;
