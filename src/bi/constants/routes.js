const ROUTES = {
  UPLOAD: '/upload',
  UPLOADS: '/uploads',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  GET_AUTH_ME: '/auth/me',
  PUBLICATION: (id) => `/publications/${id}`,
  PUBLICATIONS: '/publications',
  TAGS: '/tags',
};

export { ROUTES };
