jest.mock('react-native-google-sign-in', () => {
    return {
      configure: jest.fn(),
      signInPromise: jest.fn()
    }
});