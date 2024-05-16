import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import passport from "passport";

import User from "./models/User";

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email }).exec();

      if (user === null) done(null, false, { message: "No user with that email | email" });
      else if (!(await bcrypt.compare(password, user.password)))
        done(null, false, { message: "Incorrect password | password" });
      else done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  // @ts-expect-error
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (error) {
    done(error);
  }
});
