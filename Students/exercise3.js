var userGrid = document.getElementById("userGrid");
var viewToggleBtn = document.getElementById("viewToggleBtn");
var deleteInput = document.getElementById("deleteIdInput")
var deleteBtn = document.getElementById("deleteBtn");
var sortByGroupBtn = document.getElementById("sortByGroupBtn");
var sortByIdBtn = document.getElementById("sortByIdBtn");

var users = [];

retrieveData();

viewToggleBtn.addEventListener('click', (event) => {
    if (userGrid.classList.contains('grid-view')) {
        userGrid.classList.remove('grid-view');
        userGrid.classList.add('list-view');
    } else if (userGrid.classList.contains('list-view')) {
        userGrid.classList.remove('list-view');
        userGrid.classList.add('grid-view');
    }
});

sortByGroupBtn.addEventListener('click', () => {
    users.sort((a,b) => a.user_group - b.user_group);
    render(users);
});

sortByIdBtn.addEventListener('click', (event) => {
    users.sort((a,b) => a.id - b.id);
    render(users);
});

deleteBtn.addEventListener('click', async (event) => {
    var idToDelete = deleteInput.value;

    try {
        await fetch(`https://69a1e5762e82ee536fa284af.mockapi.io/users_api/${idToDelete}`, {method:'DELETE'});
        retrieveData();
    } catch (error) {
        console.log(error);
    }
});

async function retrieveData() {
    try {
        let res = await fetch('https://69a1e5762e82ee536fa284af.mockapi.io/users_api');
        users = await res.json();
        console.log(users);

        render(users);
    } catch (error) {
        console.log(error);
    }
}

function render(users) {
    if (users.length == 0){
    userGrid.innerHTML = 'No users to display.';
    return;
  }   

  userGrid.innerHTML = users.map(user =>
    `<article class="user-card">
      <h3>${user.first_name ?? ''}</h3>
      <p>first_name: ${user.first_name ?? ''}</p>
      <p>user_group: ${user.user_group ?? ''}</p>
      <p>id: ${user.id ?? ''}</p>
    </article>`).join('');
  }
