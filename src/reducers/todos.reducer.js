export default (currentState = [], action) => {
    switch(action.type){
        case 'ADD_TODO':
            const nextState = [
                ...currentState,
                {
                    id: action.id,
                    task: action.task,
                    completed: false
                }
            ];
            return nextState;
        default:
            return currentState;
    }
};
