### API RESULT REQUEST

curl "http://127.0.0.1:8080/JSON/core/view/messages/?baseurl=http://192.168.192.1:8001&apikey=###############" | jq . > ~/Desktop/zap_logs/messages_pretty.json


### Message Clear 

curl "http://127.0.0.1:8080/JSON/core/action/deleteAllAlerts/?apikey=###############"
curl "http://127.0.0.1:8080/JSON/core/action/deleteAllMessages/?apikey=###############"

