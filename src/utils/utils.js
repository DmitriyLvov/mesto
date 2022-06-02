export const renderLoading = (popup, isLoading, text) => {
  if (isLoading) {
    popup._submitButton.textContent = text;
  } else {
    popup._submitButton.textContent = popup._originalSubmitText;
  }
}