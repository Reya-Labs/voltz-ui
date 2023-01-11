import { encodeSvg } from './encodeSvg';

describe('encodeSvg', () => {
  it('should encode a string of SVG markup', () => {
    const svgString =
      '<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>';
    const expectedEncodedString =
      "%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' stroke='green' stroke-width='4' fill='yellow' /%3E%3C/svg%3E";

    expect(encodeSvg(svgString)).toEqual(expectedEncodedString);
  });
});
