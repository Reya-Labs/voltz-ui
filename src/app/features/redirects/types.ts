export type SliceState = {
  redirects: RedirectConfig[];
};

export type RedirectConfig = {
  path: string;
  redirectsTo: string;
};
