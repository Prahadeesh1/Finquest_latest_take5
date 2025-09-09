import requests
import smtplib
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# --- Email settings ---
SMTP_SERVER = "smtp.gmail.com"      # if using Gmail
SMTP_PORT = 587
EMAIL_ADDRESS = "prahadeeshh123457@gmail.com"
EMAIL_PASSWORD = "dnjq lmdg dxwf xnkw"   # use App Password (not your real Gmail password)

RECIPIENTS = ["shreyaa.shruthi@gmail.com", "Sathivadaakshaj@gmail.com"]

# --- Website to monitor ---
website_url = "https://v4z6gt4q-8080.asse.devtunnels.ms/"

# Track last state (None at start, will be "UP" or "DOWN")
last_state = None

def send_email(subject, body):
    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = ", ".join(RECIPIENTS)
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, RECIPIENTS, msg.as_string())
            print("📧 Email sent:", subject)
    except Exception as e:
        print("❌ Failed to send email:", e)

def check_website():
    global last_state
    try:
        res = requests.get(website_url, timeout=5)
        if res.status_code == 200:
            current_state = "UP"
        else:
            current_state = "DOWN"
    except requests.exceptions.RequestException:
        current_state = "DOWN"

    # Only notify on state change
    if last_state != current_state:
        if current_state == "UP":
            send_email("✅ Website is ONLINE", f"{website_url} is now reachable.")
        else:
            send_email("🚨 Website is OFFLINE", f"{website_url} appears to be down.")
        last_state = current_state

# --- Main loop ---
while True:
    check_website()
    time.sleep(100)  # check every 5 minutes
