email = "mrunal@gmail.com"
dateOfBirth = "11-11-1998"
temp = dateOfBirth[len(dateOfBirth)-2]+dateOfBirth[len(dateOfBirth)-1]+dateOfBirth[0]+dateOfBirth[1]
username = email.split('@')
print(username[0]+temp)