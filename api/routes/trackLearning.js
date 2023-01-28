const router = require('express').Router()
const Learning = require('../../models/learningDataModel')
const {spawn} = require('child_process')

router.get('/', (req,res)=>{
    res.status(200).json({
        status: 200,
        message: 'Ahoy Captain! LB API Up and Running. Refer documentation'
    })
})

// @TODO - Set Username of Logged in User Only
router.post('/add', (req,res)=>{
    if (!req.body.username) {
        return res.status(400).json({
          status: 400,
          success: false,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    if (!req.body.site) {
        return res.status(400).json({
          status: 400,
          success: false,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    var date = Date.now()

    new Learning({
        username: req.body.username,
        site: req.body.site,
        date: date
    })
    .save()
    .then((newLearning)=>{
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Learning addedd succesfully"
        })
    })
    .catch((error) => {
        
        return res.status(400).json({
            status: 400,
            success: false,
            error: error
        })
    })
})

// @TODO - Return All Learnings of Logged in User Only
router.get('/getLearnings',(req,res)=>{
    if (!req.body.username) {
        return res.status(400).json({
          status: 400,
          success: false,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    Learning.find({username: req.body.username})
        .then((data)=>{
            return res.status(200).json({
                status: 200,
                success: true,
                data: data
            })
        })
        .catch((error) => {
        
            return res.status(400).json({
                status: 400,
                success: false,
                error: error
            })
        })
})

router.get('/generateCalplot', (req,res)=>{

    // spawn new child process to call the python script
    const python = spawn('python', ['-c', 'import python_heatmap.heatmap as heatmap; heatmap.create_heatmap()'])

    // collect data from script
    python.stdout.on('data', (data) => {
        console.log('Pipe data from python ....')
        dataToSend = data.toString();
    })

    //in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log('child process close all stdio with code', code)
        // send data to browser
        res.send(JSON.parse(dataToSend))
    })
})


module.exports = router