import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";
import Spinner from "../../ui/Spinner";

// Email regex: /\S+@\S+\.\S+/

function SignUpForm() {
  const {register, handleSubmit, getValues, reset, formState: {errors}} = useForm();
  const {signUp, isLoading} = useSignUp();

  function onSubmit({fullName, email, password}){

    signUp({fullName, email, password},
          {onSettled: () => reset()
          });

     if(isLoading) return <Spinner/>;

  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text"
         id="fullName" 
         disabled={isLoading}
         {...register("fullName",
         {
          required: "This field is required",
         }
         )}
         />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email"
         id="email" 
         disabled={isLoading}
         {...register("email",{
          required: "This field is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Please write correct email address"
          }
         }
         )}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password"
         id="password"
         disabled={isLoading}
         {...register("password",{
          required: "This field is required",
          minLength: {
            value: 8,
            message: "Password needs to be minimum of 8 characters"
          }

         }
         )}
         />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password"
         id="passwordConfirm" 
         disabled={isLoading}
         {...register("passwordConfirm",{
          required: "This field is required",
          validate: (values) => values === getValues()?.password || "password not match"
         }
         )}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isLoading} onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignUpForm;
