
userid = localStorage.getItem("id");
earn_trans1 = parseFloat(parseFloat(localStorage.getItem('earn1')).toFixed(2));
totalExcess1 = parseFloat(parseFloat(localStorage.getItem('total_excess1')).toFixed(2));

document.getElementById("stage1").innerHTML = "You have given total excess change S$" + totalExcess1 + ". Your earning after deducting total excess change in Stage 2 is: S$<b>" + earn_trans1 + "</b>";


function onSubmit () {
  window.location = 'scheme_choice3.html';
}
