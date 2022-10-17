## Crypt To be removed 
from crypt import methods
from flask import Flask, session, render_template, request, redirect
import pyrebase


app = Flask(__name__)
"""
firebaseConfig = {
    'apiKey': "AIzaSyDpmqsqp7ZwABvH0uq69X1HLs0PFIuywjo",
    'authDomain': "pageturner-ea236.firebaseapp.com",
    'projectId': "pageturner-ea236",
    'storageBucket': "pageturner-ea236.appspot.com",
    'messagingSenderId': "230131529885",
    'appId': "1:230131529885:web:2bae4e872f102769c27c74",
    'measurementId': "G-KJTP2T0GPE",
    'databaseURL': "https://pageturner-ea236-default-rtdb.firebaseio.com"
}"""

firebaseConfig = {
    'apiKey': "AIzaSyB6IieB_qN7PyDm_7rNyg2oU8bDlitxbD8",
    'authDomain': "pageturner-185b1.firebaseapp.com",
    'projectId': "pageturner-185b1",
    'storageBucket': "pageturner-185b1.appspot.com",
    'messagingSenderId': "32092821198",
    'appId': "1:32092821198:web:6214695d4a16a8e656a29f",
    'databaseURL': "https://pageturner-185b1-default-rtdb.firebaseio.com"
}

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
db = firebase.database()
#db.child("users").child("test").set({'name': 'test'})
#db.child("registeredUsers").push({"name":"test", "email":"test@gmail.com" })

app.secret_key = "PaGeTuRnEr"

@app.route('/', methods=['POST', 'GET'])
def index():
    if 'user' in session:
       return render_template('home.html')
    if request.method == 'POST':
        email = request.form.get("email")
        password = request.form.get("password")
        try:
            user = auth.sign_in_with_email_and_password(email,password)
            session['user'] = email
            return render_template('home.html')
        except:
            return "Failed to login"
    return render_template('index.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if (request.method == 'POST'):
            #myuser = User(request.form['firstName'], request.form['lastName'], request.form['email'], request.form['gender'], request.form['birthday'])
            firstName = request.form['firstName']
            lastName = request.form['lastName']
            email = request.form['email']
            password = request.form['password']
            gender = request.form['gender']
            dateOfBirth = request.form['birthday']
            temp = dateOfBirth[2]+dateOfBirth[3]+dateOfBirth[len(dateOfBirth)-2]+dateOfBirth[len(dateOfBirth)-1]
            username = email.split('@')
            print("username:", username)
            db.child('users').child(username[0]+temp).set({"firstName":firstName, "lastName":lastName, "email": email, "gender":gender, "dateOfBirth":dateOfBirth})
            auth.create_user_with_email_and_password(email, password)
            sq1 = request.form['securityQuestion1']
            sqa1 = request.form['securityQuestion1Answer']
            db.child("securityQuestions").child(username[0]+temp).set({sq1 : sqa1})
            return render_template('index.html')
    return render_template('register.html')

@app.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    if (request.method == 'POST'):
            email = request.form['name']
            auth.send_password_reset_email(email)
            return render_template('index.html')
    return render_template('forgot_password.html')

@app.route('/logout')
def logout():
    session.pop('user')
    return redirect("/")

if __name__ == '__main__':
    app.run(port=1111)

