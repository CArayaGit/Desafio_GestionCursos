const express = require("express");
const { getCursos, postCurso, deleteCurso, editCurso } = require("./database/db");

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

/*
app.get("/", (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
});
*/

app.get("/cursos", async (req, res) => {
    const respuesta = await getCursos();
    return res.json(respuesta);
});

app.post("/curso", async (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const respuesta = await postCurso(nombre, nivelTecnico, fechaInicio, duracion);
    return res.status(201).json(respuesta);
});

app.put("/cursos/:id", async (req, res) => {
    const { id } = req.params;
    const result = await editCurso(id);

    if(result.length === 0){
        return res.status(404).json({msg: "ID no encontrado"});
    }
    return res.json(respuesta)
});


app.delete("/cursos/:id", async (req, res) => {
    const { id } = req.params;
    const result = await deleteCurso(id);

    if(result.length === 0){
        return res.status(404).json({msg: "ID no encontrado"});
    }
    return res.json(respuesta)
});


app.listen(3000, () => console.log('Servidor OK...'));