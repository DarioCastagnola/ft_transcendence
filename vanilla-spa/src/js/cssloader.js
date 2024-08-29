// CSS files for different views
const cssFiles = {
    home: '../css/home.css',
    about: '../css/about.css',
    contact: '../css/contact.css'
  };
  
  // Function to load CSS file
  function loadCSS(filename) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = filename;
    document.head.appendChild(link);
  }
  
  // Function to unload CSS file
  function unloadCSS(filename) {
    const links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
      if (links[i].href.includes(filename)) {
        links[i].parentNode.removeChild(links[i]);
        break;
      }
    }
  }
  
  // Function to change view
  function changeView(view) {
    // Unload current CSS
    Object.values(cssFiles).forEach(unloadCSS);
    
    // Load new CSS
    if (cssFiles[view]) {
      loadCSS(cssFiles[view]);
    }
    
    // Update content (you would implement this based on your SPA structure)
    document.getElementById('content').innerHTML = `<h1>${view.charAt(0).toUpperCase() + view.slice(1)} Page</h1>`;
  }

  // Example usage
// document.getElementById('homeLink').addEventListener('click', () => changeView('home'));
// document.getElementById('aboutLink').addEventListener('click', () => changeView('about'));
// document.getElementById('contactLink').addEventListener('click', () => changeView('contact'));