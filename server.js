const jsonServer = require('json-server')
const server = jsonServer.create()
const db = require('./db.json')
const axios = require('axios')
const bodyParser = require('body-parser')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(bodyParser.json())

const DB_ADDRESS = 'http://localhost'
const DB_PORT = 8000
const DB_URL = `${DB_ADDRESS}:${DB_PORT}`
const messages = [{title: "Success", text: "Content is available", type: "info"}]
const success = true

// PL - BH
server.get('/task', async (req, res) => {

    const response = {
        messages,
        success
    }
    try {
        const tasks = await axios.get(`${DB_URL}/task`)
        const body = await tasks.data

        if (body)
            await res.send({body, ...response})
        else
            await res.sendStatus(404)

    } catch (e) {
        await res.sendStatus(500)
    }
})

// BH - BOFL
server.get('/bofl/task', async (req, res) => {
    const response = {
        messages,
        success
    }
    try {
        const tasks = await axios.get(`${DB_URL}/task`)
        const body = await tasks.data

        if (body)
            res.send(body)
        else
            res.sendStatus(404)

    } catch (e) {
        res.sendStatus(500)
    }
})

// PL - BH
server.get('/task/:id', async (req, res) => {
    const {id = 3} = req.params
    const response = await axios.get(`${DB_URL}/task?taskId=${id}`)
    const body = await {...response.data[0]}
    if (response.data[0]) {
        res.send({body, messages, success})
    } else {
        res.sendStatus(404)
    }
})

// BH - BOFL
server.get('/bofl/task/:id', async (req, res) => {
    const response = await axios.get(`${DB_URL}/task`)
    const body = await {...response.data[0], reportName: "custom_rozn_vkl_frozen.bofl_vkl_14_1650280485215"}
    if (body) {
        res.send({...body})
    } else {
        res.sendStatus(404)
    }
})

// PL - BH
server.post('/report', async (req, res) => {
    const response = {
        body: {
            reportName: "custom_rozn_vkl_frozen.bofl_vkl_14_1650532954955",
            filters: null,
            sortBy: "R_N",
            sortDir: null,
            size: 20,
            page: 1,
            total: 1000
        },
        messages,
        success
    }

    try {
        res.send(response)

    } catch (e) {
        res.sendStatus(500)
    }
})

// PL - BH
server.post('/report/ready', async (req, res) => {
    const response = {
        size: 20,
        page: 1,
        total: 1000,
        status: 2
    }

    try {
        const report = await axios.get(`${DB_URL}/report`)
        const entityList = await report.data

        if (entityList)
            await res.send({body: {entityList, ...response}, messages, success})
        else
            await res.sendStatus(404)

    } catch (e) {
        res.sendStatus(500)
    }
})

// PL - BH
server.get('/role', async (req, res) => {
    const response = {
        messages,
        success
    }

    try {
        const roles = await axios.get(`${DB_URL}/role`)
        const body = await roles.data

        if (body)
            res.send({body, ...response})
        else
            res.sendStatus(404)

    } catch (e) {
        res.sendStatus(500)
    }
})

// PL - BH
server.get('/reportScheme', async (req, res) => {
    const response = {
        messages,
        success
    }

    try {
        const reportScheme = await axios.get(`${DB_URL}/reportScheme`)
        const body = await reportScheme.data

        if (body)
            res.send({body, ...response})
        else
            res.sendStatus(404)

    } catch (e) {
        res.sendStatus(500)
    }
})

// PL - BH
server.get('/reportScheme/:id', async (req, res) => {
    const {id} = req.params
    const response = {
        messages,
        success
    }

    try {
        const reportScheme = await axios.get(`${DB_URL}/reportSchemeId`)
        const body = await reportScheme.data[id]

        if (body)
            res.send({body, ...response})
        else
            res.sendStatus(404)

    } catch (e) {
        res.sendStatus(500)
    }
})

// BH - BOFL
server.get('/bofl/reportScheme/:id', async (req, res) => {
    try {
        const reportScheme = await axios.get(`${DB_URL}/reportSchemeId`)
        const body = await reportScheme.data

        if (body)
            res.send(body)
        else
            res.sendStatus(404)

    } catch (e) {
        res.sendStatus(500)
    }
})

// BH - BOFL
server.post('/bofl/task', async (req, res) => {

    try {
        const task = await axios.get(`${DB_URL}/task`)
        const body = await task.data[0]

        if (body)
            res.send(body)
        else
            res.sendStatus(404)

    } catch (e) {
        res.sendStatus(500)
    }
})

// PL - BH
server.post('/task', async (req, res) => {

    const response = {
        messages,
        success
    }

    try {
        // const task = await axios.get(`${DB_URL}/task`)
        const body = {}//await task.data[0]

        if (body)
            await res.send({body, ...response})
        else
            await res.sendStatus(404)

    } catch (e) {
        await res.sendStatus(500)
    }

    // await res.send(response)
})

// BH - BOFL
server.put('/task/:id', async (req, res) => {
    const {id} = req.params
    const newTask = req.body

    const result = await db.task.find(task => task.id === +id)
    const oldTask = await result

    if (oldTask) {
        const response = await axios.put(`${DB_URL}/task/${id}`, {...oldTask, ...newTask})
        const r = await response.data

        if (r) {
            res.send(r)
        } else {
            res.status(404).send({error: "Not Found"})
        }
    }
    res.status(404).send({error: "Not Found"})
})

// BH - BOFL
server.delete('/task/:id', async (req, res) => {
    const {id} = req.params

    try {
        const response = await axios.delete(`${DB_URL}/task/${id}`)
        const r = await response.data
        res.status(204).send(r)
    } catch (e) {
        res.status(404).send({error: "Not Found"})
    }
})

// BH - BOFL
server.post('/bofl/report', async (req, res) => {
    const response = {
        reportName: "custom_rozn_vkl_frozen.bofl_vkl_14_1650532954955",
        filters: null,
        sortBy: "R_N",
        sortDir: null,
        size: 20,
        page: 1,
        total: 1000
    }

    try {
        res.send(response)
    } catch (e) {
        res.sendStatus(500)
    }
})

// BH - BOFL
server.post('/bofl/report/ready', async (req, res) => {
    const response = {
        size: 20,
        page: 1,
        total: 1000,
        status: 2
    }

    try {
        const report = await axios.get(`${DB_URL}/report`)
        const entityList = await report.data

        if (entityList)
            res.send({entityList, ...response})
        else
            res.sendStatus(404)

    } catch (e) {
        res.sendStatus(500)
    }
})

// BH - BOFL
server.get('/bofl/role', async (req, res) => {
    const response = {
        messages,
        success
    }

    try {
        const roles = await axios.get(`${DB_URL}/role`)
        const body = await roles.data

        if (body)
            res.send(body)
        else
            res.sendStatus(404)

    } catch (e) {
        res.sendStatus(500)
    }
})

server.listen(3001, () => {
    console.log('JSON Server is running port 3001')
})
