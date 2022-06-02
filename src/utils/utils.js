export const renderLoading = (isLoading, text, popup) => {
  if (isLoading) {
    popup._submitButton.textContent = text;
  } else {
    popup._submitButton.textContent = popup._originalSubmitText;
  }
}