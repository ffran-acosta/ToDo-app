const { Router } = require("express");
const router = Router();


const controller = require('../controller/api.controller')    

//C
router.post("/save-task", controller.saveTask)
//R
router.get("/users", controller.users)
router.get("/tasks", controller.tasks)
router.get("/tasks/:userEmail", controller.tasksUser)
//U
router.put("/tasks/:id", controller.editTask)
//D


module.exports = router




// router.get("/prueba", controller.prueba);
