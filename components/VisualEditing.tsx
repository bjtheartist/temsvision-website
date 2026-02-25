import { useEffect, useState } from 'react';
import { enableVisualEditing } from '@sanity/visual-editing';

// Check if we're in an iframe (Sanity Studio Presentation tool)
const isInIframe = () => {
  if (typeof window === 'undefined') return false;
  return window.self !== window.top;
};

/**
 * Visual Editing component - enables click-to-edit overlays when viewed inside Sanity Studio
 */
export function VisualEditing() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const inIframe = isInIframe();
    setIsEnabled(inIframe);

    if (!inIframe) return;

    console.log('[VisualEditing] Enabling visual editing...');

    const cleanup = enableVisualEditing({
      studioUrl: 'http://localhost:3333',
      zIndex: 9999,
    });

    return () => cleanup();
  }, []);

  return null;
}

/**
 * Visual editing indicator - shows when in preview mode
 */
export function VisualEditingIndicator() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isInIframe());
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-2">
      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      Visual Editing Active
    </div>
  );
}
