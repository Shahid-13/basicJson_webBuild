function displayData() {
    var  userDetails = JSON.parse(localStorage.getItem('userDetails'));
    var col = [];
    for (var i=0; i<userDetails.length; i++) {
        for (var key in userDetails[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");     
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    var th = document.createElement("th");
    tr.appendChild(th);
    table.appendChild(tr);
    for (var i = 0; i < userDetails.length; i++) {
        tr = document.createElement("tr");

        for (var j = 0; j < col.length; j++) {
            var tabCell = document.createElement("td");
            tabCell.innerHTML = userDetails[i][col[j]];
            tr.appendChild(tabCell);
        }
        var tabCell = document.createElement("td");
        var button = document.createElement("button");

        button.innerText = "Delete";
        button.setAttribute('id',i);
        button.setAttribute('class',"innerbtn");
        var deletebtn = document.getElementById("delete-btn");
        var cancelbtn = document.getElementById("cancel-btn");

        button.addEventListener("click",function(){
            var id = this.getAttribute("id");
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
            span.onclick = function() {
                modal.style.display = "none";
            }
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            deletebtn.addEventListener("click", function() {
                deleteData(id,userDetails,col);
            }); 
            cancelbtn.addEventListener("click", function() {
                modal.style.display = "none";
            });
        });
        
        tabCell.appendChild(button);
        tr.appendChild(tabCell);
        table.appendChild(tr);
    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function deleteData(id, userDetails, col){
    var findIndex = userDetails.findIndex((a,index) => index == id);
    findIndex !== -1 && userDetails.splice(findIndex , 1);
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    location.reload();
}

function addData(){
    window.location.href = "addUser.html";
}

function searchData() {
    var input = document.getElementById("search");
    var filter = input.value.toUpperCase();
    var result = document.getElementById("result");
    var child = result.getElementsByTagName("tr");
    for(var i=1; i<child.length; i++) {
        var text = child[i].getElementsByTagName("td")[0].innerHTML;
        var final = text;
        if(final.toUpperCase().indexOf(filter) > -1) {
            child[i].style.display = "";
        } else {
            child[i].style.display = "none";
        }
    }
}

function roleFilter(){
    var selectbox = document.getElementById("role-filter");
    var selectedValue = selectbox.options[selectbox.selectedIndex].value;
    console.log(selectedValue);
    if(selectedValue=="default"){
        location.reload();
    }
    var filter = selectedValue.toUpperCase();
    var result = document.getElementById("result");
    var child = result.getElementsByTagName("tr");
    for(var i=1; i<child.length; i++) {
        var text = child[i].getElementsByTagName("td")[4].innerHTML
        var final = text;
        if(final.toUpperCase().indexOf(filter) > -1) {
            child[i].style.display = "";
        } else {
            child[i].style.display = "none";
        }
    }
}