userid = localStorage.getItem("id");
earn_trans1 = parseFloat(parseFloat(localStorage.getItem('earn1')).toFixed(2));


document.getElementById("stage1").innerHTML = "The Stage 1 Cashier Earning is: S$<b>" + earn_trans1 + "</b>";


function onSubmit () {
  window.location = 'scheme_choice3.html';
}
