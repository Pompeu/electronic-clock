'use strict';

const expect = require('chai').expect;
const User = require('../../models').User;

const DEFAULT = {
  username: 'johndoe',
  email:    'john@doe.com',
  password: 'somepass'
};

const NEW = {
  username: 'mcfritz',
  email:    'mc@fritz.com',
  password: 'anotherpass'
};

const INVALID = {
  username: 'aa',
  email:    'b',
  password: '123'
};

describe('User', () => {
  beforeEach(() => {
    User.destroy({truncate: true});
  });

  describe('create new', () => {
    it('should return new user', () => {
      return User.create({ username: DEFAULT.username, email: DEFAULT.email, password: DEFAULT.password }).then(user => {
        expect(user).to.not.be.null;
        expect(user).to.not.be.undefined;
      });
    });

    it('should save new user information', () => {
      return User.create({ username: DEFAULT.username, email: DEFAULT.email, password: DEFAULT.password }).then(user => {
        expect(user.username).to.be.equal(DEFAULT.username);
        expect(user.email).to.be.equal(DEFAULT.email);
        expect(user.password).to.not.be.null;
        expect(user.password).to.not.be.undefined;
        expect(user.password.length).to.be.above(0);
      });
    });

    it('should save timestamps', () => {
      return User.create({ username: DEFAULT.username, email: DEFAULT.email, password: DEFAULT.password }).then(user => {
        expect(user.created_at).to.not.be.null;
        expect(user.created_at).to.not.be.undefined;
        expect(user.updated_at).to.not.be.null;
        expect(user.updated_at).to.not.be.undefined;
      });
    });

    it('should store passwords encrypted', () => {
      return User.create({ username: DEFAULT.username, email: DEFAULT.email, password: DEFAULT.password }).then(user => {
        expect(user.password).to.not.be.equal(DEFAULT.password);
      });
    });
  });

  describe('username field', () => {
    it('should not accept less than 4 characters', () => {
      return User.create({ username: INVALID.username, email: DEFAULT.email, password: DEFAULT.password }).then(user => {
        throw new Error('Accepted invalid username');
      }
      , error => {
        expect(error).to.not.be.null;
      });
    });
  });

  describe('email field', () => {
    it('should not accept non-email', () => {
      return User.create({ username: DEFAULT.username, email: INVALID.email, password: DEFAULT.password }).then(user => {
        throw new Error('Accepted invalid email');
      }
      , error => {
        expect(error).to.not.be.null;
      });
    });
  });

  describe('password field', () => {
    it('should not accept too small', () => {
      return User.create({ username: DEFAULT.username, email: DEFAULT.email, password: INVALID.password }).then(user => {
        throw new Error('Accepted invalid password');
      }
      , error => {
        expect(error).to.not.be.null;
      });
    });
  });

  describe('update', () => {
    it('should save new information', () => {
      return User.create({ username: DEFAULT.username, email: DEFAULT.email, password: DEFAULT.password }).then(user => {
        const last_password = user.password;
        return user.update({
          username: NEW.username,
          email:    NEW.email,
          password: NEW.password
        }).then(updated_user => {
          expect(updated_user).to.not.be.null;
          expect(updated_user).to.not.be.undefined;
          expect(updated_user.username).to.be.equal(NEW.username);
          expect(updated_user.email).to.be.equal(NEW.email);
          expect(updated_user.password).to.not.be.equal(last_password);
          expect(updated_user.updated_at).to.not.be.equal(updated_user.created_at);
        });
      });
    });

    it('should encrypt new password', () => {
      return User.create({ username: DEFAULT.username, email: DEFAULT.email, password: DEFAULT.password }).then(user => {
        return user.update({
          password: NEW.password
        }).then(updated_user => {
          expect(updated_user.password).to.not.be.equal(NEW.password);
        });
      });
    });
  });
  describe('checkPassword', () => {
    it('should return true if match', done => {
      return User.create({ username: DEFAULT.username, email: DEFAULT.email, password: DEFAULT.password }).then(user => {

        return user.checkPassword(DEFAULT.password, (err, result) => {
          expect(err).to.be.null;
          expect(result).to.be.equal(true);
          done();
        });
      });
    });

    it('should return false if not match', done => {
      return User.create({ username: DEFAULT.username, email: DEFAULT.email, password: DEFAULT.password }).then(user => {

        user.checkPassword('foda-se', (err, result) => {
          expect(err).to.not.be.null;
          expect(result).to.be.equal(false);
          done();
        });
      });
    });
  });
});
