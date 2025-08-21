const TextFieldService = (fieldsToValidate, form)=>{
    let finalMsg;

    
    const rules = {

      username: {
        regex: /^[a-zA-Z0-9]{3,15}$/,
        message: 'Username must be 3–15 alphanumeric characters',
      },

      matricNumber: {
        regex: /^\d{11}$/,
        message: 'Matric no: must be 11 digits',
      },

      password: {
        regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        message: 'Password must be at least 6 characters with letters and numbers',
      },

    };

    
    for (const field of fieldsToValidate) {
      const rule = rules[field];
      const value = form[field];

      if (!rule.regex.test(value)) {
        finalMsg = rule.message;

        return finalMsg;
      }
    }

    return finalMsg = "Successful"
}

export default TextFieldService