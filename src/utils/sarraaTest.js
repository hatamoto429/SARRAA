fetch("http://127.0.0.1:5000/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    feature1: value1,
    feature2: value2,
    ...
  })
})
.then(res => res.json())
.then(data => console.log("Prediction:", data.prediction));
