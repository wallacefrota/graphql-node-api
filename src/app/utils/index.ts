export const errorHandle = (error: Error) => {
  let errorMessage: string = `${error.name}: ${error.message}`;

  return Promise.reject(new Error(errorMessage));
};
