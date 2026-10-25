import React from 'react';

class ChunkLoadErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Check if this is a chunk loading error
    if (
      error.name === 'ChunkLoadError' || 
      error.message?.includes('Failed to fetch dynamically imported module') ||
      error.message?.includes('Importing a module script failed')
    ) {
      return { hasError: true, error };
    }
    return null;
  }

  componentDidCatch(error, errorInfo) {
    // Log chunk loading errors
    if (
      error.name === 'ChunkLoadError' || 
      error.message?.includes('Failed to fetch dynamically imported module') ||
      error.message?.includes('Importing a module script failed')
    ) {
      console.error('Chunk loading failed:', error, errorInfo);
      
      // Attempt to reload the page once automatically
      if (!sessionStorage.getItem('chunk-reload-attempted')) {
        sessionStorage.setItem('chunk-reload-attempted', 'true');
        console.log('Attempting automatic reload...');
        window.location.reload();
      }
    }
  }

  handleManualReload = () => {
    // Clear the reload flag and reload
    sessionStorage.removeItem('chunk-reload-attempted');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-black-100">
          <div className="text-center p-8 max-w-md">
            <div className="mb-6">
              <svg 
                className="w-16 h-16 mx-auto text-red-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Something went wrong
            </h2>
            <p className="text-white-600 mb-6">
              We encountered an error while loading this section. This might be due to a network issue or an outdated cache.
            </p>
            <button
              onClick={this.handleManualReload}
              className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChunkLoadErrorBoundary;
