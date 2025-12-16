// login.html için
async function login() {
  const res = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    })
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    window.location.href = 'panel.html';
  } else {
    alert(data.error);
  }
}

async function register() {
  const res = await fetch('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    })
  });
  const data = await res.json();
  alert(data.message || data.error);
}

// panel.html için
async function loadContent() {
  const res = await fetch('/content/list', {
    headers: { 'Authorization': localStorage.getItem('token') }
  });
  const content = await res.json();
  const ul = document.getElementById('contentList');
  ul.innerHTML = '';
  content.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `ID:${item.id} - ${item.imageUrl} - ${item.number}`;
    ul.appendChild(li);
  });
}

async function updateContent() {
  const imageUrl = document.getElementById('imageUrl').value;
  const number = document.getElementById('number').value;
  const res = await fetch('/content/update', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify({ id: 1, imageUrl, number }) // örnek id
  });
  const data = await res.json();
  alert(data.message || data.error);
  loadContent();
}

// Panel açıldığında içerikleri yükle
if (document.getElementById('contentList')) {
  loadContent();
}

