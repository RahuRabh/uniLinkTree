const express = require("express")
const router = express.Router();

const linkController = require("../controllers/link")

const verifyToken = require("../middleware/authMiddleware");

router.post('/createLink', linkController.createLink)

router.get('/getLink/:userId', linkController.getLink)

router.get('/getUserLinks/:userId', linkController.getUserLinks)

router.put('/updateLink/:linkId', linkController.updateLink)

router.delete('/deleteLink/:linkId', linkController.deleteLink)

module.exports = router;