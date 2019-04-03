import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { ValidatorComponent } from 'react-form-validator-core';


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['+', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

class PhoneInputValidator extends ValidatorComponent {

  render() {
    const {
            classes,
            error,
            errorMessages,
            validators,
            requiredError,
            helperText,
            validatorListener,
            withRequiredValidator,
            ...rest
        } = this.props;

    return (
          <FormControl className={classes.formControl}>
          <FormHelperText id="phone-label">Phone</FormHelperText>
          <Input
            {...rest}
            ref={(r) => { this.input = r; }}
            id="formatted-text-mask-input"
            inputComponent={TextMaskCustom}
          />
          {this.errorText()}
          </FormControl>
    );

    }

    errorText() {
        const { isValid } = this.state;
 
        if (isValid) {
            return null;
        }
 
        return (
            <div style={{ color: 'red' }}>
                {this.getErrorMessage()}
            </div>
        );
    }

}

PhoneInputValidator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhoneInputValidator)