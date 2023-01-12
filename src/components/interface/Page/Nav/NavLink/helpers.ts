/**
 * It returns true if the pathname contains the link or any of the sublinks
 * @param {string} [link] - string = '' - The link to check if it's active.
 * @param {string[]} subLinks - string[] = []
 * @param {string} pathName - The current pathname of the page.
 * @returns A boolean value
 */
export function isActiveLink(
  link: string = '',
  subLinks: string[] = [],
  pathName: string,
): boolean {
  return (
    (link && pathName.indexOf(link) !== -1) || subLinks?.some((l) => isActiveLink(l, [], pathName))
  );
}
