class User:
    def __init__(self, firstName, lastName, email, gender, dateOfBirth, username):
        print(firstName, lastName, dateOfBirth)
        self.firstName = firstName,
        self.lastName = lastName,
        self.email = email,
        self.gender = gender,
        self.dateOfBirth = dateOfBirth,
        self.username = self.createUsername()

    def createUsername(self):
        print(self.dateOfBirth)
        print(len(self.dateOfBirth))
        str = ''.join(self.dateOfBirth)
        str2 = ''.join(self.email)
        temp = str[2]+str[3]+str[len(str)-2]+str[len(str)-1]
        self.username = str.split('@')
        self.username = self.username[0]+temp
        return self.username

    

