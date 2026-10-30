import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('rt_vacations_balkan_data_v1');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#F5F5F2] font-sans">
          <div className="card-surface-static max-w-lg w-full p-8 bg-white text-[#051C2C] shadow-xl rounded-xl space-y-5">
            <div className="w-12 h-12 rounded-full bg-[rgba(211,47,47,0.1)] flex items-center justify-center text-[#D32F2F]">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-[#051C2C]">
                Application Encountered an Error
              </h1>
              <p className="text-xs text-[#888888] mt-1.5 leading-relaxed">
                A runtime exception occurred while loading financial data. You can inspect the diagnostic message below or reset the browser cache to return to the default Balkan operations dataset.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[rgba(211,47,47,0.05)] border border-[rgba(211,47,47,0.2)] text-xs font-mono text-[#D32F2F] overflow-x-auto">
              {this.state.error?.message || 'Unknown runtime error'}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] transition-colors"
              >
                Reload Page
              </button>
              <button
                onClick={this.handleReset}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#2251FF] hover:bg-[#1a41cc] shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Cache & Defaults</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
