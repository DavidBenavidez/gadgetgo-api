import Mouse from './model';

export const findByRange = async (req, res) => {
  try{
    Mouse.find({$and:[{"price": {$gte: parseInt(req.query.price[0])}},{"price": {$lte: parseInt(req.query.price[1])}}]}, (err, mice) => {
      if(err){
        res.send({});
      }else{
        res.send(mice);  
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
    Mouse.find({"price": {$lte: parseInt(req.query.price[0])}}, (err, mice) => {
      if(err){
        res.send({});
      }else{
        res.send(mice);  
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

export const addMouse = (req, res) => {
  const newMouse = new Mouse(req.body);

  newMouse.save((err, mouse) => {
    if (err) { res.send({}); }
    else {
      res.json(mouse);
    }
  });
};

export const clearMice = (req, res) => {
  try{
    Mouse.remove({}, (err, mice) => {
      if(err){
        res.send({});
      }else{
        res.send(mice)  
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