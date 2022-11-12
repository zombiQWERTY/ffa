import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import { LoginRequestData, AuthApi, AuthSlice } from "../../store/Auth";
import { Button } from "../../components/Button";
import { InputText } from "../../components/InputText";
import { Toast, useToast } from "../../components/Toast";

const EMAIL_PATTERN =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type LoginFormData = LoginRequestData & { remember: boolean };

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      remember: false,
    },
  });

  const { toggle: toggleToast, isShowing: isToastShowing } = useToast();

  const dispatch = useAppDispatch();

  const [login, { isLoading, error: authError }] = AuthApi.useLoginMutation();

  const onSubmit = useCallback(
    ({ remember, ...loginData }: LoginFormData) => {
      dispatch(AuthSlice.actions.setRemember(remember));
      login(loginData)
        .unwrap()
        .then((authData) => dispatch(AuthSlice.actions.setAuthData(authData)))
        .catch(toggleToast);
    },
    [toggleToast, dispatch, login]
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          placeholder="Email"
          error={errors.email}
          errorText="Please check the Email"
          formProps={register("email", {
            required: true,
            pattern: EMAIL_PATTERN,
          })}
        />
        <InputText
          placeholder="Password"
          type="password"
          error={errors.password}
          errorText="Please check the Password"
          formProps={register("password", {
            required: true,
            minLength: 4,
          })}
        />

        <div className="flex justify-between items-center mb-6">
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              id="remember"
              {...register("remember")}
            />

            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor="remember"
            >
              Remember me
            </label>
          </div>
        </div>

        <Button text="Login" isLoading={isLoading} />
      </form>
      <Toast
        isShowing={isToastShowing}
        toggle={toggleToast}
        type={"danger"}
        title={authError as string}
      />
    </>
  );
};
