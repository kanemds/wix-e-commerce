"use client"

import useWixClient from "@/hooks/useWixClient"
import { LoginState } from "@wix/sdk"
import { usePathname, useRouter } from "next/navigation"
import React, { use, useEffect, useState } from "react"
import Cookies from "js-cookie"

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION"
}

const LoginPage
  = () => {

    const { SUCCESS, FAILURE, EMAIL_VERIFICATION_REQUIRED, OWNER_APPROVAL_REQUIRED } = LoginState

    const [mode, setMode] = useState(MODE.LOGIN)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailCode, setEmailCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [isRegister, setIsRegister] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const pathname = usePathname()
    const router = useRouter()

    const formTitle = mode === MODE.LOGIN ? "Log in" : mode === MODE.REGISTER ? "Register" : mode === MODE.RESET_PASSWORD ? "Reset Your Password" : "Verify Your Email"

    const buttonTitle = mode === MODE.LOGIN ? "Log in" : mode === MODE.REGISTER ? "Register" : mode === MODE.RESET_PASSWORD ? "Reset" : "Verify"

    const wixClient = useWixClient()
    const isLoggedIn = wixClient.auth.loggedIn()

    if (isLoggedIn) {
      router.push("/")
    }

    useEffect(() => {
      if (isLogin && isSuccess && !error) {
        setMessage("Logged in Successfully.")
        setIsLogin(false)
        setIsSuccess(false)
      } else if (isRegister && isSuccess && !error) {
        setMessage("Register in Successfully.")
        setIsRegister(false)
        setIsSuccess(false)
      }
    }, [isLogin, isRegister, isSuccess])

    useEffect(() => {
      if (error) {
        setError("")
      }
    }, [username, password, email])


    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      setError("")

      try {
        let responseObj
        switch (mode) {
          case MODE.LOGIN:
            responseObj = await wixClient.auth.login({ email, password })
            setIsLogin(true)
            break

          case MODE.REGISTER:
            responseObj = await wixClient.auth.register({ email, password, profile: { nickname: username } })
            setIsRegister(true)
            break
          case MODE.RESET_PASSWORD:
            responseObj = await wixClient.auth.sendPasswordResetEmail(email, window.location.href)
            setMessage("Password reset email sent. Please check your e-mail.")
            break
          case MODE.EMAIL_VERIFICATION:
            responseObj = await wixClient.auth.processVerification({ verificationCode: emailCode })
            break
          default:
            break
        }

        switch (responseObj?.loginState) {

          case SUCCESS:

            const tokens = await wixClient.auth.getMemberTokensForDirectLogin(responseObj.data.sessionToken) // to decode the access and refresh token from wix
            console.log(tokens)
            Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), { expires: 2 })
            wixClient.auth.setTokens(tokens)
            router.push("/")
            break

          case FAILURE:
            if (responseObj.errorCode === "invalidEmail" || responseObj.errorCode === "invalidPassword") {
              setError("Invalid email or password, please try again.")
            } else if (responseObj.errorCode === "emailAlreadyExists") {
              setError("Email already exists, please try again.")
            } else if (responseObj.errorCode === "resetPassword") {
              setError("You need to reset your password.")
            } else {
              setError("Connection error, please try again.")
            }
            break
          case EMAIL_VERIFICATION_REQUIRED:
            setMode(MODE.EMAIL_VERIFICATION)
            break
          case OWNER_APPROVAL_REQUIRED:
            setMessage("Your account is pending approval.")
            break
          default:
            break
        }
      } catch (error) {
        console.log(error)
        setError("Something went wrong!")

      } finally {
        setIsLoading(false)
        setIsSuccess(true)
      }
    }


    return (
      <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 flex items-center justify-center">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold">{formTitle}</h1>
          {mode === MODE.REGISTER ? (
            <div className="flex flex-col gap-2">
              <label htmlFor="">Username</label>
              <input type="text" name="username" placeholder="John" className="ring-2 ring-gray-300 rounded-md p-4"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          ) : null}
          {
            mode !== MODE.EMAIL_VERIFICATION ? (
              <div className="flex flex-col gap-2">
                <label htmlFor="">E-mail</label>
                <input type="email" name="email" placeholder="John@gmail.com" className="ring-2 ring-gray-300 rounded-md p-4"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <label htmlFor="">Verification Code</label>
                <input type="text" name="emailCode" placeholder="code" className="ring-2 ring-gray-300 rounded-md p-4"
                  onChange={(e) => setEmailCode(e.target.value)}
                />
              </div>
            )
          }
          {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
            <div className="flex flex-col gap-2">
              <label htmlFor="">Password</label>
              <input type="password" name="password" placeholder="Enter your password" className="ring-2 ring-gray-300 rounded-md p-4"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          ) : null}
          {mode === MODE.LOGIN && <div className="text-sm underline cursor-pointer" onClick={() => setMode(MODE.RESET_PASSWORD)}>Forgot Password?</div>}
          <button className="py-2 px-4  bg-cartRed text-white rounded-md disabled:bg-pink-200 disabled:currsor-not-allowed" disabled={isLoading}>{isLoading ? "Loading" : buttonTitle}</button>
          {error && <div className="text-red-600">{error}</div>}
          {mode === MODE.LOGIN && (
            <div className="text-sm underline cursor-pointer" onClick={() => setMode(MODE.REGISTER)}>{"Don't"} have an account?</div>
          )}
          {mode === MODE.REGISTER && (
            <div className="text-sm underline cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>Have and account</div>
          )}
          {mode === MODE.RESET_PASSWORD && (
            <div className="text-sm underline cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>Go back to Login</div>
          )}
          {message && <div className="text-green-500 text-md">{message}</div>}
        </form>

      </div>
    )
  }

export default LoginPage
