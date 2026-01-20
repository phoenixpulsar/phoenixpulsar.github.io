import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function RedactionWrapper({ children }) {
  const [isUnredacted, setIsUnredacted] = useState(false);
  const [isResumePage, setIsResumePage] = useState(false);
  const { siteConfig } = useDocusaurusContext();
  const isBrowser = useIsBrowser();

  useEffect(() => {
    if (!isBrowser) return;
    
    const onResumePage = window.location.pathname === '/resume' || window.location.pathname === '/resume/';
    setIsResumePage(onResumePage);
    
    if (!onResumePage) return;
    
    const stored = localStorage.getItem('resume-unredacted') === 'true';
    setIsUnredacted(stored);
    
    if (!stored) {
      const redactableElements = document.querySelectorAll('[data-redact]');
      redactableElements.forEach(element => {
        const originalText = element.textContent;
        element.textContent = '[REDACTED]';
        element.style.color = '#666';
        element.style.fontStyle = 'italic';
        element.style.backgroundColor = '#f0f0f0';
        element.style.padding = '2px 4px';
        element.style.borderRadius = '3px';
        element.setAttribute('data-original-text', originalText);
      });
    }
  }, [isBrowser]);

  const toggleRedaction = () => {
    const newState = !isUnredacted;
    localStorage.setItem('resume-unredacted', newState.toString());
    setIsUnredacted(newState);
    window.location.reload();
  };

  if (!isResumePage) {
    return <>{children}</>;
  }

  return (
    <>
      <button
        onClick={toggleRedaction}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '10px 15px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        {isUnredacted ? 'Hide Sensitive Info' : 'Show Sensitive Info'}
      </button>
      {children}
    </>
  );
}
