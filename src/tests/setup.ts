// Mock global para @paralleldrive/cuid2
jest.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'test-cuid-' + Math.random().toString(36).substr(2, 9),
  init: () => () => 'test-cuid-' + Math.random().toString(36).substr(2, 9),
  isCuid: (id: string) => typeof id === 'string',
  getConstants: () => ({})
}));
