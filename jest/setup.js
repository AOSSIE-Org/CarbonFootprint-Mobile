jest.mock('react-native-google-sign-in', () => {
  return {
    configure: jest.fn(),
    signInPromise: jest.fn()
  }
});

jest.mock('react-native-simple-toast', () => {
  return {
    show: jest.fn()
  }
});

jest.mock('react-native-activity-recognition', () => {
  return {
    subscribe: jest.fn(),
    start: jest.fn(),
    stop: jest.fn()
  }
});

jest.mock('react-native-background-timer', () => {
  return {
    setInterval: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    clearTimeout: jest.fn()
  }
});

jest.mock('realm', () => {
  return {};
});