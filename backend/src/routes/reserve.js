const express = require("express");
const db = require("../../database/reservedb");
const router = express.Router();

router.get("/", (req, res) => {
    db.getAll(
        (item)=> {
        res.json(item);
    })
});

router.get("/timelist", (req, res) => {
    db.getTimelist(
        (item)=> {
        res.json(item);
    })
});

router.post("/add", (req,res) => {
    db.add(
        req.body,
        () => {
            res.status(200).send();
        }
    );
})

router.get("/myreserve/:kakaoID", (req,res) => {
    db.getReserves(
        req.params.kakaoID,
        (item) => {res.send(item)}
    )
})
router.post("/checkreserved", (req,res)=> {
    db.checkReserved(
        req.body,
        (item) => {res.send(item)}
    )
})

router.post("/cancel", (req,res)=> {
    db.cancel(
        req.body.kakaoID,
        () => {
            res.status(200).send();
        }
    )
})

router.get("/deleteAll", (req,res) => {
    db.deleteAll(
        () => {
            res.status(200).send();
        }
    );
})

module.exports = router;