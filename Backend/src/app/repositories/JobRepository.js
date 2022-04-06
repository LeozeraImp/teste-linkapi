const db = require("../../database")

class JobRepository{
    async create({
        name,userID,status,recurrence,recurrenceValue,interval,fixedSchedule
    }){
        const [row] = await db.query(`
            INSERT INTO jobs(name, status, recurrence, recurrence_value, created_at,interval, fixed_schedule,user_id)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *; `, [name, status, recurrence, recurrenceValue, new Date(), interval, fixedSchedule, userID]);
            return row
    }

    async findAll(orderBy = "ASC", filter = "name", limit = 20 , offset = 0){
        const direction = orderBy.toUpperCase() === "DESC"? "DESC":"ASC"
        const filterItem = filter === "createdAT"? "created_at": "name"
        const rows = await db.query(`
        SELECT jobs.*, users.name AS user_name
        FROM jobs
        LEFT JOIN users ON users.id = jobs.user_id
        ORDER BY ${filterItem} ${direction} LIMIT ${limit} OFFSET ${offset};
        `
        )
        return rows
    }

    async findById(id){
        const [row] = await db.query(`
        SELECT jobs.*, users.name AS user_name
        FROM jobs
        LEFT JOIN users ON users.id = jobs.user_id
        WHERE jobs.id = $1;
        `,[id]
        )
        return row
    }


    async update(id, {name,user_id,status,recurrence,recurrence_value,interval,fixed_schedule}){
        const [row] = await db.query(`
        UPDATE jobs SET name = $1, status = $2, recurrence = $3, recurrence_value = $4, interval = $5, fixed_schedule = $6, user_id = $7 WHERE id = $8 RETURNING *`,
        [name, status, recurrence, recurrence_value, interval, fixed_schedule, user_id, id]
        )
        return row
    }

    async delete(id) {
        const deleteOp = await db.query("DELETE FROM jobs WHERE id = $1",[id])
        return deleteOp
    }

}

module.exports = new JobRepository();

