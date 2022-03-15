const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cursos',
    password: 'controlactivo',
    port: 5432,
    max: 20,
    min: 0,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
});

module.exports.getCursos = async () => {
    const client = await pool.connect();
    const query = {
        text: "SELECT * FROM cursos *",
    };

    try{
        const result = await client.query(query);
        console.log(result.rows);
        return {
            ok: true,
            data: result.rows
        }
    } catch(error) {
        console.log(error);
        return {
            ok: false,
            data: 'Error de solicitud.'
        }
    } finally {
        client.release();
    }
};

module.exports.postCurso = async () => {
    const client = await pool.connect();
    const query = {
        text: "INSERT INTO cursos (nombre, nivel, fecha, duracion) VALUES ($1, $2, $3, $4) RETURNING *",
        values: [nombre, nivel, fecha, duracion]
    }

    try{
        const result = await client.query(query);
        console.log(result.rows);
        return result.rows;
    } catch(error) {
        console.log(error);
        return{
            ok: false,
            data: 'Error de POST.'
        }
    } finally {
        client.release()
    }
};

module.exports.editCurso = async (id) => {
    const client = await pool.connect();
    const query = {
        text: "UPDATE cursos SET nombre = $1 , nivel = $2, fecha = $3, duracion = $4 Where id = $5 RETURNING *",
        values: [nombre, nivel, fecha, duracion, id]
    }

    try {
        const result = await client.query(query);
        console.log(result.rows);
        return result.rows;
    } catch(error) {
        console.log(error);
        return{
            ok: false,
            data: 'Error al editar'
        }
    } finally {
        client.release();
    }
};

module.exports.deleteCurso = async (id) => {
    const client = await pool.connect();
    const query = {
        text: "DELETE FROM cursos WHERE id = $1 RETURNING *",
        values: [id]
    }

    try {
        const result = await client.query(query);
        console.log(result.rows);
        return result.rows;
    } catch(error) {
        console.log(error);
        return{
            ok: false,
            data: 'Error al eliminar.'
        }
    } finally {
        client.release();
    }
};

