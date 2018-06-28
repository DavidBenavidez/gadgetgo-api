import Laptop from './model';

export const findByRange = async (req, res) => {
  try{
    Laptop.find({$and:[{"price": {$gte: parseInt(req.query.price[0])}},{"price": {$lte: parseInt(req.query.price[1])}}]}, (err, laptops) => {
      if(err){
        res.send({});
      }else{
        res.send(laptops);  
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
    Laptop.find({"price": {$lte: parseInt(req.query.price[0])}}, (err, laptops) => {
      if(err){
        res.send({});
      }else{
        res.send(laptops);  
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

export const addLaptop = (req, res) => {
  const newLaptop = new Laptop(req.body);

  newLaptop.save((err, laptop) => {
    if (err) { res.send({}); }
    else {
      res.json(laptop);
    }
  });
};

export const clearLaptops = (req, res) => {
  try{
    Laptop.remove({}, (err, laptops) => {
      if(err){
        res.send({});
      }else{
        res.send(laptops)  
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