def write_notification(email: str, message=''):
    with open('log.txt', mode='a') as email_file:
        content = f'Email: {email} - message: {message} \n'
        email_file.write(content)