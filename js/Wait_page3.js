
userid = localStorage.getItem("id");
earn_trans3 = parseFloat(parseFloat(localStorage.getItem('earn3')).toFixed(2));


document.getElementById("stage3").innerHTML = "The Stage 3 Cashier Earning is: S$<b>" + earn_trans3 + "</b>";


function onSubmit () {
  window.location = 'random_fixed4.html';
  return;
}