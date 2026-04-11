window.addEventListener('DOMContentLoaded', () => {
  if (typeof ParticleSystem !== 'undefined' && document.getElementById('particleCanvas')) {
    window._ps = new ParticleSystem('particleCanvas', 'calm');
  }
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 50);
});

async function submitFormJson(e, endpoint, buildPayload) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const ogText = btn ? btn.textContent : '';
  if (btn) {
    btn.textContent = 'Submitting…';
    btn.disabled = true;
  }

  let payload;
  try {
    payload = buildPayload ? buildPayload(form) : umsFormToObject(form);
  } catch (err) {
    showToast(err.message || 'Invalid form', '⚠');
    if (btn) {
      btn.textContent = ogText;
      btn.disabled = false;
    }
    return;
  }

  try {
    const base = typeof getApiBase === 'function' ? getApiBase() : '';
    const res = await fetch(`${base}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const t = await res.text();
      let msg = t || 'Request failed';
      try {
        const j = JSON.parse(t);
        if (j.error) msg = j.error;
        else if (j.message) msg = j.message;
      } catch (ignore) { /* plain text body */ }
      throw new Error(msg);
    }
    showToast('Saved successfully.', '✓');
    form.reset();
    if (typeof window.onAfterSubmit === 'function') window.onAfterSubmit(endpoint);
  } catch (err) {
    showToast(err.message || 'Submission failed', '⚠');
  } finally {
    if (btn) {
      btn.textContent = ogText;
      btn.disabled = false;
    }
  }
}

function umsFormToObject(form) {
  const data = {};
  form.querySelectorAll('input, select, textarea').forEach((input) => {
    if (!input.name || input.disabled) return;
    if (input.value === '') return;
    if (input.type === 'number') {
      data[input.name] = Number(input.value);
    } else {
      data[input.name] = input.value;
    }
  });
  return data;
}

async function umsLoadTable(endpoint, tbodyId, rowMapper) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="99">Loading…</td></tr>';
  try {
    const base = typeof getApiBase === 'function' ? getApiBase() : '';
    const res = await fetch(`${base}${endpoint}`);
    if (!res.ok) throw new Error('Failed to load');
    const rows = await res.json();
    tbody.innerHTML = '';
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="99">No records.</td></tr>';
      return;
    }
    rows.forEach((item) => {
      const tr = document.createElement('tr');
      tr.innerHTML = rowMapper(item);
      tbody.appendChild(tr);
    });
  } catch (e) {
    tbody.innerHTML = '<tr><td colspan="99">Could not load data.</td></tr>';
    showToast(e.message, '⚠');
  }
}

function showToast(msg, icon) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  const iconEl = document.getElementById('toastIcon');
  if (!toast || !msgEl) return;
  if (iconEl) iconEl.textContent = icon || '✓';
  msgEl.textContent = msg;
  toast.style.display = 'flex';
  toast.style.opacity = '1';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 300);
  }, 2800);
}
