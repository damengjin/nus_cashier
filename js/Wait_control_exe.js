
userid = localStorage.getItem("id");
earn_control_exe = parseFloat(parseFloat(localStorage.getItem('exe_score_control')).toFixed(2));


document.getElementById("result_control_exe").innerHTML = "Your earning in this exercise is: S$<b>" + earn_control_exe + "</b>";


function onSubmit () {
  window.location = 'transaction2.html';
}