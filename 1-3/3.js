function cetakPattern(x){

    let z = x
    let text = ''
    for(i= 0; i< x;i++){
      for(a= 0;a< x-z; a++){text += ' '}
      for(a= 0;a< z; a++){
        if (z%2==1){
          if(i%2== 0){
            if(a%2==0){text += '#'}
            if(a%2==1){text += '+'}
          }
          if(i%2== 1){
            if(a%2==0){text += '#'}
            if(a%2==1){text += '+'}
          }
        }
        if (z%2 == 0){text += '+'}
        if(a < z){ text += ' ' }
      }
      for(a= 0;a< x-z; a++){text += ' '}
      console.log(text)
      text = ''
      z--
    }
    }
    cetakPattern(5)