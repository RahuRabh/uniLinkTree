const express = require("express")
const router = express.Router();
const linkController = require("../controllers/link")
const authMiddleWare = require("../middleware/authMiddleware");

router.post('/createLink', linkController.createLink)

router.get('/getLink/:userId', linkController.getLink)

router.put('/updateLink/:linkId', linkController.updateLink)

router.delete('/deleteLink/:linkId', linkController.deleteLink)

module.exports = router;