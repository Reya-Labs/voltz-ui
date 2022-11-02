import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

const bang = keyframes`
  from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

export const Container = styled('div')`
  position: relative;

  & i {
    position: absolute;
    display: block;
    left: 50%;
    top: 50%;
    width: 5px;
    height: 7px;
    opacity: 0;
  }
  i:nth-of-type(1) {
    transform: translate3d(-82px, 60px, 0) rotate(297deg);
    background: #8000ff;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(2) {
    transform: translate3d(-67px, -49px, 0) rotate(64deg);
    background: #ffae00;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(3) {
    transform: translate3d(-89px, 30px, 0) rotate(45deg);
    background: #ff2600;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(4) {
    transform: translate3d(-8px, 7px, 0) rotate(245deg);
    background: #77ff00;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(5) {
    transform: translate3d(-33px, 28px, 0) rotate(208deg);
    background: #00ff44;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(6) {
    transform: translate3d(-6px, 12px, 0) rotate(357deg);
    background: #ff0044;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(7) {
    transform: translate3d(59px, 55px, 0) rotate(180deg);
    background: #0059ff;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(8) {
    transform: translate3d(-76px, -42px, 0) rotate(272deg);
    background: #0033ff;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(9) {
    transform: translate3d(48px, -11px, 0) rotate(272deg);
    background: #00ff40;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(10) {
    transform: translate3d(-53px, 7px, 0) rotate(103deg);
    background: #00fff7;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(11) {
    transform: translate3d(27px, -17px, 0) rotate(148deg);
    background: #f700ff;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(12) {
    transform: translate3d(34px, -34px, 0) rotate(247deg);
    background: #ffa200;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(13) {
    transform: translate3d(-71px, -26px, 0) rotate(308deg);
    background: #91ff00;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(14) {
    transform: translate3d(-65px, 39px, 0) rotate(85deg);
    background: #00ff59;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(15) {
    transform: translate3d(-77px, -36px, 0) rotate(153deg);
    background: #7700ff;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(16) {
    transform: translate3d(-18px, 12px, 0) rotate(256deg);
    background: #ffea00;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(17) {
    transform: translate3d(-82px, -8px, 0) rotate(353deg);
    background: #ff0040;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(18) {
    transform: translate3d(-34px, -40px, 0) rotate(181deg);
    background: #ff004d;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(19) {
    transform: translate3d(32px, -48px, 0) rotate(77deg);
    background: #ff008c;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
  i:nth-of-type(20) {
    transform: translate3d(85px, -42px, 0) rotate(344deg);
    background: #ff006a;
    animation: ${bang} 700ms ease-out forwards;
    opacity: 0;
  }
`;
