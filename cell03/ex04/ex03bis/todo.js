// --- Cookie helpers (unchanged) ---
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  document.cookie = name + "=" + encodeURIComponent(value)
                  + ";expires=" + d.toUTCString() + ";path=/";
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

$(function() {
  const $listEl = $('#ft_list');
  const $newBtn  = $('#newBtn');
  let todos = [];

  // render todos (newest first)
  function render() {
    $listEl.empty();
    for (let i = todos.length - 1; i >= 0; i--) {
      // create a div.todo
      const $div = $('<div/>', {
        'class': 'todo',
        text: todos[i]
      });
      // bind click-to-remove
      $div.on('click', (function(index) {
        return function() {
          if (confirm('Do you want to remove this to do?')) {
            todos.splice(index, 1);
            saveAndRender();
          }
        };
      })(i));
      $listEl.append($div);
    }
  }

  // save to cookie and rerender
  function saveAndRender() {
    setCookie('ft_todos', JSON.stringify(todos), 365);
    render();
  }

  // “New” button handler
  $newBtn.on('click', function() {
    const txt = prompt('Enter a new to-do:');
    if (txt && txt.trim() !== '') {
      todos.push(txt.trim());
      saveAndRender();
    }
  });

  // load todos on startup
  const saved = getCookie('ft_todos');
  if (saved) {
    try { todos = JSON.parse(saved) } catch(e) { todos = [] }
  }
  render();
});
