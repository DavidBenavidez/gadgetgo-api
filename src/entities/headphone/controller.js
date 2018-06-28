import Headphone from './model';

export const findByRange = async (req, res) => {
  try{
    Headphone.find({$and:[{"price": {$gte: parseInt(req.query.price[0])}},{"price": {$lte: parseInt(req.query.price[1])}}]}, (err, headphones) => {
      if(err){
        res.send({});
      }else{
        res.send(headphones);  
      }
    });
  } catch(err){
    const errors = [];
    for(let key in err.errors){
      errors.push(err.errors[key].message);
    }
    res.status(500).json({errors});
  }
};

export const findByBudget = async (req, res) => {
  try{
    console.log(req.query);
    Headphone.find({"price": {$lte: parseInt(req.query.price[0])}}, (err, headphones) => {
      if(err){
        res.send({});
      }else{
        res.send(headphones);  
      }
    });
  } catch(err){
    const errors = [];
    for(let key in err.errors){
      errors.push(err.errors[key].message);
    }
    res.status(500).json({errors});
  }
};

export const addHeadphone = (req, res) => {
  const newHeadphone = new Headphone(req.body);

  newHeadphone.save((err, headphone) => {
    if (err) { res.send({}); }
    else {
      res.json(headphone);
    }
  });
};

export const clearHeadphones = (req, res) => {
  try{
    Headphone.remove({}, (err, headphones) => {
      if(err){
        res.send({});
      }else{
        res.send(headphones)  
      }
    });
  } catch(err){
    const errors = [];
    for(let key in err.errors){
      errors.push(err.errors[key].message);
    }
    res.status(500).json({errors});
  }
}