import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ValidatorComponent, ValidatorForm } from 'react-form-validator-core';
// eslint-disable-next-line
import TextValidator from '../components/TextValidator.jsx';
import PhoneInputValidator from '../components/PhoneInputValidator.jsx';
import UsersTable from '../components/UsersTable.jsx';
import db from '../components/IndexedDB.jsx';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

class UpdateUsersTableForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                fname: '',
                lname: '',
                phone: '',
                age: ''
            },
            users: [],
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit() {
        this.setState({ submitted: true }, () => {
            setTimeout(() => window.location.reload(), 5000);
        });
        db.users.add(this.state.formData).catch(function (err) { console.log(err); });
    }

    render() {
        const { formData, users, submitted } = this.state;
        return (
            <div>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <h2>Add user form</h2>
                <TextValidator
                    masked="none"
                    label="First Name"
                    onChange={this.handleChange}
                    name="fname"
                    value={formData.fname}
                    validators={['required', 'isString', 'minStringLength:2', 'minStringLength:2', 'matchRegexp:[A-Z][a-zA-Z][^#&<>"""~;$^%{}?]{1,20}$']}
                    errorMessages={['this field is required', 'First Name is not valid', 'First name length must be at minimum 2', 'First Name is not valid']}
                />
                <br />
                <TextValidator
                    masked="none"
                    label="Last Name"
                    onChange={this.handleChange}
                    name="lname"
                    value={formData.lname}
                    validators={['required', 'isString', 'minStringLength:2', 'matchRegexp:[A-Z][a-zA-Z][^#&<>"""~;$^%{}?]{1,20}$']}
                    errorMessages={['this field is required', 'Last Name is not valid', 'Last name length must be at minimum 2', 'Last Name is not valid']}
                />
                <br />
                <PhoneInputValidator
                    onChange={this.handleChange}
                    name="phone"
                    value={formData.phone}
                    validators={['required', 'minStringLength:18']}
                    errorMessages={['this field is required', 'Phone is not valid']}
                />
                <br />
                <TextValidator
                    masked="none"
                    label="Age"
                    onChange={this.handleChange}
                    name="age"
                    value={formData.age}
                    validators={['required', 'isNumber', 'minNumber:1', 'maxNumber:150']}
                    errorMessages={['this field is required', 'Age is not valid', 'Age is not valid', 'Age is not valid']}
                />
                <br />
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    size="large"
                    disabled={submitted}
                >
                    {
                        (submitted && 'Your form is submitted!')
                        || (!submitted && 'Submit')
                    }
                </Button>
            </ValidatorForm>
            <UsersTable />
            </div>
        );
    }
}

UpdateUsersTableForm.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(UpdateUsersTableForm);