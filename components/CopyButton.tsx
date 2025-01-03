'use client';

import { useEffect, useState } from 'react';
import { FaLink } from 'react-icons/fa6';

export default function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  }

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isCopied]);

  return (
    <button onClick={copy} className="btn">
      {!isCopied ? (
        <>
          <FaLink className="size-4" /> URL をコピー
        </>
      ) : (
        'コピーしました'
      )}
    </button>
  );
}
