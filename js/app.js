function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // Execute scripts from the fetched HTML
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(data, 'text/html');
      const scripts = htmlDoc.querySelectorAll('script');

      scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
      });

      if (id === "sidebar") {
        activateSidebar();
      }
    });
}

loadComponent("nav", "components/navbar.html");
loadComponent("sidebar", "components/sidebar.html");

function activateSidebar() {

  const links = document.querySelectorAll("#content a");

  links.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();

      // change active
      links.forEach(l => l.classList.remove("active"));
      this.classList.add("active");

      // update navbar title
      document.getElementById("identity").textContent = this.textContent.trim();

      // load page into main
      const page = this.dataset.page;

      fetch(page)
        .then(res => res.text())
        .then(html => {
          document.getElementById("main").innerHTML = html;

          // Execute scripts from the loaded page
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(html, 'text/html');
          const scripts = htmlDoc.querySelectorAll('script');

          scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
              newScript.src = script.src;
            } else {
              newScript.textContent = script.textContent;
            }
            document.body.appendChild(newScript);
          });
        });
    });
  });

  // load default page (dashboard)
  const defaultPage = document.querySelector("#content a.active").dataset.page;

  fetch(defaultPage)
    .then(res => res.text())
    .then(html => {
      document.getElementById("main").innerHTML = html;

      // Execute scripts from the loaded page
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(html, 'text/html');
      const scripts = htmlDoc.querySelectorAll('script');

      scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
      });
    });
}

