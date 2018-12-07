userid = localStorage.getItem("id");
exe_control_score = parseFloat(parseFloat(localStorage.getItem('exe_score_control')).toFixed(2));

document.getElementById("exe_score_control").innerHTML = "The Exercise you would have earned: S$<b>" + exe_control_score + "</b>";
function onSubmit () {
  window.location = 'transaction2.html';
}
