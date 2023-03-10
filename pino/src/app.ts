import { logger } from './logger';

logger.info('starting the program');

function getUser(userID: string) {
  const user = {
    id: 'johndoe',
    name: 'John Doe',
    address: '123 Imaginary Street',
    passport: {
      number: 'BE123892',
      issued: 2023,
      expires: 2027,
    },
    phone: '123-234-544',
  };


  const childLogger = logger.child({ userID });
  childLogger.info('getUser called');
  childLogger.info({ nested: { user } }, 'User updated');
  childLogger.info('getUser completed');
}

getUser('johndoe');

logger.info('ending the program');
