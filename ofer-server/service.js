let connection; //to be set by init

const GetEmployeeList = async () => {
  const query = "SELECT * FROM employees";
  console.log({ connection });
  const [results, fields] = await connection.execute(query).catch((err) => {
    throw err;
  });
  return results;
};

//input: employeeId=1
//output: {"roleId" : 1,"description" : "Manager"},
const GetEmployeeroles = async (employeeId) => {
  const query = `SELECT employees_roles.roleId, roles.description \
    FROM employees_roles     INNER JOIN roles ON roles.Id = employees_roles.roleId \
    WHERE employees_roles.employeeId=? AND employees_roles.enabled=true ;`;

  const [results, fields] = await connection
    .execute(query, [employeeId])
    .catch((err) => {
      throw err;
    });
  return results;
};

//input:employeeId, roleId
//output: ok message type OR error
const ClockIn = async (employeeId, roleId) => {
  // const actionTime = Date.toISO();
  const query = `INSERT INTO employees_roles  (employeeId, roleId, enabled) \
  VALUES (?,?,false); `;
  const [results, fields] = await connection
    .execute(query, [employeeId, roleId])
    .catch((err) => {
      throw err;
    });
  return results;
};

const init = (conn) => {
  console.log("set service with db connection instance");
  connection = conn;
};

// employeeId, roleId
module.exports = {
  init,
  GetEmployeeList,
  GetEmployeeroles,
  ClockIn,
};
