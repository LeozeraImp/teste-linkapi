
const JobRepository = require("../repositories/JobRepository")

class JobController {
    async index(req, res){
        const {orderBy, filter, limit, offset} = req.query
        const jobs = await JobRepository.findAll(orderBy, filter, limit, offset)
        res.json(jobs)
    }

    async store(req, res) {
        const { name,userID,status,recurrence,recurrenceValue,interval,fixedSchedule} = req.body
        if (!name || !userID || status === null || !recurrence || !recurrenceValue){
            return res.status(400).json({  error: "Dados do Job inválidos!!!"})
        }
        const user = await JobRepository.create({ name,userID,status,recurrence,recurrenceValue,interval,fixedSchedule})
        return res.json(user)
    }

    async show(req, res) {
        const {id} = req.params
        const job = await JobRepository.findById(id)

        if (!job){
            return res.status(400).json({  error: "Job não encontrado!!"})
        }
        return res.json(job)
    }

    async update(req, res) {
        const {id} = req.params
        const { name,user_id,status,recurrence,recurrence_value,interval,fixed_schedule} = req.body
        const jobExist = await JobRepository.findById(id)

        if (!jobExist) return res.status(400).json({  error: "ID não encontrado!"})
        
        if (!name || !user_id || status === null || !recurrence || !recurrence_value){
            return res.status(400).json({  error: "Dados do Job inválidos!!!"})
        }


        const job = await JobRepository.update(id, {name,user_id,status,recurrence,recurrence_value,interval,fixed_schedule})

        return res.json(job)

    }

    async delete(req, res){
        const {id} = req.params
        await JobRepository.delete(id)
        res.sendStatus(204)
    }
 

}

module.exports = new JobController();

