const express = require("express");
const app = express();
app.use(express.json());

const users = []; 
const checkUserId = (request,response,next) => {
    const userIndex = users.findIndex((user)=> {
        if(user.id === parseInt(request.params.id)) return user;
    });
    if(userIndex < 0) {
        return response.status(404).send("<p>Erro 404 - Usuário não encontrado</p>");
    }else {
        request.userIndex = userIndex;
        next();
    }
};
app.get("/users", (request, response) => {
    return response.json(users);
});
app.get("/users/:id",checkUserId, (request, response) => {
    response.json(users[request.userIndex]);
});
app.post("/users", (request, response)=> {
    const id = customRand(100,0);
    const nome = request.body.nome;
    const idade = request.body.idade;
    const user = {id,nome,idade};
    users.push(user);
    return response.status(201).json(user);
});
app.put("/users/:id",checkUserId, (request, response) => {
    const user = users[request.userIndex];
    user.nome = request.body.nome;
    user.idade = request.body.idade;
    return response.json(user);
});
app.delete("/users/:id",checkUserId, (request,response)=> {
    const userIndex = request.userIndex;
    const delConfirm = {
        Mensagem: "Usuário deletado com sucesso",
        User: users[userIndex]
    }
    users.splice(userIndex,1);
    return response.status(200).json(delConfirm);
});
app.listen(3000, ()=> {
    console.log("🤫🧏");
});
function customRand(max, min) {
    return Math.floor(Math.random() * (max - min));
}