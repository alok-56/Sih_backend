const express=require('express')
const DummyRouter=express.Router()
const { SaveadharCard, SaveDigilocker, SaveDummyInstitute } = require('../Controller/DummyData')

DummyRouter.route("/DigilockerSave").post(SaveDigilocker)
DummyRouter.route("/AdharCardSave").post(SaveadharCard)
DummyRouter.route("/InsituteSave").post(SaveDummyInstitute)

module.exports=DummyRouter
