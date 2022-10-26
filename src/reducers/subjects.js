import { UPDATE_SUBJECTS } from "../actions/actionTypes";

const initialSubjectsState = [];

export default function subjects(state = initialSubjectsState, action) {
    switch (action.type) {
        case UPDATE_SUBJECTS:
            return action.subjects;
        default:
            return state;
    }
}