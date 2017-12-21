const afterOauthCreate = () => {
    return async hook => {
        // console.log('HOOK ', hook.result);
        return hook;
    };
};

module.exports = {
    before: {
        all: [

        ],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [
            afterOauthCreate() // if first time user            
        ],
        update: [],
        patch: [
            afterOauthCreate() // if revisiting user
        ],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
