export default function (){    
    let number = Math.floor(Math.random() * 100000000);
    let result = "119".concat(number).padEnd(11, '5');
    return result
  }