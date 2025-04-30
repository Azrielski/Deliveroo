import smtplib

server = smtplib.SMTP("smtp.gmail.com", 587)
server.starttls()
server.login("deliveroo.notification@gmail.com", "vkjz ecxz jvbf wyfw") 
server.sendmail("deliveroo.notification@gmail.com", "jebichikolin@gmail.com", "Test email from Flask")
server.quit()
print("Email sent successfully!")
