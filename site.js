const topButton = document.querySelector('.scroll-to-top');
function updateTopButton() { topButton.classList.toggle('visible', window.scrollY > 300); }
window.addEventListener('scroll', updateTopButton, { passive: true });
updateTopButton();
topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }));
const copyButton = document.querySelector('.copy-bibtex-btn');
copyButton.addEventListener('click', async () => {
  const text = document.querySelector('#bibtex-code').textContent;
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
    else {
      const field = document.createElement('textarea'); field.value = text;
      field.style.position = 'fixed'; field.style.opacity = '0'; document.body.append(field);
      field.select(); const copied = document.execCommand('copy'); field.remove();
      if (!copied) throw new Error('Copy unavailable');
    }
    copyButton.querySelector('.copy-text').textContent = 'Copied!';
  } catch { copyButton.querySelector('.copy-text').textContent = 'Select text to copy'; }
  setTimeout(() => { copyButton.querySelector('.copy-text').textContent = 'Copy'; }, 2500);
});
