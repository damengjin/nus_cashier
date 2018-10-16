function CheckEmpty(){
  if (document.getElementById('idInput').value == ""){ return true;}
  return false;
}

function SaveID(){
  if (CheckEmpty()){
    alert("Please fill in your ID");
    return;
  }
  localStorage.setItem('id', document.getElementById('idInput').value);
  window.location.href='transaction1_play.html';
  return;
}
