
userid = localStorage.getItem("id");
earn_trans3 = parseFloat(parseFloat(localStorage.getItem('earn3')).toFixed(2));


document.getElementById("stage3").innerHTML = "Your Earning at Stage 3 is: S$<b>" + earn_trans3 + "</b>";


function onSubmit () {
  window.location = 'random_fixed4.html';
  return;
}