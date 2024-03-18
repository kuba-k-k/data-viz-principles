function loadComponent(elementId, filePath, args) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      if (args) {
        Object.keys(args).forEach(key => {
          data = data.replace(new RegExp(`{{${key}}}`, 'g'), args[key]);
        });
      }
      document.getElementById(elementId).innerHTML = data;
    })
    .catch(error => console.error(error));
}
