import { UserEdit } from "./views/UserEdit";
 import { User } from "./models/User";
 const user = User.buildUser({name: 'Name', age: 33})
 const root = document.getElementById("root");
 if(root){
const userEdit = new UserEdit(root, user);
 userEdit.render();
 console.log(userEdit)
 }
else{
  throw new Error('Root element not found'); 
}
 


/* import { User } from "./models/User"; 
const collection = User.buildUserCollection();
collection.on("change", () => {
  console.log(collection);
});
collection.fetch(); */
/* import { User } from "./models/User";
const user = User.buildUser({ id : 1, name: 'newname', age : 3333});
 

  user.on('change', () =>{
    console.log(user);
})   
console.log(user);
 user.fetch(); */
