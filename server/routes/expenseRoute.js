const router = require('express').Router();
let Exp = require('../models/expenses');

router.route('/').get((req, res) => {
  Exp.find()
    .then(exp => res.json(exp))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  const title = req.body.title;
  const amount = req.body.amount;
  const note = req.body.note;
  const date = req.body.date;

  const newExp = new Exp({
    title,
    amount,
    note,
    date,
  });

  newExp.save()
  .then(() => res.json('Exp added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/id').delete((req, res) => {
  Exp.findByIdAndDelete(req.params.id)
    .then(() => res.json('Expense deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;