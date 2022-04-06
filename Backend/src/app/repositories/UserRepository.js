const db = require("../../database")

class UserRepository{
    async create({
        name,email,pass,tel
    }){
        const [row] = await db.query(`
            INSERT INTO users(name, email, pass, tel, created_at)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *; `, [name, email, pass, tel, new Date()]);
            return row
    }

    async findAll(orderBy = "ASC", filter = "name", limit = 20 , offset = 0){
        const direction = orderBy.toUpperCase() === "DESC"? "DESC":"ASC"
        const filterItem = filter === "createdAT"? "created_at": "name"
        const rows = await db.query(`
        SELECT * FROM users ORDER BY ${filterItem} ${direction} LIMIT ${limit} OFFSET ${offset};
        `
        )
        return rows
    }

    async findById(id){
        const [row] = await db.query(`
        SELECT * FROM users  WHERE id = $1;
        `,[id]
        )
        return row
    }

    async findByEmail(email){
        const [row] = await db.query(`
        SELECT * FROM users  WHERE email = $1;
        `,[email]
        )
        return row
    }

    async update(id, {name, email, pass, tel}){
        const [row] = await db.query(`
        UPDATE users SET name = $1, email = $2, pass = $3, tel = $4 WHERE id = $5 RETURNING *`,
        [name, email, pass, tel, id]
        )
        return row
    }

    async delete(id) {
        const deleteOp = await db.query("DELETE FROM users WHERE id = $1",[id])
        return deleteOp
    }

}

module.exports = new UserRepository();

