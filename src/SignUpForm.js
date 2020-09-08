import React from 'react';
import { useForm } from "react-hook-form";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// Using makeStyles Material UI hook for styling 

const useStyles = makeStyles((theme) => ({

    signupform: {
        paddingTop: '45px'
    },

    heading: {
        color: '#1d3557',
        fontFamily: 'Merriweather',
        fontWeight: '700'
    },
    
    form: {
      margin: 'auto',  
      width: '45%', 
      marginTop: theme.spacing(1),
      fontFamily: 'Merriweather',
      fontWeight: '400'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      fontFamily: 'Merriweather',
      fontWeight: '400'

    },
    error: {
        color: '#e63946'
    }

  }));

function SignUpForm() {

    const classes = useStyles();

    const { register, handleSubmit, errors } = useForm({mode: 'onBlur'});

    // Asynchronous email validation

    const checkValidity = async(email) =>{

        const url= "https://api.raisely.com/v3/check-user";

        const obj= {campaignUuid :'46aa3270-d2ee-11ea-a9f0-e9a68ccff42a', data : {email: email}};

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {'Content-Type': 'application/json'}
        });

        const msg = await response.json();
            //console.log(msg);
            if(msg.data.status==="EXISTS")
            return false;
            else
            return true;
    }

    // Making a POST request using FETCH API with JSON Payload when user submits the form

    const onSubmit = (input) => {
        // console.log(input);
        // console.log(JSON.stringify(input));
        
        const obj= {campaignUuid :'46aa3270-d2ee-11ea-a9f0-e9a68ccff42a', data : input};

        const url= "https://api.raisely.com/v3/signup";
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {'Content-Type': 'application/json'
            }
        }).then(res=>res.json())
        .then(response => console.log('Success:',
        JSON.stringify(response)))
        .catch(error => console.log('Error:', error));
      
    }


    return (

        <div className={classes.signupform}>

            <Typography component="h1" variant="h5" className={classes.heading}>
                SIGNUP FORM
            </Typography>

            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    
                    <TextField
                    variant="outlined"
                    margin="normal"
                    inputRef={register({ required: true })}
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                    />
                    

                    <TextField
                    variant="outlined"
                    margin="normal"
                    inputRef={register({ required: true })}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    autoFocus
                    />
                

                    <TextField
                    variant="outlined"
                    margin="normal"
                    inputRef={register({ required: true, validate: checkValidity })}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    />
                    {errors.email && errors.email.type === "validate" && (<div className={classes.error}>This email address already exists!</div>)}

                
                    <TextField
                    variant="outlined"
                    margin="normal"
                    inputRef={register({ required: true })}
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="password"
                    autoFocus
                    />
                    

                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                        Sign Up
                    </Button>
            
            </form>

        </div>
    )
}

export default SignUpForm
