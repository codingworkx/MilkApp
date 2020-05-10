import Snackbar from 'react-native-snackbar';

//custom imports below
import Fonts from './fonts';
import Colors from './colors';

/**
 * function to show snackbar message to user
 * @param text 
 * @param is_theme 
 */
const ShowMessage = (text: string, is_theme: boolean = true) => {
  Snackbar.show({
    text,
    fontFamily: Fonts.SEMI_BOLD,
    duration: Snackbar.LENGTH_SHORT,
    textColor: is_theme ? Colors.WHITE : Colors.THEME,
    backgroundColor: is_theme ? Colors.THEME : Colors.WHITE,
    action: {
      text: 'Close',
      onPress: undefined,
      textColor: Colors.BLACK,
    },
  });
}

/**
 * function to validate email
 * @param email 
 */
const ValidateEmail = (email: string) => {
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

/**
 * function to validate password
 * @param password 
 */
const ValidatePassword = (password: string) => {
  return password.trim().length > 7;
}

export {
  ShowMessage,
  ValidateEmail,
  ValidatePassword
}