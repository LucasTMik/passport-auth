import { Strategy as LocalStrategy } from 'passport-local';
import { _ } from 'lodash';

users = [
    {username: "Lucas", password: "1234"},
    {username: "Markin", password: "1234"}
]

export default () => {
    return new LocalStrategy(
        function(username, password, done) {
            //TODO do using MONGO
            if(!username, !password) 
                return done(null, false);

            _.find(users, {username: "Lucas"}, user => {
                if(user === null) 
                    return done(null, false);
            });
           
            //TODO add bcrypt
            if(user.password !== password)
                return done(null, false);
            else 
                return done(null, user);
        }
    )
}