import { Machine, MachineConfig, assign } from 'xstate'


// Context type
export type TContext = {
    login_fails: number,
}


// States in the system
export type TSchema = {
    states: {
        iddle: {},
        wait: {},
        error: {},
        secure_wait_after_login_fail: {},
        logged: {},
    }
}

// Transitions
export type TEvents =
    | { type: 'SUBMIT' }
    | { type: 'LOG_IN_SUCCESS' }
    | { type: 'LOG_IN_FAIL' }
    | { type: 'REJECTED_LOGIN_TIMEOUT' }
    | { type: 'LOG_OUT' }
    | { type: 'OK' }
    | { type: 'LOG_IN_TIMEOUT' };


// Mock function, to be replaced for a call to the autentication API    
function fakeLogin(context, event) {
    console.log(context, event)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (event.data.name === 'Admin' && event.data.password === '123456') 
                return resolve("Login succeeded.");
            return reject("Login failed.");
        }, 1000);
    });
}


// State Machine spec
const machineConfig: MachineConfig<TContext, TSchema, TEvents> = {
    id: 'autentication',
    initial: 'iddle',
    context: {
        login_fails: 0,
    },
    states: {
        iddle: {
            on: {
                SUBMIT: 'wait',
            }
        },
        wait: {
            invoke: {
                id: "login",
                src: fakeLogin,
                onDone: {
                    target: "logged",
                    actions: ['restart_login_fails'],
                },
                onError: {
                    target: "error",
                    actions: [
                        'increment_login_fails',
                    ],
                }
            }
        },
        error: {
            on: {
                '': [
                    {
                        target: 'iddle',
                        cond: 'maxLoginFailsNotReached'
                    },
                    {
                        target: 'secure_wait_after_login_fail',
                    }
                ]
            },
        },
        secure_wait_after_login_fail: {
            after: {
                5000: {
                    target: 'iddle',
                    actions: ['set_max_login_fails'],
                }
            },
        },
        logged: {
            on: {
                LOG_OUT: 'iddle',
            },
            after: {
                10000: 'sesion_autoclosed'
            },
        },
        sesion_autoclosed: {
            on: {
                OK: {
                    target: 'iddle',                },
            },
        }
    },
}


// Exportable API, containing an instance of the State Machine
export const machine = Machine<TContext, TSchema, TEvents>(machineConfig, {
    actions: {
        increment_login_fails: assign({
            login_fails: (context: TContext) => context.login_fails +1
        }),
        set_max_login_fails: assign({
            login_fails: (context: TContext) => context.login_fails=4
        }),
        restart_login_fails: assign({
            login_fails: (context: TContext) => context.login_fails = 0,
        }),
    },
    guards: {
        maxLoginFailsNotReached: (context: TContext) => context.login_fails < 5,
    },
})