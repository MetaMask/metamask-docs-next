import { proxy } from 'valtio';

import { useEffect } from 'react';

export const searchState = proxy({ isCmdOpen: false, query: '' });

export function useCmd() {
  useEffect(() => {
    const handleKeyDown = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === 'k' && (keyEvent.metaKey || keyEvent.ctrlKey)) {
        keyEvent.preventDefault();
        searchState.isCmdOpen = !searchState.isCmdOpen;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
