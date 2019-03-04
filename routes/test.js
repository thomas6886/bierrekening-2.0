

gebruikers = [{id:1, name:"hop" },{id:2, name:"michael" },{id:3, name:"shannon" }];
rows = [{id:1, aantal:5 },{id:2, aantal:3 },{id:1, aantal:5 },{id:3, aantal:5 },{id:1, aantal:5 }];



function join(users,data){
for (i = 0; i < data.length; i++) {
    user_id = data[i].id;
    data[i].id = users[user_id - 1].name;
}
return data
}




console.log(join(gebruikers,rows));
