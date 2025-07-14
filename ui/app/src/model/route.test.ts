

import { AdminRoute, extractBasePathName } from './route';

describe('extractBasePathName', () => {
  const testSuite = [
    {
      title: 'empty base path',
      path: '/',
      expectedBasePath: '',
    },
    {
      title: 'empty base path with prefix',
      path: '/foo',
      expectedBasePath: '/foo',
    },
    {
      title: 'regular path with no prefix',
      path: AdminRoute,
      expectedBasePath: '',
    },
    {
      title: 'regular admin path for datasources',
      path: '/admin/datasources',
      expectedBasePath: '',
    },
    {
      title: 'regular path with prefix',
      path: `/foo${AdminRoute}`,
      expectedBasePath: '/foo',
    },
    {
      title: 'regular dashboard path with no prefix',
      path: '/projects/perses/dashboards/dashboardA',
      expectedBasePath: '',
    },
    {
      title: 'regular dashboard path with prefix',
      path: '/foo/projects/perses/dashboards/dashboardA',
      expectedBasePath: '/foo',
    },
  ];
  testSuite.forEach(({ title, path, expectedBasePath }) => {
    it(title, () => {
      expect(extractBasePathName(path)).toEqual(expectedBasePath);
    });
  });
});
