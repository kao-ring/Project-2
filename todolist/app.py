from flask import Flask, render_template, flash, redirect, url_for, session, request, logging
from task import Tasks
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from passlib.hash import sha256_crypt
from functools import wraps
from wtforms_components import DateTimeField
from werkzeug.datastructures import MultiDict

app = Flask(__name__)

# CONFIG MYSQL ------------------------------------------------
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Chopper11'
app.config['MYSQL_DB'] = 'py_todolist'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

todos = []

# REGISTER FORM -----------------------------------------------
class RegisterForm(Form):
    name = StringField('Name', [validators.Length(min=1, max=50)])
    username = StringField('Username', [validators.Length(min=4, max=25)])
    email = StringField('Email', [validators.Length(min=6, max=50)])
    password = PasswordField('Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords do not match')
    ])
    confirm = PasswordField('Confirm Password')

# REGISTER PAGE -----------------------------------------------
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm(request.form)
    if request.method == 'POST' and form.validate():
        name = form.name.data
        email = form.email.data
        username = form.username.data
        password = sha256_crypt.encrypt(str(form.password.data))
        
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users(name, email, username, password) VALUES(%s, %s, %s, %s)", (name, email, username, password))
        mysql.connection.commit()
        cur.close()

        flash('You are now registered and can log in', 'success')

        return redirect(url_for('login'))
    return render_template('register.html', form=form)

# LOGIN PAGE --------------------------------------------------
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password_candidate = request.form['password']

        cur = mysql.connection.cursor()
        result = cur.execute("SELECT * FROM users WHERE username = %s", [username])

        if result > 0:
            data = cur.fetchone()
            password = data['password']

            if sha256_crypt.verify(password_candidate, password):
                session['logged_in'] = True
                session['username'] = username

                flash('You are now logged in', 'success')
                return redirect(url_for('index'))
            else:
                error = 'Invalid login'
                return render_template('login.html', error=error)
            cur.close()
        else:
            error = 'Username not found'
            return render_template('login.html', error=error)
    return render_template('login.html')

# CHECK IF USER IS LOGGED IN ----------------------------------
def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash('Unauthorized, Please login', 'danger')
            return redirect(url_for('login'))
    return wrap

# LOGGED OUT --------------------------------------------------
@app.route('/logout')
@is_logged_in
def logout():
    session.clear()
    flash('You are now logged out', 'success')
    return redirect(url_for('login'))

# =============================================================  
def find_task(task_id):
    return [task for task in todos if task.id == task_id][0]

# HOME PAGE -----------------------------------------------
@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/')
def root():
    return redirect(url_for('index'))

# MAIN PAGE -----------------------------------------------
@app.route('/tasks', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        new_task = Tasks(request.form['category'], request.form['tasks'])
        todos.append(new_task)
        return redirect(url_for('index'))
    return render_template('main.html', todos=todos)

# CREATE TASK -----------------------------------------------
@app.route('/tasks/new')
def new():
    return render_template('new.html')

# READ TASK -------------------------------------------------
@app.route('/tasks/<int:id>/', methods=['GET', 'POST', 'DELETE'])
def show(id):
    found_task = find_task(id)
    if request.method == 'POST':
        found_task.category = request.form['category']
        found_task.tasks = request.form['tasks']
        return redirect(url_for('index'))
    return render_template('show.html', task=found_task)

# UPDATE TASK -------------------------------------------------
@app.route('/tasks/<int:id>/edit')
def edit(id):
    found_task = find_task(id)
    return render_template('edit.html', task=found_task)

# DELETE TASK -----------------------------------------------
@app.route('/tasks/<int:id>/delete', methods=['GET', 'POST'])
def delete(id):
    found_task = find_task(id)
    if request.method == 'POST':
        todos.remove(found_task)
        return redirect(url_for('index'))
    return render_template('delete.html', task=found_task)


if __name__ == '__main__':
    app.secret_key='secret123'
    app.run(debug=True)