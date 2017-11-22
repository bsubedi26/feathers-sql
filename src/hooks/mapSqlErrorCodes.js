const mapSqlErrorCodes = () => {
  return async hook => {
    const { errors } = hook.error;
    const { sqlMessage } = errors;
    // console.log(hook.error)

    switch (errors.code) {
      case 'ER_DUP_ENTRY': {
        const uniquePosition = sqlMessage.indexOf('_unique')
        const tableNamePosition = sqlMessage.indexOf(hook.path)
        
        const tableAndCol = sqlMessage.slice(tableNamePosition, uniquePosition)
        const colName = tableAndCol.slice(tableAndCol.indexOf('_') + 1, tableAndCol.length)
        errors.message = `The provided column (${colName}) already exists in table (${hook.path}). Try again.`
        break;
      }
      default: {
        errors.message = 'There was a problem. Try again.'
        break;
      }
    }

    return hook;
  }
}

module.exports = mapSqlErrorCodes;
