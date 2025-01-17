import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { saveUserToDatabase } from "../../../api/utils";
import toast from "react-hot-toast";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
const SocialLogin = () => {
  const { loginUsingGoogle, setUser } = useAuth();

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const data = await loginUsingGoogle();
      // save user information in db if user is new
      await saveUserToDatabase(data?.user);
      setUser(data?.user);
      toast.success("Signup using google Successful");
      navigate(location?.state ? location.state : "/");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-3">
      <div className="divider"></div>
      <div>
        <AwesomeButton onPress={handleGoogleSignIn} type="primary">
          <FaGoogle />
          {"-"} Login using Google
        </AwesomeButton>
      </div>
    </div>
  );
};

export default SocialLogin;
