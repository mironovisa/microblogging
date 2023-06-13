import { useSignIn } from "react-auth-kit";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../css/SignInPage.css";
import { LogInForm } from "../components/AuthForms/LogInForm";
import { SignInForm } from "../components/AuthForms/SignInForm";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const SignInPage = () => {
  const signIn = useSignIn();
  const location = useLocation();

  useEffect(() => {
    const tab = location.hash.substr(1);
    if (tab === "login") {
      document.getElementById("login-tab").click();
    } else if (tab === "signup") {
      document.getElementById("signup-tab").click();
    }
  }, [location.hash]);

  return (
    <div className="container">
      <div className="form-container">
        <Tabs defaultIndex={0}>
          <TabList className="TabList">
            <Tab className="Tab" selected>
              <a href="#login" id="login-tab" className="Tab-Link">
                Login
              </a>
            </Tab>
            <Tab className="Tab">
              <a href="#signup" id="signup-tab" className="Tab-Link">
                Sign Up
              </a>
            </Tab>
          </TabList>

          <TabPanel className="TabPanel-Login">
            <p className="Signup-Info2">Already have an account? Log in!</p>
            <LogInForm signIn={signIn} />
          </TabPanel>
          <TabPanel className="TabPanel-Signup">
            <p className="Signup-Info2">
              Dear Guest! In order to see the website, please sign up. Choose
              your username and password.
            </p>
            <SignInForm />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
