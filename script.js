const liInstall = document.getElementById("install-container");
const buttonInstall = document.getElementById("install-button");

/* Only register a service worker if it's supported */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}


window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event);

  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;

  // Remove the 'hidden' class from the install button container.
  liInstall.classList.toggle('hidden', false);
});

buttonInstall.addEventListener('click', async () => {
  console.log('👍', 'butInstall-clicked');

  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }

  // Show the install prompt.
  promptEvent.prompt();

  // Log the result
  const result = await promptEvent.userChoice;
  console.log('👍', 'userChoice', result);

  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;

  // Hide the install button.
  liInstall.classList.toggle('hidden', true);
});