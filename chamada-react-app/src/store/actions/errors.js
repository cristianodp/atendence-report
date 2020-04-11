// #region CREATE_ERROR_MESSAGE
export const CREATE_ERROR_MESSAGE = "CREATE_ERROR_MESSAGE";

export const createErrorMessage = error => {
  return {
    type: CREATE_ERROR_MESSAGE,
    error
  };
};

export const handleCreateErrorMessage = (error) => {
  return dispatch => {
    dispatch(createErrorMessage(error));
  }
}
// #endregion CREATE_ERROR_MESSAGE
