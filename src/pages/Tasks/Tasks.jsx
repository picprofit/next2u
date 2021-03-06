import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { tasksApiCallRequest, usersApiCallRequest } from '../../store/actions';
import { getIdToUserObject } from '../../helpers';
import TodoList from './TodoList';

const Tasks = ({ tasksResult, usersResult, getTasks, getUsers }) => {
  useEffect(() => {
    getTasks(false);
    getUsers();
  }, [getTasks, getUsers]);

  const {
    data: tasksData,
    fetching: tasksFetching,
    error: tasksError
  } = tasksResult;

  const {
    data: usersData,
    fetching: usersFetching,
    error: usersError
  } = usersResult;

  const idToUserObject = getIdToUserObject(usersData);

  return (
    <>
      <h2>Все задачи</h2>
      <TodoList
        usersData={idToUserObject}
        tasksData={tasksData}
        loading={tasksFetching || usersFetching}
        error={tasksError || usersError}
      />
    </>
  );
};

const mapStateToProps = appStore => {
  const { tasks, users } = appStore;
  return {
    tasksResult: tasks,
    usersResult: users,
    user: appStore.user
  };
};

const mapDispatchToProps = dispatch => ({
  getTasks: userId => dispatch(tasksApiCallRequest(userId)),
  getUsers: () => dispatch(usersApiCallRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
