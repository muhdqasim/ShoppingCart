import React, { Component } from 'react';

/**
 * ErrorBoundary component
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate the error
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.error('Error caught by boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    // Render children normally if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
