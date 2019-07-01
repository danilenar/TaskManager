# task_manager

Task manager is an app created to simplifies and bring equality to the process of divide tasks, primarily thought to home-related tasks.

## Philosophy behind the project

This project is intended to be an application of all the stuff I've learned from software development in general and full-stack development in particular. Thus, I intentionally avoid using boilerplates, not because they lack utility, but because my aim here is to test my knowledge and make the experiment of building things from scratch.

## Technologies used

- React
- Node
- Express
- Webpack
- Typescript
- [XState](https://xstate.js.org/docs/)

## v0.0.1

**0.0.1 Milestones**:
- [x] Class diagram.
- [x] Database diagram. 
- [x] Autentication flow, frontend.
- [ ] Classes implementation.
- [ ] Database connection.
- [ ] API creation.
- [ ] New task viewer
- [ ] Pending tasks viewer
- [ ] Stats viewer

## The Statecharts and documentation

Statecharts are a formalism for modeling stateful, reactive systems. This project has been created to experiment with this concept. For the pourpose, I have used the XState library for creating, interpreting, and executing statecharts.

Statecharts are also a good way to document a system. Below is the diagram corresponding to the authentication flow(frontend): 

<div align="center">
    <img src="./StateChart.png" alt="StateChart"/>
</div>

Below is showed that the system has several states, depending on the actions performed by the user. The first state is __iddle__, where the user only can send credentials and send the __SUBMIT__ transition to the __wait__ state. In this state the correspondent transition is performed automatically by the system, and depending on the authentication success (which carries the system to the __logged__ state) or failed (which carries the system to the __error__ state).

Being in the __error__ state means the system will fire automatically one transition conditionally. If there have been less than 5 authentication attempts, the system will return to the __iddle__ state. Elsewhere, the system will fallback to __secure_wait_after_login_fail__ state, where the login will be disabled temporally, and then will be automatically fired a transition to the __iddle__ state.

In the __logged__ state, the system will have nested states to allow the authenticated user activity (to_do). There is also one last first-order state which is __sesion_autoclosed__, in which the __logged__ state falls due to user inactivity. This state has a transition performed by the user to the __iddle__ state.
