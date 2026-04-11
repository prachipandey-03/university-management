/**
 * Require login for app pages (set by auth.js after successful API login).
 */
(function () {
  const path = window.location.pathname || '';
  const file = path.split('/').pop() || '';
  const exempt = ['index.html', '', 'auth.html'];
  if (exempt.includes(file) || file === 'ums' || path.endsWith('/')) {
    return;
  }
  try {
    if (!sessionStorage.getItem('ums_authenticated')) {
      window.location.replace('auth.html');
    }
  } catch (e) {
    /* storage blocked — allow page */
  }
})();
