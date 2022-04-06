const {Router} = require("express");
const UserController = require("./app/controllers/UserController");
const JobController = require("./app/controllers/JobController");

const router = Router()

router.get("/users", UserController.index)
router.post("/users", UserController.store)
router.get("/users/:id", UserController.show)
router.put("/users/:id", UserController.update)
router.delete("/users/:id", UserController.delete)


router.get("/jobs", JobController.index)
router.post("/jobs", JobController.store)
router.get("/jobs/:id", JobController.show)
router.put("/jobs/:id", JobController.update)
router.delete("/jobs/:id", JobController.delete)
module.exports = router;

