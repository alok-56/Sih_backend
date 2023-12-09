const express=require('express')
const DummyRouter=express.Router()
const { SaveadharCard, SaveDigilocker } = require('../Controller/DummyData')

DummyRouter.route("/DigilockerSave").post(SaveDigilocker)
DummyRouter.route("/AdharCardSave").post(SaveadharCard)

module.exports=DummyRouter
