const UserRepository = require("../repositories/UserRepository")

class UserController {
    async index(req, res){
        const {orderBy, filter, limit, offset} = req.query
        const users = await UserRepository.findAll(orderBy, filter, limit, offset)
        res.json(users)
    }

    async store(req, res) {
        const {name, email, pass, tel} = req.body

        if (!name || !email || !pass || !tel){
            return res.status(400).json({  error: "Dados do Usuário inválidos!!!"})
        }
        const userExist = await UserRepository.findByEmail(email)

        if (userExist) return res.status(400).json({  error: "Este email já está cadastrado!"})

        const user = await UserRepository.create({name, email, pass, tel})
        return res.json(user)
    }

    async show(req, res) {
        const {id} = req.params
        const user = await UserRepository.findById(id)

        if (!user){
            return res.status(400).json({  error: "Usuário não encontrado!!"})
        }
        return res.json(user)
    }

    async update(req, res) {
        const {id} = req.params
        const {name, email, pass, tel} = req.body
        const userExist = await UserRepository.findById(id)

        if (!userExist) return res.status(400).json({  error: "ID não encontrado!"})

        const emailExist = await UserRepository.findByEmail(email)

        if (emailExist && emailExist.id !== id) return res.status(400).json({  error: "Este email já está cadastrado!"})

        if (!name || !email || !pass || !tel){
            return res.status(400).json({  error: "Dados do Usuário inválidos!!!"})
        }

        const user = await UserRepository.update(id, {name, email, pass, tel})

        return res.json(user)

    }

    async delete(req, res){
        const {id} = req.params
        await UserRepository.delete(id)
        res.sendStatus(204)
    }
 

}

module.exports = new UserController();

