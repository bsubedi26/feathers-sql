const errors = require('feathers-errors');

module.exports = function errorHandler (error) {
  let feathersError = error;
  // console.log('ERROR ', error)

  // TODO (EK): Map PG, Oracle, etc. errors

  // NOTE: SQLState values from
  // https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-reference-error-sqlstates.html
  // console.log('ERRRRRRRRRRRRORR')
  // console.log(error)
  if (error.sqlState && error.sqlState.length) {
    // code: 'ER_DUP_ENTRY',
    // errno: 1062,
    // sqlState: '23000',
    // sqlMessage: 'Duplicate entry \'woaaasrr\' for key \'task_another_col_unique\'' }

    // code: 'ER_NO_DEFAULT_FOR_FIELD',
    // errno: 1364,
    // sqlState: 'HY000',
    // sqlMessage: 'Field \'another_col\' doesn\'t have a default value' }

    // remove SQLSTATE marker (#) and pad/truncate SQLSTATE to 5 chars
    let sqlState = ('00000' + error.sqlState.replace('#', '')).slice(-5);
    // console.log('sqlState ', sqlState.slice(0, 2));
    const { code , errno, sqlMessage } = error;
    const errorsObject = Object.assign({}, { code , errno, sqlMessage });

    switch (sqlState.slice(0, 2)) {
      case '02':
        feathersError = new errors.NotFound(error, { errors: errorsObject });
        break;
      case '28':
        feathersError = new errors.Forbidden(error, { errors: errorsObject });
        break;
      case '08':
      case '0A':
      case '0K':
        feathersError = new errors.Unavailable(error, { errors: errorsObject });
        break;
      case '20':
      case '21':
      case '22':
      case '23':
      case '24':
      case '25':
      case '40':
      case '42':
      case '70':
        feathersError = new errors.BadRequest(error, { errors: errorsObject });
        break;

      default:
        feathersError = new errors.GeneralError(error, { errors: errorsObject });
    }
  }

  // NOTE (EK): Error codes taken from
  // https://www.sqlite.org/c3ref/c_abort.html

  if (error.code === 'SQLITE_ERROR') {
    switch (error.errno) {
      case 1:
      case 8:
      case 18:
      case 19:
      case 20:
        feathersError = new errors.BadRequest(error);
        break;
      case 2:
        feathersError = new errors.Unavailable(error);
        break;
      case 3:
      case 23:
        feathersError = new errors.Forbidden(error);
        break;
      case 12:
        feathersError = new errors.NotFound(error);
        break;
      default:
        feathersError = new errors.GeneralError(error);
        break;
    }
  }

  // NOTE: Error codes taken from
  // https://www.postgresql.org/docs/9.6/static/errcodes-appendix.html
  if (typeof error.code === 'string' && error.severity && error.routine) {
    // Omit query information
    const messages = error.message.split('-');
    error.message = messages[messages.length - 1];

    switch (error.code.slice(0,2)) {
      case '22':
      case '23':
        feathersError = new errors.BadRequest(error, { errors: error });
        break;
      case '28':
        feathersError = new errors.Forbidden(error, { errors: error });
        break;
      case '3D':
      case '3F':
      case '42':
        feathersError = new errors.Unprocessable(error);
        break;
      default:
        feathersError = new errors.GeneralError(error);
        break;
    }
  }
  
  throw feathersError;
};
