    // --- Cookie helpers ---
    function setCookie(name, value, days) {
      const d = new Date();
      d.setTime(d.getTime() + (days*24*60*60*1000));
      document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/";
    }
    function getCookie(name) {
      const cookies = document.cookie.split(';').map(c => c.trim());
      for (let c of cookies) {
        if (c.startsWith(name + '=')) {
          return decodeURIComponent(c.substring(name.length+1));
        }
      }
      return null;
    }

    // --- Main logic ---
    const listEl = document.getElementById('ft_list');
    const newBtn = document.getElementById('newBtn');
    let todos = [];

    // Render todos array into the DOM (reverse order: latest on top)
    function render() {
      listEl.innerHTML = '';
      // newest first
      for (let i = todos.length - 1; i >= 0; i--) {
        const div = document.createElement('div');
        div.className = 'todo';
        div.textContent = todos[i];
        // click-to-remove
        div.addEventListener('click', () => {
          if (confirm('Do you want to remove this to do?')) {
            todos.splice(i, 1);
            saveAndRender();
          }
        });
        listEl.appendChild(div);
      }
    }

    // Persist to cookie and re-render
    function saveAndRender() {
      setCookie('ft_todos', JSON.stringify(todos), 365);
      render();
    }

    // New to-do button
    newBtn.addEventListener('click', () => {
      const txt = prompt('Enter a new to-do:');
      if (txt && txt.trim() !== '') {
        todos.push(txt.trim());
        saveAndRender();
      }
    });

    // Load from cookie on startup
    window.addEventListener('DOMContentLoaded', () => {
      const saved = getCookie('ft_todos');
      if (saved) {
        try {
          todos = JSON.parse(saved);
        } catch (e) {
          todos = [];
        }
      }
      render();
    });