var userDetails = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : [];

    function getData() {
      
      var elements = document.getElementById("forms").elements;
      var obj ={};
      
      for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value; 
      }
        
        userDetails.push(obj);
        console.log(userDetails);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        window.location.href = "home.html";
    }