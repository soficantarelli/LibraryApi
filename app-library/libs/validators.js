module.exports = {

    validarRegistro: (name,username,password) =>{

        if (name != undefined && username != undefined && password != undefined) {
            
            return true;

        }else{

            return false;
        }

    }, 

    validateBook: (title, author, amount) =>{
       
        if( /^\d+$/.test(amount) && typeof(title)=='string' && title.length>0 && typeof(author)=='string' && author.length>0 && amount > 0){
            
            return true;

        }else{

            return false;
        }
    }, 
    
    modifiedBook: (newAmount, amountBorrowed) =>{
        if(newAmount > amountBorrowed){
            
            return true;

        }else{

            return false;
        }
    }, 

    validateDays: (daysBorrowed) =>{
        
        if(daysBorrowed > 0 && typeof(daysBorrowed)=='number' && daysBorrowed !=null){
            
            return true;

        }else{

            return false;
        }        
    }
}