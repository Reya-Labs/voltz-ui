import React from 'react';
import { NeonBox1, NeonBox2 } from './Neons.styled';

export const Neons: React.FunctionComponent = React.memo(() => {
    return (
        <>
            <NeonBox1 />
            <NeonBox2 />
        </>
    );
});
