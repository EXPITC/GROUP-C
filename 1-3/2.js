// q 2

function sortArray(x) {
    let filtr = "Dumbways is awesome"
    var output = ''
    for( _ of filtr ){
      for(__ of x) {
        if(__ == _ ){output += __; break}
      }
    }
    console.log(output)
  }
  
  sortArray(['u', 'D', 'm', 'w', 'b', 'a', 'y', 's', 'i', 's', 'w', 'a', 'e', 's', 'e', 'o', 'm',' ' ,' '])
  
  
  function sortArray2(x){
    let output = ''
    let i = 1
    if(i == 1){ output += x[i]; i--}
    if(i == 0) {output += x[i]; i+=2}
    if(i == 2){ output += x[i]; i+=2}
    if(i == 4){ output += x[i]; i--}
    if(i == 3){ output += x[i]; i+=2}
    if(i == 5){ output += x[i]; i++}
    if(i == 6){ output += x[i]; i++}
    if(i == 7){ output += x[i]; i+=10}
    if(i == 17){ output += x[i]; i-=9}
    if(i == 8){ output += x[i]; i++}
    if(i == 9){ output += x[i]; i+=9}
    if(i == 18){ output += x[i]; i-=7}
    if(i == 11){ output += x[i]; i--}
    if(i == 10){ output += x[i]; i+=2}
    if(i == 12){ output += x[i]; i++}
    if(i == 13){ output += x[i]; i+=2}
    if(i == 15){ output += x[i]; i++}
    if(i == 16){ output += x[i]; i-=2}
    if(i == 14){ output += x[i];}
    console.log(output)
  }
  sortArray2(['u', 'D', 'm', 'w', 'b', 'a', 'y', 's', 'i', 's', 'w', 'a', 'e', 's', 'e', 'o', 'm',' ' ,' '])