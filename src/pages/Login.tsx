import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { baseUrl } from "../lib/api";
import type { User } from "../types/user.type";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { userLogin, user } = useAuth();
  // const [user, setUser] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { token } = useAuth();
  const navigate = useNavigate();

  console.log("token", token);
  if (user && token) {
    navigate("/");
    return <></>;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("I am being executed");
      console.log(email, password);

      await userLogin(email, password);
      navigate("/");
    } catch {
      console.log("catch block");
    }
  };
  return (
    <div className="w-full pt-50">
      <Card className=" max-w-sm m-auto ">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
