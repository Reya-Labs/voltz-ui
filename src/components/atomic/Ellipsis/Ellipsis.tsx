import React, { useCallback, useEffect, useRef, useState } from 'react';

const Ellipsis = () => {
  const frame = useRef(1);
  const loop = useRef<number>();
  const [text, setText] = useState('.  ');

  const updateText = useCallback(() => {
    switch (frame.current) {
      case 0: {
        setText('.  ');
        break;
      }
      case 1: {
        setText('.. ');
        break;
      }
      case 2: {
        setText('...');
      }
    }

    if (frame.current === 2) {
      frame.current = 0;
    } else {
      frame.current += 1;
    }
  }, []);

  useEffect(() => {
    loop.current = window.setInterval(updateText, 300);

    return () => {
      window.clearInterval(loop.current);
    };
  }, [updateText]);

  return <span style={{ whiteSpace: 'pre' }}>{text}</span>;
};

export default Ellipsis;
