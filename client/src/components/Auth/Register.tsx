import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import Input from "./Input";

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleRegister = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        // @ts-expect-error works
        body: new URLSearchParams(new FormData(e.currentTarget)),
      });

      if (res.status === 403) {
        navigate(-1);
      } else if (res.status === 400) {
        const errors = await res.json();
        setErrors(errors);
      } else if (res.ok) {
        navigate("/login");
      }
    },
    [navigate],
  );

  return (
    <form onSubmit={(e) => handleRegister(e)} className="grid gap-4">
      <h1 className="text-3xl font-semibold">Register</h1>

      <Link to="/login" className="text-green-3">
        Already have an account? Login here.
      </Link>

      <Input type="email" name="email" errors={errors} />

      <Input type="password" name="password" errors={errors} />

      <Input type="text" name="firstName" label="First name" errors={errors} />

      <button className="w-60 justify-self-end rounded-xl bg-green-3 px-8 py-3 text-white-1">
        Register
      </button>
    </form>
  );
}
