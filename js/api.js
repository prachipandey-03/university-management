function getApiBase() {
  return window.location.protocol === 'file:' ? 'http://localhost:8080' : '';
}
