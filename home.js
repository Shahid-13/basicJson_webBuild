async function fetchJson() {
    let response = await fetch('http://localhost:3000/users');
    return await response.json();
}
fetchJson().then(data=>displayData(data));

function displayData(data) {
    var  userDetails = data;
    var col = [];
    for (var i=0; i<userDetails.length; i++) {
        for (var key in userDetails[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    var table = document.createElement("table");
    table.setAttribute("id","userTable");
    var tr = document.createElement("tr");
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");     
        th.innerHTML = col[i];
        if(th.innerHTML=="is_active"){
            var active = i;
        }
        if(th.innerHTML=="avatar"){
            var avatar = i;
        }
        tr.appendChild(th);
    }

    var th = document.createElement("th");
    tr.appendChild(th);
    table.appendChild(tr);
    for (var i = 0; i < userDetails.length; i++) {
        tr = document.createElement("tr");

        for (var j = 0; j < col.length; j++) {
            var tabCell = document.createElement("td");
            if(j == active){
                if(userDetails[i][col[j]]){
                    var div = document.createElement("div");
                    div.setAttribute("id","green");
                    tabCell.appendChild(div);
                }
                else{
                    var div = document.createElement("div");
                    div.setAttribute("id","red");
                    tabCell.appendChild(div);
                }
                
            }
            else if(j == avatar){
                var img = document.createElement('img');
                img.setAttribute("id","avatarframe");
                img.src = userDetails[i][col[j]];
                tabCell.appendChild(img);
            }
            else{
            
            tabCell.innerHTML = userDetails[i][col[j]];
            
            }
            tr.appendChild(tabCell);
        }
        var tabCell = document.createElement("td");
        var editbutton = document.createElement("button");
        editbutton.innerText = "Edit";
        editbutton.setAttribute('editid',i);
        editbutton.setAttribute('class',"editbtn");

        editbutton.addEventListener("click",function(){
            var editid = this.getAttribute("editid");
            var modal = document.getElementById("editModal");
            
            modal.style.display = "block";
            var form = document.getElementById("editforms");
            editdata = userDetails[editid];
            
            form["editid"].value = editdata["id"];
            form["editname"].value = editdata["name"];
            form["editemail"].value = editdata["email"];
            form["editphone"].value = editdata["phone"];
            form["editaddress"].value = editdata["address"];
            form["editis_active"].checked = editdata["is_active"];
            form["editrole"].value = editdata["role"];
            form["editcreatedat"].value = editdata["created_at"];
            form["editavatar"].value = editdata["avatar"];
            
            window.onclick = function(event) {
                if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            var editSubmit = document.getElementById("editSubmit");
            editSubmit.addEventListener("click",function(){
                modal.style.display = "none";
            });
        });

        var delbutton = document.createElement("button");

        delbutton.innerText = "Delete";
        delbutton.setAttribute('delid',i);
        delbutton.setAttribute('class',"innerbtn");
        var deletebtn = document.getElementById("delete-btn");
        var cancelbtn = document.getElementById("cancel-btn");

        delbutton.addEventListener("click",function(){
            var delid = this.getAttribute("delid");
            var modal = document.getElementById("deleteModal");
            var span = document.getElementsByClassName("close")[0];
            document.getElementById('deleteData').value = userDetails[delid][col[0]];
            modal.style.display = "block";
            span.onclick = function() {
                modal.style.display = "none";
            }
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            cancelbtn.addEventListener("click", function() {
                modal.style.display = "none";
            });
        });
        tabCell.appendChild(editbutton);
        tr.appendChild(tabCell);
        table.appendChild(tr);
        
        tabCell.appendChild(delbutton);
        tr.appendChild(tabCell);
        table.appendChild(tr);
    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function deleteData(){
    var id = document.getElementById("deleteData").value;
    console.log("delete"+id);
    fetch('http://localhost:3000/users/'+ id,{
        method: 'DELETE',
        headers:{'Content-Type':'application/json'},

    })
    .then(response => response.json()).then( data=>console.log(data+ "deleted"))
    .catch((error)=>{
        console.log(error);
    })
    location.reload()
}

function addData(){
    var modal = document.getElementById("addModal");
   
    modal.style.display = "block";
   
        window.onclick = function(event) {
            if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            document.getElementById("addSubmit").addEventListener("click",function(){
                var form = document.getElementById("addforms").elements;
                var obj ={};
                if(form["is_active"].value=='on'){
                    obj["is_active"] = true;    
                }else{
                    obj["is_active"]=false;
                }
                obj["name"] = form["name"].value;
                obj["email"] = form["email"].value;
                obj["phone"]=form["phone"].value;
                obj["address"]=form["address"].value;
                var currentdate = new Date(); 
                var created_at =currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
                form["createdat"].value=created_at;
                obj["created_at"]=form["createdat"].value;
                obj["updated_at"]="";
              
                obj["role"] = form["role"].value;
              
     
                fetch('http://localhost:3000/users',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(obj),
                })
                .then(response=>response.json())
                 
                .catch((error)=>{
                    console.log(error);
                });
                modal.style.display = "none";
                location.reload();
            });
    
}

function editData(form){
    var obj={};
    obj["id"] = form["editid"].value
    if(form["editis_active"].value=='on'){
        obj["is_active"] = true;    
    }
    else if(form["editis_active"].value=='off'){
        obj["is_active"] = false;
    }
    obj["name"] = form["editname"].value;
    obj["email"] = form["editemail"].value;
    obj["phone"] = form["editphone"].value;
    obj["address"] = form["editaddress"].value;
    obj["created_at"]=form["editcreatedat"].value;
    
    var date = new Date(); 
    var updated_at =date.getDate() + "-"
    + (date.getMonth()+1)  + "-" 
    + date.getFullYear() + " "  
    + date.getHours() + ":"  
    + date.getMinutes() + ":" 
    + date.getSeconds();
    form["editupdatedat"].value=updated_at;
    obj["updated_at"]=form["editupdatedat"].value;
    obj["role"] = form["editrole"].value;
    obj["avatar"] = form["editavatar"].value;
    fetch('http://localhost:3000/users/'+obj["id"],{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    })
    .then(response=>response.json())
    .then(obj => console.log(obj))
    .catch((error)=>{
        console.log(error);
    });
    window.location.reload();
    
}

function searchData() {
    var input = document.getElementById("search");
    var filter = input.value.toUpperCase();
    var result = document.getElementById("result");
    var child = result.getElementsByTagName("tr");
    for(var i=1; i<child.length; i++) {
        var name = child[i].getElementsByTagName("td")[2].innerHTML;
        var email = child[i].getElementsByTagName("td")[3].innerHTML;
        var finalname = name.toUpperCase();
        var finalemail =email.toUpperCase();
        if(finalname.indexOf(filter) > -1 || finalemail.indexOf(filter) > -1) {
            child[i].style.display = "";
        } else {
            child[i].style.display = "none";
        }
    }
}

function roleFilter(){
    var selectbox = document.getElementById("role-filter");
    var selectedValue = selectbox.options[selectbox.selectedIndex].value;
    if(selectedValue=="default" ){
        var row = document.getElementById('userTable').rows;
        for(i=0;i<row.length;i++){
            if (row[i].style.display == "none") {
                row[i].style.display = "";
            }
        }
        
    }
    else{
    var filter = selectedValue.toUpperCase();
    var result = document.getElementById("result");
    var child = result.getElementsByTagName("tr");
    for(var i=1; i<child.length; i++) {
        var text = child[i].getElementsByTagName("td")[8].innerHTML
        var final = text;
        if(final.toUpperCase().indexOf(filter) > -1) {
            child[i].style.display = "";
        } else {
            child[i].style.display = "none";
        }
    }
}
}

// function statusFilter(){
//     var selectbox = document.getElementById("status-filter");
//     var selectedValue = selectbox.options[selectbox.selectedIndex].value;
//     // console.log(selectedValue);
//     if(selectedValue=="default"){
//         var row = document.getElementById('userTable').rows;
//         for(i=0;i<row.length;i++){
//             if (row[i].style.display == "none") {
//                 row[i].style.display = "";
//             }
//         }
//     }
//     else if(selectedValue=="Online"){
//         var filter = selectedValue.toUpperCase();
//         var result = document.getElementById("result");
//         var child = result.getElementsByTagName("tr");
//         var green = document.getElementById("green");
        // console.log(child[1].getElementsByTagName("td")[1].innerHTML);
    //     for(var i=1; i<child.length; i++) {
    //         var text = child[i].getElementsByTagName("td")[1].innerHTML;
    //         var final = green.isSameNode(text);
    //         if(final){
    //             child[i].style.display = "";
    //         } else {
    //             child[i].style.display = "none";
    //         }
    // }
// }
// }