#Activate Virtual Environment

.\venv\Scripts\activate
deactivate

#Install Libraries

pip install pandas scikit-learn flask joblib

#Save libaries to requirements

pip freeze > requirements.txt