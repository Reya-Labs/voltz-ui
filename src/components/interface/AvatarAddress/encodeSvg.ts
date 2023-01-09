/* Encoding the SVG string so that it can be used in a URL. */
/**
 * It takes a string of SVG markup and returns a string of HTML markup
 * @param {string} svgString - The SVG string to encode.
 */
export function encodeSvg(svgString: string): string {
  return svgString
    .replace(
      '<svg',
      ~svgString.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"',
    )
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/\s+/g, ' ');
}
