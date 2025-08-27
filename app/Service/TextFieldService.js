const TextFieldService = (fieldsToValidate, form)=>{
    let finalMsg;

    
    const rules = {

      vin: {
        regex: /^\d{11}$/,
        message: 'Vin must be 11 digits',
      },


      phone: {
        regex: /^\d{11}$/,
        message: 'Phone must be 11 digits',
      },

      nin: {
        regex: /^\d{11}$/,
        message: 'Nin must be 11 digits',
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