export function useFakeAuthActions(loginFn: () => void) {
    const fake = () =>
      new Promise<void>((resolve) =>
        setTimeout(() => {
          loginFn();
          resolve();
        }, 500)
      );
    return {
      signUp: fake,
      signInWithGoogle: fake,
    };
  }
  