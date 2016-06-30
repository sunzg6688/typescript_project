/**
 * Created by samsung on 2015/10/12.
 */
function requestData(method,url,callBack){
    var ajaxRequest;
    if(window.XMLHttpRequest){
        ajaxRequest=new XMLHttpRequest();
    }else{
        //ie5,ie6
        ajaxRequest=new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajaxRequest.onreadystatechange=function(){
        if (ajaxRequest.readyState==4 && ajaxRequest.status==200){
            callBack(ajaxRequest.responseText);
        }
        //var userList='[{"phone":"132****1234","date":"2015-12-23","award":"iphone"},{"phone":"132****1235","date":"2015-12-23","award":"watch"},{"phone":"132****1236","date":"2015-12-23","award":"电动牙刷"},{"phone":"132****1234","date":"2015-12-23","award":"20元话费"}]';
        //callBack(userList);
    };
    ajaxRequest.open(method,url,true)
    ajaxRequest.send();
}

function isMobile(mobile){
    var partten= /^1\d{10}$/;
    if(partten.test(mobile)){
        return true;
    }else{
        return false;
    }
}