// we can just import our css file here (in our application entry point) and webpack will havndle its bundling too since we have configured webpack to handle css
import './index.css';
import {getUsers, deleteUser} from "./api/userApi";

// populate table of users via api call (sort of a low level way to do this, but we dont have an mvvm library we are using here)
getUsers().then(result => {

  let usersBody = "";

  result.forEach(user => {
    usersBody += `<tr>
      <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
    </tr>`
  });

  global.document.getElementById("users").innerHTML = usersBody;

  const deleteLinks = global.document.getElementsByClassName("deleteUser");

  // Must use Array.from to create a real array from a DOM collection
  // getElementsByClassName only returns an "array-like" object
  Array.from(deleteLinks, link => {
    link.onclick = function(event) {
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });

});
