jest.disableAutomock();

module.exports = {
  __esModule: true,
  ...jest.requireActual('typeorm'),
  getCustomRepository: jest.fn(),
};
