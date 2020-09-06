const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post("/favoriteNumber", (req, res) => {
  // body 속성은 bodyparser 사용에 따라 붙임
  // bodyparser 개념 정리

  // DB에서 favoriteNumber 가져오기
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

router.post("/favorited", (req, res) => {
  // 로그인된 유저가 특정 영화에 대해 favorite 버튼을 눌렀는지 DB에서 확인
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    // Favorite Schema 내 특정 유저의 ID와 특정 영화의 ID가 모두 들어있고
    // 해당 정보가 info를 통해 반환된다면 info.length는 0보다 클 것
    let result = false;
    if (info.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

router.post("/addFavorite", (req, res) => {
  const favorite = new Favorite(req.body);

  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/getFavoritedMovie", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorites });
  });
});

module.exports = router;
