const express = require("express");
const checkLogin = require("../../../middlewear/auth_middlewear");
const { AddNewNotice, fetchAllNotice, fetchLatestNotices } = require("../../../controller/admin/notice/notice_controller");

const router = express.Router();

router.post('/add', checkLogin, AddNewNotice);
router.get('/view-all', checkLogin, fetchAllNotice);
router.get('/view/latest', checkLogin, fetchLatestNotices);

module.exports = router;