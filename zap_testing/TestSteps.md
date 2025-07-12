1. Host different models via FastAPI

   - LR
   - SVC
   - RF

2. Fuzz them with all four request payload sets:

   - SQLi - Benign
   - SQLi - Malicious
   - XSS - Benign
   - XSS - Malicious

   3 x 4 = 12 Files

3. Analyze all files for Errors and Unprocessable Payloads

   -> Summarize results

4. Do general ZAP Scan on Website with and without model hosting

   -> Give general security assessment
