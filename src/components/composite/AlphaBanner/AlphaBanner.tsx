import React, { useCallback, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@components/atomic';
import { colors } from '@theme';
import { SystemStyleObject, Theme } from '@mui/system';

const textStyles: SystemStyleObject<Theme> = {
  display:'inline-block', 
  marginRight: (theme) => theme.spacing(4), 
  textTransform: 'uppercase',
  fontWeight: 'bold', 
  fontSize: '14px',
  lineHeight: '24px',
}

const AlphaBanner = () => {
  const inner = useRef<HTMLElement>();
  const mounted = useRef(false);
  const refs = [
    useRef<HTMLElement>(),
    useRef<HTMLElement>(),
    useRef<HTMLElement>(),
    useRef<HTMLElement>()
  ];

  const start = useRef<number>();

  const step = useCallback((time: number) => {
    if (start.current === undefined) {
      start.current = time;
    }

    const elapsed = time - start.current;

    if(refs[0].current && inner.current) {
      const count = Math.min(0.06 * elapsed, refs[0].current?.clientWidth);
      inner.current.style.transform = `translateX(-${count}px)`;

      if (count === refs[0].current?.clientWidth) {
        inner.current.style.transform = 'translateX(0px)';
        start.current = time;
      }
    }

    if(mounted.current === true) {
      requestAnimationFrame(step);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    requestAnimationFrame(step);
    return () => {
      mounted.current = false;
    }
  }, [step])
  
  return (
    <Box aria-label="Voltz alpha - Currently in alpha launch. LP pools are capped." sx={{ 
      background: 'linear-gradient(90deg, #201B35 0%, #372D65 50.52%, #2F2A54 100%)',
      width: '100%',
      height: '24px',
      position: 'fixed',
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }}>
      <Box ref={inner} sx={{ whiteSpace: 'nowrap' }} aria-hidden>
        {(refs.map((ref, i) => (
          <Box ref={ref} sx={{ display: 'inline-block'}} key={i}>
            <Typography variant='body2' sx={{ ...textStyles, color: colors.wildStrawberry.base }}>
              Voltz alpha
            </Typography>
            <Typography variant='body2' sx={{ ...textStyles, color: colors.ultramarineBlue.base }}>
              Voltz alpha
            </Typography>
            <Typography variant='body2' sx={{ ...textStyles, color: colors.skyBlueCrayola.base }}>
              Currently in alpha launch. LP pools are capped
            </Typography>
            <Typography variant='body2' sx={{ ...textStyles, color: colors.wildStrawberry.base }}>
              Voltz alpha
            </Typography>
            <Typography variant='body2' sx={{ ...textStyles, color: colors.ultramarineBlue.base }}>
              Voltz alpha
            </Typography>
            <Typography variant='body2' sx={{ ...textStyles, color: colors.skyBlueCrayola.base }}>
              Voltz alpha
            </Typography>
            <Typography variant='body2' sx={{ ...textStyles, color: colors.wildStrawberry.base }}>
              Currently in alpha launch. LP pools are capped
            </Typography>
            <Typography variant='body2' sx={{ ...textStyles, color: colors.ultramarineBlue.base }}>
              Voltz alpha
            </Typography>
            <Typography variant='body2' sx={{ ...textStyles, color: colors.skyBlueCrayola.base }}>
              Voltz alpha
            </Typography>
            <Typography variant='body2' sx={{ ...textStyles, color: colors.wildStrawberry.base }}>
              Voltz alpha
            </Typography>
            <Typography variant='body2' sx={{ ...textStyles, color: colors.ultramarineBlue.base }}>
              Currently in alpha launch. LP pools are capped
            </Typography>
            <Typography variant='body2' sx={{ ...textStyles, color: colors.skyBlueCrayola.base }}>
              Voltz alpha
            </Typography>
          </Box>
        )))}

      </Box>
    </Box>
  );
};

export default AlphaBanner;