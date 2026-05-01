const bcrypt = require('bcryptjs');

const password = 'admin0303';  // поменяй на свой пароль

bcrypt.hash(password, 10).then(hash => {
    console.log('Хеш пароля:', hash);
});