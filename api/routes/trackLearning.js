const router = require('express').Router()
const Learning = require('../../models/learningDataModel')

router.get('/', (req,res)=>{
    res.status(200).json({
        status: 200,
        message: 'Ahoy Captain! LB API Up and Running. Refer documentation'
    })
})


module.exports = router